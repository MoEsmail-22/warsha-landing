import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const LangContext = createContext(null);

/** Wraps the app; keeps <html lang/dir> in sync and gives every component t(en, ar). */
export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("warsha-lang") || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("warsha-lang", lang);
    } catch {
      /* private mode — ignore */
    }
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "en" ? "ar" : "en")), []);

  const value = useMemo(() => {
    const isAr = lang === "ar";
    return {
      lang,
      isAr,
      setLang,
      toggle,
      /** t("English", "عربي") or t(["English", "عربي"]) */
      t: (en, ar) => (Array.isArray(en) ? en[isAr ? 1 : 0] : isAr ? ar : en),
      locale: isAr ? "ar-EG" : "en-US",
    };
  }, [lang, toggle]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
