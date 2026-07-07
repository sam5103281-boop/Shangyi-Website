CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  name text NOT NULL,
  org text,
  title text,
  phone text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_submissions TO anon;
GRANT INSERT ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous contact form submissions" 
ON public.contact_submissions 
FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view own submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated 
USING (false);

CREATE POLICY "Service role can manage all contact submissions" 
ON public.contact_submissions 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);