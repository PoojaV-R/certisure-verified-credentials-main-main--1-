import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import ResultPage from './pages/ResultPage';
import ScanPage from './pages/ScanPage';
import VerifyPage from './pages/VerifyPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#1a1a1a',
                        color: '#e5e5e5',
                        border: '1px solid rgba(251,191,36,0.3)',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                    },
                    success: {
                        iconTheme: { primary: '#22c55e', secondary: '#000' },
                    },
                    error: {
                        iconTheme: { primary: '#ef4444', secondary: '#000' },
                    },
                }}
            />
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/result/:id" element={<ResultPage />} />
                <Route path="/scan" element={<ScanPage />} />
                <Route path="/verify/:id" element={<VerifyPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </BrowserRouter>
    );
}
