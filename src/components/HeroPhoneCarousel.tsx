import { useState, useEffect, useMemo, useCallback } from 'react';
import { assets } from '../assets/figma_assets';
import { Volume2, VolumeX, Play, Pause, Maximize2 } from 'lucide-react';
import { useHlsVideo } from '../hooks/useHlsVideo';
import SeriesDemoModal from './SeriesDemoModal';
import type { CarouselItem } from '../hooks/useHeroData';

interface HeroPhoneCarouselProps {
    carouselItems: CarouselItem[];
    isLoading: boolean;
}

const VISIBLE_THUMBS = 5;
const ARTWORK_DISPLAY_MS = 1200;

export default function HeroPhoneCarousel({ carouselItems, isLoading }: HeroPhoneCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showArtwork, setShowArtwork] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalItems = carouselItems.length;

    const activeItem = carouselItems[activeIndex];
    const activeVideoUrl = activeItem?.trailer_url || activeItem?.preview_url || null;

    // Advance to next when video finishes
    const handleVideoEnded = useCallback(() => {
        setShowArtwork(true);
        setActiveIndex(prev => (prev + 1) % totalItems);
    }, [totalItems]);

    const {
        videoRef,
        isPlaying,
        isMuted,
        videoReady,
        showPlayBtn,
        hasAudio,
        togglePlay,
        toggleMute,
        pause,
        play,
        seekTo,
    } = useHlsVideo({
        src: isModalOpen ? null : activeVideoUrl,
        onEnded: handleVideoEnded
    });

    // When activeIndex changes, show artwork first
    useEffect(() => { setShowArtwork(true); }, [activeIndex]);

    // Crossfade: once video is ready + artwork shown long enough, fade to video
    useEffect(() => {
        if (!videoReady || !showArtwork) return;
        const timer = setTimeout(() => setShowArtwork(false), ARTWORK_DISPLAY_MS);
        return () => clearTimeout(timer);
    }, [videoReady, showArtwork]);

    const handleThumbnailClick = (index: number) => {
        setShowArtwork(true);
        setActiveIndex(index);
    };

    const handlePhoneClick = useCallback(() => {
        togglePlay();
    }, [togglePlay]);


    // Expand: pause phone video, open modal
    const handleExpand = useCallback(() => {
        pause();
        setIsModalOpen(true);
    }, [pause]);

    // Collapse: resume phone video from modal's position
    const handleCloseModal = useCallback((currentTime?: number) => {
        setIsModalOpen(false);
        if (currentTime != null && currentTime > 0) {
            seekTo(currentTime);
        }
        play();
    }, [seekTo, play]);


    // Sliding window
    const visibleWindow = useMemo(() => {
        if (totalItems <= VISIBLE_THUMBS) return { start: 0, end: totalItems };
        const center = Math.floor(VISIBLE_THUMBS / 2);
        const start = Math.max(0, Math.min(activeIndex - center, totalItems - VISIBLE_THUMBS));
        return { start, end: start + VISIBLE_THUMBS };
    }, [activeIndex, totalItems]);

    return (
        <>
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 h-full">
                {/* Phone Mockup Container */}
                <div className="relative w-[250px] h-[500px] md:w-[300px] md:h-[600px] lg:w-[393px] lg:h-[786px] z-10 flex items-center justify-center transition-all duration-300">
                    {/* Phone Frame */}
                    <img
                        src={assets.mobileFrame}
                        alt="iPhone Frame"
                        className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none drop-shadow-2xl"
                    />

                    {/* Content Container — artwork + video stacked for crossfade */}
                    <div
                        className="relative w-[90%] h-[96%] bg-black rounded-[25px] md:rounded-[32px] lg:rounded-[40px] overflow-hidden z-10 cursor-pointer"
                        onClick={handlePhoneClick}
                    >
                        {isLoading ? (
                            <div className="absolute inset-0 bg-gray-900 animate-pulse" />
                        ) : (
                            <>
                                {/* Static Artwork — always rendered, fades out when video ready */}
                                {activeItem?.filePath && (
                                    <img
                                        src={activeItem.filePath}
                                        alt={activeItem.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-[2]"
                                        style={{ opacity: showArtwork ? 1 : 0 }}
                                    />
                                )}

                                {/* Video — underneath artwork, becomes visible as artwork fades */}
                                {activeVideoUrl && (
                                    <video
                                        ref={videoRef}
                                        className="absolute inset-0 w-full h-full object-cover z-[1]"
                                        playsInline
                                    />
                                )}
                            </>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/10 pointer-events-none z-[3]" />

                        {/* Centered Play/Pause — auto-hides */}
                        {activeVideoUrl && !isLoading && (
                            <div
                                className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 ${showPlayBtn ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                            >
                                <button
                                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                                    className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-black/70 hover:scale-110 transition-all duration-200 shadow-xl"
                                    title={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-1" />}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Bottom Gradient Fade */}
                    <div className="absolute bottom-[-2px] left-[-2px] right-[-2px] h-[150px] md:h-[200px] lg:h-[240px] bg-gradient-to-t from-[#040406] via-[#040406] to-transparent z-30 pointer-events-none" />

                    {/* Control Buttons — stacked vertically */}
                    {activeVideoUrl && !isLoading && (
                        <div className="absolute bottom-[120px] md:bottom-[150px] lg:bottom-[180px] right-[20px] md:right-[25px] lg:right-[35px] z-40 flex flex-col gap-2">
                            {/* Mute/Unmute — only for trailer videos with audio */}
                            {hasAudio && (
                                <button
                                    onClick={toggleMute}
                                    className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200 shadow-lg"
                                    title={isMuted ? 'Unmute' : 'Mute'}
                                >
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                            )}

                            {/* Expand — opens modal with QR */}
                            <button
                                onClick={handleExpand}
                                className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200 shadow-lg"
                                title="Expand"
                            >
                                <Maximize2 size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Vertical Thumbs */}
                <div className="hidden md:flex flex-col gap-4 lg:gap-5">
                    {carouselItems.slice(visibleWindow.start, visibleWindow.end).map((item, i) => {
                        const actualIndex = visibleWindow.start + i;
                        return (
                            <button
                                key={item.path}
                                onClick={() => handleThumbnailClick(actualIndex)}
                                className={`relative w-[50px] h-[70px] lg:w-[70px] lg:h-[95px] rounded-lg overflow-hidden transition-all duration-300 border-2 flex-shrink-0 ${activeIndex === actualIndex ? 'border-[#009cdb] scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <img src={item.filePath} alt={item.title} className="w-full h-full object-cover" />
                                {activeIndex === actualIndex && (
                                    <div className="absolute inset-0 bg-[#009cdb]/20" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Expand Modal */}
            <SeriesDemoModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                items={carouselItems}
                initialIndex={activeIndex}
            />
        </>
    );
}
