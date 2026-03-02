import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { assets } from '../assets/figma_assets';

const faqs = [
    {
        question: "How does FastTV work?",
        answer: "FastTV brings you 90-second micro dramas crafted for real emotional impact. Download the app, choose a story that speaks to you, and start watching instantly. One subscription. Full access. No interruptions."
    },
    {
        question: "How do I start watching?",
        answer: "Simply download the FastTV app from the App Store or Google Play, create an account, and start exploring our vast library of short-form dramas."
    },
    {
        question: "Why choose FastTV?",
        answer: "FastTV offers distinct, high-quality storytelling in a format that fits your busy life. 90-second episodes mean you can watch a full story arc during a coffee break."
    },
    {
        question: "What’s included in my subscription?",
        answer: "Your subscription gives you unlimited access to all FastTV originals, ad-free viewing, and exclusive content updates every week."
    }
];

export default function FAQSection() {
    // Open the first question by default to match the look of a live section, or keep all closed. 
    // Figma shows "How does FastTV work?" open with text below it.
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faqs" className="relative w-full py-20 bg-[#040406] scroll-mt-24">
            {/* Background elements from Figma */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Right/Center Image */}
                <div className="absolute top-[-140px] left-[30%] w-[1000px] h-[900px]">
                    <img src={assets.imgGroup162199} className="w-full h-full object-contain mix-blend-screen opacity-70" alt="" />
                </div>
                {/* Left/Corner Image */}
                <div className="absolute top-[-180px] left-[30px] w-[800px] h-[900px] rotate-90">
                    <img src={assets.imgGroup162200} className="w-full h-full object-contain mix-blend-screen opacity-70" alt="" />
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24">
                {/* Left Side: Heading */}
                <div className="lg:w-1/3 pt-4 lg:pt-10">
                    <h2 className="text-[32px] md:text-[39px] font-bold text-white leading-tight mb-4 lg:mb-6">
                        Got Questions?<br />
                        We’re Here.
                    </h2>
                    <p className="text-[16px] lg:text-[21px] text-white/80 leading-relaxed font-normal">
                        Everything you need to know about FastTV — simple, clear, and honest.
                    </p>
                </div>

                {/* Right Side: Accordion */}
                <div className="lg:w-2/3 max-w-[800px] ml-auto">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b border-white/20 py-6 first:pt-0"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between text-left group"
                            >
                                <span className="text-[16px] lg:text-[22px] font-medium text-white group-hover:text-[#009cdb] transition-colors">
                                    {faq.question}
                                </span>
                                <span className="transition-transform duration-300 text-white">
                                    {openIndex === index ? (
                                        <Minus className="w-6 h-6" />
                                    ) : (
                                        <Plus className="w-6 h-6" />
                                    )}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pt-4 text-[14px] lg:text-[19px] text-white/80 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
