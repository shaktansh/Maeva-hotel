import { useEffect, useRef } from "react";

export default function CursorDot() {
  const ringRef  = useRef(null);
  const dotRef   = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;

    const ring  = ringRef.current;
    const dot   = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot) return;

    let dx = -200, dy = -200;
    let rx = -200, ry = -200;
    let raf;
    const LERP = 0.18;

    // ── rAF loop — only ring lerps, dot is set directly in onMove ──
    const tick = () => {
      rx += (dx - rx) * LERP;
      ry += (dy - ry) * LERP;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };

    // ── Mouse move — dot snaps instantly ──
    const onMove = (e) => {
      dx = e.clientX;
      dy = e.clientY;
      dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
    };

    // ── Single delegated hover — no MutationObserver, no querySelectorAll ──
    const HOVER_SEL = "a,button,input,textarea,select,[data-cur]";
    const LABELS = {
      A: "VIEW", BUTTON: "CLICK", INPUT: "TYPE",
      TEXTAREA: "TYPE", SELECT: "CHOOSE",
    };
    const CUSTOM = { rc: "EXPLORE", iw: "OPEN", "gallery-hover": "OPEN" };

    const onOver = (e) => {
      const el = e.target.closest(HOVER_SEL) ||
                 Object.keys(CUSTOM).map(c => e.target.closest(`.${c}`)).find(Boolean);
      if (!el) return;
      ring.classList.add("ch");
      dot.classList.add("ch");
      // Pick label
      let lbl = LABELS[el.tagName] || "VIEW";
      for (const [cls, txt] of Object.entries(CUSTOM)) {
        if (el.classList?.contains(cls)) { lbl = txt; break; }
      }
      if (label) label.textContent = lbl;
    };

    const onOut = (e) => {
      const el = e.target.closest(HOVER_SEL) ||
                 Object.keys(CUSTOM).map(c => e.target.closest(`.${c}`)).find(Boolean);
      if (!el) return;
      ring.classList.remove("ch");
      dot.classList.remove("ch");
    };

    const onDown = () => ring.classList.add("cc");
    const onUp   = () => ring.classList.remove("cc");

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseover",  onOver,  { passive: true });
    document.addEventListener("mouseout",   onOut,   { passive: true });
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);

    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine)  { *, *::before, *::after { cursor: none !important; } }
        @media (pointer: coarse){ #lxr, #lxd { display: none !important; } }

        /* ── Dot — instant snap ── */
        #lxd {
          position: fixed; top: 0; left: 0;
          width: 5px; height: 5px;
          background: var(--gold, #C9A96E);
          border-radius: 50%;
          pointer-events: none; z-index: 100001;
          will-change: transform;
          transform: translate(-200px,-200px) translate(-50%,-50%);
          transition: width .3s, height .3s, opacity .3s;
        }
        #lxd.ch { width: 3px; height: 3px; opacity: .5; }

        /* ── Ring — trailing ── */
        #lxr {
          position: fixed; top: 0; left: 0;
          width: 38px; height: 38px;
          border: 1px solid var(--gold, #C9A96E);
          border-radius: 50%;
          pointer-events: none; z-index: 100000;
          will-change: transform;
          transform: translate(-200px,-200px) translate(-50%,-50%);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          transition:
            width  .4s cubic-bezier(.22,1,.36,1),
            height .4s cubic-bezier(.22,1,.36,1),
            background .3s,
            border-color .3s;
        }

        /* Label inside ring */
        #lxl {
          font-family: var(--fb, 'Jost', sans-serif);
          font-size: .4rem; font-weight: 400;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--gold, #C9A96E);
          opacity: 0; pointer-events: none; user-select: none;
          transition: opacity .25s;
          white-space: nowrap; position: absolute;
        }

        /* Hover */
        #lxr.ch {
          width: 68px; height: 68px;
          background: color-mix(in srgb, var(--gold,#C9A96E) 8%, transparent);
          border-color: color-mix(in srgb, var(--gold,#C9A96E) 70%, transparent);
        }
        #lxr.ch #lxl { opacity: 1; }

        /* Click */
        #lxr.cc { width: 26px; height: 26px; }

        /* Theme tweaks */
        [data-theme="dark"] #lxr {
          border-color: rgba(201,169,110,.5);
        }
        [data-theme="quiet"] #lxr {
          border-color: rgba(184,146,74,.4);
        }
      `}</style>

      <div id="lxr" ref={ringRef}>
        <span id="lxl" ref={labelRef}>VIEW</span>
      </div>
      <div id="lxd" ref={dotRef} />
    </>
  );
}
