// Number / date helpers for the mockup, in English or Arabic.
export const makeFormat = (isAr) => {
  const locale = isAr ? "ar-EG" : "en-US";
  const T = (pair) => pair[isAr ? 1 : 0];
  const nf = (n, d = 0) => (+n).toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d });
  const dg = (s) => (isAr ? String(s).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]) : String(s));
  const egp = () => T(["EGP", "ج.م"]);
  const fdate = (d) => new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(d);
  const ymd = (d) => String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
  const duration = (m) => {
    const h = Math.floor(m / 60), mi = m % 60, p = [];
    if (isAr) {
      if (h === 1) p.push("ساعة");
      else if (h === 2) p.push("ساعتان");
      else if (h > 2) p.push(`${nf(h)} ${h <= 10 ? "ساعات" : "ساعة"}`);
      if (mi > 0) p.push(`${nf(mi)} دقيقة`);
      return p.join(" و ");
    }
    if (h > 0) p.push(`${h} ${h === 1 ? "hr" : "hrs"}`);
    if (mi > 0) p.push(`${mi} min`);
    return p.join(" ");
  };
  const price = (p) => `${nf(p[0])} – ${nf(p[1])} ${egp()}`;
  // "+12%" → "+١٢٪" in Arabic; render inside <bdi dir="ltr"> so the sign stays in front
  const num = (s) => (isAr ? dg(s).replace("%", "٪") : s);
  const greet = () => T(["Good morning", "صباح الخير"]);
  return { T, nf, dg, num, egp, fdate, ymd, duration, price, greet, locale };
};
