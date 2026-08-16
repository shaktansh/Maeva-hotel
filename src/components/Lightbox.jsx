import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    if(index===null) return;
    const fn = (e) => { if(e.key==="Escape")onClose(); if(e.key==="ArrowLeft")onPrev(); if(e.key==="ArrowRight")onNext(); };
    document.addEventListener("keydown",fn);
    document.body.style.overflow="hidden";
    return () => { document.removeEventListener("keydown",fn); document.body.style.overflow=""; };
  }, [index,onClose,onPrev,onNext]);

  const btnS = (extra={}) => ({ background:"none", border:"1px solid rgba(255,255,255,0.18)", color:"rgba(255,255,255,0.65)", width:"42px", height:"42px", cursor:"pointer", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s", ...extra });

  return (
    <AnimatePresence>
      {index!==null && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.35 }}
          onClick={onClose} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.94)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1.5rem" }}>
          <motion.div key={index} initial={{ opacity:0, scale:0.93 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.96 }} transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
            onClick={e=>e.stopPropagation()} style={{ position:"relative", maxWidth:"90vw", maxHeight:"85vh" }}>
            <img src={images[index].src} alt={images[index].caption} style={{ maxWidth:"90vw", maxHeight:"82vh", objectFit:"contain", display:"block" }} />
            <p style={{ textAlign:"center", marginTop:"1rem", fontFamily:"var(--fb)", fontSize:"0.6rem", color:"rgba(255,255,255,0.4)", letterSpacing:"0.22em", textTransform:"uppercase" }}>{images[index].caption}</p>
          </motion.div>
          <button style={{ ...btnS(), position:"fixed", top:"1.25rem", right:"1.5rem" }} onClick={onClose}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";e.currentTarget.style.color="rgba(255,255,255,0.65)";}}>✕</button>
          <button style={{ ...btnS(), position:"fixed", left:"1.25rem", top:"50%", transform:"translateY(-50%)" }} onClick={e=>{e.stopPropagation();onPrev();}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";e.currentTarget.style.color="rgba(255,255,255,0.65)";}}>←</button>
          <button style={{ ...btnS(), position:"fixed", right:"1.25rem", top:"50%", transform:"translateY(-50%)" }} onClick={e=>{e.stopPropagation();onNext();}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";e.currentTarget.style.color="rgba(255,255,255,0.65)";}}>→</button>
          <div style={{ position:"fixed", bottom:"1.25rem", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"6px" }}>
            {images.map((_,i) => (
              <div key={i} style={{ width:i===index?20:6, height:"2px", background:i===index?"var(--gold)":"rgba(255,255,255,0.25)", transition:"all 0.3s" }} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
