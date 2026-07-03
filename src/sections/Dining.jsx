import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedHeading from "../components/AnimatedHeading";

const venues = ["Signature Breakfast", "À La Carte Dinner", "In-Room Dining", "Evening High Tea"];

export default function Dining() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="dining" style={{ padding: "6rem 0", background: "#fff" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="split-2col">

          {/* Image — clip wipe from bottom */}
          <motion.div
            initial={{ clipPath:"inset(100% 0% 0% 0%)", opacity:0 }}
            animate={inView ? { clipPath:"inset(0% 0% 0% 0%)", opacity:1 } : {}}
            transition={{ duration:1.1, delay:0.2, ease:[0.22,1,0.36,1] }}
            className="img-zoom dining-img"
          >
            <img src="/images/lobby.jpg" alt="Maeva interior" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity:0, x:40 }}
            animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.9, delay:0.3, ease:[0.22,1,0.36,1] }}
          >
            <motion.p
              initial={{ opacity:0, letterSpacing:"0.5em" }}
              animate={inView ? { opacity:1, letterSpacing:"0.25em" } : {}}
              transition={{ duration:0.9, delay:0.35 }}
              className="eyebrow" style={{ marginBottom:"1rem" }}
            >Culinary Excellence</motion.p>

            <div style={{ marginBottom:"1.25rem" }}>
              <AnimatedHeading
                text="Dining Experience"
                inView={inView} delay={0.4}
                className="section-heading"
                style={{ fontSize:"clamp(2.4rem,4.5vw,3.6rem)", lineHeight:1.1 }}
              />
            </div>

            <motion.span
              initial={{ scaleX:0, originX:0 }}
              animate={inView ? { scaleX:1 } : {}}
              transition={{ duration:0.7, delay:0.65 }}
              style={{ display:"block", width:"40px", height:"1px", background:"#C9A96E", marginBottom:"1.5rem" }}
            />

            {[
              "Our in-house dining experience is a celebration of the world's finest ingredients, prepared by chefs who have trained in the most prestigious kitchens across Asia and Europe.",
              "From our curated breakfast service to our à la carte dinner menu, every meal at Maeva is a destination in its own right — crafted to create memories that linger long after departure.",
            ].map((text, i) => (
              <motion.p key={i}
                initial={{ opacity:0, y:20 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.7, delay:0.5 + i*0.14 }}
                style={{ fontSize:"0.875rem", color:"#6b7280", lineHeight:1.85, marginBottom:"1.25rem", fontFamily:"'DM Sans',sans-serif", fontWeight:300 }}
              >
                {text}
              </motion.p>
            ))}

            {/* Bullet venues — stagger slide in */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.85rem", marginBottom:"2.5rem" }}>
              {venues.map((venue, i) => (
                <motion.div key={venue}
                  initial={{ opacity:0, x:-16 }}
                  animate={inView ? { opacity:1, x:0 } : {}}
                  transition={{ duration:0.55, delay:0.7 + i*0.09 }}
                  style={{ display:"flex", alignItems:"center", gap:"10px" }}
                >
                  <motion.span
                    initial={{ scale:0 }}
                    animate={inView ? { scale:1 } : {}}
                    transition={{ delay:0.75 + i*0.09, type:"spring", stiffness:300 }}
                    style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#C9A96E", flexShrink:0 }}
                  />
                  <span style={{ fontSize:"0.875rem", fontFamily:"'DM Sans',sans-serif", color:"#1C1C1C", fontWeight:300 }}>{venue}</span>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}>
              <a href="#contact" className="btn-outline-dark">Reserve a Table</a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
