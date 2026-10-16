import Logo from "./Logo.jsx";
import { SOCIALS } from "./Contact.jsx";
import { SocialLogo } from "./Icon.jsx";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="w">
        <Logo />
        <nav aria-label="Social">
          {SOCIALS.map((s) => (
            <a key={s.kind} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
              <SocialLogo kind={s.kind} />
            </a>
          ))}
        </nav>
        <span dir="ltr" className="cpy">© {new Date().getFullYear()} Warsha</span>
      </div>
    </footer>
  );
}
