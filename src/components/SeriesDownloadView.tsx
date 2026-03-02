
import { useState, useRef } from 'react';
import { assets } from '../assets/figma_assets';
import { VolumeX, Volume2 } from 'lucide-react';
import type { Show } from './ContentRow';
import StoreButtons from './StoreButtons';

interface SeriesDownloadViewProps {
    show?: Show | null;
    onClose: () => void;
}

export default function SeriesDownloadView({ }: SeriesDownloadViewProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center relative px-4">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">

                {/* Left Side: Video Player (smaller/shifted) */}
                <div className="relative w-full max-w-[300px] md:max-w-[350px] aspect-[9/16] rounded-[24px] border-2 border-white/20 overflow-hidden shadow-2xl shrink-0">

                    {/* Video Player */}
                    <video
                        ref={videoRef}
                        autoPlay
                        className="w-full h-full object-cover"
                        controlsList="nodownload"
                        loop
                        playsInline
                        muted
                    >
                        <source src={assets.videoDemo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Mute/Unmute Icon Overlay */}
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-6 right-6 z-20 w-[40px] h-[40px] rounded-full bg-black/50 border border-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
                    >
                        {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
                    </button>

                </div>

                {/* Right Side: Content & Download */}
                <div className="flex flex-col items-center md:items-start max-w-lg text-white">
                    {/* QR Code Section */}
                    <div className="mb-8 flex flex-col items-center md:items-start text-center md:text-left">
                        {/* Using imgQrCodeForMobileEnglishWikipedia1 if available, otherwise a placeholder or generic QR */}
                        <div className="bg-white p-3 rounded-[20px] mb-4 w-[132px] h-[132px] md:w-[165px] md:h-[165px] shadow-lg">
                            {/* Fallback QR or mapped asset */}
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
                </div>

            </div>
        </div>
    );
}
