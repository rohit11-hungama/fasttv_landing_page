import { Headset, MapPin, Mail } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import ScrollAnimation from '../components/ScrollAnimation';
import SEO from '../components/SEO';

export default function ContactUs() {
    return (
        <div className="bg-[#040406] min-h-screen relative overflow-x-hidden font-product-sans">
            <SEO
                title="Contact & Support – FastTV"
                description="Get in touch with FastTV. Reach out for support, partnerships, or feedback. Email us at helpdesk@fasttv.app."
                keywords="contact FastTV, support, help, partnerships, customer service, email FastTV"
                canonicalPath="/contact-us"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contact FastTV",
                    "description": "Get in touch with the FastTV team for support or partnerships.",
                    "url": "https://fasttv.app/contact-us"
                }}
            />

            {/* Subtle gradient background */}
            <div className="absolute top-0 left-0 right-0 h-[60vh] pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#009cdb]/[0.04] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 pt-[250px] md:pt-[280px]">
                <section className="container mx-auto px-6 pb-24">
                    {/* Header */}
                    <ScrollAnimation>
                        <div className="text-center mb-20">
                            <p className="text-[#009cdb] text-sm font-semibold uppercase tracking-[0.2em] mb-4">Contact & Support</p>
                            <h1 className="text-4xl md:text-[56px] font-bold tracking-tight leading-[1.1] mb-5">Get in Touch</h1>
                            <p className="text-white/40 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                                We're here to help. Reach out through any of the channels below.
                            </p>
                        </div>
                    </ScrollAnimation>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">

                        {/* Need Assistance */}
                        <ScrollAnimation delay={0.1}>
                            <div className="relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] rounded-2xl p-8 md:p-10 h-full group hover:border-[#009cdb]/30 transition-all duration-300 overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#009cdb]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-11 h-11 rounded-lg bg-[#009cdb]/10 border border-[#009cdb]/20 flex items-center justify-center mb-7">
                                    <Headset className="text-[#009cdb]" size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">Need Assistance?</h3>
                                <p className="text-white/40 text-[14px] mb-6 leading-relaxed">
                                    Visit our support portal for quick answers, FAQs, and to submit a ticket.
                                </p>
                                <a
                                    href="https://fasttv.freshdesk.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[#009cdb] text-[13px] font-semibold hover:gap-3 transition-all"
                                >
                                    Visit Support Channel
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </a>
                            </div>
                        </ScrollAnimation>

                        {/* Visit Us */}
                        <ScrollAnimation delay={0.2}>
                            <div className="relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] rounded-2xl p-8 md:p-10 h-full group hover:border-[#009cdb]/30 transition-all duration-300 overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#009cdb]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-11 h-11 rounded-lg bg-[#009cdb]/10 border border-[#009cdb]/20 flex items-center justify-center mb-7">
                                    <MapPin className="text-[#009cdb]" size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">Visit Us</h3>
                                <p className="text-white/40 text-[14px] leading-[1.8]">
                                    Hungama Digital Media Entertainment Pvt. Ltd.<br />
                                    C-Wing, 10th Floor, Times Square Building,<br />
                                    Andheri Kurla Road, Marol,<br />
                                    Andheri (East), Mumbai – 400059<br />
                                    Maharashtra, India
                                </p>
                            </div>
                        </ScrollAnimation>

                        {/* Support Email */}
                        <ScrollAnimation delay={0.3}>
                            <div className="relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] rounded-2xl p-8 md:p-10 h-full group hover:border-[#009cdb]/30 transition-all duration-300 overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#009cdb]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-11 h-11 rounded-lg bg-[#009cdb]/10 border border-[#009cdb]/20 flex items-center justify-center mb-7">
                                    <Mail className="text-[#009cdb]" size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">Support Email</h3>
                                <p className="text-white/40 text-[14px] mb-6 leading-relaxed">
                                    Drop us an email and our team will get back to you within 24 hours.
                                </p>
                                <a href="mailto:helpdesk@fasttv.app" className="inline-flex items-center gap-2 text-[#009cdb] text-[13px] font-semibold hover:gap-3 transition-all">
                                    helpdesk@fasttv.app
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </a>
                            </div>
                        </ScrollAnimation>
                    </div>
                </section>
            </div>

            {/* FAQ Section */}
            <FAQSection />
        </div>
    );
}
