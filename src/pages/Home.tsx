import { useState } from 'react';
import Hero from '../components/Hero';
import ContentRow, { type Show } from '../components/ContentRow';
import RankingRow from '../components/RankingRow';
import { assets } from '../assets/figma_assets';
import DownloadSection from '../components/DownloadSection';
import FAQSection from '../components/FAQSection';
import SeriesDemoModal, { type FullViewItem } from '../components/SeriesDemoModal';
import { useHeroData } from '../hooks/useHeroData';
import ScrollAnimation from '../components/ScrollAnimation';
import SEO from '../components/SEO';

const Home = () => {
    const { carouselItems, isLoading } = useHeroData();

    // Rail-click modal state
    const [railPlaylist, setRailPlaylist] = useState<FullViewItem[] | null>(null);
    const [isRailModalOpen, setIsRailModalOpen] = useState(false);

    const handleShowClick = (show: Show) => {
        // Build playlist: static rail item first, then all hero carousel items
        const playlist: FullViewItem[] = [
            { kind: 'rail', title: show.title, image: show.image },
            ...carouselItems.map(c => ({ kind: 'carousel' as const, item: c })),
        ];
        setRailPlaylist(playlist);
        setIsRailModalOpen(true);
    };

    const handleCloseRailModal = () => {
        setIsRailModalOpen(false);
    };

    const recentShows: Show[] = [
        { id: 1, title: "Begum No.1", image: assets.imgPosterBegumNo1, isNew: true },
        { id: 2, title: "Damaged", image: assets.imgPosterDamaged1, isNew: true },
        { id: 3, title: "Chehre Pe Chera", image: assets.imgPosterChehrePeChera, isNew: true },
        { id: 4, title: "Dhoke Ka Daav", image: assets.imgPosterDhokeKaDaav, isNew: true },
        { id: 5, title: "Donz", image: assets.imgPosterDonz, isNew: true },
        { id: 6, title: "Fit To Kill 2", image: assets.imgPosterFitToKill2, isNew: true },
        { id: 7, title: "Game Not Over", image: assets.imgPosterGameNotOver, isNew: true },
        { id: 8, title: "Junoon Ki Hadd", image: assets.imgPosterJunoonKiHadd, isNew: true },
    ];

    const top10Shows: Show[] = [
        { id: 1, title: "Manali Murder", image: assets.imgPosterManaliMurder },
        { id: 2, title: "Mona", image: assets.imgPosterMona },
        { id: 3, title: "Rishton Ka Khel", image: assets.imgPosterRishtonKaKhel },
        { id: 4, title: "Sach Ya Bhram", image: assets.imgPosterSachYaBhram },
        { id: 5, title: "Secret of the Redroom", image: assets.imgPosterSecretRedroom },
        { id: 6, title: "Udaan Mein Dhokha", image: assets.imgPosterUdaanMeinDhokha },
        { id: 7, title: "Begum No.1", image: assets.imgPosterBegumNo1 },
        { id: 8, title: "Chehre Pe Chera", image: assets.imgPosterChehrePeChera },
        { id: 9, title: "Dhoke Ka Daav", image: assets.imgPosterDhokeKaDaav },
        { id: 10, title: "Donz", image: assets.imgPosterDonz },
    ];

    return (
        <>
            <SEO
                title="Watch Premium Micro Dramas"
                description="Watch premium 90-second drama episodes on FastTV. From forbidden love to powerful revenge — stories that stay with you. Download FastTV now."
                keywords="FastTV, micro dramas, 90 second episodes, short dramas, streaming app, Hungama, binge watch, mobile entertainment"
                canonicalPath="/"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "VideoGallery",
                    "name": "FastTV - Premium Micro Dramas",
                    "description": "Watch premium 90-second drama episodes. Stories worth your time.",
                    "url": "https://fasttv.app"
                }}
            />
            <ScrollAnimation>
                <Hero carouselItems={carouselItems} isLoading={isLoading} />
            </ScrollAnimation>
            <main className="pb-8 md:pb-12 space-y-8 md:space-y-12">
                <ScrollAnimation delay={0.2} className="relative z-20 pl-0 mt-10">
                    <ContentRow
                        title="Stories Worth Your Time"
                        shows={recentShows}
                        onShowClick={handleShowClick}
                    />
                </ScrollAnimation>
                {/* Divider Line - desktop only */}
                <div className="hidden md:block container mx-auto px-6">
                    <hr className="border-white/10" />
                </div>
                <ScrollAnimation delay={0.1}>
                    <RankingRow
                        title="Trending Stories"
                        shows={top10Shows}
                        onShowClick={handleShowClick}
                    />
                </ScrollAnimation>
                <ScrollAnimation delay={0.1}>
                    <DownloadSection />
                </ScrollAnimation>

                <ScrollAnimation delay={0.1}>
                    <FAQSection />
                </ScrollAnimation>
            </main>

            {/* Rail-click full view modal */}
            <SeriesDemoModal
                isOpen={isRailModalOpen}
                onClose={handleCloseRailModal}
                playlist={railPlaylist ?? undefined}
            />
        </>
    );
};

export default Home;
