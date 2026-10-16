// ✏️ Edit your real contact info, store links and API here.
export const CONTACT = {
  instagram: "warshaa.app",
  tiktok: "warsha3305",
  facebookId: "61593455504396",
};

export const STORE = {
  googlePlay: "https://play.google.com/store/apps/details?id=YOUR_APP_ID",
  appStore: "https://apps.apple.com/app/idYOUR_APP_ID",
};

// Calls go to "/api/v1/..." — vite.config.js (dev) and vercel.json (prod)
// forward them to http://warshaa.runasp.net. Override with VITE_API_URL if needed.
export const API_BASE = import.meta.env.VITE_API_URL || "/api/v1";

export const LINKS = {
  instagram: `https://www.instagram.com/${CONTACT.instagram}`,
  tiktok: `https://www.tiktok.com/@${CONTACT.tiktok}`,
  facebook: `https://www.facebook.com/profile.php?id=${CONTACT.facebookId}`,
};
