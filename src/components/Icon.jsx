// Line icons used across the site (24×24, stroke = currentColor).
export const ICONS = {
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4",
  book: "M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4ZM5 17a3 3 0 0 1 3-3h11",
  bell: "M6 16v-5a6 6 0 0 1 12 0v5l2 2H4l2-2ZM10 21h4",
  cal: "M4 6h16v14H4ZM4 10h16M8 3v4M16 3v4",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2V3ZM9 8h6M9 12h6M9 16h3",
  drop: "M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11Z",
  temp: "M10 4a2 2 0 0 1 4 0v10a4 4 0 1 1-4 0V4ZM12 9v7",
  batt: "M3 8h16v10H3ZM21 11v4M6 13h4M8 11v4M13 13h3",
  engine: "M4 10h3l2-3h6v3h3l2 2v5h-2v2h-4l-2-2H9v-3H4v-4ZM2 12v4",
  tire: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z",
  alert: "M12 3l10 18H2L12 3ZM12 10v5M12 18h.01",
  coin: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM14.5 9h-4a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3h-4M12 7v2M12 15v2",
  fuel: "M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M4 10h10M14 8l4 3v7a1.5 1.5 0 0 0 3 0V8l-3-3",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6",
  menu: "M4 7h16M4 12h16M4 17h16",
  up: "M12 19V5M5 12l7-7 7 7",
  puzzle: "M4 7h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4V7Z",
  star: "M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z",
  tag: "M3 12V4h8l10 10-8 8L3 12ZM7.5 8h.01",
  car: "M5 17H3v-5l2-5h14l2 5v5h-2M5 12h14M7 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0M13 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  mobile: "M7 2h10v20H7ZM11 18h2",
  wrench: "M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9a4 4 0 0 1-2-2Z",
  arrow: "M7 17 17 7M8 7h9v9",
};

export default function Icon({ name, className = "si", ...rest }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <path d={ICONS[name]} />
    </svg>
  );
}

/** Brand marks for socials. */
export function SocialLogo({ kind }) {
  if (kind === "instagram")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
      </svg>
    );
  if (kind === "tiktok")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M16.6 3c.3 2.3 1.8 3.9 4 4.1v3.2a7.3 7.3 0 0 1-4-1.2v6.2a6 6 0 1 1-6-6c.3 0 .6 0 .9.1v3.3a2.7 2.7 0 1 0 1.9 2.6V3h3.2Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
    </svg>
  );
}
