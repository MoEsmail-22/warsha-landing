import { useLang } from "./i18n/LangContext.jsx";
import useSiteEffects from "./hooks/useSiteEffects.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import ServicesTicker from "./components/ServicesTicker.jsx";
import RoadStrip from "./components/RoadStrip.jsx";
import Features from "./components/Features.jsx";
import Tools from "./components/Tools.jsx";
import Workshops from "./components/Workshops.jsx";
import Centers from "./components/Centers.jsx";
import FAQ from "./components/FAQ.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";

// ✏️ The services shown in the scrolling strip under the hero.
const SERVICES = [
  { en: "Oil change", ar: "تغيير زيت" },
  { en: "Brakes", ar: "فرامل" },
  { en: "Tires", ar: "إطارات" },
  { en: "Battery", ar: "بطارية" },
  { en: "A/C", ar: "تكييف" },
  { en: "Diagnostics", ar: "كمبيوتر" },
  { en: "Bodywork", ar: "سمكرة ودوكو" },
  { en: "Suspension", ar: "عفشة" },
];

export default function App() {
  const { lang } = useLang();
  useSiteEffects();

  return (
    <>
      <div className="sp" aria-hidden="true" />
      <Nav />
      <main id="top">
        <Hero />
        <ServicesTicker items={SERVICES} lang={lang} />
        <RoadStrip />
        <Features />
        <Tools />
        <Workshops />
        <Centers />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
