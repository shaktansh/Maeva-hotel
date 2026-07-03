import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  // Close on Escape, navigate with arrows
  useEffect(() => {
    if (index === null) return;
    const fn = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.93)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          {/* Image */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh" }}
          >
            <img
              src={images[index].src}
              alt={images[index].caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "82vh",
                objectFit: "contain",
                display: "block",
              }}
            />
            {/* Caption */}
            <p style={{
              textAlign: "center", marginTop: "1rem",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}>
              {images[index].caption}
            </p>
          </motion.div>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "fixed", top: "1.25rem", right: "1.5rem",
              background: "none", border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)", width: "38px", height: "38px",
              cursor: "pointer", fontSize: "1rem", display: "flex",
              alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.color = "#C9A96E"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            style={{
              position: "fixed", left: "1.25rem", top: "50%", transform: "translateY(-50%)",
              background: "none", border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)", width: "42px", height: "42px",
              cursor: "pointer", fontSize: "1.1rem", display: "flex",
              alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.color = "#C9A96E"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >
            ←
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            style={{
              position: "fixed", right: "1.25rem", top: "50%", transform: "translateY(-50%)",
              background: "none", border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)", width: "42px", height: "42px",
              cursor: "pointer", fontSize: "1.1rem", display: "flex",
              alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.color = "#C9A96E"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >
            →
          </button>

          {/* Dot indicators */}
          <div style={{
            position: "fixed", bottom: "1.25rem", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: "6px",
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); onClose(); setTimeout(() => {}, 0); }}
                style={{
                  width: i === index ? "20px" : "6px", height: "2px",
                  background: i === index ? "#C9A96E" : "rgba(255,255,255,0.3)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
