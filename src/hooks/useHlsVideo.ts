import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';

interface UseHlsVideoOptions {
    src: string | null;
    autoPlay?: boolean;
    onEnded?: () => void;
    /** Seek to this time (seconds) once the video is ready */
    startTime?: number;
}

/**
 * Hook to handle both MP4 and HLS (.m3u8) video playback.
 * Exposes videoReady for crossfade timing and hasAudio for conditional UI.
 */
export function useHlsVideo({ src, autoPlay = true, onEnded, startTime }: UseHlsVideoOptions) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(true);
    const [videoReady, setVideoReady] = useState(false);
    const [showPlayBtn, setShowPlayBtn] = useState(true);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const onEndedRef = useRef(onEnded);
    const startTimeRef = useRef(startTime);

    // Keep refs current without re-triggering effects
    useEffect(() => { onEndedRef.current = onEnded; }, [onEnded]);
    useEffect(() => { startTimeRef.current = startTime; }, [startTime]);

    const isHls = src?.includes('.m3u8') ?? false;
    // Trailers (HLS) have audio; preview MP4s are silent
    const hasAudio = isHls || (!!src && !src.includes('/preview/'));

    // ── Attach source ──
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !src) return;

        // Reset ready state for new source
        setVideoReady(false);
        setIsPlaying(autoPlay);

        // Destroy previous HLS
        if (hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
        }

        const handleCanPlay = () => {
            // Seek to startTime on first ready
            if (startTimeRef.current != null && startTimeRef.current > 0) {
                video.currentTime = startTimeRef.current;
            }
            setVideoReady(true);
        };
        const handleEnded = () => { onEndedRef.current?.(); };

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('ended', handleEnded);

        const startPlayback = () => {
            video.muted = true; // always start muted for autoplay
            if (autoPlay) {
                video.play().catch(() => { });
            }
        };

        if (isHls && Hls.isSupported()) {
            const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
            hls.loadSource(src);
            hls.attachMedia(video);
            hlsRef.current = hls;
            hls.on(Hls.Events.MANIFEST_PARSED, startPlayback);
        } else if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            startPlayback();
        } else {
            video.src = src;
            startPlayback();
        }

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('ended', handleEnded);
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src]);

    // ── Sync play/pause ──
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !src) return;
        if (isPlaying) {
            video.play().catch(() => {
                video.muted = true;
                setIsMuted(true);
                video.play().catch(() => { });
            });
        } else {
            video.pause();
        }
    }, [isPlaying, src]);

    // ── Sync muted ──
    useEffect(() => {
        const video = videoRef.current;
        if (video) video.muted = isMuted;
    }, [isMuted]);

    // ── Auto-hide play button ──
    useEffect(() => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        if (isPlaying) {
            setShowPlayBtn(true);
            hideTimerRef.current = setTimeout(() => setShowPlayBtn(false), 2500);
        } else {
            setShowPlayBtn(true);
        }
        return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); };
    }, [isPlaying]);

    const togglePlay = useCallback(() => setIsPlaying(prev => !prev), []);

    const toggleMute = useCallback(() => {
        const video = videoRef.current;
        if (video) {
            const next = !isMuted;
            video.muted = next;
            setIsMuted(next);
        }
    }, [isMuted]);

    // ── Imperative controls for video handoff ──
    const pause = useCallback(() => setIsPlaying(false), []);
    const play = useCallback(() => setIsPlaying(true), []);

    const getCurrentTime = useCallback(() => {
        return videoRef.current?.currentTime ?? 0;
    }, []);

    const seekTo = useCallback((time: number) => {
        const video = videoRef.current;
        if (video) video.currentTime = time;
    }, []);

    return {
        videoRef,
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
    };
}

