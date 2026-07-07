REVOKE INSERT ON public.contact_submissions FROM anon;
REVOKE INSERT ON public.contact_submissions FROM authenticated;
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to view own submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Service role can manage all contact submissions" ON public.contact_submissions;