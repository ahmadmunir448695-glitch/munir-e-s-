// Product categories. `slug` is used in links (/products?category=gm-cable); `image` is a picture in public/images/.
export const categories = [
  {
    slug: "gm-cable",
    name: "GM Cable",
    short: "Copper wiring for homes, shops & industry",
    description: "Copper house-wiring cables in all common sizes, from 1.0 mm² to 6 mm², in full coils for new wiring and renovation.",
    image: "/images/products/cable-red.svg",
  },
  {
    slug: "indus-fans",
    name: "Indus Fans",
    short: "Ceiling, bracket & exhaust fans",
    description: "Ceiling fans for every room, bracket fans for shops and kitchens, and exhaust fans for fresh air.",
    image: "/images/products/fan-ceiling-brown.svg",
  },
  {
    slug: "pak-light-led",
    name: "Pak Light LED Bulbs",
    short: "Bright, energy-saving LED bulbs",
    description: "Energy-saving LED bulbs from 7W to 20W, in cool white and warm white, with standard E27 and B22 bases.",
    image: "/images/products/bulb-cool.svg",
  },
  {
    slug: "pak-light-smd",
    name: "Pak Light SMD Lights",
    short: "Slim ceiling panel lights",
    description: "Slim round and square SMD panel lights for false ceilings, offices, shops and modern homes.",
    image: "/images/products/smd-round.svg",
  },
  {
    slug: "opal-switch-boards",
    name: "Opal Switch Boards",
    short: "Switches, sockets & combinations",
    description: "Modern switch plates from 1-gang to 4-gang, plus switch and socket combinations for every room.",
    image: "/images/products/switch-2-socket.svg",
  },
  {
    slug: "electrical-accessories",
    name: "Electrical Accessories",
    short: "Breakers, extensions, tools & more",
    description: "Circuit breakers, extension boards, testers, insulation tape, holders and everyday wiring accessories.",
    image: "/images/products/acc-mcb.svg",
  },
];

export const categoryBySlug = (slug) => categories.find((c) => c.slug === slug);
