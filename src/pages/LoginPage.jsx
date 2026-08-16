import { useState, useRef, useEffect } from "react";
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
      <motion.span
        animate={{ scaleX: focused ? 1 : 0, originX: 0 }}
        transition={{ duration: 0.4 }}
        style={{ position:"absolute", bottom:0, left:0, right:0, height:"1.5px", background:"var(--gold)", transformOrigin:"left" }}
      />
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/"); }, 1400);
  };

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.6 }}
      style={{ minHeight:"100vh", display:"flex", position:"relative", overflow:"hidden", background:"var(--bg)" }}>

      {/* Left — cinematic image panel */}
      <motion.div
        initial={{ x:"-100%" }} animate={{ x:"0%" }}
        transition={{ duration:1.1, ease:[0.22,1,0.36,1] }}
        style={{ flex:"0 0 50%", position:"relative", display:"none" }}
        className="auth-panel"
      >
        <img src="/images/hero-2.jpg" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background: "rgba(18,10,4,0.4)" }} />
        {/* Corner accents */}
        {[{top:"2rem",left:"2rem",borderTop:"1px solid",borderLeft:"1px solid"},{bottom:"2rem",right:"2rem",borderBottom:"1px solid",borderRight:"1px solid"}].map((s,i) => (
          <motion.div key={i} initial={{ opacity:0, scale:0.5 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.8+i*0.1 }}
            style={{ position:"absolute", width:"28px", height:"28px", borderColor:"var(--gold)", ...s }} />
        ))}
        {/* Brand overlay */}
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"3rem" }}>
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9, duration:0.8 }}
            className="eyebrow" style={{ color:"rgba(255,255,255,0.55)", marginBottom:"0.75rem" }}>Welcome Back</motion.p>
          <motion.h2 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.0, duration:0.9, ease:[0.22,1,0.36,1] }}
            style={{ fontFamily:"var(--fd)", fontSize: "3rem", color:"white", fontWeight:300, lineHeight:1.05, marginBottom:"1rem" }}>
            "Maeva"
          </motion.h2>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
            style={{ fontFamily:"var(--fb)", fontSize:"0.85rem", color:"rgba(255,255,255,0.45)", lineHeight:1.7, maxWidth:"320px", fontWeight:300 }}>
            Sign in to manage your reservations, view exclusive offers, and continue your luxury experience.
          </motion.p>
        </div>
      </motion.div>

      {/* Right — form */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem", position:"relative" }}>
        {/* Decorative circle */}
        <motion.div
          animate={{ rotate:360 }} transition={{ duration:30, repeat:Infinity, ease:"linear" }}
          style={{ position:"absolute", width:"500px", height:"500px", borderRadius:"50%", border:`1px solid var(--borderg)`, opacity:0.3, pointerEvents:"none" }}
        />

        <motion.div
          initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.3, ease:[0.22,1,0.36,1] }}
          style={{ width:"100%", maxWidth:"420px", position:"relative" }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration:"none" }}>
            <motion.p whileHover={{ scale:1.02 }}
              style={{ fontFamily:"var(--fd)", fontSize: "1.5rem", color:"var(--gold)", letterSpacing: "0.22em", marginBottom:"0.5rem", display:"block" }}>
              MAEVA
            </motion.p>
          </Link>
          <p style={{ fontFamily:"var(--fb)", fontSize:"0.58rem", color:"var(--tx3)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"3rem" }}>Hotel &amp; Resort</p>

          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
            style={{ fontFamily:"var(--fd)", fontSize:"2.2rem", fontWeight:300, color:"var(--tx)", marginBottom:"0.5rem" }}>
            Welcome Back
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65 }}
            style={{ fontFamily:"var(--fb)", fontSize:"0.875rem", color:"var(--tx3)", marginBottom:"2.5rem", fontWeight:300, lineHeight:1.6 }}>
            Sign in to your Maeva account to continue
          </motion.p>

          <form onSubmit={handleSubmit}>
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}>
              <FloatingLabel label="Email Address" type="email" name="email" required />
            </motion.div>
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}>
              <FloatingLabel label="Password" type="password" name="password" required />
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
              style={{ display:"flex", justifyContent:"flex-end", marginBottom:"2rem", marginTop:"-0.5rem" }}>
              <a href="#" style={{ fontFamily:"var(--fb)", fontSize:"0.75rem", color:"var(--gold)", textDecoration:"none", letterSpacing:"0.05em" }}>Forgot password?</a>
            </motion.div>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:1 }}>
              <motion.button type="submit" className="btng"
                style={{ width:"100%", justifyContent:"center", fontSize:"0.65rem", padding:"15px", position:"relative" }}
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <motion.span animate={{ opacity:[1,0.4,1] }} transition={{ duration:0.8, repeat:Infinity }}>
                    Signing In…
                  </motion.span>
                ) : <span>Sign In</span>}
                {/* Loading bar */}
                {loading && (
                  <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:1.4, ease:"linear" }}
                    style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px", background:"rgba(255,255,255,0.4)", transformOrigin:"left" }} />
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}
            style={{ fontFamily:"var(--fb)", fontSize:"0.8rem", color:"var(--tx3)", textAlign:"center", marginTop:"2rem", fontWeight:300 }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color:"var(--gold)", textDecoration:"none", letterSpacing:"0.05em" }}>Create one</Link>
          </motion.p>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
            style={{ marginTop:"2.5rem", paddingTop:"2rem", borderTop:"1px solid var(--border)", textAlign:"center" }}>
            <p className="eyebrow" style={{ fontSize:"0.55rem", color:"var(--tx3)", marginBottom:"1rem" }}>Or continue with</p>
            <div style={{ display:"flex", gap:"0.75rem", justifyContent:"center" }}>
              {["Google","Apple"].map((p,i) => (
                <motion.button key={p} whileHover={{ scale:1.04, borderColor:"var(--gold)" }} whileTap={{ scale:0.97 }}
                  style={{ flex:1, maxWidth:"160px", padding:"10px", border:"1px solid var(--border)", background:"transparent", fontFamily:"var(--fb)", fontSize:"0.72rem", color:"var(--tx)", cursor:"pointer", letterSpacing:"0.08em", transition:"border-color 0.3s" }}>
                  {p}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media(min-width:768px){ .auth-panel{display:block!important;} }
      `}</style>
    </motion.div>
  );
}
