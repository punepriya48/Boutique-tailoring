import siteConfig from "../config/siteConfig.js";

/**
 * Builds a wa.me link that opens WhatsApp (mobile app or WhatsApp Web
 * on desktop) with a pre-filled message. No API key or paid service
 * is used — this is a plain WhatsApp deep link.
 */
export function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encoded}`;
}

export function buildTelLink() {
  return `tel:${siteConfig.phone}`;
}

/**
 * Formats the enquiry form fields into the WhatsApp message shown
 * to the tailor, in a clean, readable layout.
 */
export function buildEnquiryMessage({ name, phone, service, date, message }) {
  const lines = [
    "Hello, I would like to enquire about your tailoring services.",
    "",
    `Name: ${name || "-"}`,
    `Phone: ${phone || "-"}`,
    `Service: ${service || "-"}`,
    `Preferred Date: ${date || "-"}`,
    `Message: ${message || "-"}`,
  ];
  return lines.join("\n");
}

export function buildServiceEnquiryMessage(serviceName) {
  return `Hello, I would like to enquire about ${serviceName}. Could you please share more details?`;
}
