import { Mail, Phone, ChevronDown } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimation';
import FAQSection from '../components/FAQSection';
import { assets } from '../assets/figma_assets';
import SEO from '../components/SEO';

export default function ContactUs() {

    return (
        <div className="bg-[#040406] min-h-screen relative overflow-x-hidden font-product-sans">
            <SEO
                title="Contact Us – We're Here to Help"
                description="Get in touch with FastTV. Reach out for support, partnerships, or feedback. Email us at support@fasttv.app or partnerships@fasttv.app."
                keywords="contact FastTV, support, help, partnerships, customer service, email FastTV"
                canonicalPath="/contact-us"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contact FastTV",
                    "description": "Get in touch with the FastTV team for support or partnerships.",
                    "url": "https://fasttv.com/contact-us"
                }}
            />
            {/* Background Image */}
            {/* Background Image - Matches Figma Node 1854:5139 */}
            {/* Background Layers - matches About Us */}
            <div className="absolute top-0 left-0 right-0 h-[100vh] pointer-events-none">
                <img src={assets.imgBg} alt="" className="w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/60 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 pt-[90px]">

                {/* Contact Form Section */}
                <section className="container mx-auto px-6 relative mb-20 z-10 pt-20">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-start justify-center">
                        {/* Left Side: Title & Contact Info */}
                        <div className="flex-1 lg:max-w-md flex flex-col pt-4">
                            <ScrollAnimation>
                                <h2 className="text-4xl md:text-[64px] font-bold text-left mb-12 tracking-tight leading-[1.1]">
                                    We’re Here<br />to Help
                                </h2>
                            </ScrollAnimation>

                            <div className="flex flex-col gap-10">
                                <ScrollAnimation delay={0.1}>
                                    <div className="flex gap-5 items-start">
                                        <Mail className="text-[#009cdb] shrink-0 mt-1" size={32} />
                                        <div>
                                            <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-semibold">Email</p>
                                            <a href="mailto:support@fasttv.app" className="block text-xl font-medium hover:text-[#009cdb] transition-colors mb-1">support@fasttv.app</a>
                                            <p className="text-white/50 text-xs mt-3 mb-1 uppercase tracking-wider font-semibold">Email</p>
                                            <a href="mailto:partnerships@fasttv.app" className="block text-xl font-medium hover:text-[#009cdb] transition-colors">partnerships@fasttv.app</a>
                                        </div>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation delay={0.2}>
                                    <div className="flex gap-5 items-start">
                                        <Phone className="text-[#009cdb] shrink-0 mt-1" size={32} />
                                        <div>
                                            <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-semibold">Phone Number</p>
                                            <p className="text-xl font-medium">+44 07466 331893</p>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="lg:w-[600px] w-full">
                            <ScrollAnimation delay={0.3}>
                                <form className="space-y-4">
                                    <div className="bg-[#18181a] rounded-[10px] px-5 py-3 border border-transparent focus-within:border-white/20 transition-all">
                                        <label className="block text-[11px] text-white/40 mb-1">Name</label>
                                        <input type="text" className="w-full bg-transparent border-none outline-none text-white text-base placeholder-transparent" />
                                    </div>
                                    <div className="bg-[#18181a] rounded-[10px] px-5 py-3 border border-transparent focus-within:border-white/20 transition-all">
                                        <label className="block text-[11px] text-white/40 mb-1">Email</label>
                                        <input type="email" className="w-full bg-transparent border-none outline-none text-white text-base placeholder-transparent" />
                                    </div>

                                    <div className="flex bg-[#18181a] rounded-[10px] border border-transparent focus-within:border-white/20 transition-all overflow-hidden">
                                        <div className="px-4 py-3 bg-[#252527] flex items-center gap-2 cursor-pointer border-r border-white/5 min-w-[100px] justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">🇮🇳</span>
                                                <span className="text-white text-sm font-medium">+91</span>
                                            </div>
                                            <ChevronDown size={14} className="text-white/50" />
                                        </div>
                                        <div className="flex-1 px-5 py-3">
                                            <input type="tel" className="w-full bg-transparent border-none outline-none text-white text-base placeholder-white/30" placeholder="91310 74348" />
                                        </div>
                                    </div>

                                    <div className="bg-[#18181a] rounded-[10px] px-5 py-3 border border-transparent focus-within:border-white/20 transition-all h-[140px]">
                                        <label className="block text-[11px] text-white/40 mb-1">Message</label>
                                        <textarea className="w-full h-full bg-transparent border-none outline-none text-white text-base placeholder-transparent resize-none p-0" />
                                    </div>

                                    <button type="submit" className="w-full bg-white text-black font-bold text-sm py-4 rounded-[10px] hover:bg-gray-100 transition-all mt-4">
                                        Send Message
                                    </button>
                                </form>
                            </ScrollAnimation>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
            </div>

            {/* FAQ Section - Shared Component */}
            <FAQSection />
        </div>
    );
}
