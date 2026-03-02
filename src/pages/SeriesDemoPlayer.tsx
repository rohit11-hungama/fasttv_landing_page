
import { useState, useRef } from 'react';
import { assets } from '../assets/figma_assets';
import Navbar from '../components/Navbar';
import { VolumeX, Volume2 } from 'lucide-react';

export default function SeriesDemoPlayer() {
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

            {/* Background Effect - mimicking the opacity layer in Figma */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Right Decoration */}
                <div className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full blur-[120px]" />
                {/* Bottom Left Decoration */}
                <div className="absolute -bottom-[10%] -left-[10%] w-[70vw] h-[70vw] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-8">
                {/* Main Video Container */}
                <div className="relative w-full max-w-[450px] aspect-[9/16] rounded-[24px] border-2 border-white/20 overflow-hidden shadow-2xl">


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

            </div>
        </div>
    );
}
