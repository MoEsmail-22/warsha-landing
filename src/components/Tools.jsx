import { useState } from "react";
import { useLang } from "../i18n/LangContext.jsx";
import Icon from "./Icon.jsx";
import Chips from "./Chips.jsx";

const VERDICT = {
  stop: ["Stop now", "وقّف فورًا"],
  soon: ["Visit a center soon", "روح مركز قريب"],
  ok: ["Minor — keep an eye on it", "بسيطة — راقبها"],
};

const LIGHTS = [
  { icon: "drop", name: ["Oil pressure", "ضغط الزيت"], v: "stop", tip: ["Pull over safely and switch the engine off. Driving on can wreck it.", "ركّن بأمان وطفّي الموتور. الاستمرار ممكن يبوّظه."] },
  { icon: "temp", name: ["Engine temperature", "حرارة الموتور"], v: "stop", tip: ["Pull over, switch off and let it cool. Never open a hot radiator cap.", "ركّن وطفّي واستنى يبرد. متفتحش غطا الردياتير وهو سخن."] },
  { icon: "batt", name: ["Battery / charging", "البطارية / الشحن"], v: "soon", tip: ["The charging system may be failing. Turn off A/C and radio, and head to a center soon.", "نظام الشحن ممكن يكون بايظ. اقفل التكييف والراديو وروح مركز قريب."] },
  { icon: "engine", name: ["Check engine", "لمبة الموتور"], v: "soon", tip: ["Steady: get it scanned this week. Flashing: stop and call for help.", "ثابتة: افحصها الأسبوع ده. بتومض: وقّف واطلب مساعدة."] },
  { icon: "tire", name: ["Tire pressure", "ضغط الإطارات"], v: "ok", tip: ["Check pressure at the next stop. Low tires cut grip and waste fuel.", "افحص الضغط في أقرب محطة. الإطار الواطي بيقلل الثبات ويصرف بنزين."] },
];

function LightDecoder() {
  const { t } = useLang();
  const [cur, setCur] = useState(0);
  const x = LIGHTS[cur];
  return (
    <div className="card rv sl">
      <h3>{t("Dashboard light decoder", "فك شفرة لمبات التابلوه")}</h3>
      <p className="hint">{t("Tap a light and see what to do.", "اضغط على لمبة وشوف تعمل إيه.")}</p>
      <div className="lights">
        {LIGHTS.map((l, i) => (
          <button key={l.icon} className="l" type="button" aria-pressed={i === cur} aria-label={t(l.name)} onClick={() => setCur(i)}>
            <Icon name={l.icon} />
          </button>
        ))}
      </div>
      {/* key re-mounts the box so its fade-in replays on every pick */}
      <div className="res" key={cur}>
        <span className={`vd ${x.v}`}>{t(VERDICT[x.v])}</span>
        <h4>{t(x.name)}</h4>
        <p>{t(x.tip)}</p>
      </div>
      <p className="hint" style={{ marginTop: 12 }}>
        {t("General guidance. Always check your owner's manual.", "إرشاد عام. راجع كتيب عربيتك دايمًا.")}
      </p>
    </div>
  );
}

function ServiceMeter() {
  const { t, locale } = useLang();
  const [km, setKm] = useState(3000);
  const s =
    km < 4000 ? ["ok", "var(--gr)", ["You're good", "إنت تمام"]]
    : km < 8000 ? ["soon", "var(--or)", ["Plan a service soon", "جهّز لصيانة قريبة"]]
    : ["stop", "var(--rd)", ["Overdue — book now", "متأخر — احجز دلوقتي"]];
  return (
    <div className="card rv sr" style={{ "--d": ".1s" }}>
      <h3>{t("Service-o-meter", "عدّاد الصيانة")}</h3>
      <p className="hint">{t("How many km since your last oil change?", "كام كم مشيت من آخر تغيير زيت؟")}</p>
      <div className="gauge" style={{ "--p": Math.max(km / 100, 2), "--c": s[1] }}>
        <div>
          {km.toLocaleString(locale)}
          <small>{t("km", "كم")}</small>
        </div>
      </div>
      <input type="range" min="0" max="10000" step="100" value={km} onChange={(e) => setKm(+e.target.value)} aria-label="km" />
      <div className="mvd"><span className={`vd ${s[0]}`}>{t(s[2])}</span></div>
    </div>
  );
}

export default function Tools() {
  const { t } = useLang();
  return (
    <section className="sec tools" id="tools">
      <div className="w">
        <div className="kick rv">{t("Try it now", "جرّبها دلوقتي")}</div>
        <h2 className="rv" style={{ "--d": ".08s" }}>
          {t("Little tools for a ", "أدوات صغيرة تخليك ")}<em>{t("smarter driver.", "سواق أذكى.")}</em>
        </h2>
        <div className="tg">
          <LightDecoder />
          <ServiceMeter />
        </div>
        <Chips
          label={t("Coming next", "جاي قريب")}
          items={[
            { icon: "alert", label: t("Roadside SOS", "مساعدة على الطريق") },
            { icon: "coin", label: t("Price estimates", "تقدير الأسعار") },
            { icon: "fuel", label: t("Fuel log", "سجل البنزين") },
            { icon: "users", label: t("Family garage", "جراج العيلة") },
          ]}
        />
      </div>
    </section>
  );
}
