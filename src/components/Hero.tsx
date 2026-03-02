import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, Maximize2 } from 'lucide-react';
import { assets } from '../assets/figma_assets';
import HeroPhoneCarousel from './HeroPhoneCarousel';
import StoreButtons from './StoreButtons';
import SeriesDemoModal from './SeriesDemoModal';
import { useHeroData } from '../hooks/useHeroData';
import { useHlsVideo } from '../hooks/useHlsVideo';
import type { Show } from './ContentRow';

const ARTWORK_DISPLAY_MS = 1200;

export default function Hero() {
    const { carouselItems, isLoading } = useHeroData();
    const totalItems = carouselItems.length;

    // Mobile carousel state
    const [mobileIndex, setMobileIndex] = useState(0);
    const [showArtwork, setShowArtwork] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mobileItem = carouselItems[mobileIndex];
    const videoUrl = mobileItem?.trailer_url || mobileItem?.preview_url || null;

    // Advance on video end
    const handleVideoEnded = useCallback(() => {
        setShowArtwork(true);
        setMobileIndex(prev => (prev + 1) % totalItems);
    }, [totalItems]);

    const {
        videoRef: mobileVideoRef,
        isPlaying,
        isMuted,
        videoReady,
        showPlayBtn,
        hasAudio,
        togglePlay,
        toggleMute,
        pause,
        play,
        getCurrentTime,
        seekTo,
    } = useHlsVideo({ src: videoUrl, onEnded: handleVideoEnded });

    // Reset artwork on index change
    useEffect(() => { setShowArtwork(true); }, [mobileIndex]);

    // Crossfade when video ready
    useEffect(() => {
        if (!videoReady || !showArtwork) return;
        const timer = setTimeout(() => setShowArtwork(false), ARTWORK_DISPLAY_MS);
        return () => clearTimeout(timer);
    }, [videoReady, showArtwork]);

    const handlePhoneClick = useCallback(() => {
        togglePlay();
    }, [togglePlay]);

    // Track start time for modal video
    const [modalStartTime, setModalStartTime] = useState(0);

    // Expand: pause phone video, capture time, open modal
    const handleExpand = useCallback(() => {
        pause();
        const t = getCurrentTime();
        setModalStartTime(t);
        setIsModalOpen(true);
    }, [pause, getCurrentTime]);

    // Collapse: resume phone video from modal's position
    const handleCloseModal = useCallback((currentTime?: number) => {
        setIsModalOpen(false);
        if (currentTime != null && currentTime > 0) {
            seekTo(currentTime);
        }
        play();
    }, [seekTo, play]);

    // Bridge CarouselItem → Show for modal
    const modalShow: Show | null = mobileItem ? {
        id: mobileIndex,
        title: mobileItem.title,
        image: mobileItem.filePath,
    } : null;

    return (
        <>
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

                        {/* Phone Mockup with Crossfade Video */}
                        <motion.div
                            className="relative mt-6 w-[306px] mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Phone Container */}
                            <div
                                className="relative w-[306px] h-[588px] bg-black border-[4.2px] border-white/[0.09] rounded-[22px] overflow-hidden cursor-pointer"
                                onClick={handlePhoneClick}
                            >
                                {isLoading ? (
                                    <div className="absolute inset-0 bg-gray-900 animate-pulse" />
                                ) : (
                                    <>
                                        {/* Static Artwork — fades out when video ready */}
                                        {mobileItem?.filePath && (
                                            <img
                                                src={mobileItem.filePath}
                                                alt={mobileItem.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-[2]"
                                                style={{ opacity: showArtwork ? 1 : 0 }}
                                            />
                                        )}

                                        {/* Video — underneath artwork */}
                                        {videoUrl && (
                                            <video
                                                ref={mobileVideoRef}
                                                className="absolute inset-0 w-full h-full object-cover z-[1]"
                                                playsInline
                                            />
                                        )}
                                    </>
                                )}

                                {/* Centered Play/Pause — auto-hides */}
                                {videoUrl && !isLoading && (
                                    <div
                                        className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 ${showPlayBtn ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                    >
                                        <button
                                            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                                            className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-black/70 hover:scale-110 transition-all duration-200 shadow-xl"
                                            title={isPlaying ? 'Pause' : 'Play'}
                                        >
                                            {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-1" />}
                                        </button>
                                    </div>
                                )}

                                {/* Bottom gradient inside phone */}
                                <div className="absolute bottom-0 left-0 right-0 h-[270px] bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 pointer-events-none z-[3]" />
                            </div>

                            {/* Control Buttons — stacked vertically */}
                            {videoUrl && !isLoading && (
                                <div className="absolute bottom-[120px] right-[12px] z-40 flex flex-col gap-2">
                                    {/* Mute/Unmute — only for trailer videos with audio */}
                                    {hasAudio && (
                                        <button
                                            onClick={toggleMute}
                                            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200 shadow-lg"
                                            title={isMuted ? 'Unmute' : 'Mute'}
                                        >
                                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                        </button>
                                    )}

                                    {/* Expand — opens modal with QR */}
                                    <button
                                        onClick={handleExpand}
                                        className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200 shadow-lg"
                                        title="Expand"
                                    >
                                        <Maximize2 size={16} />
                                    </button>
                                </div>
                            )}
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
                            <HeroPhoneCarousel
                                carouselItems={carouselItems}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Expand Modal */}
            <SeriesDemoModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                show={modalShow}
                videoUrl={videoUrl}
                startTime={modalStartTime}
            />
        </>
    );
}
