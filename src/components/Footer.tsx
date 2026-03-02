import { assets } from '../assets/figma_assets';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-transparent text-white py-8 lg:py-12 border-t border-white/10 relative overflow-hidden">
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
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 w-full md:w-auto">
                        <div className="space-y-6">
                            <h3 className="text-[18px] font-bold mb-4">Useful Links</h3>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-[16px] opacity-50 hover:opacity-100 transition-opacity">About Us</a></li>
                                <li><a href="#" className="text-[16px] opacity-50 hover:opacity-100 transition-opacity">Top Series</a></li>
                                <li><a href="#" className="text-[16px] opacity-50 hover:opacity-100 transition-opacity">What’s New?</a></li>
                            </ul>
                        </div>
                        <div className="space-y-6 md:pt-10"> {/* Offset for aligning with first col header */}
                            <ul className="space-y-4">
                                <li><Link to="/contact-us" className="text-[16px] opacity-50 hover:opacity-100 transition-opacity">Contact Us</Link></li>
                                <li><Link to="/terms-conditions" className="text-[16px] opacity-50 hover:opacity-100 transition-opacity">Terms & Conditions</Link></li>
                                <li><Link to="/privacy-policy" className="text-[16px] opacity-50 hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
                                <li><a href="#" className="text-[16px] opacity-50 hover:opacity-100 transition-opacity">FAQs</a></li>
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
