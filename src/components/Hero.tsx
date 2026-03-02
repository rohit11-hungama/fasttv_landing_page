import { motion } from 'framer-motion';
import { assets } from '../assets/figma_assets';
import HeroPhoneCarousel from './HeroPhoneCarousel';
import StoreButtons from './StoreButtons';

export default function Hero() {
    return (
        <section className="relative min-h-screen lg:min-h-[900px] w-full overflow-hidden bg-[#040406]">
            {/* ===== MOBILE LAYOUT (< lg) ===== */}
            <div className="lg:hidden relative w-full flex flex-col items-center">
                {/* Background: Faded poster collage + blue glow streaks */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={assets.imgBg}
                        alt=""
                        className="w-full h-full object-cover opacity-10"
                    />
                    {/* Blue glow streak - left */}
                    <div
                        className="absolute top-0 right-0 w-full h-[640px] opacity-50 overflow-hidden"
                    >
                        <div
                            className="absolute -left-[376px] -top-[440px] w-[702px] h-[1068px] flex items-center justify-center"
                        >
                            <div
                                className="rotate-[30deg] w-[148px] h-[1148px] blur-[74px]"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(0deg, rgba(240,251,255,0) 0.6%, rgb(0,156,219) 73.6%)',
                                }}
                            />
                        </div>
                        {/* Blue glow streak - right */}
                        <div
                            className="absolute -left-[93px] -top-[338px] w-[702px] h-[1068px] flex items-center justify-center"
                        >
                            <div
                                className="rotate-[30deg] w-[148px] h-[1148px] blur-[74px]"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(0deg, rgba(240,251,255,0) 0.6%, rgb(0,156,219) 73.6%)',
                                }}
                            />
                        </div>
                    </div>
                    {/* Gradient to black at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full flex flex-col items-center pt-[120px]">
                    {/* Title */}
                    <motion.div
                        className="flex flex-col items-center text-center px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[42px] font-normal text-white leading-[1.15] mb-4">
                            Small Episodes.<br /><span className="text-[#009cdb]">Big Drama</span>
                        </h1>
                        <div className="text-[18px] text-white/80 leading-relaxed tracking-[0.32px] text-center">
                            <p className="mb-0">
                                90 seconds. Real emotions.
                            </p>
                            <p className="mb-0">Premium micro dramas</p>
                            <p>crafted with care.</p>
                        </div>
                    </motion.div>

                    {/* Phone Mockup with Video */}
                    <motion.div
                        className="relative mt-6 w-[306px] mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Phone Container - 20% larger */}
                        <div className="relative w-[306px] h-[588px] bg-black border-[4.2px] border-white/[0.09] rounded-[22px] overflow-hidden">
                            {/* Video Content */}
                            <video
                                src={assets.videoHeroMobile}
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            {/* Bottom gradient inside phone */}
                            <div className="absolute bottom-0 left-0 right-0 h-[270px] bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70" />
                        </div>
                    </motion.div>

                    {/* Bottom gradient overlay for smooth transition */}
                    <div className="absolute bottom-0 left-0 right-0 h-[260px] bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

                    {/* Download CTA */}
                    <div className="relative z-10 flex flex-col items-center gap-4 mt-4 pb-10">
                        <p className="text-[18px] text-white font-normal">Download FastTV App</p>
                        <StoreButtons className="justify-center" buttonClassName="h-[48px] w-[164px]" />
                    </div>
                </div>
            </div>

            {/* ===== DESKTOP LAYOUT (lg+) ===== */}
            {/* Background Image Layer */}
            <div className="hidden lg:block absolute inset-0 w-full h-full">
                <img src={assets.imgBg} alt="Background" className="w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Desktop Content */}
            <div className="hidden lg:flex relative z-10 container mx-auto px-6 h-screen min-h-[900px] items-center">
                <div className="grid grid-cols-2 gap-12 items-center w-full mt-40">
                    {/* Left Column: Text Content */}
                    <motion.div
                        className="flex flex-col gap-6 pb-20 text-left items-start"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[72px] font-bold text-white leading-tight">
                            Small Episodes. <br />
                            <span className="text-[#009cdb]">Big Drama</span>
                        </h1>
                        <p className="text-[24px] text-white/80 max-w-[600px] leading-normal tracking-[0.48px]">
                            90 seconds. Real emotions. Premium micro dramas crafted with care.
                        </p>

                        <div className="flex flex-col gap-2 mt-10 items-start">
                            <p className="text-white text-lg font-medium">Download FastTV App</p>
                            <StoreButtons className="justify-start gap-4" buttonClassName="h-[50px] w-[160px]" />
                        </div>
                    </motion.div>

                    {/* Right Column: Phone Mockup & Carousel */}
                    <div className="flex items-center justify-center gap-8 relative h-[700px]">
                        <HeroPhoneCarousel />
                    </div>
                </div>
            </div>
        </section>
    );
}
