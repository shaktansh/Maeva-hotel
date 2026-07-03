import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { galleryImages } from "../data/hotelData";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const total = galleryImages.length;

  return (
    <section id="gallery" style={{ padding: "6rem 0", background: "#fff" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Visual Journey</p>
          <h2 className="section-heading" style={{ fontSize: "clamp(2.8rem,6vw,5rem)" }}>Gallery</h2>
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.75rem", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.1em" }}>
            Click any image to explore
          </p>
        </motion.div>

        <div className="gallery-grid">
          {/* Portrait tall — col 1, spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0, ease: [0.22,1,0.36,1] }}
            className="img-zoom tall gallery-tall-img"
            style={{ cursor: "zoom-in", position: "relative" }}
            onClick={() => setLightboxIndex(0)}
            whileHover={{ scale: 1.01 }}
          >
            <img src={galleryImages[0].src} alt={galleryImages[0].caption} />
            <HoverOverlay label={galleryImages[0].caption} />
          </motion.div>

          {/* Landscape — col 2, row 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22,1,0.36,1] }}
            className="img-zoom gallery-short-img"
            style={{ cursor: "zoom-in", position: "relative" }}
            onClick={() => setLightboxIndex(1)}
          >
            <img src={galleryImages[1].src} alt={galleryImages[1].caption} />
            <HoverOverlay label={galleryImages[1].caption} />
          </motion.div>

          {/* Portrait tall — col 3, spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22,1,0.36,1] }}
            className="img-zoom tall gallery-tall-img"
            style={{ cursor: "zoom-in", position: "relative" }}
            onClick={() => setLightboxIndex(2)}
          >
            <img src={galleryImages[2].src} alt={galleryImages[2].caption} />
            <HoverOverlay label={galleryImages[2].caption} />
          </motion.div>

          {/* Landscape — col 2, row 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22,1,0.36,1] }}
            className="img-zoom gallery-short-img"
            style={{ cursor: "zoom-in", position: "relative" }}
            onClick={() => setLightboxIndex(3)}
          >
            <img src={galleryImages[3].src} alt={galleryImages[3].caption} />
            <HoverOverlay label={galleryImages[3].caption} />
          </motion.div>

          {/* Row 3 — col 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22,1,0.36,1] }}
            className="img-zoom gallery-short-img"
            style={{ cursor: "zoom-in", position: "relative" }}
            onClick={() => setLightboxIndex(4)}
          >
            <img src={galleryImages[4].src} alt={galleryImages[4].caption} />
            <HoverOverlay label={galleryImages[4].caption} />
          </motion.div>

          {/* Row 3 — col 2-3 wide */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22,1,0.36,1] }}
            className="img-zoom gallery-short-img gallery-wide"
            style={{ cursor: "zoom-in", position: "relative" }}
            onClick={() => setLightboxIndex(5)}
          >
            <img src={galleryImages[5].src} alt={galleryImages[5].caption} />
            <HoverOverlay label={galleryImages[5].caption} />
          </motion.div>
        </div>
      </div>

      <Lightbox
        images={galleryImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((lightboxIndex - 1 + total) % total)}
        onNext={() => setLightboxIndex((lightboxIndex + 1) % total)}
      />
    </section>
  );
}

// Hover overlay that fades in caption
function HoverOverlay({ label }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(0,0,0,0)",
      display: "flex", alignItems: "flex-end", padding: "1rem",
      transition: "background 0.4s",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.38)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0)"}
      className="gallery-hover-overlay"
    >
      <span style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
        color: "rgba(255,255,255,0)", transition: "color 0.4s",
      }}
        className="gallery-hover-label"
      >
        {label}
      </span>
      <style>{`
        .gallery-hover-overlay:hover .gallery-hover-label { color: rgba(255,255,255,0.85) !important; }
      `}</style>
    </div>
  );
}
