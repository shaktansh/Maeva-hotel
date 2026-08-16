import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OfferPopup() {
  const [v, setV] = useState(false);
  const [dis, setDis] = useState(false);

  useEffect(() => { const t = setTimeout(() => { if(!dis) setV(true); }, 7000); return ()=>clearTimeout(t); }, [dis]);
  const dismiss = () => { setV(false); setDis(true); };

  return (
    <AnimatePresence>
      {v && (
        <motion.div initial={{ opacity:0, x:80, scale:0.95 }} animate={{ opacity:1, x:0, scale:1 }} exit={{ opacity:0, x:80, scale:0.95 }} transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
          style={{ position:"fixed", bottom:"6rem", right:"1.5rem", zIndex:800, width:"260px", background:"var(--surface)", boxShadow:"var(--shh)", overflow:"hidden", border:"1px solid var(--borderg)", transition:"background 0.7s" }}>
          <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.3, duration:0.6 }}
            style={{ height:"2px", background:"var(--gold)", transformOrigin:"left" }} />
          <div style={{ padding:"1.25rem 1.25rem 1.5rem" }}>
            <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
              style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:"var(--goldfade)", border:"1px solid var(--borderg)", padding:"3px 10px", marginBottom:"0.85rem" }}>
              <span style={{ color:"var(--gold)", fontSize:"0.6rem" }}>✦</span>
              <span style={{ fontFamily:"var(--fb)", fontSize:"0.54rem", color:"var(--gold)", letterSpacing:"0.2em", textTransform:"uppercase" }}>Limited Offer</span>
            </motion.div>
            <motion.h4 initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45 }}
              style={{ fontFamily:"var(--fd)", fontSize:"1.25rem", fontWeight:300, color:"var(--tx)", lineHeight:1.3, marginBottom:"0.6rem" }}>
              Early Bird<br/>Special
            </motion.h4>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}
              style={{ fontFamily:"var(--fb)", fontSize:"0.78rem", color:"var(--tx2)", lineHeight:1.65, marginBottom:"1.1rem", fontWeight:300 }}>
              Book 30+ days in advance and save 20% on all rooms.
            </motion.p>
            <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.6, type:"spring", stiffness:200 }}
              style={{ display:"flex", alignItems:"baseline", gap:"6px", marginBottom:"1.1rem" }}>
              <span style={{ fontFamily:"var(--fd)", fontSize:"2.2rem", color:"var(--gold)", fontWeight:300, lineHeight:1 }}>20%</span>
              <span style={{ fontFamily:"var(--fb)", fontSize:"0.7rem", color:"var(--tx3)", letterSpacing:"0.1em" }}>off your stay</span>
            </motion.div>
            <motion.a href="#contact" onClick={() => { dismiss(); document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" }); }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
              className="btng" style={{ display:"flex", width:"100%", justifyContent:"center", fontSize:"0.58rem", padding:"10px 0" }}
              whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
            ><span>Claim Offer</span></motion.a>
          </div>
          <button onClick={dismiss} style={{ position:"absolute", top:"0.6rem", right:"0.6rem", background:"none", border:"none", color:"var(--tx3)", cursor:"pointer", fontSize:"0.75rem", padding:"4px", transition:"color 0.3s" }}
            onMouseEnter={e=>e.currentTarget.style.color="var(--gold)"} onMouseLeave={e=>e.currentTarget.style.color="var(--tx3)"}>✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
