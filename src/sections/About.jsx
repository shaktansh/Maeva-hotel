import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedHeading from "../components/AnimatedHeading";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Text */}
          <div className="max-w-xl">
            {/* Stars stagger in */}
            <div style={{ display:"flex", gap:"4px", marginBottom:"1rem" }}>
              {[...Array(5)].map((_, i) => (
                <motion.span key={i}
                  initial={{ opacity:0, scale:0 }}
                  animate={inView ? { opacity:1, scale:1 } : {}}
                  transition={{ delay: i*0.07, type:"spring", stiffness:260, damping:14 }}
                  style={{ color:"#C9A96E", fontSize:"0.85rem" }}
                >☆</motion.span>
              ))}
            </div>

            {/* Eyebrow — letter spacing expand */}
            <motion.p
              initial={{ opacity:0, letterSpacing:"0.5em" }}
              animate={inView ? { opacity:1, letterSpacing:"0.25em" } : {}}
              transition={{ duration:0.9, delay:0.1 }}
              className="eyebrow" style={{ marginBottom:"1rem" }}
            >
              Maeva Hotel &amp; Resort
            </motion.p>

            {/* Heading — word clip reveal */}
            <div style={{ marginBottom:"1.25rem" }}>
              <AnimatedHeading
                text="Enjoy a Luxury Experience"
                inView={inView}
                delay={0.15}
                className="section-heading"
                style={{ fontSize:"clamp(2.4rem,4.5vw,3.6rem)", lineHeight:1.1 }}
              />
            </div>

            {/* Gold line draw */}
            <motion.span
              initial={{ scaleX:0, originX:0 }}
              animate={inView ? { scaleX:1 } : {}}
              transition={{ duration:0.8, delay:0.55 }}
              style={{ display:"block", width:"40px", height:"1px", background:"#C9A96E", marginBottom:"1.5rem" }}
            />

            {/* Body paragraphs fade up */}
            {[
              "Welcome to Maeva — a distinguished hotel and resort where timeless architecture meets the warmth of genuine Indian hospitality. Every space has been designed to envelop you in elegance, from the grand entrance portal to the serene corridors above.",
              "Our dedicated team anticipates your every need — ensuring each moment of your stay is effortless, memorable, and entirely your own.",
            ].map((text, i) => (
              <motion.p key={i}
                initial={{ opacity:0, y:24 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.8, delay:0.4 + i*0.15 }}
                style={{ fontSize:"0.875rem", color:"#6b7280", lineHeight:1.85, marginBottom:"1.25rem", fontFamily:"'DM Sans',sans-serif", fontWeight:300 }}
              >
                {text}
              </motion.p>
            ))}

            {/* Phone CTA — pulse ring */}
            <motion.div
              initial={{ opacity:0, x:-20 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.8, delay:0.7 }}
              style={{ display:"flex", alignItems:"center", gap:"1rem" }}
            >
              <div style={{ position:"relative", flexShrink:0 }}>
                {/* Pulse rings */}
                {[1,2].map(i => (
                  <motion.div key={i}
                    animate={{ scale:[1, 1.8], opacity:[0.4, 0] }}
                    transition={{ duration:2, delay:i*0.7, repeat:Infinity, ease:"easeOut" }}
                    style={{
                      position:"absolute", inset:0, borderRadius:"50%",
                      border:"1px solid #C9A96E",
                    }}
                  />
                ))}
                <div style={{ width:"48px", height:"48px", borderRadius:"50%", border:"1px solid #C9A96E", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1, background:"white" }}>
                  <span style={{ color:"#C9A96E", fontSize:"1rem" }}>☎</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize:"0.65rem", color:"#9ca3af", letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:"4px" }}>Reservations</p>
                <p style={{ color:"#C9A96E", fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", fontWeight:300 }}>+91 98898 75151</p>
              </div>
            </motion.div>
          </div>

          {/* Right — Staggered images with clip-path wipe reveal */}
          <div className="stagger-pair" style={{ paddingTop:"32px" }}>
            <motion.div
              initial={{ clipPath:"inset(100% 0% 0% 0%)", opacity:0 }}
              animate={inView ? { clipPath:"inset(0% 0% 0% 0%)", opacity:1 } : {}}
              transition={{ duration:1.1, delay:0.35, ease:[0.22,1,0.36,1] }}
              className="img-zoom"
            >
              <img src="/images/about-corridor.jpg" alt="Maeva corridor" />
            </motion.div>
            <motion.div
              initial={{ clipPath:"inset(100% 0% 0% 0%)", opacity:0 }}
              animate={inView ? { clipPath:"inset(0% 0% 0% 0%)", opacity:1 } : {}}
              transition={{ duration:1.1, delay:0.55, ease:[0.22,1,0.36,1] }}
              className="img-zoom offset"
            >
              <img src="/images/about-atrium.jpg" alt="Maeva atrium" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
