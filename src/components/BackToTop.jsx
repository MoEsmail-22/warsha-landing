import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";

/** Round button with a ring that fills as you scroll; shows after 700px. */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const rm = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <button
      className={`totop${show ? " show" : ""}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: rm ? "auto" : "smooth" })}
    >
      <svg className="pr" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /></svg>
      <Icon name="up" />
    </button>
  );
}
