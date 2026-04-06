import { motion } from "framer-motion";
import { Shield, Brain, Lock, Users, Award, Globe } from "lucide-react";
import Layout from "@/components/Layout";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Our advanced machine learning models analyze document structure, text patterns, and visual elements to detect fraudulent certificates with 99.9% accuracy.",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description:
      "All documents are processed using end-to-end encryption. We never store your certificates longer than necessary for verification.",
  },
  {
    icon: Users,
    title: "Trusted by Enterprises",
    description:
      "Over 500 institutions and Fortune 500 companies trust CertiSure for their credential verification needs.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "We verify certificates from educational institutions and professional bodies across 180+ countries worldwide.",
  },
];

const AboutPage = () => {
  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/5 mb-6">
              <Shield className="w-4 h-4 text-gold-400" />
              <span className="text-sm text-gold-300">About CertiSure</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Fighting Credential Fraud with{" "}
              <span className="text-gold-gradient">Artificial Intelligence</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              CertiSure is an AI-powered certificate verification platform used by 
              companies and institutions worldwide to detect fake academic and 
              professional certificates, protecting the integrity of the hiring 
              and admission process.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="card-premium p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center">
                  <Award className="w-6 h-6 text-black" />
                </div>
                <h2 className="text-2xl font-display font-bold text-gold-gradient">
                  Our Mission
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                In today's competitive world, credential fraud has become a 
                significant problem. Studies show that up to 40% of resumes contain 
                some form of credential misrepresentation. CertiSure was founded to 
                solve this problem using cutting-edge AI technology.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our mission is to create a world where every credential can be 
                instantly verified, protecting employers from fraudulent hires and 
                ensuring that genuine achievement is recognized and rewarded.
              </p>
            </div>
          </motion.div>

          {/* Features */}
          <div className="max-w-5xl mx-auto mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-display font-bold text-center mb-12"
            >
              Why Choose <span className="text-gold-gradient">CertiSure?</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-premium p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold-gradient/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="card-glass p-8 md:p-12">
              <h2 className="text-2xl font-display font-bold text-gold-gradient mb-6 text-center">
                Our Technology
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  CertiSure uses a multi-layered verification approach combining:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-1">•</span>
                    <span>
                      <strong className="text-foreground">OCR & Text Analysis:</strong> Advanced 
                      optical character recognition to extract and validate certificate text
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-1">•</span>
                    <span>
                      <strong className="text-foreground">Visual Pattern Recognition:</strong> AI 
                      models trained to detect visual inconsistencies and tampering
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-1">•</span>
                    <span>
                      <strong className="text-foreground">Database Validation:</strong> Cross-reference 
                      with official institution databases worldwide
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-1">•</span>
                    <span>
                      <strong className="text-foreground">Blockchain Verification:</strong> Support 
                      for blockchain-secured digital credentials
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "10,000+", label: "Certificates Verified" },
                { value: "500+", label: "Partner Institutions" },
                { value: "180+", label: "Countries Covered" },
                { value: "99.9%", label: "Accuracy Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-muted/30"
                >
                  <p className="text-2xl md:text-3xl font-display font-bold text-gold-gradient mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
