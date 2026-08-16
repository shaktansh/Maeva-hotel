import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function BackToTop() {
  const [v, setV] = useState(false);
  useEffect(() => { const fn = () => setV(window.scrollY>500); window.addEventListener("scroll",fn,{passive:true}); return ()=>window.removeEventListener("scroll",fn); }, []);
  return (
    <AnimatePresence>
      {v && (
        <motion.button id="btt" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:16 }} transition={{ duration:0.4 }}
          onClick={() => window.scrollTo({ top:0, behavior:"smooth" })} whileHover={{ scale:1.08 }} whileTap={{ scale:0.95 }} title="Back to top">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 12V2M7 2L2 7M7 2L12 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
