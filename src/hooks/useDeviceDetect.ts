import { useState, useEffect } from 'react';

export type DeviceOS = 'android' | 'ios' | 'desktop';

const getDeviceOS = (): DeviceOS => {
    if (typeof window === 'undefined') return 'desktop';

    const ua = (navigator.userAgent || navigator.vendor || '').toLowerCase();

    // Check for Android
    if (/android/i.test(ua)) {
        return 'android';
    }

    // Check for iOS — both userAgent and platform-based detection
    if (
        /iphone|ipad|ipod/i.test(ua) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) // iPad on iPadOS 13+
    ) {
        return 'ios';
    }

    // Modern User-Agent Client Hints API (Chrome 90+)
    const uaData = (navigator as any).userAgentData;
    if (uaData) {
        const platform = (uaData.platform || '').toLowerCase();
        if (platform === 'android') return 'android';
        if (platform === 'ios') return 'ios';
    }

    return 'desktop';
};

export function useDeviceDetect() {
    const [deviceOS, setDeviceOS] = useState<DeviceOS>(getDeviceOS);

    useEffect(() => {
        setDeviceOS(getDeviceOS());
    }, []);

    return deviceOS;
}
