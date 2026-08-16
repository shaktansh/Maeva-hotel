import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { rooms } from "../data/hotelData";

const AI = { wifi:"📶", bath:"🛁", tv:"📺", ac:"❄️", coffee:"☕", minibar:"🍷", butler:"🤵" };
const AL = { wifi:"Free WiFi", bath:"Bathtub", tv:"Smart TV", ac:"Air Con", coffee:"Coffee", minibar:"Minibar", butler:"Butler" };

function TiltCard({ children, onClick }) {
  const r = useRef(null);
  const move = e => {
    const b = r.current.getBoundingClientRect();
    const x = ((e.clientX-b.left)/b.width-0.5)*14;
    const y = ((e.clientY-b.top)/b.height-0.5)*-14;
    r.current.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) scale(1.025)`;
  };
  const leave = () => { r.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)"; };
  return (
    <div ref={r} onClick={onClick} onMouseMove={move} onMouseLeave={leave}
      style={{ transition:"transform 0.3s ease", cursor:"pointer", willChange:"transform" }}>
      {children}
    </div>
  );
}

export default function Rooms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [popup, setPopup] = useState(null);

  return (
    <section id="rooms" style={{ padding:"9rem 0", background:"var(--bg2)", transition:"background 0.7s", position:"relative", overflow:"hidden" }} ref={ref}>

      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 3rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4.5rem", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <motion.p className="eyebrow"
              initial={{ opacity:0, letterSpacing:"0.6em" }}
              animate={inView ? { opacity:1, letterSpacing:"0.32em" } : {}}
              transition={{ duration:0.9 }}
              style={{ marginBottom:"0.75rem" }}
            >Maeva Hotel &amp; Resort</motion.p>
            <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(2.8rem,6vw,5.5rem)", fontWeight:300, color:"var(--tx)", display:"flex", flexWrap:"wrap", gap:"0 0.2em" }}>
              {["Rooms","&","Suites"].map((w,i) => (
                <span key={i} style={{ overflow:"hidden", display:"inline-block", paddingBottom:"0.05em" }}>
                  <motion.span style={{ display:"inline-block" }}
                    initial={{ y:"115%" }} animate={inView ? { y:"0%" } : {}}
                    transition={{ duration:0.85, delay:0.1+i*0.13, ease:[0.22,1,0.36,1] }}
                  >{w}</motion.span>
                </span>
              ))}
            </h2>
          </div>
          <motion.a href="#contact" className="btno"
            onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" }); }}
            initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.5 }}
            whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
          ><span>View All Rooms</span></motion.a>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.5rem" }}>
          {rooms.map((room,i) => (
            <motion.div key={room.id}
              initial={{ opacity:0, y:70, rotateX:6 }}
              animate={inView ? { opacity:1, y:0, rotateX:0 } : {}}
              transition={{ duration:0.9, delay:i*0.15, ease:[0.22,1,0.36,1] }}
            >
              <TiltCard onClick={() => setPopup(room)}>
                <div className="rc">
                  <div className="rh" style={{ position:"relative" }}>
                    <img src={room.image} alt={room.name} className="ri ic" />
                    <div className="rco" style={{ position:"absolute", inset:0 }} />
                    <motion.div initial={{ opacity:0, y:-8 }} whileHover={{ opacity:1, y:0 }}
                      style={{ position:"absolute", top:"1rem", right:"1rem", background:"var(--gold)", padding:"4px 12px", fontSize:"0.56rem", letterSpacing:"0.2em", textTransform:"uppercase", fontFamily:"var(--fb)", color:"white" }}>
                      View Details
                    </motion.div>
                    <div style={{ position:"absolute", top:"1rem", left:"1rem", background:"rgba(253,250,247,0.92)", padding:"4px 10px" }}>
                        <span style={{ fontFamily:"var(--fd)", fontSize:"0.95rem", color:"var(--tx)", fontWeight:300 }}>{room.price}</span>
                        <span style={{ fontFamily:"var(--fb)", fontSize:"0.56rem", color:"var(--tx3)", marginLeft:"4px" }}>/night</span>
                      </div>
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.4rem 1.5rem", color:"white" }}>
                      <p style={{ fontFamily:"var(--fb)", fontSize:"0.56rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.6)", marginBottom:"0.3rem" }}>{room.category}</p>
                      <h3 style={{ fontFamily:"var(--fd)", fontSize:"1.5rem", fontWeight:300, marginBottom:"0.7rem" }}>{room.name}</h3>
                      <div style={{ width:"100%", height:"1px", background:"rgba(255,255,255,0.2)", marginBottom:"0.7rem" }} />
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div style={{ display:"flex", gap:"0.5rem" }}>
                          {room.amenities.slice(0,4).map(a => <span key={a} style={{ fontSize:"0.85rem", opacity:0.7 }}>{AI[a]}</span>)}
                        </div>
                        <span style={{ fontSize:"0.6rem", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"var(--fb)", color:"rgba(255,255,255,0.75)" }}>Details →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
            onClick={() => setPopup(null)}
            style={{ position:"fixed", inset:0, zIndex:800, background:"rgba(0,0,0,0.82)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1.5rem" }}>
            <motion.div initial={{ opacity:0, y:60, scale:0.93 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:40, scale:0.96 }}
              transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
              onClick={e => e.stopPropagation()}
              style={{ background:"var(--surface)", maxWidth:"580px", width:"100%", overflow:"hidden", boxShadow:"var(--shh)", position:"relative", transition:"background 0.7s" }}>
              <motion.div initial={{ scale:1.12 }} animate={{ scale:1 }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
                style={{ height:"260px", overflow:"hidden" }}>
                <img src={popup.image} alt={popup.name} className="ic" style={{ height:"260px" }} />
              </motion.div>
              <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.2, duration:0.6 }}
                style={{ height:"2px", background:"var(--gold)", transformOrigin:"left" }} />
              <div style={{ padding:"1.75rem" }}>
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}
                  style={{ fontFamily:"var(--fb)", fontSize:"0.56rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"0.4rem" }}>
                  {popup.category}
                </motion.p>
                <motion.h3 initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
                  style={{ fontFamily:"var(--fd)", fontSize:"1.75rem", fontWeight:300, color:"var(--tx)", marginBottom:"0.6rem" }}>
                  {popup.name}
                </motion.h3>
                <motion.div initial={{ scaleX:0, originX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.35, duration:0.5 }}
                  style={{ width:"32px", height:"1px", background:"var(--gold)", marginBottom:"1rem" }} />
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
                  style={{ fontFamily:"var(--fb)", fontSize:"0.875rem", color:"var(--tx2)", lineHeight:1.8, marginBottom:"1.25rem", fontWeight:300 }}>
                  {popup.description}
                </motion.p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", marginBottom:"1.5rem" }}>
                  {popup.amenities.map((a,i) => (
                    <motion.span key={a} initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
                      transition={{ delay:0.45+i*0.06, type:"spring", stiffness:260 }}
                      style={{ padding:"4px 12px", border:"1px solid var(--borderg)", fontSize:"0.62rem", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"var(--fb)", color:"var(--tx)", display:"flex", alignItems:"center", gap:"5px" }}>
                      {AI[a]} {AL[a]}
                    </motion.span>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}>
                    <p style={{ fontFamily:"var(--fb)", fontSize:"0.56rem", color:"var(--tx3)", letterSpacing:"0.15em", textTransform:"uppercase" }}>Starting from</p>
                    <p style={{ fontFamily:"var(--fd)", fontSize:"1.6rem", color:"var(--gold)", fontWeight:300 }}>
                      {popup.price} <span style={{ fontSize:"0.75rem", color:"var(--tx3)", fontFamily:"var(--fb)" }}>/ night</span>
                    </p>
                  </motion.div>
                  <motion.a href="#contact" onClick={() => setPopup(null)} className="btng"
                    initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65 }}
                    whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                  ><span>Book This Room</span></motion.a>
                </div>
              </div>
              <motion.button onClick={() => setPopup(null)}
                whileHover={{ scale:1.1, rotate:90 }} transition={{ duration:0.25 }}
                style={{ position:"absolute", top:"0.85rem", right:"0.85rem", background:"rgba(0,0,0,0.6)", border:"none", color:"white", width:"30px", height:"30px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.8rem" }}>✕</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
