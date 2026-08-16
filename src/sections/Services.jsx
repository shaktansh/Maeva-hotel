import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "../data/hotelData";

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="amenities" style={{ padding:"9rem 0", background:"var(--bg3)", transition:"background 0.7s" }} ref={ref}>
      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 3rem" }}>
        <div style={{ marginBottom:"5rem", textAlign:"center" }}>
          <motion.p className="eyebrow" initial={{ opacity:0, letterSpacing:"0.6em" }} animate={inView ? { opacity:1, letterSpacing:"0.32em" } : {}} transition={{ duration:0.9 }} style={{ marginBottom:"1rem" }}>Our Services</motion.p>
          <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(2.8rem,6vw,5rem)", fontWeight:300, color:"var(--tx)", display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"0 0.22em" }}>
            {["Curated","Experiences"].map((w,i) => (
              <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.05em" }}>
                <motion.span style={{ display:"inline-block" }} initial={{ y:"115%" }} animate={inView ? { y:"0%" } : {}} transition={{ duration:0.85, delay:0.1+i*0.14, ease:[0.22,1,0.36,1] }}>{w}</motion.span>
              </span>
            ))}
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"3rem 2.5rem" }}>
          {services.map((s,i) => (
            <motion.div key={s.title}
              initial={{ opacity:0, y:50 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.75, delay:i*0.1, ease:[0.22,1,0.36,1] }}
              whileHover={{ y:-6, transition:{ duration:0.3 } }}
              style={{ padding:"2rem", border:"1px solid transparent", transition:"border-color 0.4s, box-shadow 0.4s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="var(--borderg)"; e.currentTarget.style.boxShadow="var(--sh)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="transparent"; e.currentTarget.style.boxShadow="none"; }}
            >
              <motion.div initial={{ opacity:0, scale:0 }} animate={inView ? { opacity:1, scale:1 } : {}} transition={{ delay:0.3+i*0.08, type:"spring", stiffness:280 }}
                style={{ fontFamily:"var(--fb)", fontSize:"0.54rem", color:"var(--gold)", opacity:0.5, letterSpacing:"0.15em", marginBottom:"0.6rem" }}>0{i+1}</motion.div>
              <motion.div whileHover={{ scale:1.15, rotate:[0,-8,8,-4,0], transition:{ duration:0.5 } }}
                style={{ fontSize:"1.75rem", marginBottom:"1rem", display:"inline-block" }}>{s.icon}</motion.div>
              <motion.span className="gl" initial={{ scaleX:0 }} animate={inView ? { scaleX:1 } : {}} transition={{ duration:0.6, delay:0.4+i*0.08 }} style={{ width:"28px", marginBottom:"1rem" }} />
              <h3 style={{ fontFamily:"var(--fd)", fontSize:"1.25rem", fontWeight:300, color:"var(--tx)", marginBottom:"0.75rem" }}>{s.title}</h3>
              <p style={{ fontFamily:"var(--fb)", fontSize:"0.875rem", color:"var(--tx3)", lineHeight:1.8, fontWeight:300 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
