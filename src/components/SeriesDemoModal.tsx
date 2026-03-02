
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/figma_assets';
import type { Show } from './ContentRow';
import { X, VolumeX, Volume2 } from 'lucide-react';
import StoreButtons from './StoreButtons';
import { useHlsVideo } from '../hooks/useHlsVideo';

interface SeriesDemoModalProps {
    isOpen: boolean;
    onClose: (currentTime?: number) => void;
    show: Show | null;
    /** If provided, plays video instead of static poster */
    videoUrl?: string | null;
    /** Time (seconds) to start playback from */
    startTime?: number;
}

export default function SeriesDemoModal({ isOpen, onClose, show, videoUrl, startTime }: SeriesDemoModalProps) {
    const [showContent, setShowContent] = useState(false);

    // Video playback inside modal (only when videoUrl provided)
    const {
        videoRef: modalVideoRef,
        isMuted: modalMuted,
        hasAudio: modalHasAudio,
        toggleMute: toggleModalMute,
    } = useHlsVideo({
        src: isOpen ? (videoUrl ?? null) : null,
        autoPlay: true,
        startTime,
    });

    // Reset state when modal opens
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

    // Auto transition: after 1.5 seconds, shift poster left and show content
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isOpen && !showContent) {
            timer = setTimeout(() => {
                setShowContent(true);
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [isOpen, showContent]);

    // Close handler — report currentTime back to parent
    const handleClose = useCallback(() => {
        const time = modalVideoRef.current?.currentTime;
        onClose(time);
    }, [onClose, modalVideoRef]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                    >
                        <X size={24} />
                    </button>

                    {/* Background Effects */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
                    </div>

                    {/* Unified Layout Container */}
                    <div className="relative z-[105] w-full max-w-6xl mx-auto px-6 flex items-center justify-center h-full">
                        <div className={`flex items-center gap-8 md:gap-16 lg:gap-24 transition-all duration-700 ease-in-out ${showContent ? 'flex-col md:flex-row' : 'justify-center'}`}>

                            {/* Show Poster / Video - shifts left */}
                            <motion.div
                                layout
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                className="relative shrink-0"
                            >
                                <motion.div
                                    layout
                                    className={`relative aspect-[9/16] rounded-[24px] border-2 border-white/20 overflow-hidden shadow-2xl transition-all duration-400 ease-in-out ${showContent
                                        ? 'w-[280px] md:w-[320px] lg:w-[350px]'
                                        : 'w-[320px] md:w-[400px] lg:w-[450px]'
                                        }`}
                                >
                                    {/* Video player (when videoUrl provided) */}
                                    {videoUrl ? (
                                        <video
                                            ref={modalVideoRef}
                                            className="w-full h-full object-cover"
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            src={show?.image}
                                            alt={show?.title || 'Show poster'}
                                            className="w-full h-full object-cover"
                                        />
                                    )}

                                    {/* Mute/Unmute overlay for video */}
                                    {videoUrl && modalHasAudio && (
                                        <button
                                            onClick={toggleModalMute}
                                            className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                            title={modalMuted ? 'Unmute' : 'Mute'}
                                        >
                                            {modalMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                        </button>
                                    )}
                                </motion.div>
                            </motion.div>

                            {/* Download Content - slides in from right */}
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 80 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 80 }}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
                                        className="flex flex-col items-center md:items-start max-w-lg text-white"
                                    >
                                        {/* QR Code Section */}
                                        <div className="mb-8 flex flex-col items-center md:items-start">
                                            <div className="bg-white p-2 rounded-xl mb-4 w-[132px] h-[132px] md:w-[165px] md:h-[165px]">
                                                <img src={assets.imgQrCodeForMobileEnglishWikipedia1} alt="QR Code" className="w-full h-full object-contain" />
                                            </div>
                                            <p className="text-sm md:text-base text-gray-300">Scan to download FastTV</p>
                                        </div>

                                        {/* Text Content */}
                                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-center md:text-left">
                                            Watch the Full Story<br />on FastTV
                                        </h1>
                                        <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed text-center md:text-left">
                                            Download the FastTV app to watch the complete series with full episodes and uninterrupted storytelling.
                                        </p>

                                        {/* Download Buttons */}
                                        <StoreButtons className="justify-center md:justify-start" buttonClassName="h-[42px] w-[135px] hover:scale-105 transition-transform inline-flex shrink-0" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
