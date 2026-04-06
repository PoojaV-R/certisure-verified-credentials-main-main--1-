import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';

const API_URL = 'http://localhost:5000';

export default function ScanPage() {
    const [mode, setMode] = useState('webcam'); // 'webcam' | 'image'
    const [scanning, setScanning] = useState(false);
    const [scannerReady, setScannerReady] = useState(false);
    const [imgFile, setImgFile] = useState(null);
    const scannerRef = useRef(null);
    const html5ScannerRef = useRef(null);
    const navigate = useNavigate();

    // Extract certificate ID from QR URL
    function extractId(text) {
        const match = text.match(/\/verify\/([a-f0-9-]{36})/);
        return match ? match[1] : null;
    }

    async function handleResult(decodedText) {
        const certId = extractId(decodedText);
        if (!certId) {
            toast.error('QR code is not a valid CertiSure certificate.');
            return;
        }
        try {
            const res = await axios.get(`${API_URL}/api/verify/${certId}`);
            if (res.data.success) {
                navigate(`/verify/${certId}`);
            } else {
                toast.error('Certificate not found in database.');
            }
        } catch {
            toast.error('Could not verify certificate. Is the backend running?');
        }
    }

    // Start webcam scanner
    useEffect(() => {
        if (mode !== 'webcam') return;
        const scanner = new Html5QrcodeScanner(
            'qr-reader',
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
        );
        scanner.render(
            (text) => {
                scanner.clear().catch(() => { });
                handleResult(text);
            },
            () => { }
        );
        html5ScannerRef.current = scanner;
        setScannerReady(true);

        return () => {
            scanner.clear().catch(() => { });
            setScannerReady(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    // Scan from image file
    async function handleImageScan() {
        if (!imgFile) {
            toast.error('Please select a QR code image.');
            return;
        }
        setScanning(true);
        try {
            const html5 = new Html5Qrcode('qr-reader-image');
            const result = await html5.scanFile(imgFile, true);
            await html5.clear();
            await handleResult(result);
        } catch (err) {
            toast.error('Could not detect a QR code in this image.');
        } finally {
            setScanning(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#080808] pt-24 pb-16 px-6 relative overflow-hidden">
            <div
                className="hero-glow w-[400px] h-[400px] top-[10%] right-[-5%] animate-glow-pulse"
                style={{ background: 'radial-gradient(circle, rgba(180,83,9,0.2) 0%, transparent 70%)' }}
            />

            <div className="max-w-xl mx-auto relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white mb-3">
                        Scan <span className="gold-text">QR Code</span>
                    </h1>
                    <p className="text-gray-500">Use your webcam or upload a QR image to verify</p>
                </div>

                {/* Mode Switcher */}
                <div className="flex gap-0 mb-8 glass-card p-1">
                    {['webcam', 'image'].map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${mode === m
                                    ? 'bg-yellow-500/90 text-black'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {m === 'webcam' ? '📷 Live Webcam' : '🖼️ Upload QR Image'}
                        </button>
                    ))}
                </div>

                {/* Webcam mode */}
                {mode === 'webcam' && (
                    <div className="glass-card p-6">
                        <p className="text-gray-400 text-sm text-center mb-4">
                            Allow camera access and point your QR code at the camera
                        </p>
                        <div
                            id="qr-reader"
                            className="rounded-xl overflow-hidden border border-yellow-500/20"
                            style={{ minHeight: '280px' }}
                        />
                    </div>
                )}

                {/* Image upload mode */}
                {mode === 'image' && (
                    <div className="glass-card p-8 flex flex-col items-center gap-5">
                        <div id="qr-reader-image" className="hidden" />
                        <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                <path d="M14 14h.01M14 17h.01M17 14h.01M17 17h3v3h-3zM20 14v-1" />
                            </svg>
                        </div>

                        <label
                            className="w-full border-2 border-dashed border-yellow-500/20 hover:border-yellow-500/40 rounded-xl p-8 text-center cursor-pointer transition-colors duration-200"
                            htmlFor="qr-img-input"
                        >
                            {imgFile ? (
                                <>
                                    <p className="text-yellow-400 font-medium">{imgFile.name}</p>
                                    <p className="text-gray-500 text-xs mt-1">Click to change</p>
                                    {imgFile.type.startsWith('image/') && (
                                        <img
                                            src={URL.createObjectURL(imgFile)}
                                            alt="QR preview"
                                            className="mx-auto mt-4 max-h-32 object-contain rounded"
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-400 font-medium">Select QR Code Image</p>
                                    <p className="text-gray-600 text-xs mt-1">JPG, PNG, WEBP</p>
                                </>
                            )}
                        </label>
                        <input
                            id="qr-img-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setImgFile(e.target.files[0] || null)}
                        />

                        <button
                            onClick={handleImageScan}
                            disabled={!imgFile || scanning}
                            className={`w-full btn-gold py-3 rounded-xl flex items-center justify-center gap-2 ${!imgFile || scanning ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {scanning ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                                        <path d="M12 2a10 10 0 0110 10" />
                                    </svg>
                                    Scanning&hellip;
                                </>
                            ) : (
                                'Scan QR Image'
                            )}
                        </button>
                    </div>
                )}

                <p className="text-center text-gray-600 text-xs mt-4">
                    QR codes generated by CertiSure contain an embedded verification URL
                </p>
            </div>
        </div>
    );
}
