import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "../data/hotelData";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (n) => { setDir(n>active?1:-1); setActive(n); };

  return (
    <section style={{ padding:"9rem 0", background:"var(--bg3)", transition:"background 0.7s", position:"relative", overflow:"hidden" }} ref={ref}>
      <motion.div initial={{ opacity:0, scale:0.5 }} animate={inView ? { opacity:1, scale:1 } : {}} transition={{ duration:1.2, ease:[0.22,1,0.36,1] }}
        style={{ position:"absolute", top:"-3rem", left:"2rem", fontFamily:"var(--fd)", fontSize:"22rem", color:"var(--gold)", opacity:0.025, lineHeight:1, pointerEvents:"none", userSelect:"none", fontWeight:300 }}>"</motion.div>
      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"0 3rem", textAlign:"center" }}>
        <motion.div initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.9 }}>
          <motion.p className="eyebrow" initial={{ opacity:0, letterSpacing:"0.6em" }} animate={inView ? { opacity:1, letterSpacing:"0.32em" } : {}} transition={{ duration:0.9 }} style={{ marginBottom:"0.75rem" }}>Guest Stories</motion.p>
          <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(2.8rem,6vw,5rem)", fontWeight:300, color:"var(--tx)", marginBottom:"4.5rem", display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"0 0.22em" }}>
            {["Voices","of","Maeva"].map((w,i) => (
              <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.05em" }}>
                <motion.span style={{ display:"inline-block" }} initial={{ y:"115%" }} animate={inView ? { y:"0%" } : {}} transition={{ duration:0.85, delay:0.1+i*0.12, ease:[0.22,1,0.36,1] }}>{w}</motion.span>
              </span>
            ))}
          </h2>
        </motion.div>
        <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ duration:0.9, delay:0.3 }}>
          <div style={{ display:"flex", justifyContent:"center", gap:"5px", marginBottom:"2.5rem" }}>
            {[...Array(5)].map((_,i) => (
              <motion.span key={i} initial={{ opacity:0, scale:0, rotate:-20 }} animate={inView ? { opacity:1, scale:1, rotate:0 } : {}} transition={{ delay:0.5+i*0.09, type:"spring", stiffness:260, damping:14 }} style={{ color:"var(--gold)", fontSize:"1.1rem" }}>★</motion.span>
            ))}
          </div>
          <div style={{ overflow:"hidden", minHeight:"140px", position:"relative", marginBottom:"2.5rem" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote key={active} custom={dir}
                initial={{ opacity:0, x:dir*70, filter:"blur(5px)" }}
                animate={{ opacity:1, x:0, filter:"blur(0px)" }}
                exit={{ opacity:0, x:dir*-70, filter:"blur(5px)" }}
                transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
                style={{ fontFamily:"var(--fd)", fontSize:"clamp(1.1rem,2.5vw,1.55rem)", fontWeight:300, color:"var(--tx)", lineHeight:1.65, fontStyle:"italic", margin:0 }}>
                "{testimonials[active].text}"
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active+"a"} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.4 }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem" }}>
              <motion.div animate={{ scale:[1,1.06,1] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                style={{ width:"52px", height:"52px", borderRadius:"50%", border:"1px solid var(--borderg)", padding:"2px" }}>
                <img src={testimonials[active].avatar} alt={testimonials[active].name} style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", display:"block" }} />
              </motion.div>
              <p style={{ fontFamily:"var(--fb)", fontSize:"0.85rem", color:"var(--tx)", fontWeight:400 }}>{testimonials[active].name}</p>
              <p className="eyebrow" style={{ fontSize:"0.56rem", color:"var(--tx3)" }}>{testimonials[active].title}</p>
            </motion.div>
          </AnimatePresence>
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"1.5rem", marginTop:"2.5rem" }}>
            <motion.button onClick={() => go((active-1+testimonials.length)%testimonials.length)}
              whileHover={{ scale:1.1, borderColor:"var(--gold)", color:"var(--gold)" }} whileTap={{ scale:0.95 }}
              style={{ background:"none", border:"1px solid var(--border)", color:"var(--tx3)", width:"38px", height:"38px", cursor:"pointer", fontSize:"0.9rem", transition:"all 0.3s", display:"flex", alignItems:"center", justifyContent:"center" }}>←</motion.button>
            <div style={{ display:"flex", gap:"8px" }}>
              {testimonials.map((_,i) => (
                <motion.button key={i} onClick={() => go(i)} animate={{ width:i===active?24:6, background:i===active?"var(--gold)":"var(--border)" }} transition={{ duration:0.4 }} style={{ height:"2px", border:"none", cursor:"pointer", padding:0 }} />
              ))}
            </div>
            <motion.button onClick={() => go((active+1)%testimonials.length)}
              whileHover={{ scale:1.1, borderColor:"var(--gold)", color:"var(--gold)" }} whileTap={{ scale:0.95 }}
              style={{ background:"none", border:"1px solid var(--border)", color:"var(--tx3)", width:"38px", height:"38px", cursor:"pointer", fontSize:"0.9rem", transition:"all 0.3s", display:"flex", alignItems:"center", justifyContent:"center" }}>→</motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
