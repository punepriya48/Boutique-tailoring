import siteConfig from "../config/siteConfig.js";

/**
 * ============================================================
 *  LIVE GALLERY FROM GOOGLE SHEETS
 * ------------------------------------------------------------
 *  Full setup steps: see README.md → "Live gallery setup".
 *
 *  Expected sheet columns (any order, header names are matched
 *  case-insensitively, extra columns are ignored):
 *
 *    Category | Title | Image Link | Caption | Show
 *
 *  - Category: blouses / lehengas / dresses / other (typos and
 *    singular forms like "blouse" are forgiven — see
 *    normalizeCategory below).
 *  - Image Link: a Google Drive "Anyone with the link" share URL,
 *    pasted exactly as Drive gives it. Converted automatically.
 *  - Show: optional. Leave blank or "yes" to show the row. Typing
 *    "no" hides it without deleting the row.
 * ============================================================
 */

const CATEGORY_ALIASES = {
  blouse: "blouses",
  blouses: "blouses",
  lehenga: "lehengas",
  lehengas: "lehengas",
  "lehenga choli": "lehengas",
  dress: "dresses",
  dresses: "dresses",
  other: "other",
  others: "other",
  kurti: "other",
  kurtis: "other",
};

function normalizeCategory(raw) {
  const key = (raw || "").trim().toLowerCase();
  return CATEGORY_ALIASES[key] || "other";
}

/**
 * Converts a Google Drive share link (any common format) into a
 * URL that renders as an image, using Drive's thumbnail endpoint —
 * this works reliably even for larger images, unlike some other
 * Drive link formats which show a virus-scan warning page instead
 * of the image.
 */
export function driveShareLinkToImageUrl(shareLink, sizePx = 1000) {
  if (!shareLink) return "";
  const trimmed = shareLink.trim();

  // Already a direct/thumbnail link — leave it as is.
  if (trimmed.includes("drive.google.com/thumbnail") || trimmed.includes("drive.google.com/uc")) {
    return trimmed;
  }

  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/, // .../file/d/FILE_ID/view
    /[?&]id=([a-zA-Z0-9_-]+)/, // ...?id=FILE_ID
    /\/d\/([a-zA-Z0-9_-]+)/, // .../d/FILE_ID
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w${sizePx}`;
    }
  }

  // Not a recognisable Drive link — return as-is (could already be
  // a plain image URL from somewhere else, e.g. imgur).
  return trimmed;
}

/**
 * Minimal RFC-4180-ish CSV parser: handles quoted fields, commas
 * and quotes inside quoted fields ("" escapes a literal quote).
 * Google Sheets' CSV export always quotes string fields, so this
 * covers what we need without adding an extra dependency.
 */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  // Strip a leading UTF-8 BOM if present.
  const clean = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    const next = clean[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function rowsToObjects(rows) {
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  return rows.slice(1).map((row) => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = (row[i] || "").trim();
    });
    return obj;
  });
}

function buildSheetCsvUrl() {
  const { gallerySheetId, gallerySheetTabName } = siteConfig;
  if (!gallerySheetId) return null;
  const tab = encodeURIComponent(gallerySheetTabName || "Gallery");
  // gviz CSV export works off a sheet shared as "Anyone with the
  // link can view" — no "Publish to web" step required.
  return `https://docs.google.com/spreadsheets/d/${gallerySheetId}/gviz/tq?tqx=out:csv&sheet=${tab}&_=${Date.now()}`;
}

/**
 * Fetches and normalizes the live gallery. Returns an empty array
 * (never throws) if the sheet isn't configured, unreachable, or
 * empty — callers should fall back to the sample gallery in that
 * case (see Gallery.jsx).
 */
export async function fetchLiveGallery() {
  const url = buildSheetCsvUrl();
  if (!url) {
    console.info("[gallery] gallerySheetId is empty in siteConfig.js — showing sample photos.");
    return [];
  }

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load the gallery sheet (HTTP status ${response.status}). This usually means the Sheet ID is wrong, or the sheet isn't shared as "Anyone with the link".`);
  }

  const text = await response.text();

  // A private/misconfigured sheet returns an HTML sign-in or error
  // page instead of CSV, but often still with a 200 status — catch
  // that case explicitly instead of silently finding zero rows.
  const looksLikeHtml = text.trim().startsWith("<");
  if (looksLikeHtml) {
    throw new Error(
      `The gallery sheet returned a webpage instead of data — this almost always means the Sheet's "Share" setting isn't set to "Anyone with the link", or gallerySheetTabName ("${siteConfig.gallerySheetTabName}") doesn't exactly match the tab name in the Sheet.`
    );
  }

  const objects = rowsToObjects(parseCsv(text));
  if (objects.length === 0) {
    console.warn("[gallery] Sheet loaded but no rows were found — check the header row spelling and that rows have data below it.");
  }

  return objects
    .filter((row) => {
      const show = (row.show || "").trim().toLowerCase();
      const hasImage = Boolean(row["image link"] || row.image || row["image url"]);
      return show !== "no" && hasImage;
    })
    .map((row, index) => {
      const rawLink = row["image link"] || row.image || row["image url"] || "";
      return {
        id: `sheet-${index}`,
        category: normalizeCategory(row.category),
        title: row.title || "Stitching Photo",
        caption: row.caption || "",
        image: driveShareLinkToImageUrl(rawLink),
      };
    })
    .filter((item) => Boolean(item.image));
}
