import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { QrCode, Camera, Upload, AlertCircle } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ScanPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop();
      }
    };
  }, []);

  const startScanner = async () => {
    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          handleScanSuccess(decodedText);
          scanner.stop();
          setIsScanning(false);
        },
        () => {}
      );

      setIsScanning(true);
    } catch (err) {
      console.error("Camera error:", err);
      setHasCamera(false);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access or upload a QR code image",
        variant: "destructive",
      });
    }
  };

  const stopScanner = () => {
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop();
      setIsScanning(false);
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    // Extract certificate ID from URL or use the text directly
    let certId = decodedText;
    
    try {
      const url = new URL(decodedText);
      const pathParts = url.pathname.split("/");
      const verifyIndex = pathParts.indexOf("verify");
      if (verifyIndex !== -1 && pathParts[verifyIndex + 1]) {
        certId = pathParts[verifyIndex + 1];
      }
    } catch {
      // Not a URL, use as-is
    }

    toast({
      title: "QR Code Scanned!",
      description: "Redirecting to verification page...",
    });

    navigate(`/verify/${certId}`);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const scanner = new Html5Qrcode("qr-reader-hidden");
      const result = await scanner.scanFile(file, true);
      handleScanSuccess(result);
    } catch (err) {
      toast({
        title: "Could not read QR code",
        description: "Please ensure the image contains a valid QR code",
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
            className="max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/5 mb-6">
                <QrCode className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-gold-300">QR Verification</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                Scan <span className="text-gold-gradient">QR Code</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Scan the QR code on a verified certificate to instantly check 
                its authenticity
              </p>
            </div>

            {/* Scanner Area */}
            <div className="card-premium p-8 mb-8">
              {!hasCamera && (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Camera not available. Please upload a QR code image instead.
                  </p>
                </div>
              )}

              {hasCamera && (
                <>
                  <div
                    id="qr-reader"
                    className={`w-full max-w-md mx-auto rounded-xl overflow-hidden ${
                      isScanning ? "block" : "hidden"
                    }`}
                    style={{ minHeight: 300 }}
                  />

                  {!isScanning && (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="w-24 h-24 rounded-full bg-gold-gradient/10 flex items-center justify-center mb-6 animate-pulse-gold">
                        <Camera className="w-12 h-12 text-gold-400" />
                      </div>
                      <p className="text-muted-foreground mb-6">
                        Click below to start scanning
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center mt-6">
                    {isScanning ? (
                      <Button
                        variant="outline"
                        className="btn-outline-gold"
                        onClick={stopScanner}
                      >
                        Stop Scanner
                      </Button>
                    ) : (
                      <Button className="btn-gold" onClick={startScanner}>
                        <Camera className="w-5 h-5 mr-2" />
                        Start Scanner
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* File Upload */}
            <div className="card-premium p-8">
              <div className="text-center">
                <h3 className="font-display text-lg font-semibold mb-4">
                  Upload QR Code Image
                </h3>
                <label className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-dashed border-border hover:border-gold-500/50 cursor-pointer transition-colors">
                  <Upload className="w-5 h-5 text-gold-400" />
                  <span className="text-sm">Choose Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="text-xs text-muted-foreground mt-4">
                  Supported formats: JPG, PNG, WebP
                </p>
              </div>
            </div>

            {/* Hidden scanner for file uploads */}
            <div id="qr-reader-hidden" className="hidden" />

            {/* Instructions */}
            <div className="mt-12 grid md:grid-cols-3 gap-4">
              {[
                {
                  step: "1",
                  title: "Position QR Code",
                  description: "Place the QR code within the scanner frame",
                },
                {
                  step: "2",
                  title: "Hold Steady",
                  description: "Keep your device steady for accurate scanning",
                },
                {
                  step: "3",
                  title: "View Result",
                  description: "Certificate details will appear instantly",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-4 rounded-lg bg-muted/30 text-center"
                >
                  <div className="w-8 h-8 mx-auto rounded-full bg-gold-gradient text-black font-bold flex items-center justify-center mb-3">
                    {item.step}
                  </div>
                  <p className="font-medium text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ScanPage;
