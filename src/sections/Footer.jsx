import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const EXPLORE = ["Home","Rooms & Suites","Dining","Spa & Wellness","About Hotel","Contact"];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });

  return (
    <footer style={{ background:"var(--dark)", paddingTop:"5rem", paddingBottom:"2.5rem", transition:"background 0.7s", position:"relative", overflow:"hidden" }} ref={ref}>
      {/* Watermark */}

      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 3rem" }}>
        {/* Animated top line */}
        <motion.div initial={{ scaleX:0, originX:0 }} animate={inView ? { scaleX:1 } : {}} transition={{ duration:1.3, ease:[0.22,1,0.36,1] }}
          style={{ height:"1px", background:"linear-gradient(90deg,var(--gold),transparent)", marginBottom:"4.5rem", opacity:0.35 }} />

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"3.5rem", paddingBottom:"3.5rem", borderBottom:"1px solid rgba(255,255,255,0.06)" }} className="fg">
          {/* Brand */}
          <motion.div initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.8, delay:0.1 }}>
            <motion.span initial={{ opacity:0, letterSpacing:"0.7em" }} animate={inView ? { opacity:1, letterSpacing:"0.22em" } : {}} transition={{ duration:1.3, delay:0.2 }}
              style={{ fontFamily:"var(--fd)", color:"var(--gold)", fontSize:"1.3rem", display:"block", marginBottom:"1.5rem" }}>
              MAEVA
            </motion.span>
            <p style={{ fontFamily:"var(--fb)", fontSize:"0.85rem", color:"rgba(240,232,224,0.3)", lineHeight:1.88, fontWeight:300, marginBottom:"1.75rem" }}>
              Maeva Hotel &amp; Resort — a timeless sanctuary where impeccable service meets breathtaking design in the heart of New Delhi.
            </p>
            <div style={{ display:"flex", gap:"0.75rem" }}>
              {["f","in","▶"].map((t,i) => (
                <motion.a key={i} href="#" whileHover={{ scale:1.15, borderColor:"var(--gold)", color:"var(--gold)" }}
                  style={{ width:"34px", height:"34px", border:"1px solid rgba(255,255,255,0.13)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.28)", fontSize:"0.7rem", textDecoration:"none", transition:"color 0.3s, border-color 0.3s" }}
                >{t}</motion.a>
              ))}
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.8, delay:0.2 }}>
            <h4 style={{ fontFamily:"var(--fd)", color:"white", fontSize:"1.2rem", fontWeight:300, marginBottom:"1.5rem" }}>Explore</h4>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"0.75rem" }}>
              {EXPLORE.map((link,i) => (
                <motion.li key={link} initial={{ opacity:0, x:-12 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.5, delay:0.3+i*0.06 }}>
                  <a href={`#${link.toLowerCase().replace(/[^a-z]/g,"").replace("rooms","rooms")}`}
                    onClick={e => { e.preventDefault(); const id=link.toLowerCase().replace(/[^a-z]/g,""); const el=document.getElementById(id)||document.getElementById("rooms"); el?.scrollIntoView({ behavior:"smooth" }); }}
                    style={{ fontSize:"0.85rem", color:"rgba(240,232,224,0.3)", fontFamily:"var(--fb)", fontWeight:300, textDecoration:"none", transition:"color 0.3s", display:"inline-block" }}
                    onMouseEnter={e => e.currentTarget.style.color="var(--gold)"}
                    onMouseLeave={e => e.currentTarget.style.color="rgba(240,232,224,0.3)"}
                  >{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.8, delay:0.3 }}>
            <h4 style={{ fontFamily:"var(--fd)", color:"white", fontSize:"1.2rem", fontWeight:300, marginBottom:"1.5rem" }}>Contact</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.9rem" }}>
              <p style={{ fontSize:"0.85rem", color:"rgba(240,232,224,0.3)", lineHeight:1.75, fontFamily:"var(--fb)", fontWeight:300 }}>
                527 Woodland Avenue, Civil Lines,<br/>New Delhi, 110054
              </p>
              {[{i:"☎",t:"+91 98898 75151"},{i:"✉",t:"reservations@maeva.com"}].map(({i,t},idx) => (
                <motion.p key={idx} initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.5+idx*0.1 }}
                  style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"0.85rem", color:"rgba(240,232,224,0.3)", fontFamily:"var(--fb)", fontWeight:300 }}>
                  <motion.span whileHover={{ scale:1.2 }} style={{ color:"var(--gold)" }}>{i}</motion.span>{t}
                </motion.p>
              ))}

              {/* Auth links in footer */}
              <div style={{ marginTop:"1rem", display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
                <Link to="/login" style={{ textDecoration:"none" }}>
                  <span className="btno" style={{ padding:"8px 16px", fontSize:"0.56rem" }}>Sign In</span>
                </Link>
                <Link to="/signup" style={{ textDecoration:"none" }}>
                  <span className="btng" style={{ padding:"8px 16px", fontSize:"0.56rem" }}>Join Now</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop:"1.75rem", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"0.75rem" }} className="fb-bar">
          <motion.span initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.7 }}
            style={{ fontFamily:"var(--fd)", color:"var(--gold)", fontSize:"1.1rem", letterSpacing:"0.22em" }}>
            MAEVA HOTEL &amp; RESORT
          </motion.span>
          <motion.p initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.8 }}
            style={{ fontSize:"0.68rem", color:"rgba(255,255,255,0.14)", fontFamily:"var(--fb)", fontWeight:300 }}>
            © {new Date().getFullYear()} Maeva Hotel &amp; Resort. All rights reserved.
          </motion.p>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){ .fg{grid-template-columns:1fr!important;} .fb-bar{text-align:center;flex-direction:column;} }
      `}</style>
    </footer>
  );
}
