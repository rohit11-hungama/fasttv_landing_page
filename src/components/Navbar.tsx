import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/figma_assets';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About us', path: '/about' },
        { name: 'Top Series', path: '/top-series' },
        { name: "What\u2019s New?", path: '/whats-new' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname === path) return true;
        return false;
    };

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[90px] flex items-center',
                isScrolled ? 'bg-black/70 backdrop-blur-[25px]' : 'bg-transparent'
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo Section (Desktop) */}
                <div className="hidden lg:flex items-center gap-12">
                    <Link to="/" className="relative w-[129px] h-[35px] flex items-center">
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img src={assets.imgNavigationLogo} className="h-full w-auto object-contain" alt="FastTV Logo" />
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="flex items-center gap-8 ml-8">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative h-[90px] flex items-center justify-center">
                                <Link
                                    to={link.path}
                                    className={cn(
                                        "text-[15px] font-bold text-center transition-colors px-2",
                                        isActive(link.path) ? "text-[#009cdb]" : "text-white hover:text-[#009cdb]"
                                    )}
                                >
                                    {link.name}
                                </Link>
                                {isActive(link.path) && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#009cdb]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Header (Figma Design) */}
                <div className="lg:hidden flex items-center justify-between w-full">
                    {/* Left: Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={assets.imgNavigationLogo} className="h-[28px] w-auto object-contain" alt="FastTV" />
                    </Link>

                    {/* Right: Menu */}
                    <div className="flex items-center">
                        <button
                            className="text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Desktop Right Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    <a href="https://fasttv.onelink.me/jiWp/share" target="_blank" rel="noopener noreferrer" className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-[12px] px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.2)] transition-colors">
                        <div className="w-4 h-4 relative">
                            <img src={assets.imgGroup4} alt="" className="w-full h-full" />
                        </div>
                        <span className="text-[13px] font-bold text-white">Download App</span>
                    </a>
                </div>
            </div>

            {/* Mobile Menu - Slide from Right */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 bg-black/60 z-40"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        {/* Side panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                            className="lg:hidden fixed top-0 right-0 h-full w-[75%] max-w-[300px] bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
                        >
                            {/* Close button */}
                            <div className="flex justify-end p-6">
                                <button
                                    className="text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="flex flex-col px-6 pb-8 space-y-5">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="text-lg text-gray-300 hover:text-white transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <hr className="border-white/10" />
                                <a href="https://fasttv.onelink.me/jiWp/share" target="_blank" rel="noopener noreferrer" className="bg-[#009cdb] text-white w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 cursor-pointer">
                                    Download App
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav >
    );
}
