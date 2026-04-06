import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Upload, QrCode, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gold-600/10 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-gold-300">AI-Powered Verification Platform</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-6"
          >
            Verify Any Certificate
            <br />
            <span className="text-gold-gradient">Instantly Using AI</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Protect your organization from fraudulent credentials. Our advanced AI 
            technology detects fake certificates with 99.9% accuracy in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/upload">
              <Button size="lg" className="btn-gold text-lg px-8 py-6 group">
                <Upload className="w-5 h-5 mr-2" />
                Upload Certificate
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/scan">
              <Button size="lg" variant="outline" className="btn-outline-gold text-lg px-8 py-6">
                <QrCode className="w-5 h-5 mr-2" />
                Verify via QR
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold-500" />
              <span className="text-sm text-muted-foreground">256-bit SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-muted-foreground">10,000+ Verified Today</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge-trust">Enterprise Ready</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gold-gradient opacity-10 blur-2xl rounded-3xl" />
            
            {/* Main Card */}
            <div className="relative card-premium p-8 md:p-12 overflow-hidden">
              {/* Scan Line Animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-x-0 h-px bg-gold-gradient animate-scan-line" />
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                    <span className="text-sm text-muted-foreground">Live Verification Demo</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 px-4 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Student Name</span>
                      <span className="text-sm font-medium">John Doe</span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-4 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Institution</span>
                      <span className="text-sm font-medium">MIT University</span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-4 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Course</span>
                      <span className="text-sm font-medium">B.Tech Computer Science</span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-4 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Year</span>
                      <span className="text-sm font-medium">2024</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="w-full max-w-xs p-6 rounded-2xl bg-success/10 border border-success/30">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-success" />
                      </div>
                    </div>
                    <p className="text-center text-lg font-semibold text-success mb-2">
                      ✓ VERIFIED & AUTHENTIC
                    </p>
                    <p className="text-center text-xs text-muted-foreground">
                      Certificate verified on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
