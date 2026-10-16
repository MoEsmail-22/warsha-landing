import { useEffect } from "react";

/**
 * Page-wide motion that isn't tied to one component:
 *  - reveal-on-scroll for every `.rv` (and staggered children of `[data-stg]`)
 *  - scroll progress bar (`--sp` on <html>), sticky-nav shadow
 *  - hero parallax (`--py`, `--py2` on `.st`)
 *  - 3D tilt on feature cards, magnetic buttons, spotlight on the dark section
 */
export default function useSiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    /* ---- reveal ---- */
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    const scan = (node) => {
      if (!(node instanceof Element)) return;
      node.querySelectorAll?.("[data-stg]").forEach((g) =>
        [...g.children].forEach((c, i) => c.style.setProperty("--d", i * 0.08 + "s"))
      );
      if (node.matches?.(".rv:not(.in)")) io.observe(node);
      node.querySelectorAll?.(".rv:not(.in)").forEach((el) => io.observe(el));
    };
    scan(document.body);
    const mo = new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach(scan)));
    mo.observe(document.body, { childList: true, subtree: true });

    /* ---- scroll-linked ---- */
    let raf = 0;
    const frame = () => {
      raf = 0;
      const y = window.scrollY, vh = window.innerHeight, h = root.scrollHeight - vh;
      root.style.setProperty("--sp", h > 0 ? (y / h).toFixed(4) : 0);
      document.querySelector(".nav")?.classList.toggle("scrolled", y > 12);
      const stage = document.querySelector(".st");
      if (!rm && stage && y < vh * 1.4) {
        stage.style.setProperty("--py", (y * 0.1).toFixed(1) + "px");
        stage.style.setProperty("--py2", (y * -0.14).toFixed(1) + "px");
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    /* ---- pointer effects (event delegation, so new elements just work) ---- */
    let lastTilt = null, lastMag = null;
    const onMove = (e) => {
      const card = e.target.closest?.(".t");
      if (lastTilt && lastTilt !== card) {
        lastTilt.style.setProperty("--rx", "0deg");
        lastTilt.style.setProperty("--ry", "0deg");
      }
      lastTilt = card;
      if (card) {
        const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, yy = (e.clientY - r.top) / r.height;
        card.style.setProperty("--ry", ((x - 0.5) * 9).toFixed(2) + "deg");
        card.style.setProperty("--rx", ((0.5 - yy) * 9).toFixed(2) + "deg");
        card.style.setProperty("--gx", x * 100 + "%");
        card.style.setProperty("--gy", yy * 100 + "%");
      }
      const mag = e.target.closest?.(".mag");
      if (lastMag && lastMag !== mag) {
        lastMag.style.setProperty("--bx", "0px");
        lastMag.style.setProperty("--by", "0px");
      }
      lastMag = mag;
      if (mag) {
        const r = mag.getBoundingClientRect();
        mag.style.setProperty("--bx", ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + "px");
        mag.style.setProperty("--by", ((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1) + "px");
      }
      const ctr = e.target.closest?.(".ctr");
      if (ctr) {
        const r = ctr.getBoundingClientRect();
        ctr.style.setProperty("--mx", e.clientX - r.left + "px");
        ctr.style.setProperty("--my", e.clientY - r.top + "px");
      }
    };
    if (fine && !rm) document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
