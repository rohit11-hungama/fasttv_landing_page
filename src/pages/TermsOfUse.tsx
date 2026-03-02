import { assets } from '../assets/figma_assets';
import SEO from '../components/SEO';

export default function TermsOfUse() {
    return (
        <div className="bg-[#040406] min-h-screen relative overflow-x-hidden font-product-sans text-white">
            <SEO
                title="Terms & Conditions"
                description="Read FastTV's Terms and Conditions. Understand our policies for using the FastTV platform, user accounts, content rights, and more."
                keywords="FastTV terms, terms and conditions, user agreement, content policy, legal"
                canonicalPath="/terms-conditions"
            />
            {/* Background Layers */}
            <div className="absolute top-0 left-0 right-0 h-[100vh] pointer-events-none">
                <img src={assets.imgBg} alt="" className="w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/60 to-transparent" />
            </div>

            <div className="relative z-10 pt-[120px] pb-20 container mx-auto px-6">
                <h1 className="text-[40px] md:text-[56px] font-bold mb-12 text-center">Terms & Conditions</h1>

                <div className="max-w-4xl mx-auto space-y-12 text-white/80">
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">1. Introduction</h2>
                        <p className="leading-relaxed">
                            Welcome to FastTV. By accessing or using our website and mobile application, you agree to be bound by these Terms and Conditions.
                            These terms apply to all visitors, users, and others who access or use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">2. Use of Service</h2>
                        <p className="leading-relaxed">
                            FastTV provides a platform for viewing short-form drama content. You may not use the Service for any illegal or unauthorized purpose.
                            You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">3. User Accounts</h2>
                        <p className="leading-relaxed">
                            To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password.
                            You agree to accept responsibility for all activities that occur under your account or password.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">4. Content and Intellectual Property</h2>
                        <p className="leading-relaxed">
                            The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of FastTV and its licensors.
                            The Service is protected by copyright, trademark, and other laws of both the India and foreign countries.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">5. Termination</h2>
                        <p className="leading-relaxed">
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                            All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">6. Changes to Terms</h2>
                        <p className="leading-relaxed">
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
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
