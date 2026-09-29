/**
 * To add your mother's real photos:
 * 1. Drop the image files into src/assets/gallery/
 *    (jpg or png, ideally under 500KB each for fast loading).
 * 2. Import them below the same way the placeholders are imported.
 * 3. Add or edit an entry in the `galleryItems` array — set the
 *    `category` to one of: "blouses", "lehengas", "dresses", "other".
 * 4. You can freely remove the placeholder imports/entries once
 *    real photos are in place.
 */
import blouse1 from "../assets/gallery/blouse-1.svg";
import blouse2 from "../assets/gallery/blouse-2.svg";
import blouse3 from "../assets/gallery/blouse-3.svg";
import lehenga1 from "../assets/gallery/lehenga-1.svg";
import lehenga2 from "../assets/gallery/lehenga-2.svg";
import lehenga3 from "../assets/gallery/lehenga-3.svg";
import dress1 from "../assets/gallery/dress-1.svg";
import dress2 from "../assets/gallery/dress-2.svg";
import dress3 from "../assets/gallery/dress-3.svg";
import other1 from "../assets/gallery/other-1.svg";
import other2 from "../assets/gallery/other-2.svg";
import other3 from "../assets/gallery/other-3.svg";

export const categories = [
  { id: "all", label: "All" },
  { id: "blouses", label: "Blouses" },
  { id: "lehengas", label: "Lehengas" },
  { id: "dresses", label: "Dresses" },
  { id: "other", label: "Other" },
];

const galleryItems = [
  { id: "g1", category: "blouses", image: blouse1, title: "Blouse Design", caption: "Sample blouse work" },
  { id: "g2", category: "blouses", image: blouse2, title: "Designer Blouse", caption: "Sample blouse work" },
  { id: "g3", category: "blouses", image: blouse3, title: "Bridal Blouse", caption: "Sample blouse work" },
  { id: "g4", category: "lehengas", image: lehenga1, title: "Lehenga Choli", caption: "Sample lehenga work" },
  { id: "g5", category: "lehengas", image: lehenga2, title: "Bridal Lehenga", caption: "Sample lehenga work" },
  { id: "g6", category: "lehengas", image: lehenga3, title: "Festive Lehenga", caption: "Sample lehenga work" },
  { id: "g7", category: "dresses", image: dress1, title: "Party Dress", caption: "Sample dress work" },
  { id: "g8", category: "dresses", image: dress2, title: "Everyday Dress", caption: "Sample dress work" },
  { id: "g9", category: "dresses", image: dress3, title: "Occasion Dress", caption: "Sample dress work" },
  { id: "g10", category: "other", image: other1, title: "Kurti Design", caption: "Sample custom work" },
  { id: "g11", category: "other", image: other2, title: "Custom Ethnic Wear", caption: "Sample custom work" },
  { id: "g12", category: "other", image: other3, title: "Alteration Work", caption: "Sample custom work" },
];

export default galleryItems;
