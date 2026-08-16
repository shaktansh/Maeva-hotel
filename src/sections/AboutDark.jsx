import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function AboutDark() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], [60,-60]);

  return (
    <section style={{ background:"#141010", padding:"9rem 0", position:"relative", overflow:"hidden", transition:"background 0.7s" }} ref={ref}>
      {/* Subtle gold divider line */}
      <motion.div initial={{ scaleX:0, originX:0 }} animate={inView ? { scaleX:1 } : {}} transition={{ duration:1.6, ease:[0.22,1,0.36,1] }}
        style={{ position:"absolute", top:"35%", left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,var(--gold),transparent)", opacity:0.18 }} />

      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 3rem" }}>
        <div className="s2" style={{ alignItems:"start" }}>
          <div>
            {/* Stars */}
            <div style={{ display:"flex", gap:"4px", marginBottom:"1.25rem" }}>
              {[...Array(5)].map((_,i) => (
                <motion.span key={i} initial={{ opacity:0, scale:0 }} animate={inView ? { opacity:1, scale:1 } : {}}
                  transition={{ delay:i*0.08, type:"spring", stiffness:250 }}
                  style={{ color:"var(--gold)", fontSize:"0.85rem" }}>☆</motion.span>
              ))}
            </div>

            {/* Eyebrow — full gold, no opacity reduction */}
            <motion.p className="eyebrow"
              initial={{ opacity:0, letterSpacing:"0.6em" }}
              animate={inView ? { opacity:1, letterSpacing:"0.32em" } : {}}
              transition={{ duration:0.9 }}
              style={{ color:"var(--gold)", marginBottom:"1.25rem" }}>
              Best Prices
            </motion.p>

            {/* Heading — brighter white */}
            <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(2.4rem,4.5vw,3.8rem)", fontWeight:300, color:"#F5EDE0", lineHeight:1.05, marginBottom:"1.5rem", display:"flex", flexWrap:"wrap", gap:"0 0.22em" }}>
              {["Unmatched","Value,","Unrivalled","Luxury"].map((w,i) => (
                <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.05em" }}>
                  <motion.span style={{ display:"inline-block" }} initial={{ y:"115%" }} animate={inView ? { y:"0%" } : {}}
                    transition={{ duration:0.85, delay:0.15+i*0.12, ease:[0.22,1,0.36,1] }}>{w}</motion.span>
                </span>
              ))}
            </h2>

            <motion.span className="gl" initial={{ scaleX:0 }} animate={inView ? { scaleX:1 } : {}}
              transition={{ duration:0.9, delay:0.65 }}
              style={{ width:"48px", marginBottom:"1.75rem" }} />

            {/* Body text — opacity lifted from 0.42 → 0.82 for readability */}
            {["At Maeva, we believe true luxury should never be out of reach. Our best-rate guarantee ensures you always receive the most competitive pricing — with every premium included.",
              "From welcome packages to complimentary breakfast and early check-in, we offer more value per night than any comparable property."].map((t,i) => (
              <motion.p key={i}
                initial={{ opacity:0, y:20 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.8, delay:0.4+i*0.15 }}
                style={{ fontFamily:"var(--fb)", fontSize:"0.95rem", color:"rgba(240,228,212,0.82)", lineHeight:1.9, marginBottom:"1.25rem", fontWeight:300 }}>
                {t}
              </motion.p>
            ))}

            {/* Phone CTA */}
            <motion.div initial={{ opacity:0, x:-16 }} animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.8, delay:0.75 }}
              style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
              <div style={{ position:"relative", flexShrink:0 }}>
                {[1,2].map(i => (
                  <motion.div key={i} animate={{ scale:[1,1.9], opacity:[0.4,0] }}
                    transition={{ duration:2.2, delay:i*0.8, repeat:Infinity, ease:"easeOut" }}
                    style={{ position:"absolute", inset:0, borderRadius:"50%", border:"1px solid var(--gold)" }} />
                ))}
                <div style={{ width:"48px", height:"48px", borderRadius:"50%", border:"1px solid var(--borderg)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1 }}>
                  <span style={{ color:"var(--gold)" }}>☎</span>
                </div>
              </div>
              <div>
                {/* Reservations label — opacity lifted from 0.35 → 0.68 */}
                <p style={{ fontFamily:"var(--fb)", fontSize:"0.58rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(240,228,212,0.68)", marginBottom:"4px" }}>Reservations</p>
                <p style={{ fontFamily:"var(--fd)", fontSize:"1.1rem", color:"var(--gold)", fontWeight:300 }}>+91 98898 75151</p>
              </div>
            </motion.div>
          </div>

          {/* Right — staggered images with parallax */}
          <div className="sp">
            <motion.div className="iw" style={{ y:imgY }}>
              <motion.img src="/images/dark-exterior.jpg" alt="Maeva exterior" className="ic"
                initial={{ clipPath:"inset(100% 0% 0% 0%)" }}
                animate={inView ? { clipPath:"inset(0% 0% 0% 0%)" } : {}}
                transition={{ duration:1.25, delay:0.4, ease:[0.22,1,0.36,1] }}
                style={{ height:"420px" }} />
            </motion.div>
            <motion.div className="iw off">
              <motion.img src="/images/dark-room.jpg" alt="Maeva room" className="ic"
                initial={{ clipPath:"inset(100% 0% 0% 0%)" }}
                animate={inView ? { clipPath:"inset(0% 0% 0% 0%)" } : {}}
                transition={{ duration:1.25, delay:0.62, ease:[0.22,1,0.36,1] }}
                style={{ height:"360px" }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
