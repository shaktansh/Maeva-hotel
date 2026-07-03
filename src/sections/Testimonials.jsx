import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "../data/hotelData";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };

  return (
    <section style={{ padding: "6rem 0", background: "#fff" }} ref={ref}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Guest Stories</p>
          <h2 className="section-heading" style={{ fontSize: "clamp(2.8rem,6vw,5rem)", marginBottom: "3.5rem" }}>
            Voices of Maeva
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {/* Stars */}
          <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "2rem" }}>
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 300 }}
                style={{ color: "#C9A96E", fontSize: "1.1rem" }}
              >★</motion.span>
            ))}
          </div>

          {/* Quote with slide direction */}
          <div style={{ overflow: "hidden", minHeight: "120px", position: "relative" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={active}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(1.15rem,2.5vw,1.6rem)",
                  fontWeight: 300, color: "#1C1C1C",
                  lineHeight: 1.65, marginBottom: "2rem",
                  fontStyle: "italic",
                }}
              >
                "{testimonials[active].text}"
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + "a"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
            >
              <img
                src={testimonials[active].avatar}
                alt={testimonials[active].name}
                style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(201,169,110,0.3)" }}
              />
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#1C1C1C", fontWeight: 400 }}>
                {testimonials[active].name}
              </p>
              <p className="eyebrow" style={{ fontSize: "0.6rem", color: "#9ca3af" }}>
                {testimonials[active].title}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem", marginTop: "2rem" }}>
            <button
              onClick={() => go((active - 1 + testimonials.length) % testimonials.length)}
              style={{ background: "none", border: "1px solid rgba(201,169,110,0.35)", color: "#C9A96E", width: "36px", height: "36px", cursor: "pointer", fontSize: "0.9rem", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#C9A96E"; }}
            >←</button>

            <div style={{ display: "flex", gap: "8px" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i} onClick={() => go(i)}
                  style={{
                    width: i === active ? "24px" : "6px", height: "2px", padding: 0, border: "none", cursor: "pointer",
                    background: i === active ? "#C9A96E" : "rgba(201,169,110,0.3)",
                    transition: "all 0.4s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => go((active + 1) % testimonials.length)}
              style={{ background: "none", border: "1px solid rgba(201,169,110,0.35)", color: "#C9A96E", width: "36px", height: "36px", cursor: "pointer", fontSize: "0.9rem", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#C9A96E"; }}
            >→</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
