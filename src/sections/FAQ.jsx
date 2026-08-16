import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { faqs } from "../data/hotelData";

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [open, setOpen] = useState(0);

  return (
    <section style={{ padding:"9rem 0", background:"var(--bg2)", transition:"background 0.7s" }} ref={ref}>
      <div style={{ maxWidth:"860px", margin:"0 auto", padding:"0 3rem" }}>
        <motion.div initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.9 }} style={{ marginBottom:"4.5rem" }}>
          <motion.p className="eyebrow" initial={{ opacity:0, letterSpacing:"0.6em" }} animate={inView ? { opacity:1, letterSpacing:"0.32em" } : {}} transition={{ duration:0.9 }} style={{ marginBottom:"0.75rem" }}>Need to Know</motion.p>
          <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(2.8rem,6vw,5rem)", fontWeight:300, color:"var(--tx)", display:"flex", flexWrap:"wrap", gap:"0 0.22em" }}>
            {["Frequently","Asked"].map((w,i) => (
              <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.05em" }}>
                <motion.span style={{ display:"inline-block" }} initial={{ y:"115%" }} animate={inView ? { y:"0%" } : {}} transition={{ duration:0.85, delay:0.1+i*0.14, ease:[0.22,1,0.36,1] }}>{w}</motion.span>
              </span>
            ))}
          </h2>
        </motion.div>
        {faqs.map((faq,i) => (
          <motion.div key={i} initial={{ opacity:0, y:18 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.65, delay:i*0.08 }} style={{ borderBottom:"1px solid var(--border)" }}>
            <motion.button onClick={() => setOpen(open===i?-1:i)} whileHover={{ x:4 }} transition={{ duration:0.2 }}
              style={{ width:"100%", textAlign:"left", padding:"1.5rem 0", display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"1rem", background:"none", border:"none", cursor:"pointer" }}>
              <span style={{ fontFamily:"var(--fd)", fontSize:"1.1rem", fontWeight:300, color:open===i?"var(--gold)":"var(--tx)", transition:"color 0.3s" }}>{faq.q}</span>
              <motion.span animate={{ rotate:open===i?45:0 }} transition={{ duration:0.3 }} style={{ color:"var(--gold)", fontSize:"1.4rem", flexShrink:0, lineHeight:1, marginTop:"2px" }}>+</motion.span>
            </motion.button>
            <AnimatePresence initial={false}>
              {open===i && (
                <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.4, ease:[0.22,1,0.36,1] }} style={{ overflow:"hidden" }}>
                  <p style={{ fontFamily:"var(--fb)", fontSize:"0.9rem", color:"var(--tx2)", lineHeight:1.88, paddingBottom:"1.5rem", paddingRight:"3rem", fontWeight:300 }}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
