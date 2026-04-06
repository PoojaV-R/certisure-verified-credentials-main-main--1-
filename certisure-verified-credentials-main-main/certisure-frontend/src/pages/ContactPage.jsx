import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error('Please fill in all fields.');
            return;
        }
        // Simulated submission
        toast.success('Message sent! We will get back to you soon.');
        setSent(true);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-[#080808] pt-24 pb-16 px-6 relative overflow-hidden">
            <div
                className="hero-glow w-[400px] h-[400px] top-[5%] right-[-5%] animate-glow-pulse"
                style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)' }}
            />

            <div className="max-w-xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white mb-3">
                        Get in <span className="gold-text">Touch</span>
                    </h1>
                    <p className="text-gray-500">Questions or feedback? We would love to hear from you.</p>
                </div>

                <div className="glass-card p-8">
                    {sent && (
                        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center">
                            ✓ Your message has been sent. Thank you!
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-yellow-500/50 focus:bg-yellow-500/5 transition-colors placeholder-gray-600"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-yellow-500/50 focus:bg-yellow-500/5 transition-colors placeholder-gray-600"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5">Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Tell us how we can help..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-yellow-500/50 focus:bg-yellow-500/5 transition-colors resize-none placeholder-gray-600"
                            />
                        </div>
                        <button type="submit" className="w-full btn-gold py-3.5 rounded-xl">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                        { icon: '📧', label: 'Email', value: 'support@certisure.ai' },
                        { icon: '🕐', label: 'Response Time', value: 'Within 24 hours' },
                    ].map((item) => (
                        <div key={item.label} className="glass-card p-4 text-center">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">{item.label}</div>
                            <div className="text-gray-300 text-sm font-medium">{item.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
