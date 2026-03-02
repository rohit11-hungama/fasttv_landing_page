import { assets } from '../assets/figma_assets';
import StoreButtons from './StoreButtons';

export default function DownloadSection() {
    return (
        <section className="relative w-full overflow-hidden shrink-0 my-8 md:my-12" data-name="download_app">
            {/* ===== MOBILE LAYOUT ===== */}
            <div className="md:hidden relative w-full">
                {/* Blue gradient box — only behind the text content */}
                <div className="relative w-full overflow-hidden">
                    {/* Background Gradient */}
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: "linear-gradient(80.2845deg, rgb(11, 42, 54) 48.252%, rgb(17, 66, 85) 73.605%, rgb(11, 42, 54) 87.186%)"
                        }}
                    />
                    {/* Background Image Layer */}
                    <div className="absolute inset-0 w-full h-full opacity-10 mix-blend-overlay">
                        <img src={assets.imgImage265} alt="" className="w-full h-full object-cover" />
                    </div>

                    {/* Text Content */}
                    <div className="relative z-10 flex flex-col items-center text-center px-6 pt-10 pb-[322px]">
                        <h2 className="text-[36px] font-bold text-white leading-[1.15] mb-4">
                            Ready to Start?
                        </h2>
                        <p className="text-[16px] text-white/80 leading-relaxed max-w-[320px] mb-6">
                            From forbidden love to family betrayal. From quiet heartbreak to powerful revenge. Every story unfolds in 90–120 seconds -short enough for your break, deep enough to stay with you
                        </p>
                        <StoreButtons className="justify-center" buttonClassName="h-[48px] w-[164px]" />
                    </div>
                </div>

                {/* Actor Image — overflows below the blue box */}
                <div className="relative z-10 w-full flex justify-center mt-[-253px]">
                    <img
                        src={assets.imgDownloadAppActor}
                        alt="FastTV Actors"
                        className="w-full max-w-[375px] h-auto object-contain"
                    />
                </div>
            </div>

            {/* ===== DESKTOP LAYOUT ===== */}
            <div className="hidden md:block relative w-full h-[390px]">
                {/* Background Gradient */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: "linear-gradient(80.2845deg, rgb(11, 42, 54) 48.252%, rgb(17, 66, 85) 73.605%, rgb(11, 42, 54) 87.186%)"
                    }}
                />
                {/* Background Image Layer */}
                <div className="absolute inset-0 w-full h-full opacity-10 mix-blend-overlay">
                    <img src={assets.imgImage265} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Actor Image */}
                <div className="absolute left-[60%] -translate-x-1/2 bottom-0 w-[405px] h-[350px] z-20 pointer-events-none">
                    <img src={assets.imgDownloadAppActorWeb} alt="FastTV Actors" className="w-full h-full object-contain object-bottom" />
                </div>

                {/* Content Container */}
                <div className="relative h-full container mx-auto px-6 flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-8 max-w-[600px] z-10 text-left items-start">
                        <div className="flex flex-col gap-5 text-white">
                            <h2 className="text-[39px] font-bold leading-tight">
                                Ready to Start?
                            </h2>
                            <div className="text-[21px] opacity-80 leading-normal">
                                <p>From forbidden love to family betrayal. From quiet heartbreak to powerful revenge. Every story unfolds in 90–120 seconds - short enough for your break, deep enough to stay with you</p>
                            </div>
                        </div>
                        <StoreButtons className="justify-start" buttonClassName="h-[59px] w-[200px]" />
                    </div>

                    {/* QR Code */}
                    <div className="hidden lg:flex flex-col gap-4 items-center z-10 mr-12">
                        <div className="w-[180px] h-[180px] bg-white/10 rounded-xl p-2 backdrop-blur-sm">
                            <img src={assets.imgQrCodeForMobileEnglishWikipedia1} className="w-full h-full object-contain invert" alt="QR Code" />
                        </div>
                        <p className="text-[16px] text-white text-center">
                            Scan to download FastTV
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
