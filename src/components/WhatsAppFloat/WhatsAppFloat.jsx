import { FaWhatsapp } from "react-icons/fa";
import siteConfig from "../../config/siteConfig.js";
import { buildWhatsAppLink } from "../../utils/whatsapp.js";
import "./WhatsAppFloat.css";

function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink(siteConfig.whatsappDefaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}

export default WhatsAppFloat;
