import { motion, AnimatePresence } from 'framer-motion';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { assets } from '../assets/figma_assets';
import { cn } from '../lib/utils';
import playstoreIcon from '../assets/figma/playstore.png';

interface StoreButtonsProps {
    className?: string; // Container class
    buttonClassName?: string; // Individual button class
}

export default function StoreButtons({ className, buttonClassName }: StoreButtonsProps) {
    const deviceOS = useDeviceDetect();

    const renderAppStore = deviceOS === 'ios' || deviceOS === 'desktop';
    const renderPlayStore = deviceOS === 'android' || deviceOS === 'desktop';

    return (
        <div className={cn("flex flex-wrap gap-3", className)}>
            <AnimatePresence mode="popLayout">
                {renderAppStore && (
                    <motion.a
                        href="https://fasttv.onelink.me/jiWp/share"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn("hover:opacity-90 transition-opacity block", buttonClassName)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        key="app-store"
                    >
                        <img src={assets.img2} alt="App Store" className="h-full w-full object-contain" />
                    </motion.a>
                )}
                {renderPlayStore && (
                    <motion.a
                        href="https://fasttv.onelink.me/jiWp/share"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn("hover:opacity-90 transition-opacity block", buttonClassName)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        key="play-store"
                    >
                        <img src={playstoreIcon} alt="Google Play" className="h-full w-full object-contain" />
                    </motion.a>
                )}
            </AnimatePresence>
        </div>
    );
}
