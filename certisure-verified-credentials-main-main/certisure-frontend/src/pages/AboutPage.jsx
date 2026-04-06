import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#080808] pt-24 pb-16 px-6 relative overflow-hidden">
            <div
                className="hero-glow w-[400px] h-[400px] top-[5%] left-[-5%] animate-glow-pulse"
                style={{ background: 'radial-gradient(circle, rgba(180,83,9,0.2) 0%, transparent 70%)' }}
            />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-white mb-3">
                        About <span className="gold-text">CertiSure</span>
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        A next-generation AI-powered certificate verification platform built for trust, speed, and transparency.
                    </p>
                </div>

                <div className="space-y-6">
                    {[
                        {
                            title: 'What is CertiSure?',
                            body: 'CertiSure uses Optical Character Recognition (OCR) and a proprietary rule-based scoring engine to analyze uploaded certificates and determine their authenticity within seconds. Each verified certificate gets a tamper-proof QR code for future verification.',
                        },
                        {
                            title: 'How does the AI work?',
                            body: 'Our AI pipeline runs Tesseract OCR on the uploaded file to extract all visible text. A multi-signal scoring engine then evaluates keyword presence, year patterns, name patterns, text density, and official language to compute a confidence score from 0–100. Scores ≥ 50 are classified as Genuine.',
                        },
                        {
                            title: 'Is my data safe?',
                            body: 'Your uploaded files are stored temporarily in a local uploads folder and never sent to external third-party services. All processing happens on-premise, ensuring full privacy of your sensitive documents.',
                        },
                        {
                            title: 'Technology Stack',
                            body: 'Frontend: React 18 + Vite + Tailwind CSS + React Router\nBackend: Node.js + Express + Multer\nAI: Tesseract.js OCR + Rule-based scoring engine\nUtilities: UUID, QRCode, html5-qrcode',
                        },
                    ].map((item) => (
                        <div key={item.title} className="glass-card p-6">
                            <h3 className="text-yellow-400 font-bold text-lg mb-3">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{item.body}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link to="/upload" className="btn-gold py-3 px-10 rounded-xl">
                        Try It Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
