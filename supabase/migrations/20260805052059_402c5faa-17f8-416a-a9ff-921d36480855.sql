-- 1. Fixed search_path on helper functions
CREATE OR REPLACE FUNCTION public.delete_email(queue_name text, message_id bigint)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'pgmq', 'public', 'pg_temp' AS $function$
BEGIN
  RETURN pgmq.delete(queue_name, message_id);
EXCEPTION WHEN undefined_table THEN
  RETURN FALSE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
RETURNS bigint LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'pgmq', 'public', 'pg_temp' AS $function$
BEGIN
  RETURN pgmq.send(queue_name, payload);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload);
END;
$function$;

CREATE OR REPLACE FUNCTION public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
RETURNS bigint LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'pgmq', 'public', 'pg_temp' AS $function$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
EXCEPTION WHEN undefined_table THEN
  BEGIN
    PERFORM pgmq.create(dlq_name);
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  BEGIN
    PERFORM pgmq.delete(source_queue, message_id);
  EXCEPTION WHEN undefined_table THEN
    NULL;
  END;
  RETURN new_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.read_email_batch(queue_name text, batch_size integer, vt integer)
RETURNS TABLE(msg_id bigint, read_ct integer, message jsonb)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'pgmq', 'public', 'pg_temp' AS $function$
BEGIN
  RETURN QUERY SELECT r.msg_id, r.read_ct, r.message FROM pgmq.read(queue_name, vt, batch_size) r;
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN;
END;
$function$;

-- 2. Drop the injectable RPC variants
DROP FUNCTION IF EXISTS public.submit_contact_and_notify(text, text, text, text, text, text, text, text, text, text);
DROP FUNCTION IF EXISTS public.submit_contact(text, text, text, text, text, text, text);

-- 3. Recreate the notify RPC: renders the email itself from raw fields only
CREATE OR REPLACE FUNCTION public.submit_contact_and_notify(
  p_topic text, p_name text, p_org text, p_title text,
  p_phone text, p_email text, p_message text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions', 'pg_temp'
AS $function$
DECLARE
  v_submission_id uuid;
  v_message_id uuid := gen_random_uuid();
  v_recipient constant text := 'shangyi@shangyi-care.com';
  v_token text;
  v_topic_label text;
  v_subject text;
  v_html text;
  v_text text;
  v_name text; v_org text; v_title text; v_phone text; v_email text; v_msg text;
  v_submitted text;
BEGIN
  IF p_topic NOT IN ('b2b', 'spec', 'comwell')
     OR length(trim(p_name)) NOT BETWEEN 1 AND 100
     OR length(trim(p_phone)) NOT BETWEEN 1 AND 50
     OR length(trim(p_email)) NOT BETWEEN 3 AND 255
     OR position('@' IN p_email) < 2
     OR length(trim(p_message)) NOT BETWEEN 1 AND 2000
     OR length(coalesce(p_org, '')) > 100
     OR length(coalesce(p_title, '')) > 100 THEN
    RAISE EXCEPTION 'Invalid contact form data';
  END IF;

  v_name := trim(p_name);
  v_org := nullif(trim(coalesce(p_org, '')), '');
  v_title := nullif(trim(coalesce(p_title, '')), '');
  v_phone := trim(p_phone);
  v_email := lower(trim(p_email));
  v_msg := trim(p_message);
  v_submitted := to_char(now() AT TIME ZONE 'Asia/Taipei', 'YYYY-MM-DD HH24:MI:SS');

  v_topic_label := CASE p_topic
    WHEN 'b2b' THEN '醫療機構與通路合作洽談'
    WHEN 'spec' THEN '產品規格與專業資料索取'
    ELSE '康威爾 Comwell 居家照護諮詢'
  END;

  INSERT INTO public.contact_submissions (topic, name, org, title, phone, email, message)
  VALUES (p_topic, v_name, v_org, v_title, v_phone, v_email, v_msg)
  RETURNING id INTO v_submission_id;

  -- Subject/body are fully server-composed; all user values HTML-escaped.
  v_subject := '【聯絡表單】' || v_topic_label || ' — ' || v_name;

  v_html :=
    '<!DOCTYPE html><html lang="zh-Hant"><body style="background:#ffffff;font-family:Arial,sans-serif">'
    || '<div style="padding:32px 28px;max-width:600px">'
    || '<h1 style="font-size:20px;color:#0f172a;margin:0 0 4px">上怡生醫｜新的聯絡表單</h1>'
    || '<p style="font-size:13px;color:#64748b;margin:0">類別：' || replace(replace(replace(replace(v_topic_label,'&','&amp;'),'<','&lt;'),'>','&gt;'),'"','&quot;') || '</p>'
    || '<hr style="border-color:#e2e8f0;margin:20px 0" />'
    || '<p style="font-size:14px;color:#0f172a;margin:6px 0"><span style="color:#64748b">姓名：</span>' || replace(replace(replace(replace(v_name,'&','&amp;'),'<','&lt;'),'>','&gt;'),'"','&quot;') || '</p>'
    || coalesce('<p style="font-size:14px;color:#0f172a;margin:6px 0"><span style="color:#64748b">單位 / 機構：</span>' || replace(replace(replace(replace(v_org,'&','&amp;'),'<','&lt;'),'>','&gt;'),'"','&quot;') || '</p>', '')
    || coalesce('<p style="font-size:14px;color:#0f172a;margin:6px 0"><span style="color:#64748b">職稱：</span>' || replace(replace(replace(replace(v_title,'&','&amp;'),'<','&lt;'),'>','&gt;'),'"','&quot;') || '</p>', '')
    || '<p style="font-size:14px;color:#0f172a;margin:6px 0"><span style="color:#64748b">電話：</span>' || replace(replace(replace(replace(v_phone,'&','&amp;'),'<','&lt;'),'>','&gt;'),'"','&quot;') || '</p>'
    || '<p style="font-size:14px;color:#0f172a;margin:6px 0"><span style="color:#64748b">Email：</span>' || replace(replace(replace(replace(v_email,'&','&amp;'),'<','&lt;'),'>','&gt;'),'"','&quot;') || '</p>'
    || '<p style="font-size:14px;color:#0f172a;margin:6px 0"><span style="color:#64748b">送出時間：</span>' || v_submitted || '</p>'
    || '<hr style="border-color:#e2e8f0;margin:20px 0" />'
    || '<p style="font-size:12px;color:#64748b;margin:0 0 6px">諮詢內容</p>'
    || '<p style="font-size:14px;color:#0f172a;line-height:1.7;white-space:pre-wrap;background:#f8fafc;padding:14px 16px;border-radius:6px">'
    || replace(replace(replace(replace(v_msg,'&','&amp;'),'<','&lt;'),'>','&gt;'),'"','&quot;') || '</p>'
    || '<hr style="border-color:#e2e8f0;margin:20px 0" />'
    || '<p style="font-size:11px;color:#94a3b8;margin:0">本信件由 shangyi-care.com 聯絡表單自動寄送。請於 1–2 個工作日內回覆客戶。</p>'
    || '</div></body></html>';

  v_text :=
    '上怡生醫｜新的聯絡表單' || E'\n'
    || '類別：' || v_topic_label || E'\n'
    || '姓名：' || v_name || E'\n'
    || coalesce('單位 / 機構：' || v_org || E'\n', '')
    || coalesce('職稱：' || v_title || E'\n', '')
    || '電話：' || v_phone || E'\n'
    || 'Email：' || v_email || E'\n'
    || '送出時間：' || v_submitted || E'\n\n'
    || '諮詢內容：' || E'\n' || v_msg;

  SELECT token INTO v_token
  FROM public.email_unsubscribe_tokens
  WHERE email = v_recipient AND used_at IS NULL
  LIMIT 1;

  IF v_token IS NULL THEN
    v_token := encode(extensions.gen_random_bytes(32), 'hex');
    INSERT INTO public.email_unsubscribe_tokens (token, email)
    VALUES (v_token, v_recipient)
    ON CONFLICT (email) DO UPDATE
      SET token = CASE
        WHEN public.email_unsubscribe_tokens.used_at IS NULL THEN public.email_unsubscribe_tokens.token
        ELSE EXCLUDED.token
      END,
      used_at = NULL
    RETURNING token INTO v_token;
  END IF;

  INSERT INTO public.email_send_log (message_id, template_name, recipient_email, status, metadata)
  VALUES (v_message_id::text, 'contact-notification', v_recipient, 'pending', jsonb_build_object('submission_id', v_submission_id));

  PERFORM public.enqueue_email(
    'transactional_emails',
    jsonb_build_object(
      'message_id', v_message_id::text,
      'to', v_recipient,
      'from', 'shangyi-care <noreply@shangyi-care.com>',
      'reply_to', v_email,
      'sender_domain', 'notify.shangyi-care.com',
      'subject', v_subject,
      'html', v_html,
      'text', v_text,
      'purpose', 'transactional',
      'label', 'contact-notification',
      'idempotency_key', 'contact-' || v_submission_id::text,
      'unsubscribe_token', v_token,
      'queued_at', now()
    )
  );

  RETURN v_submission_id;
END;
$function$;

-- 4. Only trusted server-side code may execute these SECURITY DEFINER functions
REVOKE ALL ON FUNCTION public.submit_contact_and_notify(text, text, text, text, text, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_contact_and_notify(text, text, text, text, text, text, text) TO service_role;

REVOKE ALL ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;

REVOKE ALL ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;

REVOKE ALL ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;

REVOKE ALL ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;

REVOKE ALL ON FUNCTION public.get_or_create_unsubscribe_token(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_or_create_unsubscribe_token(text) TO service_role;

REVOKE ALL ON FUNCTION public.email_queue_dispatch() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.email_queue_dispatch() TO service_role, postgres;

-- 5. contact_submissions: explicit, trusted-only access
REVOKE ALL ON TABLE public.contact_submissions FROM anon, authenticated;
GRANT ALL ON TABLE public.contact_submissions TO service_role;

DROP POLICY IF EXISTS "Service role can manage contact submissions" ON public.contact_submissions;
CREATE POLICY "Service role can manage contact submissions"
ON public.contact_submissions
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');