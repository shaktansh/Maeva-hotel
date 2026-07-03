import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/hero-4.jpg",
];

// Lightweight CSS-only floating particles
function Particles() {
  const particles = [
    { left:"15%", top:"20%", delay:"0s",   size:2, dur:"8s"  },
    { left:"80%", top:"35%", delay:"1.5s", size:1.5, dur:"10s" },
    { left:"60%", top:"70%", delay:"0.8s", size:2, dur:"7s"  },
    { left:"30%", top:"80%", delay:"2s",   size:1, dur:"9s"  },
    { left:"90%", top:"15%", delay:"3s",   size:1.5, dur:"11s" },
    { left:"5%",  top:"60%", delay:"1s",   size:1, dur:"8.5s" },
  ];
  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0px) scale(1);   opacity: 0.4; }
          50%  { transform: translateY(-18px) scale(1.3); opacity: 0.7; }
          100% { transform: translateY(0px) scale(1);   opacity: 0.4; }
        }
      `}</style>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: p.left, top: p.top,
          width: `${p.size * 2}px`, height: `${p.size * 2}px`,
          borderRadius: "50%",
          background: "#C9A96E",
          animation: `floatUp ${p.dur} ${p.delay} ease-in-out infinite`,
          zIndex: 3, pointerEvents: "none",
        }} />
      ))}
    </>
  );
}

const words = ["Enjoy", "A", "Luxury", "Experience"];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % heroImages.length), 6000);
    // Trigger word-by-word heading after entrance delay
    const h = setTimeout(() => setHeadingVisible(true), 800);
    return () => { clearInterval(t); clearTimeout(h); };
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[640px] flex flex-col">
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((src, i) => (
          <motion.div key={src} className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === idx ? 1 : 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            style={{ zIndex: i === idx ? 1 : 0 }}
          >
            <img src={src} alt="" className="w-full h-full object-cover"
              style={{ transform: i === idx ? "scale(1.04)" : "scale(1)", transition: "transform 7s ease-out" }}
            />
          </motion.div>
        ))}
        {/* Overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.40) 40%, rgba(0,0,0,0.65) 100%)",
          zIndex: 2,
        }} />
        {/* Floating particles */}
        <Particles />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pb-36" style={{ zIndex: 3 }}>
        <div className="flex flex-col items-center">

          {/* Stars — spring bounce in one by one */}
          <div style={{ display:"flex", gap:"6px", marginBottom:"1.25rem" }}>
            {[...Array(5)].map((_, i) => (
              <motion.span key={i}
                initial={{ opacity:0, scale:0, y:10 }}
                animate={{ opacity:1, scale:1, y:0 }}
                transition={{ delay: 0.3 + i*0.09, type:"spring", stiffness:280, damping:14 }}
                style={{ color:"#C9A96E", fontSize:"1.1rem" }}
              >★</motion.span>
            ))}
          </div>

          {/* Eyebrow — letter spacing expand */}
          <motion.p
            initial={{ opacity:0, letterSpacing:"0.7em" }}
            animate={{ opacity:1, letterSpacing:"0.4em" }}
            transition={{ delay:0.65, duration:1, ease:[0.22,1,0.36,1] }}
            style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.68rem", color:"rgba(255,255,255,0.7)", textTransform:"uppercase", marginBottom:"1.5rem" }}
          >
            Maeva Hotel &amp; Resort
          </motion.p>

          {/* Headline — word by word clip reveal */}
          <h1 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(3.2rem,8.5vw,8.5rem)",
            letterSpacing:"0.13em", textTransform:"uppercase",
            color:"white", fontWeight:300, lineHeight:1.05,
            marginBottom:"2rem",
            display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"0 0.2em",
          }}>
            {words.map((word, i) => (
              <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.05em" }}>
                <motion.span
                  style={{ display:"inline-block" }}
                  initial={{ y:"110%", opacity:0 }}
                  animate={headingVisible ? { y:"0%", opacity:1 } : {}}
                  transition={{ duration:0.85, delay: i*0.12, ease:[0.22,1,0.36,1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* CTA — fade + scale in */}
          <motion.div
            initial={{ opacity:0, scale:0.9 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ delay:1.35, duration:0.6, ease:[0.22,1,0.36,1] }}
            whileHover={{ scale:1.04 }}
          >
            <a href="#rooms" className="btn-outline">Rooms &amp; Suites</a>
          </motion.div>
        </div>
      </div>

      {/* Scroll line indicator */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ delay:2.2, duration:1 }}
        className="absolute flex flex-col items-center gap-2"
        style={{ bottom:"170px", left:"50%", transform:"translateX(-50%)", zIndex:3 }}
      >
        <div style={{ width:"1px", height:"44px", background:"rgba(255,255,255,0.18)", position:"relative", overflow:"hidden" }}>
          <motion.div
            style={{ position:"absolute", top:0, left:0, width:"100%", background:"#C9A96E" }}
            animate={{ height:["0%","100%"] }}
            transition={{ duration:1.6, repeat:Infinity, repeatDelay:0.4 }}
          />
        </div>
      </motion.div>

      {/* Booking Bar */}
      <motion.div
        initial={{ opacity:0, y:30 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:1, delay:1.5, ease:[0.22,1,0.36,1] }}
        className="absolute left-0 right-0 bottom-0"
        style={{ zIndex:4 }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white shadow-2xl px-6 lg:px-8 py-5 flex flex-col md:flex-row items-start md:items-end gap-5 md:gap-0">
            {[
              { label:"Check In / Out", placeholder:"Check In  →  Check Out", type:"text" },
              { label:"Guests",         placeholder:"Guests 1",                type:"text" },
            ].map((field, i) => (
              <div key={i} className="flex-1 md:px-6 md:border-r border-gray-100 w-full" style={i===0?{paddingLeft:0,paddingRight:"1.5rem"}:{}}>
                <p style={{ fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"#1C1C1C", fontFamily:"'DM Sans',sans-serif", marginBottom:"8px" }}>{field.label}</p>
                <input type={field.type} placeholder={field.placeholder} className="booking-bar-input"
                  style={{ transition:"border-color 0.3s" }}
                  onFocus={e => e.target.style.borderBottomColor="#C9A96E"}
                  onBlur={e  => e.target.style.borderBottomColor="#ddd"}
                />
              </div>
            ))}
            <div className="flex-1 md:px-6 md:border-r border-gray-100 w-full">
              <p style={{ fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"#1C1C1C", fontFamily:"'DM Sans',sans-serif", marginBottom:"8px" }}>Room Type</p>
              <select className="booking-bar-input" style={{ cursor:"pointer", appearance:"none", background:"transparent" }}>
                <option>All Room Types</option>
                <option>Deluxe Twin Room</option>
                <option>Grand King Suite</option>
                <option>Premier Double Room</option>
              </select>
            </div>
            <div className="md:pl-6 w-full md:w-auto">
              <motion.button className="btn-gold w-full md:w-auto whitespace-nowrap"
                whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              >Book Your Room</motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Image nav dots */}
      <div className="absolute right-6 flex flex-col gap-2" style={{ bottom:"180px", zIndex:3 }}>
        {heroImages.map((_, i) => (
          <motion.button key={i} onClick={() => setIdx(i)}
            animate={{ height: i===idx ? 28 : 12, background: i===idx ? "#C9A96E" : "rgba(255,255,255,0.35)" }}
            transition={{ duration:0.4 }}
            style={{ width:"4px", borderRadius:"2px", border:"none", cursor:"pointer", padding:0 }}
          />
        ))}
      </div>
    </section>
  );
}
