import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const venues = ["Signature Breakfast","À La Carte Dinner","In-Room Dining","Evening High Tea"];

export default function Dining() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], [70,-70]);

  return (
    <section id="dining" style={{ padding:"9rem 0", background:"var(--bg)", transition:"background 0.7s" }} ref={ref}>
      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 3rem" }}>
        <div className="s2">
          <motion.div className="iw dh" style={{ y:imgY }}>
            <motion.img src="/images/lobby.jpg" alt="Maeva dining" className="ic"
              initial={{ clipPath:"inset(100% 0% 0% 0%)" }} animate={inView ? { clipPath:"inset(0% 0% 0% 0%)" } : {}}
              transition={{ duration:1.25, delay:0.2, ease:[0.22,1,0.36,1] }} style={{ height:"520px" }} />
          </motion.div>
          <motion.div initial={{ opacity:0, x:45 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.9, delay:0.3, ease:[0.22,1,0.36,1] }}>
            <motion.p className="eyebrow" initial={{ opacity:0, letterSpacing:"0.6em" }} animate={inView ? { opacity:1, letterSpacing:"0.32em" } : {}} transition={{ duration:0.9, delay:0.35 }} style={{ marginBottom:"1rem" }}>Culinary Excellence</motion.p>
            <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(2.4rem,4.5vw,3.8rem)", fontWeight:300, color:"var(--tx)", lineHeight:1.05, marginBottom:"1.5rem", display:"flex", flexWrap:"wrap", gap:"0 0.22em" }}>
              {["Dining","Experience"].map((w,i) => (
                <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.05em" }}>
                  <motion.span style={{ display:"inline-block" }} initial={{ y:"115%" }} animate={inView ? { y:"0%" } : {}} transition={{ duration:0.85, delay:0.42+i*0.14, ease:[0.22,1,0.36,1] }}>{w}</motion.span>
                </span>
              ))}
            </h2>
            <motion.span className="gl" initial={{ scaleX:0 }} animate={inView ? { scaleX:1 } : {}} transition={{ duration:0.8, delay:0.65 }} style={{ width:"48px", marginBottom:"1.75rem" }} />
            {["Our in-house dining is a celebration of the world's finest ingredients, prepared by chefs trained in prestigious kitchens across Asia and Europe.",
              "From our curated breakfast to our à la carte dinner, every meal at Maeva is a destination in its own right."].map((t,i) => (
              <motion.p key={i} initial={{ opacity:0, y:18 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7, delay:0.5+i*0.14 }}
                style={{ fontFamily:"var(--fb)", fontSize:"0.9rem", color:"var(--tx2)", lineHeight:1.88, marginBottom:"1.25rem", fontWeight:300 }}>{t}</motion.p>
            ))}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.85rem", marginBottom:"2.5rem" }}>
              {venues.map((v,i) => (
                <motion.div key={v} initial={{ opacity:0, x:-14 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.55, delay:0.7+i*0.09 }} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <motion.span initial={{ scale:0 }} animate={inView ? { scale:1 } : {}} transition={{ delay:0.75+i*0.09, type:"spring", stiffness:300 }} style={{ width:"6px", height:"6px", borderRadius:"50%", background:"var(--gold)", flexShrink:0 }} />
                  <span style={{ fontFamily:"var(--fb)", fontSize:"0.875rem", color:"var(--tx)", fontWeight:300 }}>{v}</span>
                </motion.div>
              ))}
            </div>
            <motion.a href="#contact" className="btn"
              onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" }); }}
              whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
            ><span>Reserve a Table</span></motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
