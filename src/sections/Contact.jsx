import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Toast from "../components/Toast";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [toast, setToast] = useState(false);
  const [focused, setFocused] = useState(null);

  const inputStyle = (name) => ({
    width: "100%", border: "none",
    borderBottom: `1px solid ${focused === name ? "#C9A96E" : "#e5e7eb"}`,
    paddingBottom: "8px", fontSize: "0.875rem",
    fontFamily: "'DM Sans',sans-serif", fontWeight: 300,
    outline: "none", background: "transparent",
    color: "#1C1C1C", transition: "border-color 0.3s",
  });

  const labelStyle = {
    fontSize: "0.65rem", color: "#9ca3af", letterSpacing: "0.18em",
    textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif",
    display: "block", marginBottom: "8px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    e.target.reset();
  };

  return (
    <section id="contact" style={{ padding: "6rem 0", background: "#fff" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }} className="split-2col">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
          >
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Get In Touch</p>
            <h2 className="section-heading" style={{ fontSize: "clamp(2.4rem,4.5vw,3.6rem)", marginBottom: "1.25rem" }}>
              Reserve Your<br />Stay
            </h2>
            <motion.span
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{ display: "block", width: "40px", height: "1px", background: "#C9A96E", marginBottom: "1.5rem" }}
            />
            <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.85, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, marginBottom: "2.5rem", maxWidth: "340px" }}>
              Our reservations team is available 24 hours a day, seven days a week — ready to curate your perfect Maeva experience.
            </p>

            {[
              { icon: "☎", label: "Phone", value: "+91 98898 75151", gold: true },
              { icon: "✉", label: "Email", value: "reservations@maeva.com", gold: false },
              { icon: "📍", label: "Address", value: "527 Woodland Avenue, Civil Lines\nNew Delhi, 110054", gold: false },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
                style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(201,169,110,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  <span style={{ color: "#C9A96E", fontSize: "0.9rem" }}>{item.icon}</span>
                </motion.div>
                <div>
                  <p style={{ fontSize: "0.62rem", color: "#9ca3af", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontFamily: item.gold ? "'Cormorant Garamond',serif" : "'DM Sans',sans-serif", fontSize: item.gold ? "1.05rem" : "0.875rem", color: item.gold ? "#C9A96E" : "#1C1C1C", fontWeight: 300, whiteSpace: "pre-line", lineHeight: 1.6 }}>{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22,1,0.36,1] }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input type="text" placeholder="Your first name" required style={inputStyle("first")}
                    onFocus={() => setFocused("first")} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input type="text" placeholder="Your last name" required style={inputStyle("last")}
                    onFocus={() => setFocused("last")} onBlur={() => setFocused(null)} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" placeholder="your@email.com" required style={inputStyle("email")}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={labelStyle}>Check In</label>
                  <input type="date" style={inputStyle("checkin")}
                    onFocus={() => setFocused("checkin")} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label style={labelStyle}>Check Out</label>
                  <input type="date" style={inputStyle("checkout")}
                    onFocus={() => setFocused("checkout")} onBlur={() => setFocused(null)} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea placeholder="Any special requests..." rows={4} style={{ ...inputStyle("msg"), resize: "none" }}
                  onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)} />
              </div>
              <div>
                <motion.button
                  type="submit"
                  className="btn-gold"
                  style={{ width: "100%", fontSize: "0.7rem" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Enquiry
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Toast
        message="Thank you! We'll be in touch within 24 hours."
        visible={toast}
        onHide={() => setToast(false)}
      />
    </section>
  );
}
