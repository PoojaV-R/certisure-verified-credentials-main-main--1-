import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

export default function VerifyPage() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError('No certificate ID provided.');
            setLoading(false);
            return;
        }
        axios
            .get(`${API_URL}/api/verify/${id}`)
            .then((res) => {
                if (res.data.success) setData(res.data);
                else setError(res.data.error || 'Certificate not found.');
            })
            .catch((err) => {
                if (err.response?.status === 404) setError('Certificate not found in database.');
                else setError('Could not reach the verification server.');
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorScreen message={error} id={id} />;

    const { verified, confidence, text, createdAt, reasons } = data;

    return (
        <div className="min-h-screen bg-[#080808] pt-24 pb-16 px-6 relative overflow-hidden">
            {/* Dynamic glow */}
            <div
                className={`hero-glow w-[600px] h-[600px] top-[-100px] left-1/2 -translate-x-1/2 animate-glow-pulse`}
                style={{
                    background: verified
                        ? 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-2xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-gray-500 text-xs font-mono mb-3 uppercase tracking-widest">Certificate ID</p>
                    <p className="text-gray-400 font-mono text-sm break-all bg-white/5 rounded-lg px-4 py-2 inline-block border border-white/10">
                        {id}
                    </p>
                    {createdAt && (
                        <p className="text-gray-600 text-xs mt-2">
                            Verified on {new Date(createdAt).toLocaleString()}
                        </p>
                    )}
                </div>

                {/* Main status card */}
                <div
                    className={`glass-card p-10 text-center mb-6 ${verified ? 'glow-green border-green-500/30' : 'glow-red border-red-500/30'
                        }`}
                >
                    {/* Icon */}
                    <div
                        className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${verified ? 'bg-green-500/15' : 'bg-red-500/15'
                            }`}
                    >
                        {verified ? (
                            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        ) : (
                            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                        )}
                    </div>

                    <h1
                        className={`text-4xl font-black mb-2 ${verified ? 'text-green-400' : 'text-red-400'
                            }`}
                    >
                        {verified ? 'GENUINE' : 'SUSPICIOUS'}
                    </h1>
                    <p className={`text-lg font-semibold mb-6 ${verified ? 'text-green-400/70' : 'text-red-400/70'}`}>
                        {verified ? 'This certificate is authentic' : 'This certificate may be fraudulent'}
                    </p>

                    {/* Confidence ring display */}
                    <div className="flex justify-center items-center gap-8 mb-6">
                        <div className="text-center">
                            <div className={`text-5xl font-black mb-1 ${verified ? 'text-green-400' : 'text-red-400'}`}>
                                {confidence}%
                            </div>
                            <div className="text-gray-500 text-xs uppercase tracking-widest">Confidence</div>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div className="text-center">
                            <div className={`text-2xl font-bold mb-1 ${verified ? 'text-green-400' : 'text-red-400'}`}>
                                {verified ? 'PASS' : 'FAIL'}
                            </div>
                            <div className="text-gray-500 text-xs uppercase tracking-widest">Result</div>
                        </div>
                    </div>

                    {/* Confidence bar */}
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden max-w-sm mx-auto">
                        <div
                            className={`h-full rounded-full ${verified ? 'bg-green-400' : 'bg-red-400'}`}
                            style={{ width: `${confidence}%` }}
                        />
                    </div>
                </div>

                {/* Signals */}
                {reasons && reasons.length > 0 && (
                    <div className="glass-card p-6 mb-6">
                        <h3 className="text-white font-bold mb-3">Authenticity Signals Detected</h3>
                        <ul className="space-y-2">
                            {reasons.map((r, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                    <span className="text-green-400">✓</span> {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Extracted Text */}
                {text && (
                    <div className="glass-card p-6 mb-8">
                        <h3 className="text-white font-bold mb-3">Certificate Text</h3>
                        <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-gray-400 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap border border-white/5">
                            {text}
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
                <svg className="animate-spin w-10 h-10 text-yellow-400 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0110 10" />
                </svg>
                <p className="text-gray-400">Fetching certificate data&hellip;</p>
            </div>
        </div>
    );
}

function ErrorScreen({ message, id }) {
    return (
        <div className="min-h-screen bg-[#080808] pt-24 flex items-center justify-center px-6">
            <div className="glass-card p-10 text-center glow-red border-red-500/30 max-w-md">
                <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-red-400 mb-2">Verification Failed</h2>
                <p className="text-gray-500 mb-2">{message}</p>
                {id && <p className="text-gray-600 text-xs font-mono mb-6">{id}</p>}
                <div className="flex gap-3 justify-center">
                    <Link to="/upload" className="btn-gold py-2 px-6 rounded-lg">Upload Certificate</Link>
                    <Link to="/" className="btn-outline-gold py-2 px-6 rounded-lg">Home</Link>
                </div>
            </div>
        </div>
    );
}
