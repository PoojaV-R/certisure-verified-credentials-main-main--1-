import { motion } from "framer-motion";
import { Loader2, Brain, Shield, CheckCircle2, Search } from "lucide-react";

const steps = [
  { icon: Search, label: "Extracting text...", delay: 0 },
  { icon: Brain, label: "AI analyzing...", delay: 1.5 },
  { icon: Shield, label: "Verifying issuer...", delay: 3 },
  { icon: CheckCircle2, label: "Checking authenticity...", delay: 4.5 },
];

const VerificationLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Main Spinner */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-muted" />
        <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-gold-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-10 h-10 text-gold-400 animate-pulse" />
        </div>
      </div>

      {/* Status Text */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-display font-semibold text-gold-gradient mb-2"
      >
        AI is Analyzing Certificate...
      </motion.h3>
      <p className="text-sm text-muted-foreground mb-8">
        This usually takes a few seconds
      </p>

      {/* Steps */}
      <div className="space-y-4 w-full max-w-sm">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay, duration: 0.5 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/30"
          >
            <step.icon className="w-5 h-5 text-gold-400" />
            <span className="text-sm text-foreground">{step.label}</span>
            <Loader2 className="w-4 h-4 text-gold-400 animate-spin ml-auto" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VerificationLoader;
