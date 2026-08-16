import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV = [
  { label:"Home",      href:"/#home",      section:"home" },
  { label:"Rooms",     href:"/#rooms",     section:"rooms" },
  { label:"Amenities", href:"/#amenities", section:"amenities" },
  { label:"Dining",    href:"/#dining",    section:"dining" },
  { label:"Gallery",   href:"/#gallery",   section:"gallery" },
  { label:"Contact",   href:"/#contact",   section:"contact" },
];

function MagLink({ section, href, children, onClick, style }) {
  const ref = useRef(null);
  const [xy, setXY] = useState({ x:0, y:0 });

  const nav = useCallback((e) => {
    e.preventDefault();
    if (onClick) onClick();
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior:"smooth", block:"start" });
    } else {
      window.location.href = href;
    }
  }, [section, href, onClick]);

  return (
    <motion.a href={href} ref={ref}
      onClick={nav}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect();
        setXY({ x:(e.clientX-r.left-r.width/2)*0.32, y:(e.clientY-r.top-r.height/2)*0.32 });
      }}
      onMouseLeave={() => setXY({ x:0, y:0 })}
      animate={{ x:xy.x, y:xy.y }}
      transition={{ type:"spring", stiffness:280, damping:18, mass:0.4 }}
      style={{ position:"relative", textDecoration:"none", display:"inline-block", ...style }}
    >
      <motion.span style={{ display:"block", position:"relative", paddingBottom:"3px" }}
        whileHover={{ color:"var(--gold)" }}
        transition={{ duration:0.25 }}
      >
        {children}
        <motion.span
          initial={{ scaleX:0 }} whileHover={{ scaleX:1 }}
          transition={{ duration:0.3 }}
          style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", background:"var(--gold)", transformOrigin:"left", display:"block" }}
        />
      </motion.span>
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const navBg = scrolled ? "var(--nav-bg)" : "transparent";
  const blur  = scrolled ? "var(--nav-blur)" : "none";
  const bdr   = scrolled ? "1px solid var(--border)" : "none";
  const txCol = isAuth ? "var(--tx)" : (scrolled ? "var(--nav-tx)" : "rgba(255,255,255,0.85)");

  return (
    <>
      <motion.nav
        initial={{ y:-30, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:1, delay: isAuth ? 0.2 : 2.9, ease:[0.22,1,0.36,1] }}
        style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, background:navBg, backdropFilter:blur, borderBottom:bdr, transition:"all 0.5s ease" }}
      >
        <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 2.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", height: scrolled?"62px":"78px", transition:"height 0.4s" }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration:"none" }}>
            <motion.span whileHover={{ scale:1.02 }}
              style={{ fontFamily:"var(--fd)", fontSize: "1.25rem", letterSpacing: "0.2em", fontWeight:300, color:"var(--gold)", transition:"all 0.5s", display:"block" }}>
              MAEVA
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display:"flex", alignItems:"center", gap:"2.5rem" }} className="dn-desk">
            {!isAuth && NAV.map(link => (
              <MagLink key={link.label} section={link.section} href={link.href}
                style={{ fontSize:"0.6rem", letterSpacing:"0.22em", textTransform:"uppercase", fontFamily:"var(--fb)", color:txCol, fontWeight:400, transition:"color 0.3s" }}
              >{link.label}</MagLink>
            ))}

            {isAuth ? (
              <Link to="/">
                <motion.span className="btno" style={{ padding:"8px 20px", fontSize:"0.58rem" }}
                  whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}>
                  ← Back to Hotel
                </motion.span>
              </Link>
            ) : (
              <div style={{ display:"flex", gap:"0.75rem" }}>
                <Link to="/login">
                  <motion.span className="btno" style={{ padding:"8px 18px", fontSize:"0.58rem" }}
                    whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}>
                    Sign In
                  </motion.span>
                </Link>
                <Link to="/signup">
                  <motion.span className="btng" style={{ padding:"8px 18px", fontSize:"0.58rem" }}
                    whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}>
                    Join Now
                  </motion.span>
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button className="dn-mob" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display:"none", flexDirection:"column", gap:"5px", padding:"8px", background:"none", border:"none", cursor:"pointer" }}>
            {[0,1,2].map(i => (
              <motion.span key={i}
                animate={{ rotate:menuOpen?(i===0?45:i===2?-45:0):0, y:menuOpen?(i===0?6:i===2?-6:0):0, opacity:menuOpen&&i===1?0:1, width:menuOpen&&i===1?0:22 }}
                style={{ display:"block", height:"1px", background:scrolled?"var(--tx)":"white", transformOrigin:"center" }}
                transition={{ duration:0.3 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0, clipPath:"inset(0% 0% 100% 0%)" }}
            animate={{ opacity:1, clipPath:"inset(0% 0% 0% 0%)" }}
            exit={{ opacity:0, clipPath:"inset(0% 0% 100% 0%)" }}
            transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
            style={{ position:"fixed", inset:0, zIndex:40, background: "#1E140C", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"2rem" }}
          >
            <motion.button onClick={() => setMenuOpen(false)} whileHover={{ rotate:90, color:"var(--gold)" }} transition={{ duration:0.25 }}
              style={{ position:"absolute", top:"1.5rem", right:"1.5rem", background:"none", border:"none", color:"rgba(255,255,255,0.6)", fontSize:"1.3rem", cursor:"pointer" }}>✕</motion.button>
            <span style={{ fontFamily:"var(--fd)", fontSize: "1.6rem", color:"var(--gold)", letterSpacing:"0.3em" }}>MAEVA</span>
            {NAV.map((link,i) => (
              <motion.a key={link.label} href={link.href}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08+i*0.06 }}
                onClick={e => { e.preventDefault(); setMenuOpen(false); setTimeout(() => { const el=document.getElementById(link.section); if(el)el.scrollIntoView({behavior:"smooth"}); else window.location.href=link.href; },300); }}
                style={{ fontSize:"0.75rem", letterSpacing:"0.28em", textTransform:"uppercase", fontFamily:"var(--fb)", color:"rgba(255,255,255,0.65)", textDecoration:"none", transition:"color 0.3s" }}
                onMouseEnter={e=>e.currentTarget.style.color="var(--gold)"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.65)"}
              >{link.label}</motion.a>
            ))}
            <div style={{ display:"flex", gap:"0.75rem", marginTop:"1rem" }}>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <span className="btno" style={{ padding:"10px 22px", fontSize:"0.6rem" }}>Sign In</span>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <span className="btng" style={{ padding:"10px 22px", fontSize:"0.6rem" }}>Join Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){ .dn-desk{display:none!important;} .dn-mob{display:flex!important;} }
        @media(min-width:769px){ .dn-mob{display:none!important;} }
      `}</style>
    </>
  );
}
