import { motion } from "framer-motion";
import { Shield, Brain, QrCode, Building2, CheckCircle2, Lock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Powered Verification",
    description: "Advanced machine learning algorithms analyze certificate authenticity in seconds",
  },
  {
    icon: Shield,
    title: "Tamper Detection",
    description: "Multi-layer security checks detect any modifications or forgeries",
  },
  {
    icon: Building2,
    title: "Institution Validation",
    description: "Cross-reference with official institution databases worldwide",
  },
  {
    icon: QrCode,
    title: "Secure QR Certificates",
    description: "Generate and verify unique QR codes for instant authentication",
  },
  {
    icon: CheckCircle2,
    title: "Real-time Results",
    description: "Get verification results instantly with detailed analysis reports",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All documents are encrypted and processed securely",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-trust mb-4 inline-block">Enterprise-Grade Security</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            <span className="text-gold-gradient">Comprehensive</span> Verification
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our multi-layered verification system ensures the highest accuracy in 
            detecting fraudulent certificates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-premium p-6 group"
            >
              <div className="w-12 h-12 rounded-lg bg-gold-gradient/10 flex items-center justify-center mb-4 group-hover:bg-gold-gradient/20 transition-colors">
                <feature.icon className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
