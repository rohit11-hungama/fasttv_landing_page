
import { useState, useRef } from 'react';

import { VolumeX, Volume2 } from 'lucide-react';
import type { Show } from './ContentRow';

interface SeriesPlayerViewProps {
    show?: Show | null;
    onClose: () => void;
}

export default function SeriesPlayerView({ }: SeriesPlayerViewProps) {
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
            {/* Background Decoration specifically for this view if needed, 
           but the Modal wrapper might handle the general backdrop. 
           We'll keep the content focused here. */}

            {/* Main Video Container */}
            <div className="relative w-full max-w-[400px] md:max-w-[450px] aspect-[9/16] rounded-[24px] border-2 border-white/20 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">


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

        </div>
    );
}
