CREATE OR REPLACE FUNCTION public.submit_contact_and_notify(
  p_topic text,
  p_name text,
  p_org text,
  p_title text,
  p_phone text,
  p_email text,
  p_message text,
  p_subject text,
  p_html text,
  p_text text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_submission_id uuid;
  v_message_id uuid := gen_random_uuid();
  v_recipient constant text := 'shangyi@shangyi-care.com';
  v_token text;
BEGIN
  IF p_topic NOT IN ('b2b', 'spec', 'comwell')
     OR length(trim(p_name)) NOT BETWEEN 1 AND 100
     OR length(trim(p_phone)) NOT BETWEEN 1 AND 50
     OR length(trim(p_email)) NOT BETWEEN 3 AND 255
     OR position('@' IN p_email) < 2
     OR length(trim(p_message)) NOT BETWEEN 1 AND 2000
     OR length(coalesce(p_org, '')) > 100
     OR length(coalesce(p_title, '')) > 100
     OR length(coalesce(p_subject, '')) NOT BETWEEN 1 AND 200
     OR length(coalesce(p_html, '')) NOT BETWEEN 1 AND 200000
     OR length(coalesce(p_text, '')) NOT BETWEEN 1 AND 50000 THEN
    RAISE EXCEPTION 'Invalid contact form data';
  END IF;

  INSERT INTO public.contact_submissions (topic, name, org, title, phone, email, message)
  VALUES (p_topic, trim(p_name), nullif(trim(p_org), ''), nullif(trim(p_title), ''), trim(p_phone), lower(trim(p_email)), trim(p_message))
  RETURNING id INTO v_submission_id;

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
      'reply_to', lower(trim(p_email)),
      'sender_domain', 'notify.shangyi-care.com',
      'subject', p_subject,
      'html', p_html,
      'text', p_text,
      'purpose', 'transactional',
      'label', 'contact-notification',
      'idempotency_key', 'contact-' || v_submission_id::text,
      'unsubscribe_token', v_token,
      'queued_at', now()
    )
  );

  RETURN v_submission_id;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_contact_and_notify(text, text, text, text, text, text, text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_contact_and_notify(text, text, text, text, text, text, text, text, text, text) TO anon, authenticated, service_role;