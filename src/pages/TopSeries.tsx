import { useState } from 'react';
import { assets } from '../assets/figma_assets';
import SEO from '../components/SEO';
import StoreButtons from '../components/StoreButtons';

// Top Series show data with rankings
const topSeriesShows = [
    { rank: 1, title: 'Manali Murder', image: 'imgPosterManaliMurder' },
    { rank: 2, title: 'Mona', image: 'imgPosterMona' },
    { rank: 3, title: 'Rishton Ka Khel', image: 'imgPosterRishtonKaKhel' },
    { rank: 4, title: 'Sach Ya Bhram', image: 'imgPosterSachYaBhram' },
    { rank: 5, title: 'Secret of the Redroom', image: 'imgPosterSecretRedroom' },
    { rank: 6, title: 'Udaan Mein Dhokha', image: 'imgPosterUdaanMeinDhokha' },
    { rank: 7, title: 'Begum No.1', image: 'imgPosterBegumNo1' },
    { rank: 8, title: 'Chehre Pe Chera', image: 'imgPosterChehrePeChera' },
    { rank: 9, title: 'Dhoke Ka Daav', image: 'imgPosterDhokeKaDaav' },
    { rank: 10, title: 'Donz', image: 'imgPosterDonz' },
];

const genres = ['Trending', 'Romance', 'Thriller', 'Comedy', 'Recently Added'];

export default function TopSeries() {
    const [activeGenre, setActiveGenre] = useState('Trending');

    return (
        <div className="relative min-h-screen">
            <SEO
                title="Top Series – Trending Short Dramas"
                description="Explore FastTV's top-rated short drama series. Trending, binge-worthy micro dramas loved by millions. Flight Attendant, Badass Begum, and more."
                keywords="top series FastTV, trending dramas, short series, Flight Attendant, Badass Begum, Ek Secret Crime, binge watch"
                canonicalPath="/top-series"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "name": "Top Series on FastTV",
                    "numberOfItems": 10,
                    "itemListElement": topSeriesShows.map(show => ({
                        "@type": "ListItem",
                        "position": show.rank,
                        "name": show.title
                    }))
                }}
            />
            {/* Hero Section with Background Collage */}
            <div className="relative h-[560px] overflow-hidden">
                {/* Background collage image */}
                <div className="absolute inset-0">
                    <img
                        src={assets.imgBg}
                        alt=""
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040406]/70 to-[#040406]" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-[90px]">
                    <h1 className="text-4xl md:text-[80px] font-bold leading-tight tracking-tight">
                        Explore Our Top Series
                    </h1>
                    <p className="text-[20px] text-white/80 mt-4">
                        Trending, binge-worthy short dramas loved by millions.
                    </p>

                    {/* Download CTA */}
                    <div className="mt-8 flex flex-col items-center gap-3">
                        <p className="text-[16px] text-white/90 font-medium">Download FastTV App</p>
                        <StoreButtons className="justify-center gap-3" buttonClassName="h-[50px] w-[160px]" />
                    </div>
                </div>
            </div>

            {/* Genre Filter Tabs */}
            <div className="px-6 md:px-24 mt-8">
                <div className="flex flex-wrap gap-3">
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => setActiveGenre(genre)}
                            className={`px-6 py-2 rounded-md text-[15px] font-bold transition-all duration-200 cursor-pointer ${activeGenre === genre
                                ? 'bg-white text-black'
                                : 'bg-transparent border border-white/30 text-white hover:border-white/60'
                                }`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ranked Show Grid */}
            <div className="px-6 md:px-24 mt-10 pb-20">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-6 gap-y-10">
                    {topSeriesShows.map((show) => (
                        <div key={show.rank} className="relative group cursor-pointer">
                            {/* Card container */}
                            <div className="relative">
                                {/* Poster Image */}
                                <div className="w-[170px] h-[255px] rounded-lg overflow-hidden border border-white/10 transition-transform duration-300 group-hover:scale-105">
                                    <img
                                        src={assets[show.image as keyof typeof assets]}
                                        alt={show.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Rank Number - Aligned to bottom edge */}
                                <span
                                    className="absolute -left-4 bottom-0 text-[100px] font-bold leading-[0.8] tracking-tighter z-10 drop-shadow-lg"
                                    style={{
                                        WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                                        color: 'transparent',
                                        backgroundImage: 'linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.2))',
                                        WebkitBackgroundClip: 'text',
                                        fontFamily: 'Outfit, sans-serif'
                                    }}
                                >
                                    {show.rank}
                                </span>
                            </div>
                            {/* Title */}
                            <p className="text-[15px] text-white/80 mt-2">{show.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
