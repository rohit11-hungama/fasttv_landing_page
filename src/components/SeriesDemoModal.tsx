import { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/figma_assets';
import type { Show } from './ContentRow';
import { X, VolumeX, Volume2 } from 'lucide-react';
import StoreButtons from './StoreButtons';
import { useHlsVideo } from '../hooks/useHlsVideo';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import type { CarouselItem } from '../hooks/useHeroData';
import { ChevronDown } from 'lucide-react';

// ─── Unified playlist item type ────────────────────────────────────────────
export type FullViewItem =
    | { kind: 'rail'; title: string; image: string }
    | { kind: 'carousel'; item: CarouselItem };

// Helper utilities
function getItemThumb(item: FullViewItem): string {
    return item.kind === 'rail' ? item.image : item.item.filePath;
}
function getItemTitle(item: FullViewItem): string {
    return item.kind === 'rail' ? item.title : item.item.title;
}
function getItemVideoUrl(item: FullViewItem): string | null {
    if (item.kind === 'rail') return null;
    return item.item.trailer_url || item.item.preview_url || null;
}

// ─── Props ─────────────────────────────────────────────────────────────────
interface SeriesDemoModalProps {
    isOpen: boolean;
    onClose: (currentTime?: number) => void;
    /** New: unified playlist (rail item first, then carousel items) */
    playlist?: FullViewItem[];
    /** Legacy: hero carousel items */
    items?: CarouselItem[];
    initialIndex?: number;
    /** Legacy: single show */
    show?: Show | null;
    videoUrl?: string | null;
}

const ONELINK_URL = 'https://fasttv.onelink.me/jiWp/share';
const VISIBLE_THUMBS = 5;
const RAIL_DISPLAY_MS = 2500;

export default function SeriesDemoModal({
    isOpen,
    onClose,
    playlist,
    items = [],
    initialIndex = 0,
    show,
}: SeriesDemoModalProps) {
    const deviceOS = useDeviceDetect();
    const [isMobile, setIsMobile] = useState(false);
    const [activePlaylistIndex, setActivePlaylistIndex] = useState(0);
    const [showContent, setShowContent] = useState(false);

    // ── Is this device mobile? ───────────────────────────────────────────────
    useEffect(() => {
        const checkMobile = () => setIsMobile(deviceOS !== 'desktop' || window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [deviceOS]);

    // ── Build the unified playlist ───────────────────────────────────────────
    const resolvedPlaylist = useMemo<FullViewItem[]>(() => {
        if (playlist && playlist.length > 0) return playlist;
        if (items && items.length > 0) return items.map(item => ({ kind: 'carousel', item }));
        if (show) return [{ kind: 'rail', title: show.title, image: show.image }];
        return [];
    }, [playlist, items, show]);

    // Mobile feed: only carousel items (rail items are static-only, meaningless in vertical feed)
    const mobileItems = useMemo(
        () => resolvedPlaylist.filter((i): i is Extract<FullViewItem, { kind: 'carousel' }> => i.kind === 'carousel').map(i => i.item),
        [resolvedPlaylist]
    );

    // ── Active item derived values ───────────────────────────────────────────
    const activeItem = resolvedPlaylist[activePlaylistIndex] ?? null;
    const isRailActive = activeItem?.kind === 'rail';
    const activeVideoUrl = activeItem ? getItemVideoUrl(activeItem) : null;
    const activeThumb = activeItem ? getItemThumb(activeItem) : null;

    // ── Thumbnail sliding window ─────────────────────────────────────────────
    const visibleWindow = useMemo(() => {
        const total = resolvedPlaylist.length;
        if (total <= VISIBLE_THUMBS) return { start: 0, end: total };
        const center = Math.floor(VISIBLE_THUMBS / 2);
        const start = Math.max(0, Math.min(activePlaylistIndex - center, total - VISIBLE_THUMBS));
        return { start, end: start + VISIBLE_THUMBS };
    }, [activePlaylistIndex, resolvedPlaylist.length]);

    // ── Auto-advance on video end ────────────────────────────────────────────
    const handleVideoEnded = useCallback(() => {
        setActivePlaylistIndex(prev =>
            resolvedPlaylist.length > 1 ? (prev + 1) % resolvedPlaylist.length : prev
        );
    }, [resolvedPlaylist.length]);

    // ── Video hook ───────────────────────────────────────────────────────────
    const {
        videoRef: modalVideoRef,
        isPlaying: modalIsPlaying,
        isMuted: modalMuted,
        hasAudio: modalHasAudio,
        videoReady: modalVideoReady,
        togglePlay: toggleModalPlay,
        toggleMute: toggleModalMute,
    } = useHlsVideo({
        src: isOpen && !isMobile ? (activeVideoUrl ?? null) : null,
        autoPlay: true,
        initialMuted: false,
        onEnded: handleVideoEnded,
    });

    // ── Modal open/close effects ─────────────────────────────────────────────
    useEffect(() => {
        if (isOpen) {
            // Reset index: playlist mode always starts at 0; legacy items mode respects initialIndex
            setActivePlaylistIndex(playlist ? 0 : (initialIndex ?? 0));
            setShowContent(false);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen, playlist, initialIndex]);

    // Slide in QR panel after 1.5s
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isOpen && !showContent) {
            timer = setTimeout(() => setShowContent(true), 1500);
        }
        return () => clearTimeout(timer);
    }, [isOpen, showContent]);

    // ── 2.5s static-image timer for rail items ───────────────────────────────
    useEffect(() => {
        if (!isOpen || !isRailActive) return;
        const timer = setTimeout(() => {
            setActivePlaylistIndex(prev =>
                resolvedPlaylist.length > 1 ? Math.min(prev + 1, resolvedPlaylist.length - 1) : prev
            );
        }, RAIL_DISPLAY_MS);
        return () => clearTimeout(timer);
    }, [isOpen, isRailActive, activePlaylistIndex, resolvedPlaylist.length]);

    // ── Close handler ────────────────────────────────────────────────────────
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
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 z-[200] p-2 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 transition-colors text-white backdrop-blur-md"
                >
                    <X size={24} />
                </button>

                {isMobile ? (
                    /* ── MOBILE VERTICAL FEED ── */
                    <div className="flex-1 overflow-y-auto scroll-smooth snap-y snap-mandatory scrollbar-hide h-full">
                        {mobileItems.length > 0 ? (
                            mobileItems.map((item, idx) => (
                                <MobileFeedItem
                                    key={item.path}
                                    item={item}
                                    isVisible={isOpen}
                                    isActive={idx === 0}
                                />
                            ))
                        ) : (
                            /* Rail-only: show the static image */
                            resolvedPlaylist.filter(i => i.kind === 'rail').map((item, idx) => (
                                <div key={idx} className="h-full w-full snap-start snap-always flex items-center justify-center bg-black">
                                    <img src={getItemThumb(item)} alt={getItemTitle(item)} className="max-h-full max-w-full object-contain" />
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    /* ── DESKTOP LAYOUT ── */
                    <div
                        className="relative flex-1 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
                        onClick={handleClose}
                    >
                        {/* Background glows */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
                        </div>

                        <div
                            className="relative z-[105] w-full max-w-7xl mx-auto px-6 flex items-center h-full gap-8 lg:gap-14 cursor-default"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* ── LEFT: Thumbnail Strip ── */}
                            {resolvedPlaylist.length > 1 && (
                                <div className="hidden md:flex flex-col gap-3 flex-shrink-0 items-center">
                                    {resolvedPlaylist.slice(visibleWindow.start, visibleWindow.end).map((item, i) => {
                                        const actualIndex = visibleWindow.start + i;
                                        const thumb = getItemThumb(item);
                                        const isActive = activePlaylistIndex === actualIndex;
                                        return (
                                            <button
                                                key={actualIndex}
                                                onClick={() => setActivePlaylistIndex(actualIndex)}
                                                className={`relative w-[58px] h-[78px] lg:w-[70px] lg:h-[95px] rounded-lg overflow-hidden transition-all duration-300 border-2 flex-shrink-0 ${isActive
                                                    ? 'border-[#009cdb] scale-110 shadow-lg shadow-[#009cdb]/30'
                                                    : 'border-transparent opacity-50 hover:opacity-90 hover:scale-105'
                                                    }`}
                                            >
                                                <img src={thumb} alt={getItemTitle(item)} className="w-full h-full object-cover" />
                                                {isActive && <div className="absolute inset-0 bg-[#009cdb]/20" />}
                                                {/* Rail badge */}
                                                {item.kind === 'rail' && (
                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[8px] text-white text-center py-[2px] font-semibold">PREVIEW</div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* ── CENTER: Phone Player ── */}
                            <div className="flex items-center justify-center flex-1">
                                <motion.div
                                    layout
                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                    className="relative shrink-0"
                                >
                                    <motion.div
                                        className={`relative aspect-[9/16] rounded-[24px] border-2 border-white/20 overflow-hidden shadow-2xl transition-all duration-400 ease-in-out ${showContent
                                            ? 'w-[260px] md:w-[300px] lg:w-[330px]'
                                            : 'w-[300px] md:w-[380px] lg:w-[420px]'
                                            }`}
                                    >
                                        {/* Static artwork — shown for rail items (always) and as crossfade cover for carousel */}
                                        {activeThumb && (
                                            <img
                                                src={activeThumb}
                                                alt={activeItem ? getItemTitle(activeItem) : ''}
                                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-[2]"
                                                style={{ opacity: isRailActive ? 1 : (modalVideoReady ? 0 : 1) }}
                                            />
                                        )}

                                        {/* Video — only for carousel items */}
                                        {!isRailActive && activeVideoUrl && (
                                            <>
                                                <video
                                                    ref={modalVideoRef}
                                                    className="w-full h-full object-cover z-[1]"
                                                    playsInline
                                                    loop={resolvedPlaylist.length === 1}
                                                />
                                                {!modalIsPlaying && (
                                                    <div
                                                        className="absolute inset-0 flex items-center justify-center z-[10] cursor-pointer bg-black/20"
                                                        onClick={e => { e.stopPropagation(); toggleModalPlay(); }}
                                                    >
                                                        <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:scale-110 transition-transform">
                                                            <svg className="w-10 h-10 fill-white ml-1" viewBox="0 0 24 24">
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* Rail item: no video source. The static image + progress bar is enough */}
                                        {isRailActive && activeVideoUrl === null && (
                                            // Fade overlay so the poster doesn't look too flat
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[3] pointer-events-none" />
                                        )}

                                        {/* Mute button — only for carousel items with audio */}
                                        {!isRailActive && activeVideoUrl && modalHasAudio && (
                                            <button
                                                onClick={toggleModalMute}
                                                className="absolute bottom-10 right-4 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                            >
                                                {modalMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                            </button>
                                        )}

                                        {/* 2.5s Progress bar — only for rail (static) items */}
                                        {isRailActive && (
                                            <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-white/20 z-30">
                                                <motion.div
                                                    key={`progress-${activePlaylistIndex}`}
                                                    className="h-full bg-[#009cdb] origin-left"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: RAIL_DISPLAY_MS / 1000, ease: 'linear' }}
                                                    style={{ transformOrigin: 'left' }}
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* ── RIGHT: QR + Download ── */}
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 80 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 80 }}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
                                        className="flex flex-col items-center md:items-start max-w-md text-white flex-shrink-0"
                                    >
                                        <div className="mb-8 flex flex-col items-center md:items-start text-center md:text-left">
                                            <div className="bg-white p-3 rounded-[20px] mb-4 w-[132px] h-[132px] md:w-[160px] md:h-[160px] shadow-lg">
                                                <img src={assets.imgQrCodeForMobileEnglishWikipedia1} alt="QR Code" className="w-full h-full object-contain" />
                                            </div>
                                            <p className="text-sm md:text-base text-gray-300">Scan to download FastTV</p>
                                        </div>

                                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-center md:text-left">
                                            Watch the Full Story<br />on FastTV
                                        </h1>
                                        <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed text-center md:text-left">
                                            Download the FastTV app to watch the complete series with full episodes and uninterrupted storytelling.
                                        </p>

                                        <StoreButtons
                                            className="justify-center md:justify-start"
                                            buttonClassName="h-[42px] w-[135px] hover:scale-105 transition-transform inline-flex shrink-0"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}

// ─── Mobile Feed Item ───────────────────────────────────────────────────────
function MobileFeedItem({ item, isActive }: { item: CarouselItem; isVisible: boolean; isActive: boolean }) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const containerRef = { current: null as HTMLDivElement | null };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),
            { threshold: 0.6 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isActive && containerRef.current) containerRef.current.scrollIntoView();
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
            ref={el => { containerRef.current = el; }}
            className="relative h-full w-full snap-start snap-always shrink-0 overflow-hidden bg-black"
        >
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
                        <video ref={videoRef} className="w-full h-full object-cover" playsInline loop />
                    </>
                ) : (
                    <img src={item.filePath} alt={item.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="absolute inset-0 z-[5]" onClick={togglePlay} />

            <div className="absolute inset-x-0 bottom-0 z-10 p-6 pb-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="flex flex-col items-start pointer-events-auto"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">{item.title}</h2>
                    <p className="text-[#009cdb] text-base font-medium mb-6">{item.content_genre || 'Drama'}</p>
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

            <button
                onClick={e => { e.stopPropagation(); toggleMute(); }}
                className="absolute bottom-28 right-6 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        <svg className="w-8 h-8 fill-white ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                </div>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-40">
                <ChevronDown className="text-white" size={24} />
            </div>
        </div>
    );
}
