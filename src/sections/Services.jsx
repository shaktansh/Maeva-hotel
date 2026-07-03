import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "../data/hotelData";
import AnimatedHeading from "../components/AnimatedHeading";

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="amenities" style={{ padding:"6rem 0", background:"#fff" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div style={{ marginBottom:"4rem", textAlign:"center" }}>
          <motion.p
            initial={{ opacity:0, letterSpacing:"0.5em" }}
            animate={inView ? { opacity:1, letterSpacing:"0.25em" } : {}}
            transition={{ duration:0.9 }}
            className="eyebrow" style={{ marginBottom:"0.75rem" }}
          >Our Services</motion.p>
          <AnimatedHeading
            text="Curated Experiences"
            inView={inView} delay={0.1}
            className="section-heading"
            style={{ fontSize:"clamp(2.8rem,6vw,5rem)", justifyContent:"center" }}
          />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"3rem 2.5rem" }}>
          {services.map((service, i) => (
            <motion.div key={service.title}
              initial={{ opacity:0, y:50 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.75, delay:i*0.1, ease:[0.22,1,0.36,1] }}
              whileHover={{ y:-6, transition:{ duration:0.3 } }}
              style={{ padding:"2rem", border:"1px solid transparent", transition:"border-color 0.4s, box-shadow 0.4s", cursor:"default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(201,169,110,0.2)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="transparent"; e.currentTarget.style.boxShadow="none"; }}
            >
              {/* Number badge — pops in */}
              <motion.div
                initial={{ opacity:0, scale:0 }}
                animate={inView ? { opacity:1, scale:1 } : {}}
                transition={{ delay:0.3 + i*0.08, type:"spring", stiffness:280 }}
                style={{ fontSize:"0.58rem", color:"rgba(201,169,110,0.5)", fontFamily:"'DM Sans',sans-serif", letterSpacing:"0.15em", marginBottom:"0.6rem" }}
              >
                0{i+1}
              </motion.div>

              {/* Icon — bounces + shakes on hover */}
              <motion.div
                whileHover={{ scale:1.15, rotate:[0,-8,8,-5,0], transition:{ duration:0.5 } }}
                style={{ width:"52px", height:"52px", marginBottom:"1rem", display:"flex", alignItems:"center", justifyContent:"center", borderBottom:"2px solid #C9A96E", paddingBottom:"0.5rem" }}
              >
                <span style={{ fontSize:"1.75rem" }}>{service.icon}</span>
              </motion.div>

              {/* Gold line draw */}
              <motion.span
                initial={{ scaleX:0, originX:0 }}
                animate={inView ? { scaleX:1 } : {}}
                transition={{ duration:0.6, delay:0.4 + i*0.08 }}
                style={{ display:"block", width:"28px", height:"1px", background:"#C9A96E", marginBottom:"1rem" }}
              />

              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:300, color:"#1C1C1C", marginBottom:"0.75rem" }}>
                {service.title}
              </h3>
              <p style={{ fontSize:"0.875rem", color:"#9ca3af", lineHeight:1.8, fontFamily:"'DM Sans',sans-serif", fontWeight:300 }}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
