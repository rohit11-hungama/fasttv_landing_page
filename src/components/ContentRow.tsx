import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';


export interface Show {
    id: number;
    title: string;
    image: string;
    category?: string;
    isNew?: boolean;
    videoUrl?: string;
    logo?: string;
    logoClassName?: string;
}

interface ContentRowProps {
    title: string;
    shows: Show[];
    onShowClick?: (show: Show) => void;
}

export default function ContentRow({ title, shows, onShowClick }: ContentRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="pt-12 pb-8 space-y-4 relative group/row">
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center mb-[24px]">
                <h2 className="text-lg md:text-[21px] font-bold text-white flex items-center gap-2 group cursor-pointer whitespace-nowrap">
                    {title}
                </h2>
                <div className="hidden md:flex gap-4">
                    <button
                        onClick={() => scroll('left')}
                        className="w-[34px] h-[34px] rounded-full border border-white/20 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-[34px] h-[34px] rounded-full border border-white/20 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="relative">
                {/* Scroll Container */}
                <div
                    ref={rowRef}
                    className="flex overflow-x-auto gap-[10px] md:gap-[18px] pb-4 pt-4 scrollbar-hide scroll-smooth no-scrollbar px-4 md:px-6 xl:px-[calc((100vw-1280px)/2+24px)] 2xl:px-[calc((100vw-1536px)/2+24px)]"
                >
                    {shows.map((show) => (
                        <div
                            key={show.id}
                            onClick={() => onShowClick?.(show)}
                        >
                            <motion.div
                                className="relative w-[150px] h-[225px] md:w-[170px] md:h-[255px] flex-shrink-0 rounded-[8px] overflow-hidden cursor-pointer group/card border border-white/10"
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <img
                                    src={show.image}
                                    alt={show.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />

                                {/* Recently Added Badge */}
                                {show.isNew && (
                                    <div className="absolute top-[5px] left-[5px] bg-[#009cdb] px-[7px] py-[4px] rounded-[3px] border border-[rgba(27,87,111,0.4)]">
                                        <p className="text-[11px] font-bold text-white leading-none">⚡️ Recently Added</p>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <h3 className="text-[15px] font-medium text-white leading-tight">
                                        {show.title}
                                    </h3>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                    <div className="min-w-[20px] shrink-0" />
                </div>
            </div>
        </div>
    );
}
