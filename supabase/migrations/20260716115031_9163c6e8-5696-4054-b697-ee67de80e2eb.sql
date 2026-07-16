
CREATE OR REPLACE FUNCTION public.get_or_create_unsubscribe_token(p_email text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text := lower(p_email);
  v_token text;
BEGIN
  SELECT token INTO v_token
  FROM public.email_unsubscribe_tokens
  WHERE email = v_email AND used_at IS NULL
  LIMIT 1;

  IF v_token IS NOT NULL THEN
    RETURN v_token;
  END IF;

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.email_unsubscribe_tokens (token, email)
  VALUES (v_token, v_email)
  ON CONFLICT (email) DO UPDATE SET token = EXCLUDED.token
  RETURNING token INTO v_token;

  RETURN v_token;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_or_create_unsubscribe_token(text) TO anon, authenticated, service_role;
