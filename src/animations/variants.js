// Shared animation variants — import these everywhere for consistency

export const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.8 } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (delay = 0.12, staggerDelay = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay, delayChildren: staggerDelay } },
});

// Gold line draw (width 0 → full)
export const drawLine = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// Clip reveal from bottom (text masking effect)
export const clipReveal = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show:   { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
