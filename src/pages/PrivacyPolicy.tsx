import { assets } from '../assets/figma_assets';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
    return (
        <div className="bg-[#040406] min-h-screen relative overflow-x-hidden font-product-sans text-white">
            <SEO
                title="Privacy Policy"
                description="FastTV's Privacy Policy. Learn how we collect, use, and protect your personal information when using our streaming platform."
                keywords="FastTV privacy, privacy policy, data protection, personal information, security"
                canonicalPath="/privacy-policy"
            />
            {/* Background Layers */}
            <div className="absolute top-0 left-0 right-0 h-[100vh] pointer-events-none">
                <img src={assets.imgBg} alt="" className="w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/60 to-transparent" />
            </div>

            <div className="relative z-10 pt-[120px] pb-20 container mx-auto px-6">
                <h1 className="text-[40px] md:text-[56px] font-bold mb-12 text-center">Privacy Policy</h1>

                <div className="max-w-4xl mx-auto space-y-12 text-white/80">
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">1. Introduction</h2>
                        <p className="leading-relaxed">
                            FastTV ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by FastTV.
                            This Privacy Policy applies to our website, and its associated subdomains (collectively, our "Service") alongside our application, FastTV.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">2. Information We Collect</h2>
                        <p className="leading-relaxed mb-4">
                            We collect information from you when you visit our service, register, place an order, subscribe to our newsletter, respond to a survey or fill out a form.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Name / Username</li>
                            <li>Phone Numbers</li>
                            <li>Email Addresses</li>
                            <li>Password</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p className="leading-relaxed mb-4">
                            Any of the information we collect from you may be used in one of the following ways:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To personalize your experience (your information helps us to better respond to your individual needs)</li>
                            <li>To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)</li>
                            <li>To improve customer service (your information helps us to more effectively respond to your customer service requests and support needs)</li>
                            <li>To process transactions</li>
                            <li>To send periodic emails</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">4. Sharing Your Information</h2>
                        <p className="leading-relaxed">
                            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">5. Security</h2>
                        <p className="leading-relaxed">
                            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">6. Contact Us</h2>
                        <p className="leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at support@fasttv.com.
                        </p>
                    </section>

                    <section>
                        <p className="text-sm opacity-60 mt-12 pt-8 border-t border-white/10">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
