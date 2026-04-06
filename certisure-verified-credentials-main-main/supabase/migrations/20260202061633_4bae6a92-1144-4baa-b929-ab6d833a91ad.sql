-- Create certificates table to store uploaded certificates
CREATE TABLE public.certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT,
  institution TEXT,
  course TEXT,
  year TEXT,
  is_verified BOOLEAN DEFAULT NULL,
  rejection_reason TEXT,
  confidence_score NUMERIC,
  image_url TEXT,
  file_path TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'fake', 'error')),
  raw_ocr_text TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can verify a certificate by ID)
CREATE POLICY "Anyone can view certificates" 
ON public.certificates 
FOR SELECT 
USING (true);

-- Create policy for public insert (anyone can upload a certificate)
CREATE POLICY "Anyone can upload certificates" 
ON public.certificates 
FOR INSERT 
WITH CHECK (true);

-- Create policy for updating certificates (for the verification process)
CREATE POLICY "Anyone can update certificates" 
ON public.certificates 
FOR UPDATE 
USING (true);

-- Create storage bucket for certificate files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('certificates', 'certificates', true);

-- Create storage policy for public uploads
CREATE POLICY "Anyone can upload certificate files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'certificates');

-- Create storage policy for public reads
CREATE POLICY "Anyone can view certificate files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'certificates');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_certificates_updated_at
BEFORE UPDATE ON public.certificates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();