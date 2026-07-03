import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { rooms } from "../data/hotelData";
import AnimatedHeading from "../components/AnimatedHeading";

const amenityIcons  = { wifi:"📶", bath:"🛁", tv:"📺", ac:"❄️", coffee:"☕", minibar:"🍷", butler:"🤵" };
const amenityLabels = { wifi:"Free WiFi", bath:"Bathtub", tv:"Smart TV", ac:"Air Con", coffee:"Coffee", minibar:"Minibar", butler:"Butler" };

// 3D tilt card on mouse move
function TiltCard({ children, onClick }) {
  const el = useRef(null);
  const handleMove = (e) => {
    const rect = el.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    el.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  };
  const handleLeave = () => {
    el.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };
  return (
    <div
      ref={el}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition:"transform 0.25s ease", cursor:"pointer", willChange:"transform" }}
    >
      {children}
    </div>
  );
}

export default function Rooms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activePopup, setActivePopup] = useState(null);

  return (
    <section id="rooms" style={{ padding:"6rem 0", background:"#F5EFE6" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div style={{ marginBottom:"3.5rem" }}>
          <motion.p
            initial={{ opacity:0, letterSpacing:"0.5em" }}
            animate={inView ? { opacity:1, letterSpacing:"0.25em" } : {}}
            transition={{ duration:0.9 }}
            className="eyebrow" style={{ marginBottom:"0.75rem" }}
          >Maeva Hotel &amp; Resort</motion.p>
          <AnimatedHeading
            text="Rooms & Suites"
            inView={inView} delay={0.1}
            className="section-heading"
            style={{ fontSize:"clamp(2.8rem,6vw,5rem)" }}
          />
        </div>

        {/* Cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.5rem" }}>
          {rooms.map((room, i) => (
            <motion.div key={room.id}
              initial={{ opacity:0, y:60 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.85, delay:i*0.15, ease:[0.22,1,0.36,1] }}
            >
              <TiltCard onClick={() => setActivePopup(room)}>
                <div className="room-card">
                  <div className="room-card-img-wrap" style={{ position:"relative" }}>
                    <img src={room.image} alt={room.name} className="card-img"
                      style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block" }}
                    />
                    <div className="card-overlay" style={{ position:"absolute", inset:0 }} />

                    {/* "View Details" tag */}
                    <motion.div
                      initial={{ opacity:0, y:-6 }}
                      whileHover={{ opacity:1, y:0 }}
                      style={{ position:"absolute", top:"1rem", right:"1rem", background:"rgba(201,169,110,0.92)", padding:"4px 10px", fontSize:"0.58rem", letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", color:"white" }}
                    >View Details</motion.div>

                    <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.4rem 1.5rem", color:"white" }}>
                      <p style={{ fontSize:"0.62rem", letterSpacing:"0.22em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.65)", marginBottom:"0.35rem" }}>
                        {room.category}
                      </p>
                      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", fontWeight:300, marginBottom:"0.75rem" }}>
                        {room.name}
                      </h3>
                      <div style={{ width:"100%", height:"1px", background:"rgba(255,255,255,0.25)", marginBottom:"0.75rem" }} />
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div style={{ display:"flex", gap:"0.6rem" }}>
                          {room.amenities.slice(0,4).map(a => (
                            <span key={a} style={{ fontSize:"0.85rem", opacity:0.75 }}>{amenityIcons[a]}</span>
                          ))}
                        </div>
                        <span style={{ fontSize:"0.68rem", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.8)" }}>
                          More Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
          transition={{ duration:0.9, delay:0.6 }}
          style={{ textAlign:"center", marginTop:"3.5rem" }}
        >
          <motion.a href="#contact" className="btn-outline-dark" whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
            View All Rooms
          </motion.a>
        </motion.div>
      </div>

      {/* Room Detail Popup */}
      <AnimatePresence>
        {activePopup && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.3 }}
            onClick={() => setActivePopup(null)}
            style={{ position:"fixed", inset:0, zIndex:800, background:"rgba(0,0,0,0.78)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1.5rem" }}
          >
            <motion.div
              initial={{ opacity:0, y:50, scale:0.94 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:30, scale:0.96 }}
              transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
              onClick={e => e.stopPropagation()}
              style={{ background:"white", maxWidth:"580px", width:"100%", overflow:"hidden", boxShadow:"0 30px 80px rgba(0,0,0,0.35)", position:"relative" }}
            >
              {/* Image with zoom-in animation */}
              <motion.div
                initial={{ scale:1.1 }} animate={{ scale:1 }}
                transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
                style={{ height:"260px", overflow:"hidden" }}
              >
                <img src={activePopup.image} alt={activePopup.name}
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              </motion.div>

              {/* Gold top bar draw */}
              <motion.div
                initial={{ scaleX:0, originX:0 }}
                animate={{ scaleX:1 }}
                transition={{ duration:0.6, delay:0.2 }}
                style={{ height:"2px", background:"#C9A96E" }}
              />

              <div style={{ padding:"1.75rem" }}>
                <motion.p
                  initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.25 }}
                  style={{ fontSize:"0.62rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#C9A96E", fontFamily:"'DM Sans',sans-serif", marginBottom:"0.4rem" }}
                >
                  {activePopup.category}
                </motion.p>

                <motion.h3
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.3 }}
                  style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.75rem", fontWeight:300, color:"#1C1C1C", marginBottom:"0.6rem" }}
                >
                  {activePopup.name}
                </motion.h3>

                <motion.div
                  initial={{ scaleX:0, originX:0 }} animate={{ scaleX:1 }}
                  transition={{ delay:0.35, duration:0.5 }}
                  style={{ width:"32px", height:"1px", background:"#C9A96E", marginBottom:"1rem" }}
                />

                <motion.p
                  initial={{ opacity:0 }} animate={{ opacity:1 }}
                  transition={{ delay:0.4 }}
                  style={{ fontSize:"0.875rem", color:"#6b7280", lineHeight:1.8, fontFamily:"'DM Sans',sans-serif", fontWeight:300, marginBottom:"1.25rem" }}
                >
                  {activePopup.description}
                </motion.p>

                {/* Amenity chips stagger */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", marginBottom:"1.5rem" }}>
                  {activePopup.amenities.map((a, i) => (
                    <motion.span key={a}
                      initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
                      transition={{ delay:0.45 + i*0.06, type:"spring", stiffness:260 }}
                      style={{ padding:"4px 12px", border:"1px solid rgba(201,169,110,0.35)", fontSize:"0.68rem", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", color:"#1C1C1C", display:"flex", alignItems:"center", gap:"5px" }}
                    >
                      {amenityIcons[a]} {amenityLabels[a]}
                    </motion.span>
                  ))}
                </div>

                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}>
                    <p style={{ fontSize:"0.62rem", color:"#9ca3af", letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" }}>Starting from</p>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", color:"#C9A96E", fontWeight:300 }}>
                      {activePopup.price} <span style={{ fontSize:"0.75rem", color:"#9ca3af", fontFamily:"'DM Sans',sans-serif" }}>/ night</span>
                    </p>
                  </motion.div>
                  <motion.a
                    href="#contact" onClick={() => setActivePopup(null)}
                    className="btn-gold"
                    initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65 }}
                    whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                  >Book This Room</motion.a>
                </div>
              </div>

              {/* Close */}
              <motion.button
                onClick={() => setActivePopup(null)}
                whileHover={{ scale:1.1, rotate:90 }}
                transition={{ duration:0.25 }}
                style={{ position:"absolute", top:"0.85rem", right:"0.85rem", background:"rgba(0,0,0,0.55)", border:"none", color:"white", width:"30px", height:"30px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.8rem" }}
              >✕</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
