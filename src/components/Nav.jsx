import { useState } from "react";
import { useLang } from "../i18n/LangContext.jsx";
import Logo from "./Logo.jsx";
import Icon from "./Icon.jsx";

export default function Nav() {
  const { t, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const links = [
    ["#features", t("Why Warsha", "ليه ورشة")],
    ["#tools", t("Try it", "جرّبها")],
    ["#workshops", t("For workshops", "للورش"), "nw"],
    ["#contact", t("Contact", "تواصل")],
  ];

  return (
    <header className="nav">
      <div className="w">
        <Logo />
        <nav className="links" aria-label="Main">
          {links.map(([href, label, cls]) => (
            <a key={href} href={href} className={cls}>
              {label}
            </a>
          ))}
        </nav>
        <div className="na">
          <button className="b bs" type="button" onClick={toggle}>
            {t("عربي", "English")}
          </button>
          <button
            className="b bs menu"
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name="menu" />
          </button>
          <a className="b bp bs mag sheen" href="#contact">
            {t("Join Warsha ↗", "انضم لورشة ↖")}
          </a>
        </div>
      </div>
      {open && (
        <nav className="drawer" aria-label="Mobile">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
