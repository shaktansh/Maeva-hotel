import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Dining", href: "#dining" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navBg = scrolled
    ? "rgba(255,255,255,0.97)"
    : "transparent";
  const navShadow = scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none";
  const logoColor = scrolled ? "#C9A96E" : "#C9A96E";
  const linkColor = scrolled ? "#1C1C1C" : "rgba(255,255,255,0.88)";
  const borderColor = scrolled ? "#1C1C1C" : "rgba(255,255,255,0.7)";
  const btnTextColor = scrolled ? "#1C1C1C" : "white";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: navBg, boxShadow: navShadow,
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.5s ease",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? "64px" : "76px", transition: "height 0.4s ease" }}>
          {/* Logo */}
          <a href="#home" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", letterSpacing: "0.22em", fontWeight: 300, color: logoColor, transition: "color 0.4s" }}>
              MAEVA
            </span>
          </a>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="hidden-mobile">
            {navLinks.map(link => (
              <a key={link.label} href={link.href}
                className="nav-link"
                style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", fontWeight: 400, color: linkColor, textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#C9A96E"}
                onMouseLeave={e => e.currentTarget.style.color = linkColor}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact"
              style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", fontWeight: 400, padding: "9px 20px", border: `1px solid ${borderColor}`, color: btnTextColor, textDecoration: "none", transition: "all 0.35s ease" }}
              onMouseEnter={e => { e.currentTarget.style.background = scrolled ? "#1C1C1C" : "white"; e.currentTarget.style.color = scrolled ? "white" : "#1C1C1C"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = btnTextColor; }}
            >
              Book Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", flexDirection: "column", gap: "5px", padding: "8px", background: "none", border: "none", cursor: "pointer" }}
            className="show-mobile">
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: "24px", height: "1px", background: scrolled ? "#1C1C1C" : "white", transition: "all 0.3s",
                transform: menuOpen ? (i===0?"rotate(45deg) translate(4px,4px)":i===2?"rotate(-45deg) translate(4px,-4px)":"scaleX(0)") : "none",
              }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "#0F0F0F", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2.5rem" }}>
            <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "white", fontSize: "1.4rem", cursor: "pointer" }}>✕</button>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", color: "#C9A96E", letterSpacing: "0.25em" }}>MAEVA</span>
            {navLinks.map((link, i) => (
              <motion.a key={link.label} href={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                style={{ fontSize: "0.85rem", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.75)", textDecoration: "none" }}
                onClick={() => setMenuOpen(false)}>
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
