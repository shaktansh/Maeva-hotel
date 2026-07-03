import { motion } from "framer-motion";

/**
 * Splits heading text into words and animates each word sliding up
 * from a clipped container — gives a premium "type reveal" feel.
 * Usage: <AnimatedHeading text="Enjoy a Luxury Experience" inView={inView} delay={0.2} />
 */
export default function AnimatedHeading({ text, inView, delay = 0, className = "", style = {} }) {
  const words = text.split(" ");

  return (
    <span
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0 0.28em", ...style }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.08em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
