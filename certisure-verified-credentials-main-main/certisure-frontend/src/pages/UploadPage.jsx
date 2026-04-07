import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

const ACCEPT = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'application/pdf': ['.pdf'],
};

export default function UploadPage() {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const onDrop = useCallback((accepted, rejected) => {
        if (rejected.length > 0) {
            const err = rejected[0].errors[0];
            if (err.code === 'file-too-large') {
                toast.error('File is too large. Maximum size is 10MB.');
            } else if (err.code === 'file-invalid-type') {
                toast.error('Invalid file type. Upload JPG, PNG, WEBP or PDF.');
            } else {
                toast.error(err.message || 'File rejected.');
            }
            return;
        }
        if (accepted.length > 0) {
            const f = accepted[0];
            setFile(f);
            if (f.type.startsWith('image/')) {
                setPreview(URL.createObjectURL(f));
            } else {
                setPreview(null); // PDF — no preview
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ACCEPT,
        maxSize: 10 * 1024 * 1024,
        multiple: false,
    });

    const handleVerify = async () => {
        if (!file) {
            toast.error('Please select a certificate file first.');
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('certificate', file);
            const res = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const data = res.data;
            if (data.success) {
                toast.success('Certificate analyzed successfully!');
                const { file_url, ...safeState } = data;
                navigate(`/result/${data.certificate_id}`, { state: safeState });
            } else {
                toast.error(data.error || 'Verification failed.');
            }
        } catch (err) {
            const msg =
                err.response?.data?.error ||
                (err.response?.status === 413
                    ? 'File too large. Max 10MB.'
                    : 'Failed to upload certificate file');
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#080808] pt-24 pb-16 px-6 relative overflow-hidden">
            {/* Background glow */}
            <div
                className="hero-glow w-[400px] h-[400px] top-[5%] right-[-5%] animate-glow-pulse"
                style={{ background: 'radial-gradient(circle, rgba(180,83,9,0.25) 0%, transparent 70%)' }}
            />

            <div className="max-w-2xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white mb-3">
                        Upload <span className="gold-text">Certificate</span>
                    </h1>
                    <p className="text-gray-500">Our AI will extract text and verify authenticity instantly</p>
                </div>

                {/* Dropzone */}
                <div
                    {...getRootProps()}
                    className={`glass-card p-12 text-center cursor-pointer transition-all duration-300 mb-6 ${isDragActive
                            ? 'border-yellow-400/60 bg-yellow-500/5 scale-[1.02]'
                            : 'hover:border-yellow-500/40 hover:-translate-y-1'
                        } ${loading ? 'pointer-events-none opacity-60' : ''}`}
                >
                    <input {...getInputProps()} />

                    {preview ? (
                        <div className="space-y-4">
                            <img
                                src={preview}
                                alt="Certificate preview"
                                className="max-h-48 mx-auto object-contain rounded-lg border border-yellow-500/20"
                            />
                            <p className="text-yellow-400 text-sm font-medium">{file.name}</p>
                            <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(1)} KB · Click or drag to change</p>
                        </div>
                    ) : file ? (
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-xl bg-yellow-500/10 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5">
                                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-yellow-400 font-medium">{file.name}</p>
                            <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(1)} KB PDF · Click or drag to change</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-yellow-500/10 flex items-center justify-center animate-float">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5">
                                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>

                            {isDragActive ? (
                                <p className="text-yellow-400 font-semibold text-lg">Drop it here!</p>
                            ) : (
                                <>
                                    <p className="text-white font-semibold text-lg">
                                        Drag & drop your certificate
                                    </p>
                                    <p className="text-gray-500 text-sm">or click to browse files</p>
                                </>
                            )}

                            <div className="flex justify-center gap-2 mt-4 flex-wrap">
                                {['JPG', 'PNG', 'WEBP', 'PDF'].map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs px-3 py-1 rounded-full border border-yellow-500/20 text-yellow-500/70"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-600 text-xs">Maximum file size: 10 MB</p>
                        </div>
                    )}
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    disabled={!file || loading}
                    className={`w-full btn-gold py-4 text-base rounded-xl flex items-center justify-center gap-3 ${!file || loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                                <path d="M12 2a10 10 0 0110 10" />
                            </svg>
                            Analyzing Certificate&hellip;
                        </>
                    ) : (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            Verify Certificate
                        </>
                    )}
                </button>

                {/* Info */}
                <p className="text-center text-gray-600 text-xs mt-4">
                    🔒 Your file is processed locally and never stored permanently.
                </p>
            </div>
        </div>
    );
}
