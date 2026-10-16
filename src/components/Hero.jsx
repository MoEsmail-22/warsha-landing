import { useEffect, useRef } from "react";
import { useLang } from "../i18n/LangContext.jsx";
import Icon from "./Icon.jsx";
import appScreen from "../assets/app-home.jpg";

/** The iPhone frame that shows the real app home screen and slowly pans it. */
function Phone() {
  const { t } = useLang();
  const viewRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const fit = () => {
      const v = viewRef.current, i = imgRef.current;
      if (!v || !i) return;
      i.style.setProperty("--pan", Math.min(0, v.clientHeight - i.clientHeight) + "px");
    };
    const img = imgRef.current;
    if (img?.complete) fit();
    img?.addEventListener("load", fit);
    window.addEventListener("resize", fit);
    return () => {
      img?.removeEventListener("load", fit);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <div className="mk">
      <div className="scr scr-app">
        <div className="ios" aria-hidden="true">
          <b>9:41</b>
          <span>
            <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
            <svg viewBox="0 0 16 12"><path d="M8 11.5 5.6 8.9a3.4 3.4 0 0 1 4.8 0L8 11.5ZM3.4 6.6a6.6 6.6 0 0 1 9.2 0l-1.4 1.5a4.6 4.6 0 0 0-6.4 0L3.4 6.6ZM1 4.2a10 10 0 0 1 14 0l-1.4 1.5a8 8 0 0 0-11.2 0L1 4.2Z" /></svg>
            <svg viewBox="0 0 27 12"><rect x=".5" y=".5" width="23" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="17" height="8" rx="2" /><rect x="24.5" y="4" width="1.8" height="4" rx="1" opacity=".4" /></svg>
          </span>
        </div>
        <div className="ntf">
          <span className="ri"><Icon name="bell" /></span>
          <div>
            <b>{t("Oil change in 3,000 km", "تغيير الزيت بعد 3,000 كم")}</b>
            <br />
            <small>{t("Book a workshop now", "احجز ورشة دلوقتي")}</small>
          </div>
        </div>
        <div className="appv" ref={viewRef}>
          <img
            ref={imgRef}
            src={appScreen}
            alt="Warsha app home screen: live car status, workshop search, quick actions and recommended workshops"
            width="480"
            height="1039"
          />
        </div>
        <i className="homebar" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="hero">
      <div className="w hg">
        <div>
          <span className="eb ld" style={{ "--d": ".05s" }}>{t("Car care, made clear", "صيانة أوضح")}</span>
          <h1 key={t("en", "ar")}>
            <span className="ln"><span>{t("Your car talks.", "عربيتك بتتكلم..")}</span></span>
            <span className="ln"><span><em>{t("Warsha", "ورشة")}</em> {t("listens.", "بتفهمها.")}</span></span>
          </h1>
          <p className="sub ld" style={{ "--d": ".35s" }}>
            {t(
              "Find trusted service centers, keep every invoice and service record in one place, and never miss a maintenance date again.",
              "اكتشف مراكز صيانة موثوقة، وخلي كل فاتورة وسجل صيانة في مكان واحد، ومتفوتش معاد صيانة تاني."
            )}
          </p>
          <div className="acts ld" style={{ "--d": ".5s" }}>
            <a className="b bp mag sheen" href="#install">{t("Install now ↗", "نزّل التطبيق دلوقتي ↖")}</a>
            <a className="b" href="#workshops">{t("I run a service center", "أنا مركز صيانة")}</a>
          </div>
        </div>

        <div className="st">
          <div className="arch" />
          <div className="rings"><i /><i /><i /></div>
          <Phone />
          <div className="fc fc1">
            <span className="av">A</span>
            <div>
              <strong>Apex Auto Care</strong>
              <small>{t("Serviced 2 days ago", "خدمة من يومين")}</small>
            </div>
            <span className="pill">EGP 850</span>
          </div>
          <div className="fc fc2">
            <span className="av" style={{ background: "var(--gr)" }}><Icon name="bell" /></span>
            <div>
              <strong>{t("Oil change due soon", "تغيير الزيت قرّب")}</strong>
              <small>{t("3,000 km to go", "لسه 3,000 كم")}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
