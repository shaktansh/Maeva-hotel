import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "../data/hotelData";

// Animated counter that counts up when enters viewport
function AnimatedStat({ stat, delay, inView }) {
  const [display, setDisplay] = useState("0");

  // Parse numeric part from stat.number  e.g. "350+", "5★", "98%", "24/7"
  useEffect(() => {
    if (!inView) return;
    const raw = stat.number;
    const match = raw.match(/^(\d+)/);
    if (!match) { setDisplay(raw); return; }
    const target = parseInt(match[1]);
    const suffix = raw.slice(match[1].length);
    const duration = 1600;
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts + delay * 1000;
      const elapsed = Math.max(ts - start, 0);
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.floor(eased * target);
      setDisplay(`${cur}${suffix}`);
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(raw);
    };
    requestAnimationFrame(tick);
  }, [inView, stat.number, delay]);

  return (
    <span style={{
      fontFamily: "'Cormorant Garamond',serif",
      fontSize: "clamp(2.5rem,5vw,4rem)",
      fontWeight: 300,
      color: "#C9A96E",
      display: "block",
      marginBottom: "0.5rem",
      lineHeight: 1,
    }}>
      {display}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ padding: "5rem 0", background: "#F5EFE6" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2.5rem" }}
          className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{ textAlign: "center", padding: "1.5rem 0" }}
            >
              <AnimatedStat stat={stat} delay={i * 0.12} inView={inView} />
              {/* Gold line that draws in */}
              <motion.span
                initial={{ scaleX: 0, originX: 0.5 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
                style={{ display: "block", width: "30px", height: "1px", background: "#C9A96E", margin: "0.6rem auto 0.6rem" }}
              />
              <p style={{
                fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase",
                fontFamily: "'DM Sans',sans-serif", color: "rgba(28,28,28,0.5)",
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (min-width: 1024px) { .stats-grid { grid-template-columns: repeat(4,1fr) !important; } }
      `}</style>
    </section>
  );
}
