/**
 * ============================================================
 *  SITE CONFIGURATION
 * ------------------------------------------------------------
 *  This is the ONLY file you need to edit to update the
 *  business information shown across the entire website:
 *  name, tagline, phone, WhatsApp, address, Instagram,
 *  Google Maps link and business hours.
 *
 *  After editing, save the file — the site updates everywhere
 *  this information is used (header, hero, footer, enquiry
 *  form, floating WhatsApp button, location section, etc.)
 * ============================================================
 */

const siteConfig = {
  // Shown in the header, hero, footer and browser tab.
  businessName: "Kalpana's Boutique & Tailoring",

  // Short name used in tight spaces (mobile header, favicon area).
  shortName: "Kalpana's Boutique",

  tagline: "Perfect Stitching. Perfect Fit. Made With Love.",

  shortDescription:
    "Custom blouse, dress and lehenga stitching designed to match your style, measurements and occasion.",

  // Phone number used for the "Call Now" button (tel: link).
  // Format: include country code, no spaces, e.g. +919876543210
  phone: "+917767030645",
  phoneDisplay: "+91 7776813643",

  // WhatsApp number in international format WITHOUT the "+" sign,
  // e.g. 919876543210 for an Indian number.
  whatsapp: "917767030645",

  // Default message pre-filled when someone taps the floating
  // WhatsApp button (no form fields attached).
  whatsappDefaultMessage:
    "Hello, I would like to enquire about your tailoring services.",

  address: {
    line1: "A wing 902 9th floor",
    line2: "The Pavilion optima reality Raghav nagar ambegaon",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411046",
  },

  // Used by the "Get Directions" button. Replace the query text
  // with your exact address once it's finalised — no Google Maps
  // API key is required, this simply opens Google Maps in a new tab.
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Priya%27s+Boutique+%26+Tailoring+Pune",

  

  businessHours: [
    { days: "Monday – Saturday", time: "10:00 AM – 9:00 PM" },
    { days: "Sunday", time: "Closed (by appointment only)" },
  ],

  gallerySheetId: "1FNlkx9zl2V77fyOu5S9EoXwz2vmj_D6EF-sKMGuW88g",
  gallerySheetTabName: "Gallery",

  // Footer copyright line — the year updates on its own.
  founderName: "",
};

export default siteConfig;
