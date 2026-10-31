import { useLang } from "../i18n/LangContext.jsx";

export default function FAQ() {
  const { t } = useLang();
  const items = [
    [t("What is Warsha?", "إيه هي ورشة؟"), t("A car-care platform that helps you discover service centers and keep every maintenance detail in one place.", "منصة للعناية بالعربيات بتساعدك تكتشف مراكز الصيانة وتنظم كل تفاصيل الصيانة في مكان واحد.")],
    [t("Can any service center join?", "هل أي مركز صيانة يقدر ينضم؟"), t("Any center can send an interest form. Our team reviews the details and follows up about verification and onboarding.", "أي مركز يقدر يبعت طلب اهتمام، وفريقنا هيراجع التفاصيل ويتواصل بخصوص التحقق وخطوات الانضمام.")],
    [t("When can I download the app?", "إمتى أقدر أحمّل التطبيق؟"), t("Soon! Warsha is launching on Google Play and the App Store. Follow us on social media to hear first.", "قريب جدًا! ورشة نازلة على Google Play و App Store. تابعنا على السوشيال ميديا وهتعرف أول واحد.")],
    [t("What does a workshop need to register?", "الورشة محتاجة إيه عشان تسجّل؟"), t("Your center name, email, phone, address and a password. Our team reviews the details before your center goes live.", "اسم المركز والإيميل ورقم التليفون والعنوان وكلمة سر. فريقنا بيراجع البيانات قبل ما المركز يظهر للعملاء.")],
  ];
  return (
    <section className="sec" id="faq">
      <div className="w fq">
        <div className="rv">
          <div className="kick">{t("Good to know", "معلومات تهمك")}</div>
          <h2>{t("Quick ", "أسئلة ")}<em>{t("answers.", "شائعة.")}</em></h2>
        </div>
        <div className="rv" style={{ "--d": ".1s" }}>
          {items.map(([q, a], i) => (
            <details key={i} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
