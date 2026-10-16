import { useLang } from "../i18n/LangContext.jsx";
import { CONTACT, LINKS, STORE } from "../config.js";
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
          <p className="lead">{t("Install Warsha now, and follow us for car tips and updates.", "نزّل ورشة دلوقتي، وتابعنا عشان نصايح العربيات وكل جديد.")}</p>

          <div className="store" id="install">
            <a className="sb" href={STORE.googlePlay} {...ext}>
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                <path fill="#00d7fe" d="M3.6 2.3 13.4 12l-9.8 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1z" />
                <path fill="#ffce00" d="m16.7 8.7 3.3 1.9c1 .6 1 2.2 0 2.8l-3.3 1.9-3.3-3.3z" />
                <path fill="#00f076" d="M3.6 2.3c.4-.2.8-.2 1.2 0l11.9 6.4-3.3 3.3z" />
                <path fill="#ff3a44" d="m13.4 12 3.3 3.3-11.9 6.4c-.4.2-.9.2-1.2 0z" />
              </svg>
              <span><small>{t("Get it on", "متاح على")}</small><b>Google Play</b></span>
            </a>
            <a className="sb" href={STORE.appStore} {...ext}>
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                <path fill="currentColor" d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-2.99-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.24-.02 2.02-1.12 2.77-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.39-.92-2.41-3.66zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.67 1.37-.58.67-1.09 1.76-.96 2.79 1.02.08 2.06-.52 2.69-1.27z" />
              </svg>
              <span><small>{t("Download on the", "حمّله من")}</small><b>App Store</b></span>
            </a>
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
