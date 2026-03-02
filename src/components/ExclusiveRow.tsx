
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Maximize2 } from 'lucide-react';
import type { Show } from './ContentRow';

interface ExclusiveRowProps {
    title: string;
    shows: Show[];
    onShowClick?: (show: Show) => void;
}

const ExclusiveCard = ({ show, onClick }: { show: Show; onClick: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer group/card"
        >
            {/* Main Container - 9:16 Ratio approx */}
            <motion.div
                className="relative w-[207px] h-[368px] md:w-[230px] md:h-[407px] flex-shrink-0 rounded-[12px] overflow-hidden border border-white/10 bg-[#1a1a1a]"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.3 }}
            >
                {/* Video Layer (Base) */}
                {show.videoUrl && (
                    <video
                        ref={videoRef}
                        src={show.videoUrl}
                        className="absolute inset-0 w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                    />
                )}

                {/* Image Layer (Overlay) - Fades out on hover */}
                <motion.div
                    className="absolute inset-0 z-10"
                    animate={{ opacity: isHovered ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <img
                        src={show.image}
                        alt={show.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </motion.div>

                {/* Expand Icon - Visible on hover */}
                <motion.div
                    className="absolute bottom-4 right-4 z-20 w-[36px] h-[36px] rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                    transition={{ duration: 0.2 }}
                >
                    <Maximize2 size={18} className="text-white" />
                </motion.div>

                {/* Title Gradient - Always visible but adjusts */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                {/* Logo or Title */}
                {show.logo ? (
                    <img
                        src={show.logo}
                        alt={show.title}
                        className={`absolute bottom-4 left-1/2 -translate-x-1/2 origin-bottom-left z-20 w-auto object-contain drop-shadow-md transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover/card:left-[20px] group-hover/card:translate-x-0 group-hover/card:scale-50 ${show.logoClassName || 'h-[55px]'}`}
                    />
                ) : (
                    <div className="absolute bottom-6 left-0 right-0 z-20 pointer-events-none flex justify-center px-4">
                        <h3 className="text-[16px] font-bold text-white leading-tight drop-shadow-md text-center">
                            {show.title}
                        </h3>
                    </div>
                )}

            </motion.div>
        </div>
    );
};

export default function ExclusiveRow({ title, shows, onShowClick }: ExclusiveRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="pt-4 pb-12 space-y-6 relative group/row z-20">
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center mb-[24px]">
                <h2 className="text-[21px] md:text-[24px] font-bold text-white flex items-center gap-2 group cursor-pointer whitespace-nowrap">
                    {title}
                </h2>
                <div className="hidden md:flex gap-4">
                    <button
                        onClick={() => scroll('left')}
                        className="w-[40px] h-[40px] rounded-full border border-white/20 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-[40px] h-[40px] rounded-full border border-white/20 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="relative">
                <div
                    ref={rowRef}
                    className="flex overflow-x-auto gap-[10px] md:gap-[20px] pb-8 pt-4 scrollbar-hide scroll-smooth no-scrollbar px-4 md:px-6 xl:px-[calc((100vw-1280px)/2+24px)] 2xl:px-[calc((100vw-1536px)/2+24px)]"
                >
                    {shows.map((show) => (
                        <ExclusiveCard
                            key={show.id}
                            show={show}
                            onClick={() => onShowClick?.(show)}
                        />
                    ))}
                    <div className="min-w-[20px] shrink-0" />
                </div>
            </div>
        </div>
    );
}
