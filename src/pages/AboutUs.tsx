import { assets } from '../assets/figma_assets';
import SEO from '../components/SEO';
import StoreButtons from '../components/StoreButtons';

export default function AboutUs() {
    return (
        <div className="bg-[#040406] min-h-screen relative overflow-x-hidden font-product-sans">
            <SEO
                title="About Us – Reinventing Short Form Entertainment"
                description="FastTV delivers premium 1-minute drama episodes designed for the modern viewer. Learn about our mission, values, and what makes us different."
                keywords="FastTV about, short form entertainment, micro dramas, 1 minute episodes, Hungama"
                canonicalPath="/about"
            />
            {/* Background Layers - hero area only */}
            <div className="absolute top-0 left-0 right-0 h-[100vh] pointer-events-none">
                <img src={assets.imgBg} alt="" className="w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/60 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 pt-[90px]">

                {/* Hero Section */}
                <div className="container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
                    <h1 className="text-[50px] md:text-[83px] font-bold leading-tight mb-6">
                        Reinventing Short<br />
                        <span className="text-white">Form Entertainment</span>
                    </h1>
                    <p className="text-[18px] md:text-[24px] text-white/80 max-w-[900px] mb-12 leading-relaxed">
                        FastTV delivers premium 1-minute drama episodes designed for the modern viewer <br className="hidden md:block" />
                        quick, addictive, and immersive.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <p className="text-[18px] font-medium">Download FastTV App</p>
                        <StoreButtons className="justify-center gap-4" buttonClassName="h-[50px] w-[160px]" />
                    </div>
                </div>

                {/* Mission Section - Split Layout with Phone Mockup */}
                <div className="container mx-auto px-6 md:px-24 py-12 md:py-20 relative">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        {/* Text Content */}
                        <div className="max-w-[500px] flex-1">
                            <h2 className="text-[40px] md:text-[46px] font-bold mb-8">Our Mission</h2>
                            <p className="text-[20px] text-white/80 leading-relaxed">
                                At FastTV, we believe stories don't need hours to leave an impact.
                                <br /><br />
                                Our mission is to create powerful short-form dramas that fit seamlessly into your daily life whether you're commuting, waiting, or just need a 60-second escape.
                            </p>
                        </div>

                        {/* Phone Mockup Image */}
                        <div className="flex-1 flex justify-center relative">
                            <img
                                src={assets.imgMissionPhone3}
                                alt="FastTV App"
                                className="max-h-[560px] object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Values Section (What Makes Us Different) */}
                <div className="container mx-auto px-6 py-20">
                    <div className="flex flex-col items-center text-center mb-16">
                        <h2 className="text-[40px] md:text-[46px] font-bold mb-4">What Makes Us Different</h2>
                        <p className="text-[20px] text-white/80 max-w-[800px]">
                            We've reimagined the entire production process to bring you high-quality entertainment at the speed of life
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1200px] mx-auto">
                        {/* Value 1 - 1 Minute Episodes */}
                        <div className="flex flex-col items-start text-left gap-6">
                            <div className="w-[54px] h-[54px] rounded-full bg-[rgba(0,156,219,0.2)] flex items-center justify-center overflow-hidden relative">
                                <img src={assets.imgIcon1min} alt="" className="w-[55%] h-[55%] object-contain" />
                            </div>
                            <div>
                                <h3 className="text-[21px] font-bold mb-3">1-Minute Episodes</h3>
                                <p className="text-[17px] text-white/80 leading-relaxed">
                                    Perfectly paced narrative arcs delivered in under 60 seconds. No more endless scrolling for the good parts
                                </p>
                            </div>
                        </div>

                        {/* Value 2 - High-Impact Storytelling */}
                        <div className="flex flex-col items-start text-left gap-6">
                            <div className="w-[54px] h-[54px] rounded-full bg-[rgba(0,156,219,0.2)] flex items-center justify-center overflow-hidden relative">
                                <img src={assets.imgIconStorytelling} alt="" className="w-[55%] h-[55%] object-contain" />
                            </div>
                            <div>
                                <h3 className="text-[21px] font-bold mb-3">High-Impact Storytelling</h3>
                                <p className="text-[17px] text-white/80 leading-relaxed">
                                    Premium production values meet gripping scripts. Every second counts in our high-stakes dramas.
                                </p>
                            </div>
                        </div>

                        {/* Value 3 - Mobile-First Experience */}
                        <div className="flex flex-col items-start text-left gap-6">
                            <div className="w-[54px] h-[54px] rounded-full bg-[rgba(0,156,219,0.2)] flex items-center justify-center overflow-hidden relative">
                                <img src={assets.imgIconMobile} alt="" className="w-[55%] h-[55%] object-contain" />
                            </div>
                            <div>
                                <h3 className="text-[21px] font-bold mb-3">Mobile-First Experience</h3>
                                <p className="text-[17px] text-white/80 leading-relaxed">
                                    Optimized for vertical viewing. Our interface is as smooth as the stories we tell, built for your thumb.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="container mx-auto px-6 py-20 border-y border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="flex flex-col gap-2">
                            <span className="text-[40px] md:text-[56px] font-bold">10M+</span>
                            <span className="text-[18px] md:text-[20px] text-white/80">Downloads</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[40px] md:text-[56px] font-bold">500+</span>
                            <span className="text-[18px] md:text-[20px] text-white/80">Series</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[40px] md:text-[56px] font-bold">1B+</span>
                            <span className="text-[18px] md:text-[20px] text-white/80">Minute Watched</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[40px] md:text-[56px] font-bold">15+</span>
                            <span className="text-[18px] md:text-[20px] text-white/80">Series Every Week</span>
                        </div>
                    </div>
                </div>

                {/* Next Generation Section */}
                <div className="relative mt-20 pb-16">
                    <div className="container mx-auto px-6 text-center mb-16">
                        <h2 className="text-[40px] md:text-[53px] font-bold mb-4 leading-tight">
                            We are building the next<br />
                            generation of global entertainment.
                        </h2>
                        <p className="text-[20px] text-white/80">
                            Short-form isn't just a format, it's a new artistic language, we're here to define it.
                        </p>
                    </div>

                    {/* Show Posters Row */}
                    <div className="w-full">
                        <img src={assets.imgAboutCover} alt="FastTV Shows" className="w-full object-contain" />
                    </div>
                </div>


            </div>
        </div>
    );
}
