import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OfferPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show after 6s (after splash is fully gone and user is browsing)
    const t = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 6000);
    return () => clearTimeout(t);
  }, [dismissed]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.95 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            bottom: "6rem",
            right: "1.5rem",
            zIndex: 800,
            width: "260px",
            background: "#1C1C1C",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            overflow: "hidden",
          }}
        >
          {/* Gold top accent bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ height: "2px", background: "#C9A96E", transformOrigin: "left" }}
          />

          <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: "rgba(201,169,110,0.12)",
                border: "1px solid rgba(201,169,110,0.3)",
                padding: "3px 10px", marginBottom: "0.85rem",
              }}
            >
              <span style={{ color: "#C9A96E", fontSize: "0.6rem" }}>✦</span>
              <span style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem",
                color: "#C9A96E", letterSpacing: "0.2em", textTransform: "uppercase",
              }}>Limited Offer</span>
            </motion.div>

            <motion.h4
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.25rem", fontWeight: 300, color: "white",
                lineHeight: 1.3, marginBottom: "0.6rem",
              }}
            >
              Early Bird<br />Special
            </motion.h4>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.78rem", color: "rgba(255,255,255,0.45)",
                lineHeight: 1.65, marginBottom: "1.1rem", fontWeight: 300,
              }}
            >
              Book 30+ days in advance and receive 20% off on all room categories.
            </motion.p>

            {/* Discount highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              style={{
                display: "flex", alignItems: "baseline", gap: "6px",
                marginBottom: "1.1rem",
              }}
            >
              <span style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "2rem", color: "#C9A96E", fontWeight: 300, lineHeight: 1,
              }}>20%</span>
              <span style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em",
              }}>off your stay</span>
            </motion.div>

            <motion.a
              href="#contact"
              onClick={dismiss}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "block", width: "100%", textAlign: "center",
                background: "#C9A96E", color: "white", padding: "9px 0",
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                textDecoration: "none", transition: "background 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#B8915A"}
              onMouseLeave={e => e.currentTarget.style.background = "#C9A96E"}
            >
              Claim Offer
            </motion.a>
          </div>

          {/* Close button */}
          <button
            onClick={dismiss}
            style={{
              position: "absolute", top: "0.6rem", right: "0.6rem",
              background: "none", border: "none",
              color: "rgba(255,255,255,0.3)", cursor: "pointer",
              fontSize: "0.75rem", lineHeight: 1, padding: "4px",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#C9A96E"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
          >✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
