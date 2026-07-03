import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import CursorDot from "./components/CursorDot";
import WelcomeSplash from "./components/WelcomeSplash";
import OfferPopup from "./components/OfferPopup";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Rooms from "./sections/Rooms";
import AboutDark from "./sections/AboutDark";
import Services from "./sections/Services";
import Dining from "./sections/Dining";
import Gallery from "./sections/Gallery";
import Testimonials from "./sections/Testimonials";
import Stats from "./sections/Stats";
import FAQ from "./sections/FAQ";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <WelcomeSplash />
      <CursorDot />
      <ScrollProgress />
      <BackToTop />
      <OfferPopup />
      <Navbar />
      <Hero />
      <About />
      <Rooms />
      <AboutDark />
      <Services />
      <Dining />
      <Gallery />
      <Testimonials />
      <Stats />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
