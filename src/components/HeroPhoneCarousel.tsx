import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/figma_assets';

// Carousel Data (Using available assets)
// Carousel Data (Using available assets)
const carouselData = [
    { id: 1, image: assets.imgRectangle5, title: "Damaged 3" },
    { id: 2, image: assets.imgRectangle14, title: "Flight Attendant" },
    { id: 3, image: assets.imgRectangle16, title: "Red Room" },
];

export default function HeroPhoneCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-play
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % carouselData.length);
        }, 7200); // Change slide every 7.2 seconds

        return () => clearInterval(interval);
    }, []);

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 h-full">
            {/* Phone Mockup Container */}
            <div className="relative w-[250px] h-[500px] md:w-[300px] md:h-[600px] lg:w-[393px] lg:h-[786px] z-10 flex items-center justify-center transition-all duration-300">
                {/* Phone Frame Image */}
                <img
                    src={assets.mobileFrame}
                    alt="iPhone Frame"
                    className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none drop-shadow-2xl"
                />

                {/* Video Content Container - Positioned to fit inside the frame */}
                {/* Adjusting width/height/rounding to fit standard mobile frame assets */}
                <div className="relative w-[90%] h-[96%] bg-black rounded-[25px] md:rounded-[32px] lg:rounded-[40px] overflow-hidden z-10">
                    <video
                        src={assets.videoHero}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                    {/* Overlay for video integration */}
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Bottom Gradient Fade - Blends phone into background */}
                <div className="absolute bottom-[-2px] left-[-2px] right-[-2px] h-[150px] md:h-[200px] lg:h-[240px] bg-gradient-to-t from-[#040406] via-[#040406] to-transparent z-30 pointer-events-none" />
            </div>

            {/* Vertical Thumbs Navigation - Hidden on small mobile, visible on md+ */}
            <div className="hidden md:flex flex-col gap-4 lg:gap-6">
                {carouselData.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative w-[50px] h-[70px] lg:w-[70px] lg:h-[95px] rounded-lg overflow-hidden transition-all duration-300 border-2 ${activeIndex === index ? 'border-[#009cdb] scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                    >
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />

                        {/* Active Indicator Overlay */}
                        {activeIndex === index && (
                            <div className="absolute inset-0 bg-[#009cdb]/20" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
