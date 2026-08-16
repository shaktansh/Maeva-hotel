import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitch() {
  const { toggle, isDark } = useTheme();
  return (
    <motion.button className="ts" onClick={toggle}
      initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:3.5, duration:0.6 }}
      whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
      title={isDark ? "Switch to Quiet Luxury" : "Switch to Modern Black"}
    >
      <motion.span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"var(--gold)", flexShrink:0 }} animate={{ scale:[1,1.4,1] }} transition={{ duration:2, repeat:Infinity }} />
      <AnimatePresence mode="wait">
        <motion.span key={isDark?"q":"d"} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.25 }} style={{ whiteSpace:"nowrap" }}>
          {isDark ? "Quiet Luxury" : "Dark Luxury"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
