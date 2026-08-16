import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function FloatingLabel({ label, type="text", name, required=false }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  return (
    <div style={{ position:"relative", marginBottom:"1.75rem" }}>
      <motion.label
        animate={{ y: focused||filled ? -22 : 0, fontSize: focused||filled ? "0.58rem" : "0.85rem", color: focused ? "var(--gold)" : "var(--tx3)", letterSpacing: focused||filled ? "0.18em" : "0.04em" }}
        transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
        style={{ position:"absolute", top:"10px", left:0, fontFamily:"var(--fb)", textTransform: focused||filled ? "uppercase" : "none", pointerEvents:"none", zIndex:1 }}
      >{label}</motion.label>
      <input type={type} name={name} required={required}
        onFocus={() => setFocused(true)}
        onBlur={e => { setFocused(false); setFilled(e.target.value.length > 0); }}
        onChange={e => setFilled(e.target.value.length > 0)}
        style={{ width:"100%", border:"none", borderBottom:`1.5px solid ${focused ? "var(--gold)" : "var(--border)"}`, background:"transparent", outline:"none", fontFamily:"var(--fb)", fontSize:"0.95rem", color:"var(--tx)", padding:"10px 0 8px", transition:"border-color 0.35s" }}
      />
    </div>
  );
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const perks = ["Exclusive member rates", "Early check-in priority", "Complimentary welcome drink", "Birthday surprise"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/"); }, 1600);
  };

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.6 }}
      style={{ minHeight:"100vh", display:"flex", position:"relative", overflow:"hidden", background:"var(--bg)" }}>

      {/* Left form */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem", position:"relative" }}>
        {/* Background gold circle */}
        <motion.div
          animate={{ scale:[1,1.05,1], rotate:[0,180,360] }}
          transition={{ duration:25, repeat:Infinity, ease:"linear" }}
          style={{ position:"absolute", width:"600px", height:"600px", borderRadius:"50%", border:`1px solid var(--borderg)`, opacity:0.15, pointerEvents:"none" }}
        />
        <motion.div
          animate={{ scale:[1.05,1,1.05], rotate:[360,180,0] }}
          transition={{ duration:18, repeat:Infinity, ease:"linear" }}
          style={{ position:"absolute", width:"400px", height:"400px", borderRadius:"50%", border:`1px solid var(--borderg)`, opacity:0.1, pointerEvents:"none" }}
        />

        <motion.div
          initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.2, ease:[0.22,1,0.36,1] }}
          style={{ width:"100%", maxWidth:"440px", position:"relative" }}
        >
          <Link to="/" style={{ textDecoration:"none" }}>
            <motion.p whileHover={{ scale:1.02 }}
              style={{ fontFamily:"var(--fd)", fontSize: "1.5rem", color:"var(--gold)", letterSpacing: "0.22em", marginBottom:"0.5rem" }}>
              MAEVA
            </motion.p>
          </Link>
          <p style={{ fontFamily:"var(--fb)", fontSize:"0.58rem", color:"var(--tx3)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"3rem" }}>Hotel &amp; Resort</p>

          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
            style={{ fontFamily:"var(--fd)", fontSize:"2.2rem", fontWeight:300, color:"var(--tx)", marginBottom:"0.5rem" }}>
            Create Account
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}
            style={{ fontFamily:"var(--fb)", fontSize:"0.875rem", color:"var(--tx3)", marginBottom:"2.5rem", fontWeight:300 }}>
            Join Maeva and unlock exclusive member benefits
          </motion.p>

          <form onSubmit={handleSubmit}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1.5rem" }}>
              <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}>
                <FloatingLabel label="First Name" name="first" required />
              </motion.div>
              <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.68 }}>
                <FloatingLabel label="Last Name" name="last" required />
              </motion.div>
            </div>
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.76 }}>
              <FloatingLabel label="Email Address" type="email" name="email" required />
            </motion.div>
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.84 }}>
              <FloatingLabel label="Phone Number" type="tel" name="phone" />
            </motion.div>
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.92 }}>
              <FloatingLabel label="Password" type="password" name="password" required />
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
              style={{ marginBottom:"2rem" }}>
              <label style={{ display:"flex", alignItems:"flex-start", gap:"10px", cursor:"pointer" }}>
                <input type="checkbox" style={{ marginTop:"3px", accentColor:"var(--gold)" }} />
                <span style={{ fontFamily:"var(--fb)", fontSize:"0.75rem", color:"var(--tx3)", lineHeight:1.6, fontWeight:300 }}>
                  I agree to the <a href="#" style={{ color:"var(--gold)", textDecoration:"none" }}>Terms of Service</a> and{" "}
                  <a href="#" style={{ color:"var(--gold)", textDecoration:"none" }}>Privacy Policy</a>
                </span>
              </label>
            </motion.div>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.05 }}>
              <motion.button type="submit" className="btng"
                style={{ width:"100%", justifyContent:"center", fontSize:"0.65rem", padding:"15px", position:"relative" }}
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <motion.span animate={{ opacity:[1,0.4,1] }} transition={{ duration:0.8, repeat:Infinity }}>
                    Creating Account…
                  </motion.span>
                ) : <span>Create My Account</span>}
                {loading && (
                  <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:1.6, ease:"linear" }}
                    style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px", background:"rgba(255,255,255,0.4)", transformOrigin:"left" }} />
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.15 }}
            style={{ fontFamily:"var(--fb)", fontSize:"0.8rem", color:"var(--tx3)", textAlign:"center", marginTop:"1.75rem", fontWeight:300 }}>
            Already a member?{" "}
            <Link to="/login" style={{ color:"var(--gold)", textDecoration:"none" }}>Sign in</Link>
          </motion.p>
        </motion.div>
      </div>

      {/* Right — perks panel */}
      <motion.div
        initial={{ x:"100%" }} animate={{ x:"0%" }}
        transition={{ duration:1.1, ease:[0.22,1,0.36,1] }}
        style={{ flex:"0 0 45%", position:"relative", display:"none", background: "var(--bg2)" }}
        className="auth-panel"
      >
        <img src="/images/about-atrium.jpg" alt=""
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", opacity: 0.35 }} />
        <div style={{ position:"absolute", inset:0, background: "rgba(26,18,10,0.6)" }} />

        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"center", padding:"4rem 3rem" }}>
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}
            className="eyebrow" style={{ color:"var(--gold)", marginBottom:"1.25rem" }}>Member Benefits</motion.p>
          <motion.h2 initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9, ease:[0.22,1,0.36,1] }}
            style={{ fontFamily:"var(--fd)", fontSize: "2.4rem", color:"white", fontWeight:300, lineHeight:1.05, marginBottom:"2.5rem" }}>
            Join the{"\n"}Maeva Circle
          </motion.h2>

          <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
            {perks.map((perk, i) => (
              <motion.div key={perk}
                initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
                transition={{ delay:1.0+i*0.1, ease:[0.22,1,0.36,1] }}
                style={{ display:"flex", alignItems:"center", gap:"1rem" }}
              >
                <motion.div
                  animate={{ scale:[1,1.15,1] }}
                  transition={{ duration:2, delay:1.5+i*0.3, repeat:Infinity, ease:"easeInOut" }}
                  style={{ width:"8px", height:"8px", borderRadius:"50%", background:"var(--gold)", flexShrink:0 }}
                />
                <span style={{ fontFamily:"var(--fb)", fontSize:"0.9rem", color:"rgba(255,255,255,0.7)", fontWeight:300 }}>{perk}</span>
              </motion.div>
            ))}
          </div>

          {/* Gold number watermark */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
            style={{ position:"absolute", bottom:"2rem", right:"2rem", fontFamily:"var(--fd)", fontSize:"8rem", color:"var(--gold)", opacity:0.06, fontWeight:300, lineHeight:1, userSelect:"none" }}
          >M</motion.div>

          {/* Corner accents */}
          {[{top:"2rem",right:"2rem",borderTop:"1px solid",borderRight:"1px solid"},{bottom:"2rem",left:"2rem",borderBottom:"1px solid",borderLeft:"1px solid"}].map((s,i) => (
            <motion.div key={i} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9+i*0.1 }}
              style={{ position:"absolute", width:"24px", height:"24px", borderColor:"var(--gold)", opacity:0.5, ...s }} />
          ))}
        </div>
      </motion.div>

      <style>{`
        @media(min-width:768px){ .auth-panel{display:block!important;} }
      `}</style>
    </motion.div>
  );
}
