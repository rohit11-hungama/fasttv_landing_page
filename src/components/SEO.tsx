import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalPath?: string;
    ogType?: string;
    ogImage?: string;
    structuredData?: object;
}

/**
 * SEO component that dynamically updates document head meta tags.
 * Uses useEffect since react-helmet doesn't support React 19 yet.
 */
export default function SEO({
    title,
    description,
    keywords,
    canonicalPath = '/',
    ogType = 'website',
    ogImage = '/fasttv_og_image.png',
    structuredData,
}: SEOProps) {
    useEffect(() => {
        // Title
        document.title = `${title} | FastTV`;

        // Helper to set meta tags
        const setMeta = (attr: string, key: string, content: string) => {
            let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        // Primary meta tags
        setMeta('name', 'description', description);
        if (keywords) setMeta('name', 'keywords', keywords);

        // Open Graph
        setMeta('property', 'og:title', `${title} | FastTV`);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:type', ogType);
        setMeta('property', 'og:url', `https://fasttv.app${canonicalPath}`);
        setMeta('property', 'og:image', ogImage);

        // Twitter Card
        setMeta('name', 'twitter:title', `${title} | FastTV`);
        setMeta('name', 'twitter:description', description);
        setMeta('name', 'twitter:image', ogImage);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', `https://fasttv.app${canonicalPath}`);

        // Structured Data
        const existingScript = document.getElementById('page-structured-data');
        if (existingScript) existingScript.remove();
        if (structuredData) {
            const script = document.createElement('script');
            script.id = 'page-structured-data';
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }

        return () => {
            const script = document.getElementById('page-structured-data');
            if (script) script.remove();
        };
    }, [title, description, keywords, canonicalPath, ogType, ogImage, structuredData]);

    return null;
}
