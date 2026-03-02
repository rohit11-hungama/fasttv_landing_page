import { assets } from '../assets/figma_assets';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
    const { pathname } = useLocation();
    return (
        <Link
            to={to}
            className="text-[16px] opacity-50 hover:opacity-100 transition-opacity"
            onClick={() => { if (pathname === to) window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
            {children}
        </Link>
    );
}

export default function Footer() {
    const { pathname } = useLocation();
    const isLegalPage = pathname === '/privacy' || pathname === '/terms';

    return (
        <footer className={cn(
            "bg-transparent text-white py-8 lg:py-12 border-t border-white/10 relative overflow-hidden",
            isLegalPage && "hidden md:block"
        )}>
            {/* Footer background graphic if any */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-12 mb-10 lg:mb-16">

                    {/* Brand & Social */}
                    <div className="max-w-sm space-y-6">
                        <div className="w-[108px] h-[30px]">
                            <img src={assets.imgLayer1} alt="FastTV" className="w-full h-full object-contain" />
                        </div>
                        <p className="text-[16px] text-white opacity-50 leading-relaxed">
                            Follow us for the latest short dramas, new releases, and exclusive updates from FastTV.
                        </p>

                        <div className="flex gap-6 opacity-60 hover:opacity-100 transition-opacity">
                            <button className="w-[25px] h-[25px]"><img src={assets.imgFacebookSocial} className="w-full h-full object-contain" alt="Facebook" /></button>
                            <button className="w-[25px] h-[25px]"><img src={assets.imgXSocial} className="w-full h-full object-contain" alt="X / Twitter" /></button>
                            <button className="w-[25px] h-[25px]"><img src={assets.imgInstaSocial} className="w-full h-full object-contain" alt="Instagram" /></button>
                            <a href="https://www.youtube.com/channel/UCZtc1Qi2cdXX_OQv_J9qB8w" target="_blank" rel="noopener noreferrer" className="w-[25px] h-[25px]">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 w-full md:w-auto">
                        <div className="space-y-6">
                            <h3 className="text-[18px] font-bold mb-4">Useful Links</h3>
                            <ul className="space-y-4">
                                <li><FooterLink to="/about">About Us</FooterLink></li>
                                <li><FooterLink to="/top-series">Top Series</FooterLink></li>
                                <li><FooterLink to="/whats-new">What's New?</FooterLink></li>
                            </ul>
                        </div>
                        <div className="space-y-6 md:pt-10"> {/* Offset for aligning with first col header */}
                            <ul className="space-y-4">
                                <li><FooterLink to="/contact-us">Contact & Support</FooterLink></li>
                                <li><FooterLink to="/terms">Terms & Conditions</FooterLink></li>
                                <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
                                <li>
                                    <Link
                                        to="/#faqs"
                                        className="text-[16px] opacity-50 hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                            const el = document.getElementById('faqs');
                                            if (el) {
                                                e.preventDefault();
                                                el.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                    >
                                        FAQs
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[13px] lg:text-[16px] opacity-40 text-center md:text-left">
                        © {new Date().getFullYear()} Hungama Digital Media Entertainment Pvt. Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
