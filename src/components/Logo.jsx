import logo from "../assets/logo.png";

export default function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Warsha home">
      <span className="lm">
        <img className="wlogo" src={logo} alt="" width="121" height="84" />
      </span>
      warsha<span style={{ color: "var(--or)" }}>.</span>
    </a>
  );
}
