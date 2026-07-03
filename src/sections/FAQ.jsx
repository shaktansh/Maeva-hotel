import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { faqs } from "../data/hotelData";

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState(0);

  return (
    <section style={{ padding: "6rem 0", background: "#FAF6F1" }} ref={ref}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Need to Know</p>
          <h2 className="section-heading" style={{ fontSize: "clamp(2.8rem,6vw,5rem)" }}>
            Frequently Asked
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              style={{ borderBottom: "1px solid #e5e7eb" }}
            >
              <motion.button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: "100%", textAlign: "left", padding: "1.4rem 0",
                  display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                  gap: "1rem", background: "none", border: "none", cursor: "pointer",
                }}
                whileHover={{ x: 4, transition: { duration: 0.25 } }}
              >
                <span style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1.15rem", fontWeight: 300, color: open === i ? "#C9A96E" : "#1C1C1C",
                  transition: "color 0.3s",
                }}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: "#C9A96E", fontSize: "1.3rem", flexShrink: 0, lineHeight: 1, display: "block", marginTop: "2px" }}
                >
                  +
                </motion.span>
              </motion.button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22,1,0.36,1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{
                      fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.85,
                      fontFamily: "'DM Sans',sans-serif", fontWeight: 300,
                      paddingBottom: "1.5rem", paddingRight: "2rem",
                    }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
