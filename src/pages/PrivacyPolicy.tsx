import SEO from '../components/SEO';

export default function PrivacyPolicy() {
    return (
        <div className="bg-[#040406] min-h-screen relative overflow-x-hidden font-product-sans text-white">
            <SEO
                title="Privacy Policy"
                description="FastTV's Privacy Policy. Learn how we collect, use, and protect your personal information when using our streaming platform."
                keywords="FastTV privacy, privacy policy, data protection, personal information, security"
                canonicalPath="/privacy"
            />
            {/* Background */}
            <div className="absolute top-0 left-0 right-0 h-[100vh] pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/60 to-transparent" />
            </div>

            <div className="relative z-10 pt-10 md:pt-[120px] pb-20 container mx-auto px-6">
                <div className="hidden md:block">
                    <h1 className="text-[40px] md:text-[56px] font-bold mb-4 text-center uppercase tracking-wider">Privacy Policy</h1>
                    <p className="text-center text-white/50 text-sm italic mb-12">Effective Date: March 1, 2026</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-12 text-white/80 leading-relaxed font-light">

                    {/* 1. Introduction */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            1.1 This Privacy Policy (&ldquo;Policy&rdquo;) shall govern the collection, use, storage, processing, disclosure, transfer and protection of Personal Information by Hungama Digital Media Entertainment Private Limited, a company incorporated under the Companies Act, 2013 bearing Corporate Identification Number U22300MH1999PTC119259 and having its registered office at C-Wing, 10th Floor, Times Square Building, Andheri Kurla Road, Marol, Andheri (E), Mumbai 400059, Maharashtra, India (hereinafter referred to as &ldquo;Hungama&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) through the Hungama Micro Drama App (hereinafter referred to as the &ldquo;App&rdquo;).
                        </p>
                        <p className="mb-4">
                            1.2 By downloading, installing, accessing or using the App, you confirm that you have attained the age of majority and are legally competent, have read, understood and unconditionally agree to be bound by this Policy and the Terms &amp; Conditions.
                        </p>
                        <p className="mb-4">
                            1.3 Personal Information shall mean any information that relates to you and identifies you, including but not limited to name, email address, mobile number, date of birth, device identifiers, IP address and usage data, as defined under the applicable laws.
                        </p>
                        <p className="mb-4">
                            1.4 This Policy complies with the IT Act, Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and applicable provisions of other laws as may be applicable.
                        </p>
                        <p>
                            1.5 This Policy applies exclusively to Personal Information collected through the App interfaces primarily from users resident in India, provided however that users accessing the App shall be deemed to irrevocably submit to the exclusive jurisdiction of the courts in Mumbai, Maharashtra and the applicability of Indian laws. For the avoidance of doubt, this Policy shall not apply to: (a) information collected offline or through physical means; (b) Personal Information collected by or through third-party websites, services or applications accessible via links from the App; or (c) any data made publicly available by you on social media platforms independent of the App. International transfers of Personal Information, if any occur through global app store infrastructure, shall incorporate appropriate safeguards as required under Indian law including standard contractual clauses where mandated.
                        </p>
                    </section>

                    {/* 2. Personal Information Collected */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">2. Personal Information Collected</h2>
                        <p className="mb-4">
                            2.1 Hungama shall collect only the Personal Information strictly necessary for such purposes (&ldquo;Collected Information&rdquo;), namely: (a) Registration Information: full name, email address, mobile number (verified via OTP), date of birth, country of residence; (b) Usage Data: device identifiers (e.g., advertising ID, unique device ID), operating system, app version, IP address (for approximate location derivation), interaction patterns (e.g., content viewed, time spent), and aggregated usage analytics; (c) Billing Information: transaction references and payment metadata processed exclusively through third-party payment gateways for India subscriptions; international In-App Purchases via Apple App Store/Google Play Store without storage of full card details or payment instruments by Hungama.
                        </p>
                        <p className="mb-4">
                            2.2 The App is designed such that it shall not request, access, store or process: (a) camera or photo library permissions; (b) microphone or audio recording permissions beyond incidental playback; (c) contacts or address book access; (d) precise geolocation/GPS data; (e) biometric data; or (f) health, financial account details or other sensitive personal data beyond billing metadata. All non-essential permissions are denied by default and cannot be enabled.
                        </p>
                        <p>
                            2.3 Collected Information shall be gathered solely through the App&rsquo;s user interfaces: (i) during onboarding via the registration screen; and (ii) automatically during normal usage for analytics and personalization. No collection occurs via websites, SDKs requesting excluded permissions, or background tracking beyond stated Usage Data.
                        </p>
                    </section>

                    {/* 3. Purposes of Processing */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">3. Purposes of Processing</h2>
                        <p className="mb-4">
                            3.1 Hungama shall process Collected Information solely for the following legitimate purposes, strictly necessary to provide the Services: (a) to enable account registration, authentication (OTP verification), profile management, and access; (b) to deliver core App functionalities including micro-drama streaming, playback controls, content search/discovery, and personalised recommendations based on viewing history and preferences; (c) to process subscriptions, In-App Purchases (IAP), coin redemptions, and refunds exclusively through authorised third-party gateways without Hungama storing sensitive payment instruments; (d) to send transactional communications (e.g., OTPs, subscription confirmations, service updates) and promotional notifications with one-tap opt-out; (e) to perform aggregated analytics for App improvement, performance optimisation, and trend analysis without identifying individuals; (f) to detect, prevent, and investigate fraud, spam, abuse, security incidents, and violations of T&amp;Cs (e.g., multi-accounting, unauthorised sharing); and (g) to comply with applicable laws, respond to regulatory/government requests, enforce T&amp;Cs, protect rights/safety, and resolve disputes/litigation support.
                        </p>
                        <p className="mb-4">
                            3.2 No Collected Information shall be processed for any other purpose, including unrelated marketing or secondary commercial uses, without providing prior notice through the App and obtaining your explicit, free, informed, and unambiguous consent via opt-in mechanisms. Automated decision-making (e.g., content recommendations) shall not produce legal effects or significant impact without human oversight.
                        </p>
                        <p>
                            3.3 Personal Information shall be retained only for as long as necessary to fulfil the above purposes or as mandated by law. Inactive accounts shall be deleted after 1 year with prior notice. Upon expiry, data is securely deleted or anonymised beyond recovery, except where legally required.
                        </p>
                    </section>

                    {/* 4. Disclosure */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">4. Disclosure</h2>
                        <p className="mb-4">
                            4.1 Hungama shall not disclose, share, transfer or otherwise make available any Collected Information to any third party except as strictly necessary for the purposes outlined above and in compliance with applicable laws, including: (a) service providers acting as processors on our behalf under data processing agreements that mandate security safeguards, limited to cloud hosting, analytics services and authorised payment gateways; (b) digital distribution platforms such as app stores solely for subscription verification, transaction processing, refunds, and distribution analytics, without Hungama receiving or storing sensitive payment details; (c) government or regulatory authorities, law enforcement agencies, courts or tribunals upon receipt of a valid legal order, subpoena, warrant or similar process issued under applicable Indian or international law; or (d) professional advisors including external auditors, legal counsel and consultants bound by professional confidentiality obligations, but only to the extent necessary for legitimate business, compliance or dispute resolution purposes.
                        </p>
                        <p>
                            4.2 For the avoidance of doubt, Hungama shall not sell, rent, lease or otherwise monetise Collected Information for marketing purposes to third parties. No sharing occurs with advertisers or data brokers. Any international disclosures or transfers limited to digital platform processors or cloud backups in India-primary regions shall incorporate appropriate safeguards, binding corporate rules or adequacy mechanisms as mandated under relevant laws. All recipients are contractually prohibited from using Collected Information beyond the specific purpose authorised by Hungama and must return or destroy data upon termination of services.
                        </p>
                    </section>

                    {/* 5. Your Rights */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">5. Your Rights as Data Principal</h2>
                        <p className="mb-4">
                            5.1 As a Data Principal and user under this Policy, you are entitled to the following rights, exercisable by emailing <a href="mailto:privacy@fasttv.app" className="text-[#009cdb] hover:underline">privacy@fasttv.app</a>, to which we will respond within a maximum of 90 (ninety) days; and any further appeals may be directed to the concerned authority as applicable under the law:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 mb-4">
                            <li>(a) Confirmation whether we process your Collected Information, details of data, processing purposes, recipient categories, and retention periods;</li>
                            <li>(b) Rectify inaccurate or incomplete Personal Information (e.g., name, email, phone updates);</li>
                            <li>(c) Request deletion when data no longer needed for stated purposes, consent withdrawn, or processing unlawful (subject to legal retention obligations like billing records);</li>
                            <li>(d) Revoke consent for specific processing (e.g., promotional notifications), effective prospectively without affecting prior lawful processing;</li>
                            <li>(e) Appoint a lawful representative to exercise your rights; and</li>
                            <li>(f) Grievance Redressal: lodge complaints with our Grievance Officer for resolution within 90 (ninety) days, with further escalation as may be implied under applicable laws.</li>
                        </ul>
                        <p className="mb-4">
                            5.2 Rights may be limited where processing is necessary for legal compliance, contractual obligations, or public interest under applicable laws.
                        </p>
                        <p>
                            5.3 Data portability is not applicable as we do not maintain Collected Information in a structured, commonly used, and machine-readable format beyond App operational needs.
                        </p>
                    </section>

                    {/* 6. Data Security */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">6. Data Security and Breach Notification</h2>
                        <p className="mb-4">
                            6.1 Hungama implements and maintains reasonable security practices and procedures designed to protect Collected Information from unauthorised access, alteration, disclosure, breach or destruction, including encryption of data in transit and at rest, role-based access controls, regular security audits, employee training on data protection, and pseudonymisation where feasible, all in accordance with the standards prescribed under applicable laws.
                        </p>
                        <p className="mb-4">
                            6.2 Despite these measures, no method of transmission or storage is 100% secure. In the event of a Personal Data Breach that is likely to cause harm to any Data Principal, Hungama shall: (a) perform root cause analysis within reasonable time; (b) notify affected Users via prominent App notice, email, and/or SMS (as registered) within 72 hours of becoming aware, detailing nature/extent of breach, potential harm, remediation steps, and contact for support; and (c) report to relevant authorities without undue delay per the law.
                        </p>
                        <p>
                            6.3 Users agree to promptly notify <a href="mailto:privacy@fasttv.app" className="text-[#009cdb] hover:underline">privacy@fasttv.app</a> of any suspected breach or unauthorised access involving their account. Hungama&rsquo;s liability for security incidents is limited to direct damages as per T&amp;Cs.
                        </p>
                    </section>

                    {/* 7. Children's Privacy */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">7. Children&rsquo;s Privacy</h2>
                        <p className="mb-4">
                            Hungama is NOT directed to or INTENDED for individuals under the age of 18 (eighteen). An individual less than 18 (eighteen) years of age SHOULD NOT register to use the website/application. However, if you are above 13 (thirteen) years of age or older but below 18 (eighteen) years, you may be granted access by providing either of your parent&rsquo;s Email IDs and an Email will be sent informing the parent that their ward has registered to use the Hungama services through the website/application.
                        </p>
                        <p className="mb-4">
                            If you are a parent of a child under the age of 18 (eighteen) and you have questions about our website/application or Privacy Policy, please feel free to contact the Data Protection Officer. Parents of such underage individuals will be legally bound by any acts, deeds, violation of Terms and Conditions of Use, Privacy Policy and the End User License Agreement.
                        </p>
                        <p>
                            Please be informed that we do not knowingly collect personal information from anyone under the age of 13 years. If at any given point of time, we determine that the information collected pertains to a User(s) below 13 years of age, we reserve the right to refrain from using or maintaining such information.
                        </p>
                    </section>

                    {/* 8. Data Protection Officer */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">8. Data Protection Officer</h2>
                        <p className="mb-4">
                            8.1 Hungama has appointed and hereby designates a Data Protection Officer to address user complaints regarding violation of this Policy and data processing concerns.
                        </p>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4">
                            <p className="mb-1"><strong className="text-white">Name:</strong> Data Protection Officer</p>
                            <p className="mb-1"><strong className="text-white">Email:</strong> <a href="mailto:privacy@fasttv.app" className="text-[#009cdb] hover:underline">privacy@fasttv.app</a></p>
                            <p><strong className="text-white">Address:</strong> Hungama Digital Media Entertainment Private Limited, C-Wing, 10th Floor, Times Square Building, Andheri Kurla Road, Marol, Andheri (E), Mumbai 400059, Maharashtra, India</p>
                        </div>
                        <p>
                            8.3 All grievances must be submitted in writing to the Grievance Officer via email with complete details including your name, registered mobile/email, account details (if any), specific issue/complaint, and supporting documents/evidence. The Company will acknowledge receipt of the grievance promptly and will endeavour to investigate and resolve it within a reasonable timeframe.
                        </p>
                    </section>

                    {/* 9. Data Retention and Deletion */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">9. Data Retention and Deletion</h2>
                        <p className="mb-4">
                            9.1 Hungama shall retain Collected Information only for as long as necessary to fulfil the legitimate purposes specified in Clause 3 above or as mandated by applicable laws, whichever is longer, strictly adhering to the storage limitation principle under the law.
                        </p>
                        <p className="mb-4">
                            9.2 Specific retention periods include: (a) Registration Information and Usage Data shall be retained for the duration of your active account relationship plus 1 (one) year following account deletion or inactivation, after which all data shall be permanently deleted or irreversibly anonymised; (b) Billing Information and transaction records shall be retained for 7 (seven) years from the date of transaction as required under applicable tax laws and accounting standards; and (c) any information required to be preserved for ongoing litigation, regulatory investigations, fraud prevention, or legal compliance shall be retained until resolution plus statutory limitation periods.
                        </p>
                        <p className="mb-4">
                            9.3 Upon expiry of applicable retention periods or upon your valid erasure request, Hungama shall ensure Collected Information is securely deleted from primary and backup systems using industry-standard methods rendering data unrecoverable, except where prohibited by law. Users may request confirmation of deletion via <a href="mailto:privacy@fasttv.app" className="text-[#009cdb] hover:underline">privacy@fasttv.app</a>.
                        </p>
                        <p>
                            9.4 Inactive accounts shall be flagged for deletion with prior notification.
                        </p>
                    </section>

                    {/* 10. Changes to this Privacy Policy */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">10. Changes to this Privacy Policy</h2>
                        <p className="mb-4">
                            10.1 Hungama reserves the right to update, modify, revise or amend this Policy from time to time to reflect changes in our data processing practices, legal requirements, technological advancements, or business operations. Any material changes shall be posted prominently within the App and notified to users via in-App banner, push notification, or email (to your registered email address) at least 30 (thirty) days prior to the effective date of such changes.
                        </p>
                        <p className="mb-4">
                            10.2 The updated Policy shall include a new Effective Date at the top and shall supersede all prior versions. Continued access or use of the App after the notified effective date constitutes your unconditional acceptance of the revised Policy and any material changes therein. If you do not agree with the changes, you may delete your account and cease using the App.
                        </p>
                        <p className="mb-4">
                            10.3 Users are encouraged to review this Policy periodically. The latest version is always available within App settings.
                        </p>
                        <p>
                            10.4 For avoidance of doubt, any changes shall not affect the lawfulness of processing conducted prior to the effective date based on consent or legitimate interests under previous versions of this Policy.
                        </p>
                    </section>

                    {/* 11. Contact Information */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">11. Contact Information</h2>
                        <p className="mb-4">
                            11.1 For any questions, concerns, requests regarding your Personal Information, rights, data deletion, or any other matter related to this Policy or data processing practices, please contact our Data Protection Officer at the following coordinates:
                        </p>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <p className="mb-1"><strong className="text-white">Email:</strong> <a href="mailto:privacy@fasttv.app" className="text-[#009cdb] hover:underline">privacy@fasttv.app</a></p>
                            <p className="mb-1"><strong className="text-white">Grievance Officer:</strong> <a href="mailto:grievance@fasttv.app" className="text-[#009cdb] hover:underline">grievance@fasttv.app</a></p>
                            <p className="mb-1"><strong className="text-white">Website:</strong> <a href="https://fasttv.app/" target="_blank" rel="noopener noreferrer" className="text-[#009cdb] hover:underline">https://fasttv.app/</a></p>
                            <p><strong className="text-white">Address:</strong> Hungama Digital Media Entertainment Private Limited, C-Wing, 10th Floor, Times Square Building, Andheri Kurla Road, Marol, Andheri (E), Mumbai 400059, Maharashtra, India</p>
                        </div>
                    </section>

                    {/* 12. Governing Law */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">12. Governing Law and Jurisdiction</h2>
                        <p className="mb-4">
                            12.1 This Privacy Policy shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any disputes, claims or controversies arising out of or relating to this Policy, data processing practices, or your use of the App shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra, India.
                        </p>
                        <p>
                            12.2 Users accessing the App internationally via Google Play Store or Apple App Store irrevocably submit to the jurisdiction of Mumbai courts and waive any objections based on venue or forum non-conveniens. Hungama&rsquo;s compliance with Indian laws shall constitute full discharge of obligations worldwide.
                        </p>
                    </section>

                    {/* 13. Miscellaneous */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">13. Miscellaneous Provisions</h2>
                        <p className="mb-4">
                            13.1 If any provision of this Policy is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed from this Policy and the remaining provisions shall continue in full force and effect.
                        </p>
                        <p className="mb-4">
                            13.2 Failure by Hungama to exercise or enforce any right or provision of this Policy shall not constitute a waiver of such right or provision. No waiver shall be effective unless made in writing and signed by an authorised officer of Hungama.
                        </p>
                        <p className="mb-4">
                            13.3 This Policy, together with the T&amp;Cs, constitutes the entire understanding between you and Hungama regarding data protection and supersedes all prior agreements, understandings, or representations, whether oral or written.
                        </p>
                        <p>
                            13.4 Hungama may assign this Policy and its rights/obligations hereunder to any successor entity in connection with a merger, acquisition, or sale of assets. You may not assign your rights/obligations without Hungama&rsquo;s prior written consent.
                        </p>
                    </section>

                    {/* 14. Effective Date and Language */}
                    <section>
                        <h2 className="text-[24px] font-bold text-white mb-4">14. Effective Date and Language</h2>
                        <p className="mb-4">
                            The English language version shall prevail over any translations.
                        </p>
                        <p>
                            14.2 Users of the App shall be deemed to have accepted this Policy upon first access post-effective date. For support, contact <a href="mailto:privacy@fasttv.app" className="text-[#009cdb] hover:underline">privacy@fasttv.app</a>.
                        </p>
                    </section>

                    {/* Footer */}
                    <section>
                        <p className="text-sm opacity-60 mt-12 pt-8 border-t border-white/10">
                            Last updated: March 1, 2026
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
