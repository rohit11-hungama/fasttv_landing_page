import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/figma_assets';
import type { Show } from './ContentRow';
import { X, VolumeX, Volume2, ChevronDown } from 'lucide-react';
import StoreButtons from './StoreButtons';
import { useHlsVideo } from '../hooks/useHlsVideo';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import type { CarouselItem } from '../hooks/useHeroData';

interface SeriesDemoModalProps {
    isOpen: boolean;
    onClose: (currentTime?: number) => void;
    items?: CarouselItem[];
    initialIndex?: number;
    // Legacy props for single show compatibility if needed
    show?: Show | null;
    videoUrl?: string | null;
}

const ONELINK_URL = 'https://fasttv.onelink.me/jiWp/share';

export default function SeriesDemoModal({
    isOpen,
    onClose,
    items = [],
    initialIndex = 0,
    show,
    videoUrl: legacyVideoUrl
}: SeriesDemoModalProps) {
    const deviceOS = useDeviceDetect();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(deviceOS !== 'desktop' || window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [deviceOS]);

    // Desktop: Uses existing single-item logic
    // For desktop we use the initial index's item
    const desktopItem = items[initialIndex] || (show ? { title: show.title, filePath: show.image, trailer_url: legacyVideoUrl } : null);
    const desktopVideoUrl = desktopItem?.trailer_url || desktopItem?.preview_url || legacyVideoUrl;

    const {
        videoRef: modalVideoRef,
        isPlaying: modalIsPlaying,
        isMuted: modalMuted,
        hasAudio: modalHasAudio,
        videoReady: modalVideoReady,
        togglePlay: toggleModalPlay,
        toggleMute: toggleModalMute,
    } = useHlsVideo({
        src: isOpen && !isMobile ? (desktopVideoUrl ?? null) : null,
        autoPlay: true,
        initialMuted: false,
    });

    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowContent(false);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isOpen && !showContent) {
            timer = setTimeout(() => {
                setShowContent(true);
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [isOpen, showContent]);

    const handleClose = useCallback(() => {
        const time = modalVideoRef.current?.currentTime;
        onClose(time);
    }, [onClose, modalVideoRef]);

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] bg-black overflow-hidden flex flex-col"
            >
                {/* Close Button — always on top */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 z-[200] p-2 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 transition-colors text-white backdrop-blur-md"
                >
                    <X size={24} />
                </button>

                {isMobile ? (
                    /* MOBILE VERTICAL FEED */
                    <div className="flex-1 overflow-y-auto scroll-smooth snap-y snap-mandatory scrollbar-hide h-full">
                        {items.map((item, idx) => (
                            <MobileFeedItem
                                key={item.path}
                                item={item}
                                isVisible={isOpen} // Will be refined with IntersectionObserver if needed
                                isActive={idx === initialIndex}
                            />
                        ))}
                    </div>
                ) : (
                    /* EXISTING DESKTOP LAYOUT */
                    <div className="relative flex-1 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer" onClick={handleClose}>
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
                        </div>

                        <div
                            className="relative z-[105] w-full max-w-6xl mx-auto px-6 flex items-center justify-center h-full cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={`flex items-center gap-8 md:gap-16 lg:gap-24 transition-all duration-700 ease-in-out ${showContent ? 'flex-col md:flex-row' : 'justify-center'}`}>
                                <motion.div
                                    layout
                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                    className="relative shrink-0"
                                >
                                    <motion.div
                                        className={`relative aspect-[9/16] rounded-[24px] border-2 border-white/20 overflow-hidden shadow-2xl transition-all duration-400 ease-in-out ${showContent
                                            ? 'w-[280px] md:w-[320px] lg:w-[350px]'
                                            : 'w-[320px] md:w-[400px] lg:w-[450px]'
                                            }`}
                                    >
                                        {desktopVideoUrl ? (
                                            <>
                                                {desktopItem?.filePath && (
                                                    <img
                                                        src={desktopItem.filePath}
                                                        alt={desktopItem.title}
                                                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-[2]"
                                                        style={{ opacity: modalVideoReady ? 0 : 1 }}
                                                    />
                                                )}
                                                <video
                                                    ref={modalVideoRef}
                                                    className="w-full h-full object-cover z-[1]"
                                                    playsInline
                                                    loop
                                                />
                                                {!modalIsPlaying && (
                                                    <div
                                                        className="absolute inset-0 flex items-center justify-center z-[10] cursor-pointer bg-black/20"
                                                        onClick={(e) => { e.stopPropagation(); toggleModalPlay(); }}
                                                    >
                                                        <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:scale-110 transition-transform">
                                                            <svg className="w-10 h-10 fill-white ml-1" viewBox="0 0 24 24">
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <img
                                                src={desktopItem?.filePath}
                                                alt={desktopItem?.title || 'Show poster'}
                                                className="w-full h-full object-cover"
                                            />
                                        )}

                                        {desktopVideoUrl && modalHasAudio && (
                                            <button
                                                onClick={toggleModalMute}
                                                className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                            >
                                                {modalMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                            </button>
                                        )}
                                    </motion.div>
                                </motion.div>

                                <AnimatePresence>
                                    {showContent && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 80 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 80 }}
                                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
                                            className="flex flex-col items-center md:items-start max-w-lg text-white"
                                        >
                                            <div className="mb-8 flex flex-col items-center md:items-start text-center md:text-left">
                                                <div className="bg-white p-3 rounded-[20px] mb-4 w-[132px] h-[132px] md:w-[165px] md:h-[165px] shadow-lg">
                                                    <img src={assets.imgQrCodeForMobileEnglishWikipedia1} alt="QR Code" className="w-full h-full object-contain" />
                                                </div>
                                                <p className="text-sm md:text-base text-gray-300">Scan to download FastTV</p>
                                            </div>

                                            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-center md:text-left">
                                                Watch the Full Story<br />on FastTV
                                            </h1>
                                            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed text-center md:text-left">
                                                Download the FastTV app to watch the complete series with full episodes and uninterrupted storytelling.
                                            </p>

                                            <StoreButtons className="justify-center md:justify-start" buttonClassName="h-[42px] w-[135px] hover:scale-105 transition-transform inline-flex shrink-0" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}

/**
 * Single feed item for the mobile vertical scroll
 */
function MobileFeedItem({ item, isActive }: { item: CarouselItem; isVisible: boolean; isActive: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),
            { threshold: 0.6 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Scroll into view if it was the initial active item
    useEffect(() => {
        if (isActive && containerRef.current) {
            containerRef.current.scrollIntoView();
        }
    }, [isActive]);

    const videoUrl = item.trailer_url || item.preview_url;
    const {
        videoRef,
        videoReady,
        isMuted,
        toggleMute,
        isPlaying,
        togglePlay
    } = useHlsVideo({
        src: isIntersecting ? (videoUrl ?? null) : null,
        autoPlay: true,
        initialMuted: false,
    });

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full snap-start snap-always shrink-0 overflow-hidden bg-black"
        >
            {/* Background Video/Artwork */}
            <div className="absolute inset-0 z-0">
                {videoUrl ? (
                    <>
                        {item.filePath && (
                            <img
                                src={item.filePath}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-[1]"
                                style={{ opacity: videoReady ? 0 : 1 }}
                            />
                        )}
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            playsInline
                            loop
                        />
                    </>
                ) : (
                    <img
                        src={item.filePath}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                )}
                {/* Dark Overlays */}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Tap to Play/Pause Area */}
            <div className="absolute inset-0 z-[5]" onClick={togglePlay} />

            {/* Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 pb-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="flex flex-col items-start pointer-events-auto"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">{item.title}</h2>
                    <p className="text-[#009cdb] text-base font-medium mb-6">
                        {item.content_genre || 'Drama'}
                    </p>

                    {/* Compact Download CTA */}
                    <a
                        href={ONELINK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#009cdb] hover:bg-[#0087bf] text-white px-8 py-3 rounded-full font-bold text-lg transition-transform active:scale-95 shadow-lg flex items-center gap-2"
                    >
                        Download Now
                    </a>
                </motion.div>
            </div>

            {/* Mute Button Overlay */}
            <button
                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                className="absolute bottom-28 right-6 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Play Indicator Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        <svg className="w-8 h-8 fill-white ml-1" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-40">
                <ChevronDown className="text-white" size={24} />
            </div>
        </div>
    );
}
