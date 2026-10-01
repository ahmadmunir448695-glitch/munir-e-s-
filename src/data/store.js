// Store details used across the whole website. Edit them here, in one place.
export const store = {
  name: "Munir Electric Store",
  shortName: "Munir Electric",
  tagline: "Quality Electrical Products",

  // Phone shown on the site, and the same number in international format for WhatsApp/calls.
  // 0308-3380368 → drop the leading 0, add Pakistan's code 92 → 923083380368
  phoneDisplay: "0308-3380368",
  phoneTel: "+923083380368",
  whatsapp: "923083380368",

  // Placeholders: replace with the real details.
  address: "Shop address goes here, Market name, City",
  mapUrl: "", // e.g. a Google Maps link to the shop; leave empty to hide the "Open in Maps" button
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 9:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
};
