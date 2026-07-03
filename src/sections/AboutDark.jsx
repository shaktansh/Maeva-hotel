import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedHeading from "../components/AnimatedHeading";

export default function AboutDark() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background: "#1C1C1C", padding: "6rem 0" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="split-2col" style={{ alignItems: "start" }}>

          {/* Left — Text */}
          <div style={{ maxWidth: "520px" }}>
            <div style={{ display:"flex", gap:"4px", marginBottom:"1rem" }}>
              {[...Array(5)].map((_, i) => (
                <motion.span key={i}
                  initial={{ opacity:0, scale:0 }}
                  animate={inView ? { opacity:1, scale:1 } : {}}
                  transition={{ delay:i*0.07, type:"spring", stiffness:260, damping:14 }}
                  style={{ color:"#C9A96E", fontSize:"0.85rem" }}
                >☆</motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity:0, letterSpacing:"0.5em" }}
              animate={inView ? { opacity:1, letterSpacing:"0.25em" } : {}}
              transition={{ duration:0.9, delay:0.1 }}
              className="eyebrow" style={{ color:"rgba(201,169,110,0.7)", marginBottom:"1rem" }}
            >Best Prices</motion.p>

            <div style={{ marginBottom:"1.25rem" }}>
              <AnimatedHeading
                text="Unmatched Value, Unrivalled Luxury"
                inView={inView}
                delay={0.2}
                className="section-heading-light"
                style={{ fontSize:"clamp(2.4rem,4.5vw,3.6rem)", lineHeight:1.1 }}
              />
            </div>

            <motion.span
              initial={{ scaleX:0, originX:0 }}
              animate={inView ? { scaleX:1 } : {}}
              transition={{ duration:0.8, delay:0.55 }}
              style={{ display:"block", width:"40px", height:"1px", background:"#C9A96E", marginBottom:"1.5rem" }}
            />

            {[
              "At Maeva, we believe true luxury should never be out of reach. Our best-rate guarantee ensures you always receive the most competitive pricing — with every premium detail included.",
              "From curated welcome packages to complimentary breakfast and early check-in privileges, we offer more value per night than any comparable property in the region.",
            ].map((text, i) => (
              <motion.p key={i}
                initial={{ opacity:0, y:24 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.8, delay:0.35 + i*0.15 }}
                style={{ fontSize:"0.875rem", color:"rgba(255,255,255,0.45)", lineHeight:1.85, marginBottom:"1.25rem", fontFamily:"'DM Sans',sans-serif", fontWeight:300 }}
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity:0, x:-20 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.8, delay:0.7 }}
              style={{ display:"flex", alignItems:"center", gap:"1rem" }}
            >
              <div style={{ position:"relative", flexShrink:0 }}>
                {[1,2].map(i => (
                  <motion.div key={i}
                    animate={{ scale:[1,1.8], opacity:[0.35,0] }}
                    transition={{ duration:2, delay:i*0.7, repeat:Infinity, ease:"easeOut" }}
                    style={{ position:"absolute", inset:0, borderRadius:"50%", border:"1px solid #C9A96E" }}
                  />
                ))}
                <div style={{ width:"48px", height:"48px", borderRadius:"50%", border:"1px solid rgba(201,169,110,0.4)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1, background:"rgba(201,169,110,0.05)" }}>
                  <span style={{ color:"#C9A96E" }}>☎</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.35)", letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"4px" }}>Reservations</p>
                <p style={{ color:"#C9A96E", fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", fontWeight:300 }}>+91 98898 75151</p>
              </div>
            </motion.div>
          </div>

          {/* Right — clip-path wipe images */}
          <div className="stagger-pair">
            <motion.div
              initial={{ clipPath:"inset(100% 0% 0% 0%)", opacity:0 }}
              animate={inView ? { clipPath:"inset(0% 0% 0% 0%)", opacity:1 } : {}}
              transition={{ duration:1.1, delay:0.4, ease:[0.22,1,0.36,1] }}
              className="img-zoom"
            >
              <img src="/images/dark-exterior.jpg" alt="Maeva exterior night" />
            </motion.div>
            <motion.div
              initial={{ clipPath:"inset(100% 0% 0% 0%)", opacity:0 }}
              animate={inView ? { clipPath:"inset(0% 0% 0% 0%)", opacity:1 } : {}}
              transition={{ duration:1.1, delay:0.6, ease:[0.22,1,0.36,1] }}
              className="img-zoom offset"
            >
              <img src="/images/dark-room.jpg" alt="Maeva room" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
