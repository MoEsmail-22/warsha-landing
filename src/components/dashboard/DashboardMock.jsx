import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "../../i18n/LangContext.jsx";
import { MD, STATUS, CATEGORY, DAYS, NAV, SCREEN_PATH, weekData } from "../../data/dashboard.js";
import { makeFormat } from "./format.js";
import { MIcon, CURSOR_SVG } from "./MockIcon.jsx";
import mockLogo from "../../assets/dashboard-logo.png";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- small pieces ---------------- */

function CountUp({ to, dec = 0, fmt }) {
  const [val, setVal] = useState(reducedMotion() ? to : 0);
  useEffect(() => {
    if (reducedMotion()) return setVal(to);
    let raf;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1400);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{fmt.nf(val, dec)}</>;
}

const Badge = ({ st, fmt, bump }) => <span className={`m-bdg ${st}${bump ? " m-bump" : ""}`}>{fmt.T(STATUS[st])}</span>;
const Avatar = ({ p }) => <span className="m-avt" style={{ background: p.c }}>{p.i}</span>;

/* ---------------- screens ---------------- */

function DashScreen({ fmt, sel, onSelect, onNavigate, firstKpi }) {
  const { T, nf, dg, egp } = fmt;
  const wk = weekData();
  const mx = Math.max(...wk);
  const total = wk.reduce((a, b) => a + b, 0);
  return (
    <>
      <div className="m-h">
        <h4>{fmt.greet()}{T([", ", "، "])}{T(MD.user.n)} 👋</h4>
        <p>{T(["Here's what's happening at your workshop today.", "إليك ملخص يومك في الورشة."])}</p>
      </div>
      <div className="m-kpis">
        {MD.kpi.map((k, i) => {
          const bumped = i === 0 && firstKpi != null;
          return (
            <div className="m-card m-kpi" style={{ "--i": i }} key={k.ic}>
              <span className={`m-ki${k.am ? " am" : ""}`}><MIcon name={k.ic} size={14} /></span>
              <strong key={bumped ? "b" : "a"} className={bumped ? "m-bump" : undefined}>
                <span>{bumped ? nf(firstKpi) : <CountUp to={k.v} dec={k.dec || 0} fmt={fmt} />}</span>
                {k.egp && <small>{egp()}</small>}
              </strong>
              <span>{T(k.t)}</span>
              <p className={k.up ? "up" : ""}>{k.up && <MIcon name="up" size={10} />}<bdi dir="ltr">{fmt.num(k.d.n)}</bdi> {T(k.d.t)}</p>
            </div>
          );
        })}
      </div>
      <div className="m-two">
        <div className="m-card m-sched">
          <div className="m-ct">
            <b>{T(["Today's Schedule", "جدول اليوم"])}</b>
            <button className="m-va" type="button" onClick={() => onNavigate(1)}>
              {T(["View all", "عرض الكل"])}<MIcon name={fmt.locale === "ar-EG" ? "chl" : "chr"} size={11} />
            </button>
          </div>
          <div className="m-sr th">
            <span>{T(["Customer", "العميل"])}</span><span>{T(["Service", "الخدمة"])}</span><span>{T(["Time", "الوقت"])}</span><span>{T(["Status", "الحالة"])}</span>
          </div>
          {MD.sched.map((p, i) => (
            <div className="m-sr rw" style={{ "--i": i }} key={p.i}>
              <span className="m-cu"><Avatar p={p} /><div><b>{T(p.n)}</b><small>{p.v}</small></div></span>
              <span>{T(p.s)}</span>
              <span className="m-tm">{dg(p.t)}</span>
              <span><Badge st={p.st} fmt={fmt} /></span>
            </div>
          ))}
        </div>
        <div className="m-card m-rev">
          <div className="m-rh">
            <div>
              <b>{T(["Revenue this week", "إيرادات الأسبوع"])}</b>
              <small>{T(["Tap a bar to see details", "اضغط على أي عمود لعرض التفاصيل"])}</small>
            </div>
            <div className="m-sel">
              <small>{T(DAYS[sel])}</small>
              <strong>{fmt.locale === "ar-EG" ? `${nf(wk[sel])} ${egp()}` : `${egp()} ${nf(wk[sel])}`}</strong>
            </div>
          </div>
          <div className="m-tot">
            <span><CountUp to={total} fmt={fmt} /></span> <small>{egp()}</small>
            <small className="l">{T(["Total this week", "إجمالي الأسبوع"])}</small>
          </div>
          <div className="m-bars">
            {wk.map((v, i) => (
              <button
                key={i}
                type="button"
                className={`m-bar${i === sel ? " sel" : ""}`}
                style={{ "--h": `${((v / mx) * 100).toFixed(1)}%`, "--i": i }}
                aria-label={T(DAYS[i])}
                onClick={() => onSelect(i)}
              />
            ))}
          </div>
          <div className="m-days">
            {wk.map((_, i) => <span key={i} className={i === sel ? "sel" : undefined}>{T(DAYS[i])}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}

function BookingRow({ p, k, cls, no, fmt, status, onCancel }) {
  const { T, dg, fdate, ymd } = fmt;
  const d = new Date();
  d.setDate(d.getDate() + (p.d || 0));
  const st = status || p.st;
  return (
    <div className={`m-br ${cls}`} style={{ "--i": k }}>
      <span className="m-no">WRSH-{ymd(d)}-{no}</span>
      <span className="m-cu"><Avatar p={p} /><b>{T(p.n)}</b></span>
      <span>{p.v}</span>
      <span>{T(p.s)}</span>
      <span className="m-dt"><b>{fdate(d)}</b><small>{dg(p.t)}</small></span>
      <span><Badge st={st} fmt={fmt} /></span>
      <span className="m-act">
        {st === "pending" && <em className="m-cx">{T(["Cancel", "إلغاء"])}</em>}
        <i className="m-dots"><MIcon name="more" size={13} /></i>
      </span>
    </div>
  );
}

function BookingsScreen({ fmt, newBooking }) {
  const { T, nf, dg } = fmt;
  const list = [...MD.sched, ...MD.more];
  const isAr = fmt.locale === "ar-EG";
  return (
    <>
      <div className="m-h">
        <h4>{T(["Bookings", "الحجوزات"])}</h4>
        <p>{T(["Manage and schedule incoming service requests.", "إدارة وجدولة طلبات الخدمة الواردة."])}</p>
      </div>
      <div className="m-fil">
        {[["All", "الكل"], ["Today", "اليوم"], ["Week", "الأسبوع"], ["Month", "الشهر"]].map((l, i) => (
          <span key={i} className={`m-tab${i ? "" : " on"}`}>{T(l)}</span>
        ))}
        <span className="m-tab"><MIcon name="sliders" size={10} />{T(["Filters", "تصفية"])}</span>
        <span className="m-search"><MIcon name="search" size={11} />{T(["Search bookings...", "ابحث في الحجوزات..."])}</span>
      </div>
      <div className="m-card m-tbl">
        <div className="m-br th">
          <span>{T(["Booking", "الحجز"])}</span><span>{T(["Customer", "العميل"])}</span><span>{T(["Vehicle", "المركبة"])}</span>
          <span>{T(["Service", "الخدمة"])}</span><span>{T(["Date/Time", "التاريخ والوقت"])}</span><span>{T(["Status", "الحالة"])}</span>
          <span className="e">{T(["Actions", "الإجراءات"])}</span>
        </div>
        <div className="m-rows">
          {newBooking && (
            <BookingRow
              p={MD.newBooking}
              k={0}
              no={489}
              fmt={fmt}
              cls={newBooking === "confirmed" ? "new ok" : "new"}
              status={newBooking === "confirmed" ? "confirmed" : "pending"}
            />
          )}
          {list.map((p, k) => <BookingRow key={p.i} p={p} k={k} cls="rw" no={482 - k} fmt={fmt} />)}
        </div>
        <div className="m-pg">
          <span>
            {T(["Showing", "يعرض"])} <b>{dg("1–7")}</b> {T(["of", "من"])}{" "}
            <b key={newBooking ? "n" : "o"} className={newBooking ? "m-bump" : undefined}>{nf(MD.total + (newBooking ? 1 : 0))}</b>
          </span>
          <span>
            <i>{isAr ? "›" : "‹"}</i><i className="on">{nf(1)}</i><i>{nf(2)}</i><i>{nf(3)}</i><i>{isAr ? "‹" : "›"}</i>
          </span>
        </div>
      </div>
    </>
  );
}

const Toggle = forwardRef(function Toggle({ on, onClick, fmt }, ref) {
  return (
    <span className={`m-tg${on ? " on" : ""}`} role="switch" aria-checked={on} onClick={onClick}>
      <i ref={ref} />
      <span>{fmt.T(on ? ["Active", "نشطة"] : ["Inactive", "غير نشطة"])}</span>
    </span>
  );
});

function ServicesScreen({ fmt, svcOn, lit, onToggle, firstOffRef }) {
  const { T } = fmt;
  const firstOff = svcOn.indexOf(false);
  return (
    <>
      <div className="m-hrow">
        <div className="m-h">
          <h4>{T(["Services & Pricing", "الخدمات والأسعار"])}</h4>
          <p>{T(["Control what you offer and what customers see.", "تحكم في الخدمات التي تقدمها وما يراه العملاء."])}</p>
        </div>
        <span className="m-btn"><MIcon name="plus" size={12} />{T(["Add Service", "إضافة خدمة"])}</span>
      </div>
      <div className="m-card m-tbl m-svt">
        <div className="m-sv th">
          <span>{T(["Service Name", "اسم الخدمة"])}</span><span>{T(["Category", "الفئة"])}</span><span>{T(["Duration", "المدة"])}</span>
          <span>{T(["Price", "السعر"])}</span><span>{T(["Status", "الحالة"])}</span><span className="e">{T(["Actions", "الإجراءات"])}</span>
        </div>
        {MD.services.map((s, k) => (
          <div className={`m-sv rw${lit === k ? " lit" : ""}`} style={{ "--i": k }} key={k}>
            <span className="nm">{T(s.n)}</span>
            <span className="mu">{T(CATEGORY[s.c])}</span>
            <span className="mu">{fmt.duration(s.m)}</span>
            <span className="mu">{fmt.price(s.p)}</span>
            <span><Toggle on={svcOn[k]} fmt={fmt} onClick={() => onToggle(k)} ref={k === firstOff ? firstOffRef : undefined} /></span>
            <span className="e"><i className="m-dots"><MIcon name="vmore" size={13} /></i></span>
          </div>
        ))}
      </div>
      <div className="m-card m-busycard">
        <div>
          <b>{T(["Busy Mode", "وضع الانشغال"])}</b>
          <small>{T(["Let customers know you're busy and can't take bookings.", "أبلغ عملاءك أنك مشغول حاليًا ولا تستقبل حجوزات جديدة."])}</small>
          <em>{T(["You're available — no busy times set.", "أنت متاح الآن — لا توجد فترات انشغال."])}</em>
        </div>
        <span className="m-btn"><MIcon name="clock" size={12} />{T(["Set as busy", "تفعيل وضع الانشغال"])}</span>
      </div>
    </>
  );
}

/* ---------------- the mockup ---------------- */

const INITIAL_SVC = MD.services.map((s) => s.on);

/**
 * Interactive replica of the service-center dashboard.
 * props: screen (0 dashboard, 1 bookings, 2 services), visible (plays the demo
 * when on screen), onNavigate(i) when a sidebar item or "View all" is clicked.
 */
const DashboardMock = forwardRef(function DashboardMock({ screen, visible, onNavigate }, ref) {
  const { lang, isAr } = useLang();
  const fmt = makeFormat(isAr);
  const { T, nf } = fmt;

  const appRef = useRef(null);
  const okRef = useRef(null);
  const firstOffRef = useRef(null);
  const timers = useRef([]);

  const [sel, setSel] = useState(new Date().getDay());
  const [bell, setBell] = useState({ n: 2, tick: 0 });
  const [firstKpi, setFirstKpi] = useState(null);
  const [newBooking, setNewBooking] = useState(null); // null | "pending" | "confirmed"
  const [svcOn, setSvcOn] = useState(INITIAL_SVC);
  const [lit, setLit] = useState(-1);
  const [toast, setToast] = useState({ show: false });
  const [cursor, setCursor] = useState({ show: false, click: false, x: 0, y: 0, instant: false, tick: 0 });

  const later = useCallback((fn, ms) => timers.current.push(setTimeout(fn, ms)), []);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const ringBell = (n) => setBell((b) => ({ n, tick: b.tick + 1 }));

  // Cursor helpers (positions are in the app's own, unscaled pixels)
  const cursorStart = () => {
    const app = appRef.current;
    if (!app) return;
    setCursor((c) => ({ ...c, show: true, click: false, instant: true, x: app.offsetWidth * 0.42, y: app.offsetHeight * 0.98 }));
  };
  const cursorTo = (el) => {
    const app = appRef.current;
    if (!app || !el) return;
    const a = app.getBoundingClientRect(), r = el.getBoundingClientRect(), s = app.offsetWidth / a.width;
    // next frame so the start position paints first and the move animates
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setCursor((c) => ({ ...c, instant: false, x: (r.left - a.left + r.width * 0.5) * s, y: (r.top - a.top + r.height * 0.55) * s }))
      )
    );
  };
  const cursorHide = () => setCursor((c) => ({ ...c, show: false, click: false }));
  const cursorClick = () => setCursor((c) => ({ ...c, click: true, tick: c.tick + 1 }));

  const confirmBooking = useCallback(() => {
    setNewBooking("confirmed");
    setToast({ show: true, done: true, icon: "ok", title: ["Booking status updated", "تم تحديث حالة الحجز"], body: { nb: true, status: "confirmed" } });
    ringBell(2);
    later(() => { setToast((t) => ({ ...t, show: false })); cursorHide(); }, 2600);
  }, [later]);

  // Reset + play the demo for the current screen
  useEffect(() => {
    clearTimers();
    setFirstKpi(null);
    setNewBooking(null);
    setSvcOn(INITIAL_SVC);
    setLit(-1);
    setToast((t) => ({ ...t, show: false }));
    setCursor((c) => ({ ...c, show: false, click: false }));
    if (!visible) return clearTimers;
    const rm = reducedMotion();

    if (screen === 0) {
      later(() => {
        setFirstKpi(13);
        ringBell(3);
        setToast({ show: true, icon: "bell", title: ["New booking request", "طلب حجز جديد"], body: { nb: true, short: true } });
        later(() => setToast((t) => ({ ...t, show: false })), 3400);
      }, 3200);
    }

    if (screen === 1) {
      later(() => {
        setNewBooking("pending");
        ringBell(3);
        setToast({ show: true, icon: "bell", title: ["New booking request", "طلب حجز جديد"], body: { nb: true, full: true }, buttons: true });
        if (rm) return later(confirmBooking, 3000);
        later(() => { cursorStart(); cursorTo(okRef.current); }, 1500);
        later(cursorClick, 2750);
        later(confirmBooking, 2900);
      }, 1600);
    }

    if (screen === 2) {
      later(() => {
        const k = INITIAL_SVC.indexOf(false);
        const go = () => {
          setSvcOn((s) => s.map((v, i) => (i === k ? true : v)));
          setLit(k);
          setToast({ show: true, done: true, icon: "ok", title: ["Service is now visible to customers", "أصبحت الخدمة ظاهرة للعملاء"], body: { text: MD.services[k].n } });
          later(() => { setToast((t) => ({ ...t, show: false })); cursorHide(); }, 2600);
        };
        if (rm) return go();
        cursorStart();
        cursorTo(firstOffRef.current);
        later(cursorClick, 1250);
        later(go, 1400);
      }, 1500);
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, visible, lang]);

  const onOk = () => {
    clearTimers();
    cursorHide();
    confirmBooking();
  };

  const toastBody = () => {
    const b = toast.body || {};
    const nb = MD.newBooking;
    if (b.text) return T(b.text);
    if (b.status) return `${T(nb.n)} · ${T(STATUS[b.status])}`;
    if (b.short) return `${T(nb.n)} · ${nb.v} · ${T(nb.s)}`;
    if (b.full)
      return (
        <>
          {T(nb.n)} · {nb.v}
          <br />
          {T(nb.s)} · {T(["Today", "اليوم"])} {fmt.dg(nb.t)}
        </>
      );
    return null;
  };

  const screens = [
    <DashScreen key="d" fmt={fmt} sel={sel} onSelect={setSel} onNavigate={onNavigate} firstKpi={firstKpi} />,
    <BookingsScreen key="b" fmt={fmt} newBooking={newBooking} />,
    <ServicesScreen
      key="s"
      fmt={fmt}
      svcOn={svcOn}
      lit={lit}
      firstOffRef={firstOffRef}
      onToggle={(k) => setSvcOn((s) => s.map((v, i) => (i === k ? !v : v)))}
    />,
  ];

  return (
    <div className="mock" id="mock" ref={ref} aria-label="Warsha service-center dashboard preview with sample data">
      <div className="m-chrome">
        <i /><i /><i />
        <span className="m-url">
          <MIcon name="lock" size={10} />
          <span>warsha.app/{isAr ? "ar" : "en"}{SCREEN_PATH[screen] ? "/" + SCREEN_PATH[screen] : ""}</span>
        </span>
      </div>
      <div className="m-app" ref={appRef}>
        <aside className="m-side">
          <div className="m-brand">
            <img src={mockLogo} alt="" />
            <div><b>{T(["Warsha", "ورشة"])}</b><small>{T(MD.user.full)}</small></div>
          </div>
          <nav className="m-nav">
            {NAV.map(([icon, label, go]) =>
              go !== undefined ? (
                <button key={icon} type="button" className={go === screen ? "on" : undefined} onClick={() => onNavigate(go)}>
                  <MIcon name={icon} size={15} /><span>{T(label)}</span>
                </button>
              ) : (
                <span key={icon} className="m-ni"><MIcon name={icon} size={15} /><span>{T(label)}</span></span>
              )
            )}
          </nav>
          <div className="m-pro">
            <span className="s"><MIcon name="star" size={12} /></span>
            <div>
              <b>{T(["Pro Plan", "الباقة الاحترافية"])}</b>
              <small>{T(["Renews Jun 2026 · 12 jobs left today", "تتجدد في يونيو ٢٠٢٦ · ١٢ مهمة متبقية اليوم"])}</small>
            </div>
          </div>
        </aside>

        <div className="m-main">
          <header className="m-top">
            <span className="m-burg"><MIcon name="menu" size={16} /></span>
            <span className="m-busy"><MIcon name="clock" size={13} /><span>{T(["Busy Mode", "وضع الانشغال"])}</span></span>
            <div className="m-tr8">
              <span className="m-lang"><MIcon name="globe" size={11} />{isAr ? "EN" : "AR"}</span>
              <span className={`m-bell${bell.tick ? " ring" : ""}`} key={`bell-${bell.tick}`}>
                <MIcon name="bell" size={15} />
                <b className={bell.tick ? "m-bump" : undefined}>{nf(bell.n)}</b>
              </span>
              <span className="m-user">
                <span className="m-av">{T(["A", "أ"])}</span>
                <div><b>{T(MD.user.full)}</b><small>{T(MD.user.role)}</small></div>
              </span>
            </div>
          </header>
          <div className="m-body">
            {screens.map((content, k) => (
              <section key={k} className={`m-scr${k === screen && visible !== null ? " on" : ""}`} aria-hidden={k !== screen}>
                {/* remount the active screen so its entrance animations replay */}
                {k === screen && <div key={`${screen}-${lang}`} style={{ display: "contents" }}>{content}</div>}
              </section>
            ))}
          </div>
        </div>

        <div className={`m-toast${toast.show ? " show" : ""}${toast.done ? " done" : ""}`} role="status">
          {toast.icon && (
            <>
              <span className="ti"><MIcon name={toast.icon} size={14} /></span>
              <div>
                <b>{toast.title && T(toast.title)}</b>
                <small>{toastBody()}</small>
                {toast.buttons && (
                  <div className="tb">
                    <span className="ok" ref={okRef} role="button" tabIndex={0} onClick={onOk}>{T(["Confirm", "تأكيد"])}</span>
                    <span>{T(["View", "عرض"])}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div
          key={`cur-${cursor.tick}`}
          className={`m-cur${cursor.show ? " show" : ""}${cursor.click ? " click" : ""}`}
          style={{ transform: `translate(${cursor.x}px,${cursor.y}px)`, transition: cursor.instant ? "none" : undefined }}
          dangerouslySetInnerHTML={{ __html: CURSOR_SVG }}
        />
      </div>
    </div>
  );
});

export default DashboardMock;
