import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeSplash() {
  // Only show if not already seen this session
  const [v, setV] = useState(() => !sessionStorage.getItem("maeva_splash"));

  useEffect(() => {
    if (!v) return;
    const t = setTimeout(() => {
      setV(false);
      sessionStorage.setItem("maeva_splash", "1");
    }, 3000);
    return () => clearTimeout(t);
  }, [v]);

  return (
    <AnimatePresence>
      {v && (
        <motion.div initial={{ opacity:1 }} exit={{ opacity:0, transition:{ duration:1, ease:[0.22,1,0.36,1] } }}
          style={{ position:"fixed", inset:0, zIndex:9999, background:"var(--dark)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
          {/* Corner accents */}
          {[{top:"1.5rem",left:"1.5rem",borderTop:"1px solid",borderLeft:"1px solid"},{top:"1.5rem",right:"1.5rem",borderTop:"1px solid",borderRight:"1px solid"},{bottom:"1.5rem",left:"1.5rem",borderBottom:"1px solid",borderLeft:"1px solid"},{bottom:"1.5rem",right:"1.5rem",borderBottom:"1px solid",borderRight:"1px solid"}].map((s,i) => (
            <motion.div key={i} initial={{ opacity:0, scale:0.4 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.15+i*0.05, duration:0.5 }}
              style={{ position:"absolute", width:"22px", height:"22px", borderColor:"var(--gold)", opacity:0.5, ...s }} />
          ))}
          {[{top:"2rem",left:"3rem",right:"3rem",transformOrigin:"left"},{bottom:"2rem",left:"3rem",right:"3rem",transformOrigin:"right"}].map((s,i) => (
            <motion.div key={i} initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.9, delay:0.1+i*0.12, ease:[0.22,1,0.36,1] }}
              style={{ position:"absolute", height:"1px", background:"var(--gold)", opacity:0.2, ...s }} />
          ))}
          {[...Array(5)].map((_,i) => (
            <motion.span key={i} initial={{ opacity:0, scale:0, rotate:-30 }} animate={{ opacity:1, scale:1, rotate:0 }} transition={{ delay:0.4+i*0.09, type:"spring", stiffness:280, damping:14 }}
              style={{ color:"var(--gold)", fontSize:"0.9rem", display:"inline-block", marginBottom: i===4?"1.5rem":"0", letterSpacing:"6px" }}>★</motion.span>
          ))}
          <motion.p initial={{ opacity:0, letterSpacing:"0.9em" }} animate={{ opacity:1, letterSpacing:"0.3em" }} transition={{ delay:0.65, duration:1.3, ease:[0.22,1,0.36,1] }}
            style={{ fontFamily:"var(--fd)", fontSize:"clamp(2.2rem,7vw,4.5rem)", color:"white", fontWeight:300, marginBottom:"0.6rem" }}>
            MAEVA
          </motion.p>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.05, duration:0.7 }}
            style={{ fontFamily:"var(--fb)", fontSize:"0.58rem", color:"rgba(255,255,255,0.35)", letterSpacing:"0.38em", textTransform:"uppercase" }}>
            Hotel &amp; Resort
          </motion.p>
          <motion.div initial={{ width:0 }} animate={{ width:"80px" }} transition={{ delay:1.3, duration:1.5, ease:"linear" }}
            style={{ height:"1px", background:"var(--gold)", marginTop:"2.5rem" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
