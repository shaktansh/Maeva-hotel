import { useEffect, useRef } from "react";

export default function CursorDot() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  const hovered = useRef(false);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterLink = () => { hovered.current = true; };
    const onLeaveLink = () => { hovered.current = false; };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.querySelectorAll("a, button, .room-card, .img-zoom").forEach(el => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    const animate = () => {
      // Dot snaps directly
      dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      // Ring lags behind with lerp
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringEl.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px) scale(${hovered.current ? 1.8 : 1})`;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <style>{`
        @media (pointer: coarse) { #cursor-dot, #cursor-ring { display: none; } }
        @media (pointer: fine) { body { cursor: none; } a, button { cursor: none; } }
        #cursor-dot {
          position: fixed; top: 0; left: 0; z-index: 9998; pointer-events: none;
          width: 8px; height: 8px; border-radius: 50%;
          background: #C9A96E; will-change: transform;
          transition: opacity 0.3s;
        }
        #cursor-ring {
          position: fixed; top: 0; left: 0; z-index: 9997; pointer-events: none;
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.5);
          will-change: transform;
          transition: transform 0.08s linear, opacity 0.3s;
        }
      `}</style>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
