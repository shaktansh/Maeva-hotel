import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Toast from "../components/Toast";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [toast, setToast] = useState(false);
  const [focused, setFocused] = useState(null);

  const fs = (n) => ({ width:"100%", border:"none", borderBottom:`1.5px solid ${focused===n?"var(--gold)":"var(--border)"}`, background:"transparent", outline:"none", fontFamily:"var(--fb)", fontSize:"0.9rem", color:"var(--tx)", padding:"6px 0 10px", transition:"border-color 0.35s" });

  return (
    <section id="contact" style={{ padding:"9rem 0", background:"var(--bg3)", transition:"background 0.7s" }} ref={ref}>
      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 3rem" }}>
        <div className="s2">
          <motion.div initial={{ opacity:0, x:-40 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}>
            <motion.p className="eyebrow" initial={{ opacity:0, letterSpacing:"0.6em" }} animate={inView ? { opacity:1, letterSpacing:"0.32em" } : {}} transition={{ duration:0.9 }} style={{ marginBottom:"1rem" }}>Get In Touch</motion.p>
            <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(2.4rem,4.5vw,4rem)", fontWeight:300, color:"var(--tx)", lineHeight:1.05, marginBottom:"1.5rem", display:"flex", flexWrap:"wrap", gap:"0 0.22em" }}>
              {["Reserve","Your","Stay"].map((w,i) => (
                <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.05em" }}>
                  <motion.span style={{ display:"inline-block" }} initial={{ y:"115%" }} animate={inView ? { y:"0%" } : {}} transition={{ duration:0.85, delay:0.1+i*0.12, ease:[0.22,1,0.36,1] }}>{w}</motion.span>
                </span>
              ))}
            </h2>
            <motion.span className="gl" initial={{ scaleX:0 }} animate={inView ? { scaleX:1 } : {}} transition={{ duration:0.8, delay:0.5 }} style={{ width:"48px", marginBottom:"1.75rem" }} />
            <motion.p initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7, delay:0.35 }}
              style={{ fontFamily:"var(--fb)", fontSize:"0.9rem", color:"var(--tx2)", lineHeight:1.88, marginBottom:"2.5rem", maxWidth:"360px", fontWeight:300 }}>
              Our reservations team is available 24 hours a day, seven days a week — ready to curate your perfect Maeva experience.
            </motion.p>
            {[{i:"☎",l:"Phone",v:"+91 98898 75151",g:true},{i:"✉",l:"Email",v:"reservations@maeva.com",g:false},{i:"📍",l:"Address",v:"527 Woodland Avenue, Civil Lines\nNew Delhi, 110054",g:false}].map((item,i) => (
              <motion.div key={item.l} initial={{ opacity:0, x:-18 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.7, delay:0.4+i*0.12 }} style={{ display:"flex", alignItems:"flex-start", gap:"1rem", marginBottom:"1.5rem" }}>
                <motion.div whileHover={{ scale:1.1, rotate:5 }} style={{ width:"40px", height:"40px", borderRadius:"50%", border:"1px solid var(--borderg)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ color:"var(--gold)", fontSize:"0.9rem" }}>{item.i}</span>
                </motion.div>
                <div>
                  <p style={{ fontFamily:"var(--fb)", fontSize:"0.56rem", color:"var(--tx3)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"4px" }}>{item.l}</p>
                  <p style={{ fontFamily:item.g?"var(--fd)":"var(--fb)", fontSize:item.g?"1.05rem":"0.875rem", color:item.g?"var(--gold)":"var(--tx)", fontWeight:300, whiteSpace:"pre-line", lineHeight:1.6 }}>{item.v}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity:0, x:40 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.9, delay:0.2, ease:[0.22,1,0.36,1] }}>
            <form onSubmit={e => { e.preventDefault(); setToast(true); e.target.reset(); }} style={{ display:"flex", flexDirection:"column", gap:"1.75rem" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
                {["First Name","Last Name"].map((l,i) => (
                  <div key={l}>
                    <p style={{ fontFamily:"var(--fb)", fontSize:"0.56rem", color:"var(--tx3)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"8px" }}>{l}</p>
                    <input type="text" placeholder={`Your ${l.toLowerCase()}`} required style={fs(`n${i}`)} onFocus={() => setFocused(`n${i}`)} onBlur={() => setFocused(null)} />
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontFamily:"var(--fb)", fontSize:"0.56rem", color:"var(--tx3)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"8px" }}>Email</p>
                <input type="email" placeholder="your@email.com" required style={fs("e")} onFocus={() => setFocused("e")} onBlur={() => setFocused(null)} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
                {[["Check In","ci"],["Check Out","co"]].map(([l,k]) => (
                  <div key={k}>
                    <p style={{ fontFamily:"var(--fb)", fontSize:"0.56rem", color:"var(--tx3)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"8px" }}>{l}</p>
                    <input type="date" style={{ ...fs(k), color:"var(--tx3)" }} onFocus={() => setFocused(k)} onBlur={() => setFocused(null)} />
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontFamily:"var(--fb)", fontSize:"0.56rem", color:"var(--tx3)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"8px" }}>Message</p>
                <textarea placeholder="Any special requests…" rows={4} style={{ ...fs("m"), resize:"none" }} onFocus={() => setFocused("m")} onBlur={() => setFocused(null)} />
              </div>
              <motion.button type="submit" className="btng" style={{ width:"100%", justifyContent:"center", fontSize:"0.62rem" }} whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}>
                <span>Send Enquiry</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      <Toast message="Thank you! We'll be in touch within 24 hours." visible={toast} onHide={() => setToast(false)} />
    </section>
  );
}
