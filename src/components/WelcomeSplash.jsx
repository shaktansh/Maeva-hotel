import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 2.8s
    const t = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#0F0F0F",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {/* Top & bottom gold lines that slide in */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", top: "2rem", left: "3rem", right: "3rem",
              height: "1px", background: "rgba(201,169,110,0.35)",
              transformOrigin: "left",
            }}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", bottom: "2rem", left: "3rem", right: "3rem",
              height: "1px", background: "rgba(201,169,110,0.35)",
              transformOrigin: "right",
            }}
          />

          {/* Corner accents */}
          {[
            { top: "1.5rem", left: "1.5rem", borderTop: "1px solid #C9A96E", borderLeft: "1px solid #C9A96E" },
            { top: "1.5rem", right: "1.5rem", borderTop: "1px solid #C9A96E", borderRight: "1px solid #C9A96E" },
            { bottom: "1.5rem", left: "1.5rem", borderBottom: "1px solid #C9A96E", borderLeft: "1px solid #C9A96E" },
            { bottom: "1.5rem", right: "1.5rem", borderBottom: "1px solid #C9A96E", borderRight: "1px solid #C9A96E" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
              style={{ position: "absolute", width: "20px", height: "20px", ...s }}
            />
          ))}

          {/* Stars */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ display: "flex", gap: "6px", marginBottom: "1.25rem" }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 300, damping: 15 }}
                style={{ color: "#C9A96E", fontSize: "0.85rem" }}
              >★</motion.span>
            ))}
          </motion.div>

          {/* Hotel name */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: "white",
              fontWeight: 300,
              marginBottom: "0.6rem",
            }}
          >
            MAEVA
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            Hotel &amp; Resort
          </motion.p>

          {/* Gold loading bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 1, duration: 1.4, ease: "linear" }}
            style={{
              height: "1px",
              background: "#C9A96E",
              marginTop: "2rem",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
