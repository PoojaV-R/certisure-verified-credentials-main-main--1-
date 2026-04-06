import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Layout from "@/components/Layout";
import VerificationResult, { CertificateData } from "@/components/VerificationResult";
import VerificationLoader from "@/components/VerificationLoader";
import { Button } from "@/components/ui/button";
import { getCertificate } from "@/lib/api/certificates";

const VerifyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [certData, setCertData] = useState<CertificateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadCertificate = async () => {
      setIsLoading(true);

      if (!id) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        const certificate = await getCertificate(id);

        if (!certificate) {
          setNotFound(true);
          return;
        }

        // 🔒 SINGLE SOURCE OF TRUTH
        let isVerified: boolean;

        if (certificate.verification_status === "verified") {
          isVerified = true;
        } else if (certificate.verification_status === "fake") {
          isVerified = false;
        } else {
          // fallback (legacy records)
          isVerified = certificate.is_verified !== false;
        }

        const displayData: CertificateData = {
          id: certificate.id,
          studentName: certificate.student_name || "Unknown",
          institution: certificate.institution || "Unknown",
          course: certificate.course || "Unknown",
          year: certificate.year || "Unknown",
          isVerified,

          // 🚫 NEVER show rejection reason for verified certs
          reason: isVerified
            ? undefined
            : certificate.rejection_reason || "Verification failed",

          imageUrl: certificate.image_url || undefined,
          verifiedAt: certificate.updated_at,
        };

        setCertData(displayData);
      } catch (error) {
        console.error("Failed to load certificate:", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadCertificate();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <section className="min-h-screen pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto card-premium p-8">
              <VerificationLoader />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (notFound || !certData) {
    return (
      <Layout>
        <section className="min-h-screen pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-premium p-12"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
                  <RefreshCw className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-4">
                  Certificate Not Found
                </h2>
                <p className="text-muted-foreground mb-8">
                  The certificate you're looking for doesn't exist or may have expired.
                </p>
                <Link to="/upload">
                  <Button className="btn-gold">
                    Upload New Certificate
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Verification <span className="text-gold-gradient">Result</span>
              </h1>
              <p className="text-muted-foreground">
                Certificate ID: {id}
              </p>
            </div>

            <VerificationResult data={certData} />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <Link to="/upload">
                <Button className="btn-gold px-8">
                  Verify Another Certificate
                </Button>
              </Link>
              <Button
                variant="outline"
                className="btn-outline-gold px-8"
                onClick={() => window.print()}
              >
                Print Report
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default VerifyPage;
