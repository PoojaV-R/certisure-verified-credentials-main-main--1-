import { motion } from "framer-motion";
import { Shield, Award, Building, Globe } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "ISO 27001 Certified",
    description: "Information Security Management",
  },
  {
    icon: Award,
    title: "SOC 2 Type II",
    description: "Security & Compliance Audit",
  },
  {
    icon: Building,
    title: "Government Approved",
    description: "Official Verification Partner",
  },
  {
    icon: Globe,
    title: "GDPR Compliant",
    description: "Data Protection Standards",
  },
];

const TrustSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Trusted by <span className="text-gold-gradient">Leading Institutions</span>
          </h2>
          <p className="text-muted-foreground">
            Government and enterprise-approved verification platform
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-glass p-6 text-center group hover:border-gold-500/30 transition-all"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-gold-gradient/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <badge.icon className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Logos Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Authorized Verification Platform for
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {["AICTE", "UGC", "NAAC", "NBA", "MHRD"].map((org) => (
              <div
                key={org}
                className="px-6 py-3 border border-border rounded-lg text-muted-foreground font-semibold"
              >
                {org}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
