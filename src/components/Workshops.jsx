import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/LangContext.jsx";
import DashboardMock from "./dashboard/DashboardMock.jsx";
import Chips from "./Chips.jsx";
import Icon from "./Icon.jsx";

const AUTO_MS = [7000, 9500, 7000]; // how long each screen shows on phones
const DESKTOP_QUERY = "(min-width: 981px)";

function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

function useSteps(t) {
  return [
    {
      n: t("01 · Dashboard", "01 · لوحة التحكم"),
      h: <>{t("Your day, ", "يومك كله ")}<em>{t("at a glance.", "قدام عينك.")}</em></>,
      p: t("Today's bookings, cars in service, revenue and your rating — the second you open the dashboard.", "حجوزات النهارده، العربيات اللي في الصيانة، الإيراد وتقييمك — كله قدامك أول ما تفتح لوحة التحكم."),
      li: [
        t("Today's schedule with every car and time", "جدول النهارده بكل عربية ومعادها"),
        t("Revenue this week, day by day", "إيراد الأسبوع يوم بيوم"),
        t("An alert the moment a booking lands", "تنبيه فوري أول ما يوصلك حجز جديد"),
      ],
    },
    {
      n: t("02 · Bookings", "02 · الحجوزات"),
      h: <>{t("Never miss ", "متفوتش ")}<em>{t("a booking.", "ولا حجز.")}</em></>,
      p: t("Requests land instantly with the car, the service and the time. Confirm in one tap and the customer knows right away.", "الطلب بيوصلك فورًا بالعربية والخدمة والمعاد. أكّد بضغطة — والعميل يعرف على طول."),
      li: [
        t("Filter by today, week or month", "فلتر الحجوزات باليوم أو الأسبوع أو الشهر"),
        t("Pending, confirmed, in progress — clear at a glance", "مستني، اتأكد، بيتعمل — كله واضح قدامك"),
        t("A booking number and full details for every car", "رقم لكل حجز وكل تفاصيله"),
      ],
    },
    {
      n: t("03 · Services", "03 · الخدمات"),
      h: <>{t("Your menu, ", "خدماتك، ")}<em>{t("your prices.", "بأسعارك.")}</em></>,
      p: t("Set a price range and duration for every service, show or hide it in one tap, and switch on Busy Mode when you're full.", "حدّد السعر والمدة لكل خدمة، اظهرها أو اخفيها بضغطة، وشغّل وضع الانشغال لما تكون مليان."),
      li: [
        t("Price ranges customers can trust", "أسعار واضحة يثق فيها العميل"),
        t("Show or hide any service in one tap", "اظهر أو اخفي أي خدمة بضغطة"),
        t("Busy Mode for your fully booked days", "وضع الانشغال للأيام الزحمة"),
      ],
    },
  ];
}

const StepText = ({ s }) => (
  <>
    <h3>{s.h}</h3>
    <p>{s.p}</p>
    <ul>{s.li.map((x) => <li key={x}>{x}</li>)}</ul>
  </>
);

function BookingFlow() {
  const { t } = useLang();
  const ref = useRef(null);
  const [fp, setFp] = useState(0);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v) => Math.min(1, Math.max(0, v));
    let raf = 0;
    const frame = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const vertical = window.innerWidth <= 760;
      setFp(rm ? 1 : vertical ? clamp((vh * 0.7 - r.top) / r.height) : clamp((vh * 0.85 - r.top) / (vh * 0.45)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(frame); };
    frame();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  const steps = [
    { icon: "mobile", h: t("Driver books", "العميل بيحجز"), p: t("Picks your center, the service and a time in the app.", "بيختار مركزك والخدمة والمعاد من التطبيق.") },
    { icon: "bell", h: t("You're notified", "بيوصلك فورًا"), p: t("Accept or reschedule from the dashboard in one tap.", "اقبل أو غيّر المعاد من لوحة التحكم بضغطة.") },
    { icon: "wrench", h: t("Service & e-invoice", "خدمة وفاتورة رقمية"), p: t("The invoice lands in the driver's car history.", "الفاتورة بتتسجل في سجل عربية العميل على طول.") },
    { icon: "star", h: t("Reviews bring more", "تقييم يجيب عملاء"), p: t("Great reviews help new drivers find you.", "التقييمات الحلوة بتساعد عملاء جداد يلاقوك.") },
  ];

  return (
    <div className="ws-flow">
      <div className="kick rv">{t("How a booking flows", "رحلة الحجز")}</div>
      <h3 className="ws-fh rv" style={{ "--d": ".08s" }}>
        {t("From one tap in the app to ", "من ضغطة في التطبيق ")}<em>{t("a returning customer.", "لعميل بيرجعلك تاني.")}</em>
      </h3>
      <div className="wf" id="wf" ref={ref} style={{ "--fp": fp.toFixed(3) }}>
        {steps.map((s, k) => (
          <div className={`wf-s${fp > 0 && fp >= k / (steps.length - 1) - 0.02 ? " lit" : ""}`} key={s.icon}>
            <div className="wf-i"><Icon name={s.icon} /></div>
            <h4>{s.h}</h4>
            <p>{s.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Workshops() {
  const { t, lang } = useLang();
  const steps = useSteps(t);
  const desktop = useMedia(DESKTOP_QUERY);
  const [screen, setScreen] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const mockRef = useRef(null);
  const gridRef = useRef(null);
  const stepRefs = useRef([]);

  // Is the mockup on screen? (demo only plays while visible)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (mockRef.current) io.observe(mockRef.current);
    return () => io.disconnect();
  }, []);

  // Desktop: the step in the middle of the screen picks the dashboard screen.
  useEffect(() => {
    if (!desktop) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setScreen(+e.target.dataset.s)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [desktop]);

  // Phones: tabs advance on their own, with a progress bar under the active tab.
  useEffect(() => {
    stepRefs.current.forEach((el) => el && el.classList.remove("run"));
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (desktop || rm || !visible || paused) return;
    const el = stepRefs.current[screen];
    if (el) {
      el.style.setProperty("--dur", AUTO_MS[screen] + "ms");
      void el.offsetWidth;
      el.classList.add("run");
    }
    const id = setTimeout(() => setScreen((s) => (s + 1) % steps.length), AUTO_MS[screen]);
    return () => clearTimeout(id);
  }, [screen, desktop, visible, paused, lang, steps.length]);

  // Tilt + scale the mockup in as it scrolls into view.
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) return;
    let raf = 0;
    const frame = () => {
      raf = 0;
      const g = gridRef.current, m = mockRef.current;
      if (!g || !m) return;
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - g.getBoundingClientRect().top) / (vh * 0.8)));
      m.style.setProperty("--tilt", ((1 - p) * 20).toFixed(2) + "deg");
      m.style.setProperty("--msc", (0.9 + 0.1 * p).toFixed(3));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(frame); };
    frame();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  const pauseTimer = useRef(0);
  const onMockPointer = () => {
    if (desktop) return;
    setPaused(true);
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 9000);
  };
  useEffect(() => () => clearTimeout(pauseTimer.current), []);

  const go = useCallback(
    (k) => {
      if (desktop) stepRefs.current[k]?.scrollIntoView({ behavior: "smooth", block: "center" });
      setScreen(k);
    },
    [desktop]
  );

  return (
    <section className="sec ws" id="workshops">
      <div className="ws-glow" />
      <div className="w">
        <div className="ws-hd">
          <div className="rv">
            <span className="ws-live"><i /><span>{t("Live dashboard preview", "معاينة حية للوحة التحكم")}</span></span>
            <div className="kick">{t("For workshops & service centers", "للورش ومراكز الصيانة")}</div>
            <h2>{t("Your whole workshop, ", "ورشتك كلها ")}<em>{t("on one screen.", "في شاشة واحدة.")}</em></h2>
          </div>
          <p className="lead rv" style={{ "--d": ".12s" }}>
            {t("Bookings, revenue, services and reviews — all live in the Warsha dashboard. No paper, no missed calls, no guesswork.", "الحجوزات والإيراد والخدمات والتقييمات — كله قدامك لحظة بلحظة في لوحة تحكم ورشة. من غير ورق، ولا مكالمات فايتة، ولا تخمين.")}
          </p>
        </div>

        <div className="ws-grid" ref={gridRef}>
          <div className="ws-steps">
            {steps.map((s, k) => (
              <div
                key={k}
                ref={(el) => (stepRefs.current[k] = el)}
                data-s={k}
                className={`ws-step${k === screen ? " on" : ""}`}
                role="button"
                tabIndex={0}
                aria-pressed={k === screen}
                onClick={() => go(k)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    go(k);
                  }
                }}
              >
                <span className="ws-n">{s.n}</span>
                <div className="ws-txt"><StepText s={s} /></div>
              </div>
            ))}
          </div>

          <div className="ws-stage" onPointerDown={onMockPointer}>
            <DashboardMock ref={mockRef} screen={screen} visible={visible} onNavigate={go} />
            <p className="ws-note">{t("Demo screens · sample data", "شاشات توضيحية · بيانات تجريبية")}</p>
            <div className="ws-cap" aria-live="polite"><StepText s={steps[screen]} /></div>
          </div>
        </div>

        <Chips
          className="ws-also"
          label={t("Also inside", "وكمان جوّه اللوحة")}
          items={[
            { icon: "puzzle", label: t("Jobs Board", "لوحة المهام") },
            { icon: "receipt", label: t("Quotes", "عروض الأسعار") },
            { icon: "star", label: t("Reviews", "التقييمات") },
            { icon: "tag", label: t("Offers", "العروض والخصومات") },
            { icon: "car", label: t("Vehicle catalog", "كتالوج الماركات") },
          ]}
        />

        <BookingFlow />

        <div className="ws-cta rv zm">
          <a className="b bp mag" href="#centers">{t("Join as a workshop ↗", "سجّل ورشتك ↖")}</a>
          <a className="b" href="#contact">{t("Ask for a demo", "اطلب عرض تجريبي")}</a>
        </div>
      </div>
    </section>
  );
}
