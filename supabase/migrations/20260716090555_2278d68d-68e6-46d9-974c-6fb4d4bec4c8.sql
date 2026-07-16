-- 收回整張表的直接新增權限
REVOKE INSERT ON public.contact_submissions FROM anon;

-- 移除過於寬鬆的 INSERT 政策
DROP POLICY IF EXISTS "Allow anonymous contact submissions" ON public.contact_submissions;

-- 建立由資料庫管理員權限執行的專用函數
CREATE OR REPLACE FUNCTION public.submit_contact(
  p_topic text,
  p_name text,
  p_org text,
  p_title text,
  p_phone text,
  p_email text,
  p_message text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.contact_submissions (topic, name, org, title, phone, email, message)
  VALUES (p_topic, p_name, p_org, p_title, p_phone, p_email, p_message);
END;
$$;

-- 開放匿名使用者呼叫此函數
GRANT EXECUTE ON FUNCTION public.submit_contact(text, text, text, text, text, text, text) TO anon;
GRANT ALL ON public.contact_submissions TO service_role;