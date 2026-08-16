import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

function WordReveal({ text, inView, delay=0, style={} }) {
  return (
    <span style={{ display:"flex", flexWrap:"wrap", gap:"0 0.24em", ...style }}>
      {text.split(" ").map((w,i) => (
        <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.05em" }}>
          <motion.span style={{ display:"inline-block" }}
            initial={{ y:"115%", opacity:0 }}
            animate={inView ? { y:"0%", opacity:1 } : {}}
            transition={{ duration:0.85, delay:delay+i*0.1, ease:[0.22,1,0.36,1] }}
          >{w}</motion.span>
        </span>
      ))}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-100px" });
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const y1 = useTransform(scrollYProgress, [0,1], [50,-50]);
  const y2 = useTransform(scrollYProgress, [0,1], [90,-30]);

  return (
    <section id="about" style={{ padding:"9rem 0", background:"var(--bg)", transition:"background 0.7s", position:"relative", overflow:"hidden" }} ref={ref}>

      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 3rem" }}>
        <div className="s2">
          {/* Left */}
          <div>
            <div style={{ display:"flex", gap:"4px", marginBottom:"1.25rem" }}>
              {[...Array(5)].map((_,i) => (
                <motion.span key={i}
                  initial={{ opacity:0, scale:0, rotate:-20 }}
                  animate={inView ? { opacity:1, scale:1, rotate:0 } : {}}
                  transition={{ delay:i*0.08, type:"spring", stiffness:250 }}
                  style={{ color:"var(--gold)", fontSize:"0.85rem" }}
                >☆</motion.span>
              ))}
            </div>

            <motion.p className="eyebrow"
              initial={{ opacity:0, letterSpacing:"0.6em" }}
              animate={inView ? { opacity:1, letterSpacing:"0.32em" } : {}}
              transition={{ duration:0.9 }}
              style={{ marginBottom:"1.25rem" }}
            >Maeva Hotel &amp; Resort</motion.p>

            <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(2.5rem,4.5vw,3.8rem)", fontWeight:300, color:"var(--tx)", marginBottom:"1.5rem", lineHeight:1.05 }}>
              <WordReveal text="Enjoy a Luxury Experience" inView={inView} delay={0.1} />
            </h2>

            <motion.span className="gl"
              initial={{ scaleX:0 }} animate={inView ? { scaleX:1 } : {}}
              transition={{ duration:0.9, delay:0.55 }}
              style={{ width:"48px", marginBottom:"1.75rem" }}
            />

            {["Welcome to Maeva — a distinguished hotel and resort where timeless architecture meets the warmth of genuine Indian hospitality. Every detail has been designed to envelop you in elegance.",
              "Our devoted team anticipates every need — ensuring each moment of your stay is effortless, memorable, and entirely your own."].map((t,i) => (
              <motion.p key={i}
                initial={{ opacity:0, y:22 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.8, delay:0.4+i*0.16 }}
                style={{ fontFamily:"var(--fb)", fontSize:"0.9rem", color:"var(--tx2)", lineHeight:1.88, marginBottom:"1.25rem", fontWeight:300 }}
              >{t}</motion.p>
            ))}

            {/* Phone CTA with pulse rings */}
            <motion.div
              initial={{ opacity:0, x:-16 }} animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.8, delay:0.72 }}
              style={{ display:"flex", alignItems:"center", gap:"1.1rem", marginTop:"0.5rem" }}
            >
              <div style={{ position:"relative", flexShrink:0 }}>
                {[1,2].map(i => (
                  <motion.div key={i}
                    animate={{ scale:[1,1.9], opacity:[0.5,0] }}
                    transition={{ duration:2.2, delay:i*0.8, repeat:Infinity, ease:"easeOut" }}
                    style={{ position:"absolute", inset:0, borderRadius:"50%", border:"1px solid var(--gold)" }}
                  />
                ))}
                <div style={{ width:"48px", height:"48px", borderRadius:"50%", border:"1px solid var(--gold)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1, background:"var(--goldfade)" }}>
                  <span style={{ color:"var(--gold)" }}>☎</span>
                </div>
              </div>
              <div>
                <p style={{ fontFamily:"var(--fb)", fontSize:"0.56rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--tx3)", marginBottom:"4px" }}>Reservations</p>
                <p style={{ fontFamily:"var(--fd)", fontSize:"1.1rem", color:"var(--gold)", fontWeight:300 }}>+91 98898 75151</p>
              </div>
            </motion.div>
          </div>

          {/* Right — parallax staggered images with clip reveal */}
          <div className="sp" style={{ paddingTop:"2rem" }}>
            <motion.div className="iw" style={{ y:y1 }}>
              <motion.img src="/images/about-corridor.jpg" alt="Maeva corridor"
                className="ic"
                initial={{ clipPath:"inset(100% 0% 0% 0%)" }}
                animate={inView ? { clipPath:"inset(0% 0% 0% 0%)" } : {}}
                transition={{ duration:1.25, delay:0.35, ease:[0.22,1,0.36,1] }}
                style={{ height:"420px" }}
              />
            </motion.div>
            <motion.div className="iw off" style={{ y:y2 }}>
              <motion.img src="/images/about-atrium.jpg" alt="Maeva atrium"
                className="ic"
                initial={{ clipPath:"inset(100% 0% 0% 0%)" }}
                animate={inView ? { clipPath:"inset(0% 0% 0% 0%)" } : {}}
                transition={{ duration:1.25, delay:0.58, ease:[0.22,1,0.36,1] }}
                style={{ height:"360px" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
