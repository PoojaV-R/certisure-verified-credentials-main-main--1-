import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-display font-bold text-gold-gradient">
                CertiSure
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered certificate verification platform trusted by institutions
              and enterprises worldwide.
            </p>
            <div className="flex gap-2">
              <span className="badge-trust text-xs">ISO 27001</span>
              <span className="badge-trust text-xs">SOC 2</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-gold-400 font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Upload Certificate", path: "/upload" },
                { label: "Scan QR Code", path: "/scan" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-gold-400 font-semibold mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Security",
                "Compliance",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-gold-400 transition-colors flex items-center gap-1"
                  >
                    {item}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-gold-400 font-semibold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  CertiSure Technologies Pvt Ltd,<br />
                  4th Floor, Tech Park,<br />
                  Bangalore, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-500" />
                <a
                  href="mailto:support@certisure.ai"
                  className="text-sm text-muted-foreground hover:text-gold-400"
                >
                  support@certisure.ai
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-500" />
                <a
                  href="tel:+919876543210"
                  className="text-sm text-muted-foreground hover:text-gold-400"
                >
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CertiSure Technologies Pvt Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-muted-foreground">
                🔒 Secured by 256-bit SSL Encryption
              </span>
              <span className="text-xs text-muted-foreground">
                Government & Enterprise Trusted Platform
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
