import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "../data/hotelData";

function Counter({ stat, delay, inView }) {
  const [d, setD] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const raw = stat.number, m = raw.match(/^(\d+)/);
    if (!m) { setD(raw); return; }
    const target = parseInt(m[1]), suf = raw.slice(m[1].length);
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts + delay*1000;
      const p = Math.min(Math.max(ts-start,0)/1800,1);
      const e = 1-Math.pow(1-p,3);
      setD(`${Math.floor(e*target)}${suf}`);
      if (p<1) requestAnimationFrame(tick); else setD(raw);
    };
    requestAnimationFrame(tick);
  }, [inView, stat.number, delay]);
  return <span>{d}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });

  return (
    <section style={{ padding:"6rem 0", background:"var(--bg)", transition:"background 0.7s", position:"relative", overflow:"hidden" }} ref={ref}>
      <motion.div initial={{ scaleX:0, originX:0.5 }} animate={inView ? { scaleX:1 } : {}} transition={{ duration:1.5, ease:[0.22,1,0.36,1] }}
        style={{ position:"absolute", top:"50%", left:0, right:0, height:"1px", background:"var(--gold)", opacity:0.06, transform:"translateY(-50%)" }} />
      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 3rem" }}>
        <div className="sg">
          {stats.map((s,i) => (
            <motion.div key={s.label} initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.75, delay:i*0.13 }}
              style={{ textAlign:"center", padding:"1.5rem 0" }}>
              <div style={{ fontFamily:"var(--fd)", fontSize:"clamp(2.5rem,5vw,4.5rem)", fontWeight:300, color:"var(--gold)", lineHeight:1, marginBottom:"0.5rem" }}>
                <Counter stat={s} delay={i*0.13} inView={inView} />
              </div>
              <motion.span className="gl" initial={{ scaleX:0, originX:0.5 }} animate={inView ? { scaleX:1 } : {}} transition={{ duration:0.7, delay:0.4+i*0.1 }} style={{ width:"30px", margin:"0.6rem auto", display:"block" }} />
              <p className="eyebrow" style={{ fontSize:"0.58rem", color:"var(--tx3)" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
