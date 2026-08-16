import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Best actual Maeva images for hero — exterior shots look most cinematic
const IMGS = [
  "/images/hero-000.jpg",   // main gate at night — dramatic
  "/images/hero-007.jpg",   // front facade lit up
  "/images/hero-005.jpg",   // wide exterior
  "/images/about-corridor.jpg",  // elegant corridor
  "/images/about-atrium.jpg",    // beautiful atrium
];

const WORDS_LINE1 = ["Enjoy", "A"];
const WORDS_LINE2 = ["Luxury", "Experience"];

function Spotlight({ containerRef }) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const fn = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", fn, { passive:true });
    return () => el.removeEventListener("mousemove", fn);
  }, [containerRef]);
  return null;
}

// Particle system — GPU only
function Particles({ count = 8 }) {
  const pts = Array.from({ length:count }, (_, i) => ({
    left: `${8 + (i * 12) % 88}%`,
    top:  `${15 + (i * 17) % 65}%`,
    size: 1.5 + (i % 3) * 0.8,
    dur:  `${7 + (i % 4) * 2.5}s`,
    del:  `${(i * 0.6) % 4}s`,
  }));
  return (
    <>
      <style>{`@keyframes fp{0%,100%{transform:translateY(0) scale(1);opacity:0.35;}50%{transform:translateY(-22px) scale(1.4);opacity:0.7;}}`}</style>
      {pts.map((p,i) => (
        <div key={i} style={{ position:"absolute", left:p.left, top:p.top, width:`${p.size*2}px`, height:`${p.size*2}px`, borderRadius:"50%", background:"var(--gold)", animation:`fp ${p.dur} ${p.del} ease-in-out infinite`, zIndex:3, pointerEvents:"none" }} />
      ))}
    </>
  );
}

// Vertical text strip on the side
function SideStrip() {
  const items = ["5 STAR", "LUXURY", "NEW DELHI", "EST 2018"];
  return (
    <div style={{ position:"absolute", right:"1.25rem", top:"50%", transform:"translateY(-50%) rotate(90deg)", zIndex:4, display:"flex", gap:"2.5rem", transformOrigin:"center", pointerEvents:"none" }}>
      {items.map((t,i) => (
        <span key={i} style={{ fontFamily:"var(--fb)", fontSize:"0.5rem", letterSpacing:"0.35em", color:"rgba(255,255,255,0.28)", textTransform:"uppercase", whiteSpace:"nowrap" }}>{t}</span>
      ))}
    </div>
  );
}

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const [prev, setPrev] = useState(null);
  const secRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      setPrev(idx);
      setIdx(i => (i + 1) % IMGS.length);
    }, 7000);
    const r = setTimeout(() => setReady(true), 900);
    return () => { clearInterval(t); clearTimeout(r); };
  }, [idx]);

  const wordVariant = {
    hidden: { y:"115%", opacity:0 },
    show:   (i) => ({ y:"0%", opacity:1, transition:{ duration:1, delay:i*0.13, ease:[0.22,1,0.36,1] } }),
  };

  return (
    <section id="home" ref={secRef}
      style={{ position:"relative", height:"100vh", minHeight:"640px", display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* ── BG images — cross-dissolve with scale ── */}
      <div style={{ position:"absolute", inset:0 }}>
        {IMGS.map((src, i) => (
          <motion.div key={src}
            initial={{ opacity:0 }}
            animate={{ opacity: i===idx ? 1 : 0 }}
            transition={{ duration:2.2, ease:"easeInOut" }}
            style={{ position:"absolute", inset:0, zIndex: i===idx ? 1 : 0 }}
          >
            <motion.img src={src} alt=""
              animate={{ scale: i===idx ? 1.06 : 1 }}
              transition={{ duration:9, ease:"linear" }}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", objectPosition:"center" }}
            />
          </motion.div>
        ))}

        {/* Vignette + cinematic overlay */}
        <div style={{ position:"absolute", inset:0, zIndex:2, background:"var(--hero-over)", transition:"background 0.7s" }} />

        {/* Dark theme spotlight */}
        <div className="spot" style={{ zIndex:3 }} />
        <Spotlight containerRef={secRef} />
      </div>

      {/* Particles */}
      <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none" }}>
        <Particles />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ position:"relative", zIndex:5, flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 1.5rem 11rem" }}>

        {/* Stars */}
        <div style={{ display:"flex", gap:"7px", marginBottom: "1rem" }}>
          {[...Array(5)].map((_,i) => (
            <motion.span key={i}
              initial={{ opacity:0, scale:0, rotate:-25 }}
              animate={{ opacity:1, scale:1, rotate:0 }}
              transition={{ delay:3.1+i*0.1, type:"spring", stiffness:260, damping:12 }}
              style={{ color:"var(--gold)", fontSize:"0.95rem" }}
            >★</motion.span>
          ))}
        </div>

        {/* Eyebrow — letterSpacing expand */}
        <motion.p
          initial={{ opacity:0, letterSpacing:"0.8em" }}
          animate={{ opacity:1, letterSpacing:"0.42em" }}
          transition={{ delay:3.3, duration:1.3, ease:[0.22,1,0.36,1] }}
          style={{ fontFamily:"var(--fb)", fontSize:"0.6rem", textTransform:"uppercase", color:"rgba(255,255,255,0.6)", marginBottom: "1.25rem" }}
        >Maeva Hotel &amp; Resort · New Delhi</motion.p>

        {/* Headline — 2 lines, word-by-word clip reveal */}
        <h1 style={{
          fontFamily:"var(--fd)",
          fontSize: "clamp(2.8rem,7vw,7.5rem)",
          letterSpacing: "0.09em",
          textTransform:"uppercase", color:"white",
          fontWeight: 300,
          lineHeight: 1.0,
          marginBottom: "1.75rem",
        }}>
          {/* Line 1 */}
          <div style={{ display:"flex", justifyContent:"center", gap:"0 0.2em", flexWrap:"wrap", marginBottom:"0.04em" }}>
            {WORDS_LINE1.map((w,i) => (
              <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.04em" }}>
                <motion.span style={{ display:"inline-block" }} custom={i}
                  initial="hidden" animate={ready ? "show" : "hidden"} variants={wordVariant}
                >{w}</motion.span>
              </span>
            ))}
          </div>
          {/* Line 2 */}
          <div style={{ display:"flex", justifyContent:"center", gap:"0 0.2em", flexWrap:"wrap" }}>
            {WORDS_LINE2.map((w,i) => (
              <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.04em" }}>
                <motion.span style={{ display:"inline-block" }} custom={i+2}
                  initial="hidden" animate={ready ? "show" : "hidden"} variants={wordVariant}
                >{w}</motion.span>
              </span>
            ))}
          </div>
        </h1>

        {/* CTA row */}
        <motion.div
          initial={{ opacity:0, scale:0.88 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ delay:1.6, duration:0.75, ease:[0.22,1,0.36,1] }}
          style={{ display:"flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center" }}
        >
          <motion.a href="#rooms" className="btn"
            onClick={e => { e.preventDefault(); document.getElementById("rooms")?.scrollIntoView({ behavior:"smooth" }); }}
            whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
            style={{ borderColor:"rgba(255,255,255,0.65)", color:"white" }}
          >
            <span>Explore Rooms</span>
            <motion.span animate={{ x:[0,6,0] }} transition={{ duration:1.4, repeat:Infinity }}>→</motion.span>
          </motion.a>
          <motion.a href="#contact" className="btng"
            onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" }); }}
            whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
          >
            <span>Book Now</span>
          </motion.a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:4, duration:1 }}
        style={{ position:"absolute", bottom:"168px", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:"6px", zIndex:5 }}
      >
        <div style={{ width:"1px", height:"52px", background:"rgba(255,255,255,0.15)", position:"relative", overflow:"hidden" }}>
          <motion.div style={{ position:"absolute", top:0, left:0, width:"100%", background:"var(--gold)" }}
            animate={{ height:["0%","100%"] }}
            transition={{ duration:1.8, repeat:Infinity, repeatDelay:0.4 }}
          />
        </div>
      </motion.div>

      {/* Side strip */}
      <SideStrip />

      {/* ── Booking bar ── */}
      <motion.div
        initial={{ opacity:0, y:40 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:1, delay:1.9, ease:[0.22,1,0.36,1] }}
        style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:6 }}
      >
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 1.5rem" }}>
          <div style={{
            background:"var(--surface)",
            borderTop: `2px solid var(--gold)`,
            padding:"1.4rem 2rem",
            display:"flex", flexWrap:"wrap", gap:"1.25rem", alignItems:"flex-end",
            boxShadow:"0 -8px 50px rgba(0,0,0,0.2)",
            transition:"background 0.7s",
          }}>
            {[{ l:"Check In / Out", ph:"Check In → Check Out" },{ l:"Guests", ph:"Guests 1" }].map((f,i) => (
              <div key={i} style={{ flex:"1 1 170px", borderRight:"1px solid var(--border)", paddingRight:"1.25rem" }}>
                <p style={{ fontFamily:"var(--fb)", fontSize:"0.55rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--tx3)", marginBottom:"7px" }}>{f.l}</p>
                <input type="text" placeholder={f.ph} className="ff" />
              </div>
            ))}
            <div style={{ flex:"1 1 170px", borderRight:"1px solid var(--border)", paddingRight:"1.25rem" }}>
              <p style={{ fontFamily:"var(--fb)", fontSize:"0.55rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--tx3)", marginBottom:"7px" }}>Room Type</p>
              <select className="ff" style={{ cursor:"pointer", appearance:"none", background:"transparent" }}>
                <option>All Room Types</option>
                <option>Deluxe Twin Room</option>
                <option>Grand King Suite</option>
                <option>Premier Double Room</option>
              </select>
            </div>
            <motion.button className="btng" style={{ flexShrink:0, padding:"12px 28px", fontSize:"0.58rem" }}
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
              <span>Book Room</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Image indicator dots */}
      <div style={{ position:"absolute", right:"1.5rem", bottom:"175px", display:"flex", flexDirection:"column", gap:"5px", zIndex:5 }}>
        {IMGS.map((_,i) => (
          <motion.button key={i} onClick={() => setIdx(i)}
            animate={{ height:i===idx?26:9, background:i===idx?"var(--gold)":"rgba(255,255,255,0.28)" }}
            transition={{ duration:0.4 }}
            style={{ width:"3px", border:"none", cursor:"pointer", padding:0, borderRadius:"2px" }}
          />
        ))}
      </div>
    </section>
  );
}
