
import { useState, useRef } from 'react';
import { assets } from '../assets/figma_assets';
import Navbar from '../components/Navbar';
import { VolumeX, Volume2 } from 'lucide-react';
import StoreButtons from '../components/StoreButtons';

export default function SeriesDemoPlayerDownload() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <div className="bg-[#040406] min-h-screen relative w-full overflow-hidden flex flex-col">
            <Navbar />

            {/* Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -left-[10%] w-[70vw] h-[70vw] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="flex-1 container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">

                {/* Left Side: Video Player */}
                <div className="relative w-full max-w-[450px] aspect-[9/16] rounded-[24px] border-2 border-white/20 overflow-hidden shadow-2xl shrink-0">

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
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-woman-in-a-forest-4003-large.mp4" type="video/mp4" />
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
                <div className="flex flex-col items-start max-w-lg text-white">
                    {/* QR Code Section */}
                    <div className="mb-10 flex flex-col items-center md:items-start hidden md:flex text-center md:text-left">
                        {/* Using imgQrCodeForMobileEnglishWikipedia1 if available, otherwise a placeholder or generic QR */}
                        <div className="bg-white p-4 rounded-[24px] mb-4 w-[165px] h-[165px] shadow-lg">
                            {/* Fallback QR or mapped asset */}
                            <img src={assets.imgQrCodeForMobileEnglishWikipedia1} alt="QR Code" className="w-full h-full object-contain" />
                        </div>
                        <p className="text-base text-gray-300">Scan to download FastTV</p>
                    </div>

                    {/* Text Content */}
                    {/* Text Content */}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                            Watch the Full Story<br />on FastTV
                        </h1>
                        <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed max-w-[320px] mx-auto md:mx-0">
                            Download the FastTV app to watch the complete series with full episodes and uninterrupted storytelling.
                        </p>

                        {/* Download Buttons */}
                        <StoreButtons className="justify-center md:justify-start" buttonClassName="h-[42px] w-[135px] hover:scale-105 transition-transform inline-flex shrink-0" />
                    </div>
                </div>

            </div>
        </div>
    );
}
