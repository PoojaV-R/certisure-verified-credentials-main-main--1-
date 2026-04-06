import { motion } from "framer-motion";
import { Shield, XCircle, AlertTriangle, CheckCircle2, FileText, Building2, User, GraduationCap, Calendar } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export interface CertificateData {
  id: string;
  studentName: string;
  institution: string;
  course: string;
  year: string;
  isVerified: boolean;
  reason?: string;
  imageUrl?: string;
  verifiedAt: string;
}

interface VerificationResultProps {
  data: CertificateData;
}

const VerificationResult = ({ data }: VerificationResultProps) => {
  const qrUrl = `${window.location.origin}/verify/${data.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Status Banner */}
      <div
        className={`p-6 rounded-2xl border ${
          data.isVerified
            ? "bg-success/10 border-success/30"
            : "bg-destructive/10 border-destructive/30"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              data.isVerified ? "bg-success/20" : "bg-destructive/20"
            }`}
          >
            {data.isVerified ? (
              <Shield className="w-8 h-8 text-success" />
            ) : (
              <XCircle className="w-8 h-8 text-destructive" />
            )}
          </div>
          <div>
            <h2
              className={`text-2xl font-display font-bold ${
                data.isVerified ? "text-success" : "text-destructive"
              }`}
            >
              {data.isVerified
                ? "✓ VERIFIED & AUTHENTIC"
                : "✕ CERTIFICATE IS FAKE"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {data.isVerified
                ? `Verified on ${new Date(data.verifiedAt).toLocaleDateString()}`
                : data.reason}
            </p>
          </div>
        </div>

        {!data.isVerified && data.reason && (
          <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Reason for Rejection</p>
                <p className="text-sm text-muted-foreground mt-1">{data.reason}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Certificate Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-premium p-6">
          <h3 className="font-display text-lg font-semibold text-gold-400 mb-4">
            Certificate Details
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <User className="w-5 h-5 text-gold-400" />
              <div>
                <p className="text-xs text-muted-foreground">Student Name</p>
                <p className="font-medium">{data.studentName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Building2 className="w-5 h-5 text-gold-400" />
              <div>
                <p className="text-xs text-muted-foreground">Institution</p>
                <p className="font-medium">{data.institution}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <GraduationCap className="w-5 h-5 text-gold-400" />
              <div>
                <p className="text-xs text-muted-foreground">Course</p>
                <p className="font-medium">{data.course}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Calendar className="w-5 h-5 text-gold-400" />
              <div>
                <p className="text-xs text-muted-foreground">Year</p>
                <p className="font-medium">{data.year}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-premium p-6">
          <h3 className="font-display text-lg font-semibold text-gold-400 mb-4">
            Verification QR Code
          </h3>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-xl mb-4">
              <QRCodeSVG
                value={qrUrl}
                size={160}
                level="H"
                includeMargin={false}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Scan this QR code to verify the certificate
            </p>
            <p className="text-xs text-gold-400 mt-2 break-all text-center">
              ID: {data.id}
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Preview */}
      {data.imageUrl && (
        <div className="card-premium p-6">
          <h3 className="font-display text-lg font-semibold text-gold-400 mb-4">
            Certificate Preview
          </h3>
          <div className="relative rounded-xl overflow-hidden bg-muted">
            <img
              src={data.imageUrl}
              alt="Certificate"
              className="w-full h-auto max-h-[500px] object-contain"
            />
            <div
              className={`absolute top-4 right-4 px-4 py-2 rounded-full font-semibold text-sm ${
                data.isVerified
                  ? "bg-success text-white"
                  : "bg-destructive text-white"
              }`}
            >
              {data.isVerified ? "✓ Verified" : "✕ Fake"}
            </div>
          </div>
        </div>
      )}

      {/* Verification Badge */}
      {data.isVerified && (
        <div className="card-premium p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="font-semibold text-success">Authenticity Confirmed</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This certificate has been verified by CertiSure AI Verification System
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default VerificationResult;
