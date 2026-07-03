import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const exploreLinks = ["Home","Rooms & Suites","Dining","Spa & Wellness","About Hotel","Contact"];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer style={{ background:"#141414", paddingTop:"4rem", paddingBottom:"2rem" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Animated top divider */}
        <motion.div
          initial={{ scaleX:0, originX:0 }}
          animate={inView ? { scaleX:1 } : {}}
          transition={{ duration:1, ease:[0.22,1,0.36,1] }}
          style={{ height:"1px", background:"rgba(201,169,110,0.2)", marginBottom:"3rem" }}
        />

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"3rem", paddingBottom:"3rem", borderBottom:"1px solid rgba(255,255,255,0.06)" }}
          className="footer-grid">

          {/* About */}
          <motion.div
            initial={{ opacity:0, y:30 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.8, delay:0.1 }}
          >
            {/* Logo animate in */}
            <motion.span
              initial={{ opacity:0, letterSpacing:"0.5em" }}
              animate={inView ? { opacity:1, letterSpacing:"0.22em" } : {}}
              transition={{ duration:1, delay:0.2 }}
              style={{ fontFamily:"'Cormorant Garamond',serif", color:"#C9A96E", fontSize:"1.3rem", display:"block", marginBottom:"1.25rem" }}
            >MAEVA</motion.span>

            <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.35)", lineHeight:1.85, fontFamily:"'DM Sans',sans-serif", fontWeight:300, marginBottom:"1.5rem" }}>
              Maeva Hotel &amp; Resort — a timeless sanctuary where impeccable service meets breathtaking design in the heart of the city.
            </p>

            {/* Social icons with hover scale */}
            <div style={{ display:"flex", gap:"0.75rem" }}>
              {[{icon:"f",label:"Facebook"},{icon:"in",label:"LinkedIn"},{icon:"▶",label:"YouTube"}].map(({icon,label},i) => (
                <motion.a key={i} href="#" aria-label={label}
                  whileHover={{ scale:1.15, borderColor:"#C9A96E", color:"#C9A96E" }}
                  style={{ width:"34px", height:"34px", border:"1px solid rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.35)", fontSize:"0.7rem", textDecoration:"none", transition:"color 0.3s, border-color 0.3s" }}
                >{icon}</motion.a>
              ))}
            </div>
          </motion.div>

          {/* Explore — links with underline slide */}
          <motion.div
            initial={{ opacity:0, y:30 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.8, delay:0.2 }}
          >
            <h4 style={{ fontFamily:"'Cormorant Garamond',serif", color:"white", fontSize:"1.25rem", fontWeight:300, marginBottom:"1.25rem" }}>Explore</h4>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"0.7rem" }}>
              {exploreLinks.map((link, i) => (
                <motion.li key={link}
                  initial={{ opacity:0, x:-12 }}
                  animate={inView ? { opacity:1, x:0 } : {}}
                  transition={{ duration:0.5, delay:0.3 + i*0.06 }}
                >
                  <a href="#"
                    style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.35)", fontFamily:"'DM Sans',sans-serif", fontWeight:300, textDecoration:"none", position:"relative", display:"inline-block", transition:"color 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.color="#C9A96E"}
                    onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.35)"}
                  >
                    <span style={{ position:"relative" }}>
                      {link}
                      <span className="footer-link-line" style={{ position:"absolute", bottom:"-2px", left:0, width:0, height:"1px", background:"#C9A96E", transition:"width 0.35s ease", display:"block" }} />
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity:0, y:30 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.8, delay:0.3 }}
          >
            <h4 style={{ fontFamily:"'Cormorant Garamond',serif", color:"white", fontSize:"1.25rem", fontWeight:300, marginBottom:"1.25rem" }}>Contact</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>
              <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.35)", lineHeight:1.75, fontFamily:"'DM Sans',sans-serif", fontWeight:300 }}>
                527 Woodland Avenue, Civil Lines,<br/>New Delhi, 110054
              </p>
              {[
                { icon:"☎", text:"+91 98898 75151" },
                { icon:"✉", text:"reservations@maeva.com" },
              ].map(({ icon, text }, i) => (
                <motion.p key={i}
                  initial={{ opacity:0 }}
                  animate={inView ? { opacity:1 } : {}}
                  transition={{ delay:0.5 + i*0.1 }}
                  style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"0.85rem", color:"rgba(255,255,255,0.35)", fontFamily:"'DM Sans',sans-serif", fontWeight:300 }}
                >
                  <motion.span whileHover={{ scale:1.2 }} style={{ color:"#C9A96E" }}>{icon}</motion.span>
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom */}
        <div style={{ paddingTop:"1.5rem", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"0.75rem" }}
          className="footer-bottom">
          <motion.span
            initial={{ opacity:0 }}
            animate={inView ? { opacity:1 } : {}}
            transition={{ delay:0.6 }}
            style={{ fontFamily:"'Cormorant Garamond',serif", color:"#C9A96E", fontSize:"1.1rem", letterSpacing:"0.25em" }}
          >MAEVA HOTEL &amp; RESORT</motion.span>
          <motion.p
            initial={{ opacity:0 }}
            animate={inView ? { opacity:1 } : {}}
            transition={{ delay:0.7 }}
            style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.18)", fontFamily:"'DM Sans',sans-serif", fontWeight:300 }}
          >
            © {new Date().getFullYear()} Maeva Hotel &amp; Resort. All rights reserved.
          </motion.p>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; } .footer-bottom { text-align: center; } }
        a:hover .footer-link-line { width: 100% !important; }
      `}</style>
    </footer>
  );
}
