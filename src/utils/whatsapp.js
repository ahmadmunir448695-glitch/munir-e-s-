import { store } from "../data/store.js";

// A wa.me link with a pre-filled message.
export function whatsappLink(message = "") {
  const base = `https://wa.me/${store.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const generalMessage = () => `Assalam o Alaikum, I would like to ask about electrical products at ${store.name}.`;

// "Assalam o Alaikum, I am interested in [PRODUCT NAME]. Please share price and availability."
export function productMessage(productName, { variant, quantity } = {}) {
  let name = productName;
  if (variant) name += ` (${variant})`;
  const qty = quantity && quantity > 1 ? ` Quantity: ${quantity}.` : "";
  return `Assalam o Alaikum, I am interested in ${name}.${qty} Please share price and availability.`;
}

export const formatPrice = (n) => `Rs ${Number(n).toLocaleString("en-PK")}`;
