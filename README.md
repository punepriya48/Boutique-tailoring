# Priya's Boutique & Tailoring — Website

A fast, mobile-first website for a home-based tailoring business, built
with React + Vite. Every WhatsApp button, call button, gallery filter,
lightbox and enquiry form works for real — there is no backend, no
database and no paid service involved anywhere.

---

## 1. Folder structure

```
priyas-boutique/
├── index.html              # Page shell + SEO meta tags
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── og-image.svg        # Social-share preview image
└── src/
    ├── main.jsx             # App entry point
    ├── App.jsx               # Composes every section in order
    ├── index.css             # Design tokens (colors, type, spacing) + base styles
    ├── config/
    │   └── siteConfig.js     # <-- THE ONE FILE for all business info
    ├── data/
    │   ├── services.js       # Service cards
    │   ├── gallery.js        # Gallery photos + categories
    │   ├── testimonials.js   # Placeholder reviews
    │   └── faq.js             # FAQ accordion content
    ├── assets/
    │   ├── hero.svg           # Hero illustration (placeholder)
    │   ├── about-photo.svg    # About photo space (placeholder)
    │   └── gallery/           # 12 placeholder gallery images
    ├── utils/
    │   └── whatsapp.js        # Builds wa.me links + enquiry messages
    └── components/
        ├── Header/            # Sticky nav + mobile menu
        ├── Hero/               # Home hero section
        ├── About/              # About section
        ├── Services/           # Service cards
        ├── Gallery/            # Filterable gallery
        ├── Lightbox/           # Click-to-enlarge photo viewer
        ├── WhyChooseUs/
        ├── HowItWorks/         # 4-step process
        ├── Testimonials/
        ├── FAQ/                # Accordion
        ├── Enquiry/            # Booking form → WhatsApp
        ├── Location/           # Address + directions + hours
        ├── Footer/
        └── WhatsAppFloat/      # Floating WhatsApp button
```

Every section is a self-contained folder with its own `.jsx` and
`.css` file, so you can find and edit any part of the site quickly.

---

## 2. Install dependencies

You need [Node.js](https://nodejs.org) (version 18 or newer) installed
on your computer. Then, inside the project folder, run:

```bash
npm install
```

## 3. Run the project locally

```bash
npm run dev
```

This starts a local server (usually at `http://localhost:5173`) and
opens the site with live-reload — any change you save appears in the
browser instantly.

---

## 4. How to change business information (name, phone, WhatsApp, etc.)

Open **`src/config/siteConfig.js`**. This is the single file that
controls the business name, tagline, phone number, WhatsApp number,
address, Instagram link, Google Maps link and business hours —
everywhere they appear on the site.

```js
const siteConfig = {
  businessName: "Priya's Boutique & Tailoring",
  phone: "+919876543210",
  whatsapp: "919876543210",
  instagram: "https://instagram.com/priyasboutique",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=...",
  // ...
};
```

### Change the WhatsApp number
Edit the `whatsapp` field — international format, digits only, no `+`
and no spaces (e.g. `919876543210` for an Indian number).

### Change the phone number
Edit `phone` (used for the `tel:` dial link — keep the `+` here) and
`phoneDisplay` (the human-readable version shown on screen).

### Change Instagram
Edit `instagram` (the full profile URL) and `instagramHandle` (the
`@handle` text shown in the footer).

### Change the address
Edit the `address` object, and update `googleMapsUrl` to a Google
Maps search link for the exact address — no API key needed, it's a
plain search URL.

### Change business hours
Edit the `businessHours` array — add, remove or edit rows freely.

---

## 5. How to add or change images

### Gallery photos
1. Add your image files (`.jpg` or `.png`, ideally under 500KB each)
   into `src/assets/gallery/`.
2. Open `src/data/gallery.js`, import your new image the same way the
   placeholders are imported, and add an entry to the `galleryItems`
   array with a `category` of `"blouses"`, `"lehengas"`, `"dresses"`
   or `"other"`.
3. Remove the placeholder entries once you have enough real photos.

### Hero and About photos
Replace `src/assets/hero.svg` and `src/assets/about-photo.svg` with
your own image files, then update the two `import` lines in
`Hero.jsx` and `About.jsx` to point at the new filenames.

### Testimonials
Open `src/data/testimonials.js` and replace the placeholder text and
names with real customer feedback. Remove the `isDemo: true` line
from each entry once it's a genuine review — that's what makes the
"Demo review" tag disappear.

---

## 6. Build the production version

```bash
npm run build
```

This creates an optimized `dist/` folder ready to be uploaded to any
web host. You can preview the production build locally with:

```bash
npm run preview
```

---

## 7. Upload to GitHub

1. Create a new repository on [github.com](https://github.com) (keep
   it empty — no README/license).
2. Inside the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

---

## 8. Deploy for free with Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (you can sign in
   directly with your GitHub account).
2. Click **Add New → Project**, then select the GitHub repository you
   just pushed.
3. Vercel auto-detects Vite — leave the default build settings
   (`npm run build`, output folder `dist`) and click **Deploy**.
4. In a minute or two, you'll get a free live URL like
   `priyas-boutique.vercel.app`.

Every time you push a change to GitHub, Vercel automatically
redeploys the site.

---

## 9. Connect a custom domain later

1. Buy a domain from any registrar (GoDaddy, Namecheap, Google
   Domains, etc.).
2. In your Vercel project, go to **Settings → Domains** and add your
   domain.
3. Vercel will show you DNS records (usually an `A` record or
   `CNAME`) — add those in your domain registrar's DNS settings.
4. Within a few hours the custom domain will point to your website.

---

## 10. Using the website in real life

- **Share the link everywhere**: Instagram bio, WhatsApp Business
  profile, visiting cards, and with customers directly.
- **Enquiries arrive on WhatsApp**: every "Enquire Now", "Book Your
  Stitching" and the floating WhatsApp button open a WhatsApp chat
  with a ready-made message — no app, dashboard or login required to
  receive them.
- **Keep the gallery fresh**: adding a few new photos after each
  finished order (with the customer's permission) keeps the
  portfolio convincing over time.
- **Update business hours during festivals or breaks** by editing
  `siteConfig.js` and redeploying (push to GitHub — Vercel updates
  automatically).
- **Collect real reviews**: once a few customers are happy to share a
  short note, replace the placeholder testimonials with their real
  words.

---

## Notes on placeholder content

- The gallery, hero and about images are simple illustrated
  placeholders — swap them for real photos whenever they're ready.
- The testimonials are clearly labelled demo content and should be
  replaced with genuine customer reviews.
- No years-of-experience, awards or claims have been invented
  anywhere on the site — the About section uses only the description
  provided, ready for it to be personalised further.
