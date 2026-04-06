import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ResultPage() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(state || null);
    const [loading, setLoading] = useState(!state);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!state) {
            // Fallback: fetch by id
            axios
                .get(`${API_URL}/api/verify/${id}`)
                .then((res) => setData(res.data))
                .catch(() => setError('Certificate not found.'))
                .finally(() => setLoading(false));
        }
    }, [id, state]);

    if (loading) return <LoadingScreen />;
    if (error)
        return (
            <div className="min-h-screen bg-[#080808] flex items-center justify-center">
                <p className="text-red-400">{error}</p>
            </div>
        );

    const { verified, confidence, qr_base64, extracted_text, reasons, certificate_id } = data;

    return (
        <div className="min-h-screen bg-[#080808] pt-24 pb-16 px-6 relative overflow-hidden">
            {/* Background glow */}
            <div
                className="hero-glow w-[500px] h-[500px] top-[0] left-[-10%] animate-glow-pulse"
                style={{
                    background: verified
                        ? 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Title */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white mb-2">
                        Verification <span className="gold-text">Result</span>
                    </h1>
                    <p className="text-gray-500 text-sm font-mono">{certificate_id}</p>
                </div>

                {/* Status Card */}
                <div
                    className={`glass-card p-8 mb-6 text-center ${verified ? 'glow-green border-green-500/30' : 'glow-red border-red-500/30'
                        }`}
                >
                    {/* Badge */}
                    <div
                        className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-xl font-black mb-6 ${verified
                                ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                : 'bg-red-500/10 text-red-400 border border-red-500/30'
                            }`}
                    >
                        {verified ? (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        ) : (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                        )}
                        {verified ? 'GENUINE CERTIFICATE' : 'POTENTIALLY FAKE'}
                    </div>

                    {/* Confidence Bar */}
                    <div className="max-w-sm mx-auto mb-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>Confidence Score</span>
                            <span className={verified ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                                {confidence}%
                            </span>
                        </div>
                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${verified ? 'bg-gradient-to-r from-green-600 to-green-400' : 'bg-gradient-to-r from-red-700 to-red-400'
                                    }`}
                                style={{ width: `${confidence}%` }}
                            />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm">
                        {verified
                            ? 'This certificate appears to be authentic.'
                            : 'This certificate shows signs of being fake or incomplete.'}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* QR Code */}
                    {qr_base64 && (
                        <div className="glass-card p-6 flex flex-col items-center gap-4">
                            <h3 className="text-white font-bold text-lg">Verification QR Code</h3>
                            <img
                                src={qr_base64}
                                alt="QR Code"
                                className="w-48 h-48 rounded-xl border border-yellow-500/20 bg-white p-2"
                            />
                            <p className="text-gray-500 text-xs text-center">
                                Scan to verify at any time
                            </p>
                            <a
                                href={qr_base64}
                                download={`certisure-${id}.png`}
                                className="btn-outline-gold text-xs py-2 px-4 rounded-lg"
                            >
                                Download QR
                            </a>
                        </div>
                    )}

                    {/* Score Reasons */}
                    <div className="glass-card p-6">
                        <h3 className="text-white font-bold text-lg mb-4">AI Analysis Signals</h3>
                        {reasons && reasons.length > 0 ? (
                            <ul className="space-y-2">
                                {reasons.map((r, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                        <span className="text-green-400 mt-0.5">✓</span>
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-sm">No strong authenticity signals detected.</p>
                        )}

                        <div className="mt-6 pt-4 border-t border-white/5">
                            <p className="text-xs text-gray-600">
                                Threshold: 50 points for genuine verdict
                            </p>
                        </div>
                    </div>
                </div>

                {/* Extracted Text */}
                {extracted_text && (
                    <div className="glass-card p-6 mb-6">
                        <h3 className="text-white font-bold text-lg mb-3">Extracted Text (OCR)</h3>
                        <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-gray-400 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap border border-white/5">
                            {extracted_text || 'No text extracted.'}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/upload" className="btn-gold py-3 px-8 rounded-xl text-center">
                        Verify Another
                    </Link>
                    <Link to="/scan" className="btn-outline-gold py-3 px-8 rounded-xl text-center">
                        Scan QR
                    </Link>
                </div>
            </div>
        </div>
    );
}

function LoadingScreen() {
    return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-4">
                    <svg className="animate-spin w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0110 10" />
                    </svg>
                </div>
                <p className="text-gray-400">Loading verification result&hellip;</p>
            </div>
        </div>
    );
}
