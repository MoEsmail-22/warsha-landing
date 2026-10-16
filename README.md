# Warsha — website (React + Vite)

The Warsha promo / workshops site as a React project, in English and Arabic.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production files in dist/
```

## Where to edit things

| What | File |
| --- | --- |
| Instagram / TikTok / Facebook, store links, API address | `src/config.js` |
| Services in the scrolling strip | `SERVICES` in `src/App.jsx` |
| Sample data in the dashboard preview | `src/data/dashboard.js` |
| All styles | `src/styles/global.css` |
| Logo, app screenshot | `src/assets/` |

Every text is written as `t("English", "عربي")` inside its component, so both languages sit side by side.

## Structure

```
src/
  App.jsx                    page order
  i18n/LangContext.jsx       language switch (sets <html dir/lang>, remembers choice)
  hooks/useSiteEffects.js    reveal-on-scroll, progress bar, parallax, card tilt
  components/
    Nav, Hero, ServicesTicker, RoadStrip, Features, Tools,
    Workshops (+ dashboard/DashboardMock), Centers, FAQ, Contact, Footer, BackToTop
```

## API (service-center sign-up)

The form posts to `/api/v1/Auth/workshop/create`.
The Warsha API runs on plain `http`, which browsers block from an `https` site, so:

- **Dev:** `vite.config.js` forwards `/api` to `http://warshaa.runasp.net`.
- **Vercel:** `vercel.json` does the same rewrite.
- **Other hosts:** add the same `/api/*` rewrite, or set `VITE_API_URL` in a `.env` file.
