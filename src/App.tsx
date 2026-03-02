import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import TopSeries from './pages/TopSeries';
import WhatsNew from './pages/WhatsNew';
import SeriesDemoPlayer from './pages/SeriesDemoPlayer';
import SeriesDemoPlayerDownload from './pages/SeriesDemoPlayerDownload';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <div className="min-h-screen bg-[#040406] text-white font-product-sans overflow-x-hidden selection:bg-[#009cdb] selection:text-white pb-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/top-series" element={<TopSeries />} />
        <Route path="/whats-new" element={<WhatsNew />} />
        <Route path="/player" element={<SeriesDemoPlayer />} />
        <Route path="/player-download" element={<SeriesDemoPlayerDownload />} />
        <Route path="/terms-conditions" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
