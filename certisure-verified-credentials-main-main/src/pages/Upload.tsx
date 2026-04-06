import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, Shield, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import VerificationLoader from "@/components/VerificationLoader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { uploadCertificate, verifyCertificate } from "@/lib/api/certificates";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleVerify = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a certificate first",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    try {
      // Upload certificate to storage and create record
      const { certificateId, imageUrl } = await uploadCertificate(selectedFile);

      // Trigger AI verification
      await verifyCertificate(certificateId, imageUrl);

      setIsVerifying(false);
      navigate(`/verify/${certificateId}`);
    } catch (error) {
      console.error('Verification error:', error);
      setIsVerifying(false);
      toast({
        title: "Verification failed",
        description: error instanceof Error ? error.message : "An error occurred during verification",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/5 mb-6">
                <Upload className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-gold-300">Certificate Upload</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                Upload Your <span className="text-gold-gradient">Certificate</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Upload your certificate image or PDF for instant AI-powered 
                verification. A unique QR code will be generated for future reference.
              </p>
            </div>

            {isVerifying ? (
              <div className="card-premium p-8">
                <VerificationLoader />
              </div>
            ) : (
              <>
                {/* Upload Area */}
                <div className="card-premium p-8 mb-8">
                  <FileUpload onFileSelect={handleFileSelect} isLoading={isVerifying} />
                </div>

                {/* Info Box */}
                <div className="card-glass p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">AI-Powered Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Our AI analyzes your certificate using advanced OCR and pattern recognition
                        to verify authenticity, extract details, and detect potential forgeries.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Verify Button */}
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="btn-gold text-lg px-12 py-6"
                    onClick={handleVerify}
                    disabled={!selectedFile}
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Verify Certificate
                  </Button>
                </div>

                {/* Tips */}
                <div className="mt-12 grid md:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Clear Image",
                      description: "Ensure the certificate is clearly visible",
                    },
                    {
                      title: "Complete Document",
                      description: "Upload the full certificate, not cropped",
                    },
                    {
                      title: "Original Copy",
                      description: "Scanned copies work best for verification",
                    },
                  ].map((tip) => (
                    <div
                      key={tip.title}
                      className="p-4 rounded-lg bg-muted/30 text-center"
                    >
                      <p className="font-medium text-sm mb-1">{tip.title}</p>
                      <p className="text-xs text-muted-foreground">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default UploadPage;
