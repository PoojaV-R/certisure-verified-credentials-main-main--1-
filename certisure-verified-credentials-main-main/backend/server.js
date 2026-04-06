const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const Tesseract = require('tesseract.js');

const app = express();
const PORT = 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Prevent Tesseract worker crashes from taking down the backend
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

// ─── Uploads folder ──────────────────────────────────────────────────────────
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR));

// ─── Multer configuration ─────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, unique);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, WEBP, PDF allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// ─── In-memory "database" ─────────────────────────────────────────────────────
const certificateDB = {};

// ─── Fake-detection scoring engine ───────────────────────────────────────────
function scoreCertificate(text) {
  let score = 0;
  const reasons = [];

  // +30 if contains certificate-like keywords
  if (/certificate|certification|credential|course|academy/i.test(text)) {
    score += 30;
    reasons.push('Contains credential keyword (+30)');
  }

  // +20 if contains a 4-digit year between 1990–2030
  if (/\b(19[9]\d|20[0-3]\d)\b/.test(text)) {
    score += 20;
    reasons.push('Contains a valid year (+20)');
  }

  // +20 if contains an uppercase name pattern
  if (/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/.test(text)) {
    score += 20;
    reasons.push('Contains name pattern (+20)');
  }

  // +20 if text length > 100 characters (modern certificates are often minimal)
  if (text.trim().length > 100) {
    score += 20;
    reasons.push('Sufficient text length (+20)');
  }

  // Additional bonus signals
  if (/awarded|conferred|completed|achievement|hereby|certify|completion/i.test(text)) {
    score += 15;
    reasons.push('Contains certification language (+15)');
  }

  if (/signature|director|principal|president|dean|authorized|success|AVP|officer/i.test(text)) {
    score += 10;
    reasons.push('Contains authority reference (+10)');
  }
  
  if (/databricks|google|amazon|aws|microsoft|meta|cisco/i.test(text)) {
    score += 15;
    reasons.push('Contains recognized tech provider (+15)');
  }

  // Clamp between 0–100
  score = Math.min(score, 100);

  const verified = score >= 50;
  return { score, verified, reasons };
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// Root endpoint for browser testing
app.get('/', (_req, res) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
        <h1 style="color: #fbbf24;">CertiSure API is Running! 🚀</h1>
        <p>The backend node server is fully functional and ready to accept API requests.</p>
        <p>API Endpoints: <code>/api/upload</code>, <code>/api/verify/:id</code>, <code>/api/health</code></p>
        <a href="http://localhost:5173" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#b45309; color:white; text-decoration:none; border-radius:5px;">Go to Frontend Dashboard</a>
      </body>
    </html>
  `);
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'CertiSure backend is running.' });
});

// POST /api/upload — Main verification endpoint
app.post('/api/upload', upload.single('certificate'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    // ── OCR ──────────────────────────────────────────────────────────────────
    let extractedText = '';
    try {
      const ocrResult = await Tesseract.recognize(filePath, 'eng', {
        logger: (m) => console.log(m), // Log progress so we don't think it hangs
        langPath: 'https://tessdata.projectnaptha.com/4.0.0',
      });
      extractedText = ocrResult.data.text || '';
    } catch (ocrError) {
      console.error('OCR error:', ocrError.message);
      extractedText = '';
    }

    // ── Scoring ───────────────────────────────────────────────────────────────
    const { score, verified, reasons } = scoreCertificate(extractedText);
    const confidence = score;

    // ── Certificate ID & QR ───────────────────────────────────────────────────
    const certificate_id = uuidv4();
    const verifyUrl = `http://localhost:5173/verify/${certificate_id}`;
    const qr_base64 = await QRCode.toDataURL(verifyUrl, {
      width: 300,
      color: {
        dark: verified ? '#16a34a' : '#dc2626',
        light: '#ffffff',
      },
    });

    // ── Store in DB ───────────────────────────────────────────────────────────
    certificateDB[certificate_id] = {
      id: certificate_id,
      text: extractedText,
      verified,
      confidence,
      filePath,
      fileUrl,
      reasons,
      createdAt: new Date().toISOString(),
    };

    // ── Respond ───────────────────────────────────────────────────────────────
    return res.json({
      success: true,
      verified,
      confidence,
      qr_base64,
      certificate_id,
      extracted_text: extractedText,
      reasons,
      file_url: fileUrl,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal server error.' });
  }
});

// GET /api/verify/:id — Look up a certificate by ID
app.get('/api/verify/:id', (req, res) => {
  const { id } = req.params;
  const record = certificateDB[id];
  if (!record) {
    return res.status(404).json({ success: false, error: 'Certificate not found.' });
  }
  return res.json({ success: true, ...record });
});

// ─── Multer error handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ success: false, error: 'File too large. Maximum size is 10MB.' });
  }
  if (err.message) {
    return res.status(400).json({ success: false, error: err.message });
  }
  return res.status(500).json({ success: false, error: 'Unknown server error.' });
});

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 CertiSure backend running on http://localhost:${PORT}`);
  console.log(`   POST /api/upload   — Verify a certificate`);
  console.log(`   GET  /api/verify/:id — Lookup by ID\n`);
});
