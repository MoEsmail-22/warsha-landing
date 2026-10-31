import { useLang } from "../i18n/LangContext.jsx";
import { CONTACT, LINKS } from "../config.js";
import { SocialLogo } from "./Icon.jsx";

export const SOCIALS = [
  { kind: "instagram", name: "Instagram", href: LINKS.instagram, handle: "@" + CONTACT.instagram, bg: "linear-gradient(45deg,#feda75,#fa7e1e 30%,#d62976 60%,#962fbf 80%,#4f5bd5)" },
  { kind: "tiktok", name: "TikTok", href: LINKS.tiktok, handle: "@" + CONTACT.tiktok, bg: "linear-gradient(135deg,#25f4ee,#000 45%,#000 55%,#fe2c55)" },
  { kind: "facebook", name: "Facebook", href: LINKS.facebook, handle: "Warsha", bg: "linear-gradient(160deg,#3b8cff,#0866ff)" },
];

const ext = { target: "_blank", rel: "noopener noreferrer" };

export default function Contact() {
  const { t } = useLang();
  return (
    <section className="sec" id="contact" style={{ paddingTop: 0 }}>
      <div className="w">
        <div className="cc rv zm">
          <div className="kick">{t("Let's talk", "خلينا نتكلم")}</div>
          <h2>{t("Let's talk ", "خلينا نتكلم ")}<em>{t("cars.", "عربيات.")}</em></h2>
          <p className="lead">{t("The app is almost here. Follow us and be the first to know when it launches.", "التطبيق قرّب ينزل. تابعنا وهتكون أول واحد يعرف أول ما ينزل.")}</p>

          <div className="soon" id="install" role="status">
            <span className="soon-dot" aria-hidden="true" />
            <span>
              <b>{t("Stay tuned", "خليك متابع")}</b>
              <small>{t("The Warsha app is coming soon to Google Play and the App Store.", "تطبيق ورشة نازل قريب على Google Play و App Store.")}</small>
            </span>
          </div>

          <div className="soc-h rv">{t("Follow us", "تابعنا")}</div>
          <div className="soc" data-stg>
            {SOCIALS.map((s) => (
              <a className="so rv" key={s.kind} href={s.href} style={{ "--bc": s.bg }} aria-label={s.name} {...ext}>
                <span className="lg"><SocialLogo kind={s.kind} /></span>
                <span className="tx"><b>{s.name}</b><small>{s.handle}</small></span>
                <span className="go">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
