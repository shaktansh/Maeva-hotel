import { motion } from "framer-motion";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Rooms from "../sections/Rooms";
import AboutDark from "../sections/AboutDark";
import Services from "../sections/Services";
import Dining from "../sections/Dining";
import Gallery from "../sections/Gallery";
import Testimonials from "../sections/Testimonials";
import Stats from "../sections/Stats";
import FAQ from "../sections/FAQ";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

export default function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
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
    </motion.div>
  );
}
