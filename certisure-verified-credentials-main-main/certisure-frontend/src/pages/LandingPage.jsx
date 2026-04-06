import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#080808] relative overflow-hidden flex flex-col">
            {/* Animated glow blobs */}
            <div
                className="hero-glow w-[500px] h-[500px] top-[-100px] left-[10%] animate-glow-pulse"
                style={{ background: 'radial-gradient(circle, rgba(180,83,9,0.35) 0%, transparent 70%)' }}
            />
            <div
                className="hero-glow w-[400px] h-[400px] top-[20%] right-[5%] animate-glow-pulse"
                style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)', animationDelay: '1.5s' }}
            />
            <div
                className="hero-glow w-[300px] h-[300px] bottom-[10%] left-[30%] animate-glow-pulse"
                style={{ background: 'radial-gradient(circle, rgba(180,83,9,0.2) 0%, transparent 70%)', animationDelay: '3s' }}
            />

            {/* Hero Section */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 mb-8">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">AI-Powered Verification</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-black leading-tight max-w-4xl mb-6">
                    Verify Any Certificate
                    <br />
                    <span className="gold-text">Instantly Using AI</span>
                </h1>

                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                    Upload your certificate image and let our AI engine extract, analyze, and verify its
                    authenticity in seconds. Tamper-proof QR codes included.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-20">
                    <Link to="/upload" className="btn-gold px-10 py-4 text-base rounded-xl">
                        Upload Certificate
                    </Link>
                    <Link to="/scan" className="btn-outline-gold px-10 py-4 text-base rounded-xl">
                        Verify via QR
                    </Link>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mb-16">
                    {[
                        { value: '99.9%', label: 'Accuracy' },
                        { value: '< 5s', label: 'Verification Time' },
                        { value: 'Free', label: 'Always' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl font-black gold-text mb-1">{stat.value}</div>
                            <div className="text-gray-500 text-xs uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Features Section */}
            <section className="relative z-10 py-20 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        How <span className="gold-text">CertiSure</span> Works
                    </h2>
                    <p className="text-gray-500 text-center mb-12">Three simple steps to verify any certificate</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                step: '01',
                                title: 'Upload Certificate',
                                desc: 'Drag and drop your JPG, PNG, WEBP, or PDF certificate. Up to 10MB.',
                                icon: (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M4 16l4-4 4 4m0 0l4-4 4 4M12 12V4" />
                                        <path d="M20 20H4" />
                                    </svg>
                                ),
                            },
                            {
                                step: '02',
                                title: 'AI Analysis',
                                desc: 'OCR extracts text; our scoring engine checks for authenticity markers.',
                                icon: (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5" />
                                        <circle cx="18" cy="18" r="3" />
                                        <path d="M20.2 20.2L22 22" />
                                    </svg>
                                ),
                            },
                            {
                                step: '03',
                                title: 'Get QR + Result',
                                desc: 'Download a tamper-proof QR code. Share it for instant verification.',
                                icon: (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="3" y="3" width="7" height="7" rx="1" />
                                        <rect x="14" y="3" width="7" height="7" rx="1" />
                                        <rect x="3" y="14" width="7" height="7" rx="1" />
                                        <path d="M14 14h.01M14 17h.01M17 14h.01M17 17h3v3h-3zM20 14v-1" />
                                    </svg>
                                ),
                            },
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="glass-card p-8 group hover:border-yellow-500/40 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <span className="text-yellow-500/30 text-5xl font-black leading-none">{item.step}</span>
                                </div>
                                <div className="text-yellow-400 mb-4">{item.icon}</div>
                                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 py-8 text-center text-gray-600 text-sm">
                © {new Date().getFullYear()} CertiSure · AI-Powered Certificate Verification
            </footer>
        </div>
    );
}
