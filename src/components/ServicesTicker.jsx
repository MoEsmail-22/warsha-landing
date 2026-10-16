import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * ServicesTicker — a seamless, evenly spaced scrolling strip (English + Arabic).
 *
 * Usage:
 *   <ServicesTicker lang="en" />
 *   <ServicesTicker lang="ar" />            // reads and scrolls right-to-left
 *   <ServicesTicker items={myItems} gap={32} speed={60} />
 *
 * Why it never shows a big empty gap:
 *   1. It measures one set of items, then repeats the set until it is wider than
 *      the screen (re-measured on resize, font load and language change).
 *   2. It renders that run TWICE and slides the strip by exactly one run, so the
 *      second run lands where the first started — no jump, no blank space.
 *   3. Spacing comes from a fixed CSS gap (not spaces in the text), and every set
 *      ends with the same gap, so the space at the loop point equals every other.
 */

const DEFAULT_ITEMS = [
  { en: "Oil change", ar: "تغيير زيت" },
  { en: "Brakes", ar: "فرامل" },
  { en: "Tires", ar: "إطارات" },
  { en: "Battery", ar: "بطارية" },
  { en: "A/C", ar: "تكييف" },
  { en: "Diagnostics", ar: "كمبيوتر" },
  { en: "Bodywork", ar: "سمكرة ودوكو" },
  { en: "Suspension", ar: "عفشة" },
];

const CSS = `
.wt{--wt-gap:40px;position:relative;overflow:hidden;background:#242321;color:#fff;padding:18px 0;font-weight:700;font-size:20px;direction:ltr;user-select:none}
.wt-track{display:flex;width:max-content;will-change:transform;animation:wt-loop var(--wt-dur,30s) linear infinite}
.wt:hover .wt-track{animation-play-state:paused}
.wt.is-rtl .wt-track{animation-direction:reverse}
.wt-set{display:flex;align-items:center;flex:none;gap:var(--wt-gap);padding-right:var(--wt-gap)}
.wt.is-rtl .wt-set{flex-direction:row-reverse;padding-right:0;padding-left:var(--wt-gap)}
.wt-item{white-space:nowrap;line-height:1.3}
.wt.is-rtl .wt-item{direction:rtl;unicode-bidi:isolate;font-family:Cairo,system-ui,sans-serif}
.wt-sep{color:#f56b2a;font-size:.7em;line-height:1;flex:none}
@keyframes wt-loop{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (max-width:600px){.wt{--wt-gap:22px;font-size:17px;padding:14px 0}}
@media (prefers-reduced-motion:reduce){.wt-track{animation:none}}
`;

function useTickerStyles() {
  useEffect(() => {
    if (document.getElementById("wt-styles")) return;
    const tag = document.createElement("style");
    tag.id = "wt-styles";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);
}

export default function ServicesTicker({
  items = DEFAULT_ITEMS,
  lang = "en",
  speed = 70, // pixels per second — same feel in both languages
  gap, // optional fixed gap in px (defaults: 40 desktop / 22 phone)
  separator = "✦",
  className = "",
}) {
  useTickerStyles();
  const isAr = lang === "ar";
  const wrapRef = useRef(null);
  const measureRef = useRef(null);
  const [copies, setCopies] = useState(1);
  const [duration, setDuration] = useState(30);

  const labels = items.map((it) => (isAr ? it.ar : it.en));

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const set = measureRef.current;
    if (!wrap || !set) return;
    const setW = set.getBoundingClientRect().width || 1;
    const need = Math.max(1, Math.ceil(wrap.clientWidth / setW));
    setCopies(need);
    setDuration((setW * need) / speed);
  }, [speed]);

  // Measure before paint, and again whenever size, fonts or language change.
  useLayoutEffect(measure, [measure, lang, items, gap]);
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  const renderSet = (key, ref) => (
    <div className="wt-set" key={key} ref={ref}>
      {labels.map((label, i) => (
        <span className="wt-group" key={i} style={{ display: "contents" }}>
          <span className="wt-item">{label}</span>
          <span className="wt-sep" aria-hidden="true">{separator}</span>
        </span>
      ))}
    </div>
  );

  const run = (half) =>
    Array.from({ length: copies }, (_, i) =>
      renderSet(`${half}-${i}`, half === "a" && i === 0 ? measureRef : undefined)
    );

  return (
    <div
      ref={wrapRef}
      className={`wt ${isAr ? "is-rtl" : ""} ${className}`}
      style={gap ? { "--wt-gap": `${gap}px` } : undefined}
      role="marquee"
      aria-label={labels.join(", ")}
    >
      {/* key forces the animation to restart cleanly when the content changes */}
      <div
        className="wt-track"
        key={`${lang}-${copies}`}
        style={{ "--wt-dur": `${duration.toFixed(2)}s` }}
        aria-hidden="true"
      >
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}
