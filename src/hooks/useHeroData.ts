import { useState, useEffect } from 'react';

const API_URL = 'https://fasttvapi.dcafecms.com/v1/content/en/51.json';

export interface CarouselItem {
    path: string;
    title: string;
    label: string;
    filePath: string;
    content_genre: string;
    trailer_url: string | null;
    preview_url: string | null;
}

interface UseHeroDataResult {
    heroItem: CarouselItem | null;
    carouselItems: CarouselItem[];
    isLoading: boolean;
    error: string | null;
}

export function useHeroData(): UseHeroDataResult {
    const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                const data = await response.json();

                if (data.carousel && Array.isArray(data.carousel) && data.carousel.length > 0) {
                    const items: CarouselItem[] = data.carousel.map((item: CarouselItem) => {
                        // Use trailer_url if it's a non-empty URL (HLS or MP4)
                        let trailerUrl: string | null = null;
                        if (item.trailer_url && item.trailer_url.trim() !== '') {
                            trailerUrl = item.trailer_url;
                        }

                        return {
                            path: item.path,
                            title: item.title || item.label || '',
                            label: item.label || item.title || '',
                            filePath: item.filePath || '',
                            content_genre: item.content_genre || '',
                            trailer_url: trailerUrl,
                            preview_url: (item.preview_url && item.preview_url.trim() !== '') ? item.preview_url : null,
                        };
                    });
                    setCarouselItems(items);
                } else {
                    throw new Error('No carousel data found in API response');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch hero data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        heroItem: carouselItems.length > 0 ? carouselItems[0] : null,
        carouselItems,
        isLoading,
        error,
    };
}
