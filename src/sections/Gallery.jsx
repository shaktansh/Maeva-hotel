import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { galleryImages } from "../data/hotelData";
import Lightbox from "../components/Lightbox";

function Cap({ label }) {
  return (
    <div onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,0.42)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,0)"}
      style={{ position:"absolute", inset:0, display:"flex", alignItems:"flex-end", padding:"1rem", background:"rgba(0,0,0,0)", transition:"background 0.4s" }}>
      <span className="cap-txt" style={{ fontFamily:"var(--fb)", fontSize:"0.58rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0)", transition:"color 0.4s" }}>{label}</span>
      <style>{`.cap-txt{transition:color 0.4s;} div:hover .cap-txt{color:rgba(255,255,255,0.85)!important;}`}</style>
    </div>
  );
}

const clips = [
  "inset(0% 0% 100% 0%)", // reveal from top
  "inset(0% 100% 0% 0%)", // reveal from right
  "inset(100% 0% 0% 0%)", // reveal from bottom
  "inset(0% 0% 0% 100%)", // reveal from left
  "inset(50% 50% 50% 50%)", // zoom from center
  "inset(0% 100% 0% 0%)",
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [lb, setLb] = useState(null);
  const n = galleryImages.length;

  return (
    <section id="gallery" style={{ padding:"9rem 0", background:"var(--bg2)", transition:"background 0.7s" }} ref={ref}>
      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 3rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <motion.p className="eyebrow" initial={{ opacity:0, letterSpacing:"0.6em" }} animate={inView ? { opacity:1, letterSpacing:"0.32em" } : {}} transition={{ duration:0.9 }} style={{ marginBottom:"0.75rem" }}>Visual Journey</motion.p>
            <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(2.8rem,6vw,5rem)", fontWeight:300, color:"var(--tx)", display:"flex", flexWrap:"wrap", gap:"0 0.22em" }}>
              {["Our","Gallery"].map((w,i) => (
                <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.05em" }}>
                  <motion.span style={{ display:"inline-block" }} initial={{ y:"115%" }} animate={inView ? { y:"0%" } : {}} transition={{ duration:0.85, delay:0.1+i*0.14, ease:[0.22,1,0.36,1] }}>{w}</motion.span>
                </span>
              ))}
            </h2>
          </div>
          <motion.p initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.5 }} style={{ fontFamily:"var(--fb)", fontSize:"0.7rem", color:"var(--tx3)", letterSpacing:"0.1em" }}>Click any image ↗</motion.p>
        </div>

        <div className="gg">
          {[[0,"tall g-tall",galleryImages[0].caption,245],[1,"g-short",galleryImages[1].caption,null],[2,"tall g-tall",galleryImages[2].caption,245],[3,"g-short",galleryImages[3].caption,null],[4,"g-short",galleryImages[4].caption,null],[5,"g-short gw",galleryImages[5].caption,null]].map(([idx,cls,cap,th],pos) => (
            <motion.div key={idx}
              initial={{ opacity:0, clipPath:clips[pos] }} animate={inView ? { opacity:1, clipPath:"inset(0% 0% 0% 0%)" } : {}}
              transition={{ duration:1.1, delay:pos*0.09, ease:[0.22,1,0.36,1] }}
              className={`iw ${cls}`} style={{ cursor:"zoom-in", position:"relative" }}
              onClick={() => setLb(idx)}
              whileHover={{ scale:1.01, transition:{ duration:0.4 } }}
            >
              <img src={galleryImages[idx].src} alt={cap} className={`gi ${th?"":"g-short-i"}`}
                style={th ? { height:`${th+255}px` } : { height:"244px" }} />
              <Cap label={cap} />
            </motion.div>
          ))}
        </div>
      </div>
      <Lightbox images={galleryImages} index={lb} onClose={() => setLb(null)} onPrev={() => setLb((lb-1+n)%n)} onNext={() => setLb((lb+1)%n)} />
      <style>{`
        .g-tall img { height: 500px !important; }
        @media(max-width:768px) { .g-tall img, .g-short-i { height: 40vw !important; max-height: 210px !important; } }
      `}</style>
    </section>
  );
}
