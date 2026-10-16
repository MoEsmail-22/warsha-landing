import { useState } from "react";
import { useLang } from "../i18n/LangContext.jsx";
import { API_BASE } from "../config.js";

const EMPTY = { name: "", email: "", phone: "", address: "", password: "", confirm: "" };

async function readError(res) {
  try {
    const d = await res.json();
    const first = d.errors && Object.values(d.errors).flat()[0];
    return d.message || first || d.title || "";
  } catch {
    return "";
  }
}

/** Join form → POST /Auth/workshop/create. The new center then waits for admin approval. */
export default function Centers() {
  const { t } = useLang();
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null); // { kind: "ok" | "err", text: [en, ar] }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const name = form.name.trim();

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setMsg({ kind: "err", text: ["The two passwords don't match.", "كلمتين السر مش زي بعض."] });
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`${API_BASE}/Auth/workshop/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email: form.email.trim(),
          phone: form.phone.replace(/\s/g, ""),
          addressEn: form.address.trim(),
          addressAr: form.address.trim(),
          password: form.password,
        }),
      });
      const data = res.ok ? await res.json().catch(() => ({})) : null;
      if (!res.ok || data?.isSuccess === false) {
        const m = data?.message || (res.ok ? "" : await readError(res));
        return setMsg({ kind: "err", text: m ? [m, m] : ["Registration failed. Please check your details and try again.", "التسجيل ما نجحش. راجع البيانات وجرب تاني."] });
      }
      setForm(EMPTY);
      setMsg({ kind: "ok", text: ["Your center is registered! Our team will review it and contact you soon.", "تم تسجيل مركزك! فريقنا هيراجعه ويتواصل معاك قريب."] });
    } catch {
      setMsg({ kind: "err", text: ["We couldn't reach the server. Check your connection and try again.", "مش قادرين نوصل للسيرفر. اتأكد من النت وجرب تاني."] });
    } finally {
      setBusy(false);
    }
  };

  const perks = [
    t("Showcase your services and specialties", "اعرض خدماتك وتخصصاتك"),
    t("Help customers find your location", "سهّل على العملاء الوصول لمركزك"),
    t("Share your brands and working hours", "وضّح الماركات ومواعيد العمل"),
    t("Start with a simple form", "ابدأ بطلب بسيط"),
  ];

  const Field = ({ id, label, full, ...input }) => (
    <div className={`f${full ? " full" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...input} />
    </div>
  );

  return (
    <section className="sec ctr" id="centers">
      <div className="w cg">
        <div className="rv sl">
          <div className="kick">{t("For service centers", "لمراكز الصيانة")}</div>
          <h2>{t("Good work deserves to be ", "شغلك المميز يستاهل إن الناس ")}<em>{t("discovered.", "توصله.")}</em></h2>
          <p className="lead">{t("Join the Warsha network and introduce your business to more car owners. No commitment at this stage.", "انضم لشبكة ورشة وعرّف عملاء أكتر بمركزك، بدون أي التزام في المرحلة دي.")}</p>
          <div className="perks">{perks.map((p) => <div key={p}><b>✓</b> {p}</div>)}</div>
          <div className="pl">{t("Live preview — how drivers will see you", "معاينة حية — كده هتظهر للعملاء")}</div>
          <div className="pv">
            <span className="av">{(name || "W").charAt(0).toUpperCase()}</span>
            <div style={{ flex: 1 }}>
              <strong>{name || t("Your center name", "اسم مركزك")}</strong>
              <small>{form.address.trim() || t("Your address", "عنوانك")}</small>
            </div>
            <span className="pill">{t("New on Warsha", "جديد على ورشة")}</span>
          </div>
        </div>

        <form className="form rv sr" style={{ "--d": ".1s" }} onSubmit={submit}>
          <h3>{t("Let's meet your center.", "خلينا نتعرف على مركزك.")}</h3>
          <div className="fg">
            {Field({ id: "cn", full: true, label: t("Center name *", "اسم المركز *"), required: true, maxLength: 100, autoComplete: "organization", placeholder: t("Apex Auto Care", "مثال: مركز الصيانة"), value: form.name, onChange: set("name") })}
            {Field({ id: "em", label: t("Email *", "الإيميل *"), type: "email", required: true, autoComplete: "email", placeholder: "you@center.com", value: form.email, onChange: set("email") })}
            {Field({ id: "ph", label: t("Phone *", "رقم التليفون *"), type: "tel", required: true, inputMode: "tel", autoComplete: "tel", placeholder: "01X XXXX XXXX", value: form.phone, onChange: set("phone") })}
            {Field({ id: "ad", full: true, label: t("Address *", "العنوان *"), required: true, maxLength: 200, autoComplete: "street-address", placeholder: t("Street, area, city", "الشارع، المنطقة، المدينة"), value: form.address, onChange: set("address") })}
            {Field({ id: "pw", label: t("Password *", "كلمة السر *"), type: "password", required: true, minLength: 6, autoComplete: "new-password", placeholder: t("At least 6 characters", "6 حروف على الأقل"), value: form.password, onChange: set("password") })}
            {Field({ id: "pw2", label: t("Confirm password *", "تأكيد كلمة السر *"), type: "password", required: true, minLength: 6, autoComplete: "new-password", placeholder: t("Repeat the password", "اكتبها تاني"), value: form.confirm, onChange: set("confirm") })}
          </div>
          <button className="b bp" type="submit" disabled={busy}>
            {busy ? t("Registering…", "جاري التسجيل…") : t("Register your center ↗", "سجّل مركزك ↖")}
          </button>
          <p className={`fmsg${msg ? " " + msg.kind : ""}`} role="status" aria-live="polite">{msg ? t(msg.text) : ""}</p>
          <p className="note">{t("After you register, our team reviews your center before it goes live for customers.", "بعد التسجيل، فريقنا بيراجع بيانات مركزك قبل ما يظهر للعملاء.")}</p>
        </form>
      </div>
    </section>
  );
}
