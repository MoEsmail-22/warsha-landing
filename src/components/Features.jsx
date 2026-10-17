import { useLang } from "../i18n/LangContext.jsx";
import Icon from "./Icon.jsx";

export default function Features() {
  const { t } = useLang();
  const cards = [
    { cls: "big or", icon: "search", h: t("Find a center that fits", "اختار المركز المناسب"), p: t("Browse trusted service centers by brand and service, and choose with confidence.", "تصفح مراكز صيانة موثوقة حسب الماركة والخدمة، واختار بثقة.") },
    { cls: "big", icon: "book", h: t("Your car's story", "حكاية عربيتك"), p: t("Every service, part and invoice on one timeline you can show a future buyer.", "كل صيانة وقطعة وفاتورة في خط زمني واحد تقدر تورّيه لأي مشتري.") },
    { cls: "dk", icon: "bell", h: t("Smart reminders", "تذكيرات ذكية"), p: t("Oil, insurance, license: we nudge you before they're due.", "زيت، تأمين، رخصة: بنفكرك قبل ميعادهم.") },
    { cls: "", icon: "cal", h: t("Booking overview", "متابعة الحجوزات"), p: t("Upcoming and past visits, neatly organized.", "زياراتك الجاية والسابقة منظمة.") },
    { cls: "", icon: "receipt", h: t("Digital invoices", "فواتير رقمية"), p: t("No more crumpled paper. Find any invoice in seconds.", "بلاش ورق مكرمش. دوّر على أي فاتورة في ثواني.") },
  ];
  return (
    <section className="sec" id="features">
      <div className="w">
        <div className="kick rv">{t("Everything in one place", "تعبت من اللف؟")}</div>
        <h2 className="rv" style={{ "--d": ".08s" }}>
          {t("A whole garage, ", "سيبها ")}<em>{t("in your pocket.", "على ورشة.")}</em>
        </h2>
        <p className="lead rv" style={{ "--d": ".16s" }}>
          {t("From finding a center to filing the last invoice, Warsha brings your car-care journey together.", "مش لازم تسأل ده وتجرّب ده. هتلاقي مركز تثق فيه، تحجز معادك بسهولة، وفواتيرك كلها محفوظة لحد ما تحتاجها.")}
        </p>
        <div className="bento" data-stg>
          {cards.map((c) => (
            <article className={`t rv ${c.cls}`} key={c.icon}>
              <span className="ic"><Icon name={c.icon} /></span>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
