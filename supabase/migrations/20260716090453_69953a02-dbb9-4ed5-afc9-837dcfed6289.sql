GRANT INSERT ON public.contact_submissions TO anon;
GRANT ALL ON public.contact_submissions TO service_role;

CREATE POLICY "Allow anonymous contact submissions"
  ON public.contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);