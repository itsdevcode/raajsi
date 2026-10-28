// Editorial previews only. The complete commerce catalog belongs to Milestone 2.
export const collections = [
  {
    id: "living",
    number: "01",
    title: "A home with a soul",
    category: "Heritage living",
    description: "Objects that turn everyday spaces into personal sanctuaries.",
    image: "/images/interior.webp",
    alt: "Warm living room with natural wood, woven textures and thoughtful objects",
    className: "collection-living",
  },
  {
    id: "brass",
    number: "02",
    title: "The warmth of brass",
    category: "Brass & copper",
    description: "Luminous finishes. Beautifully imperfect details.",
    image: "/images/campaign.webp",
    alt: "Antique brass bowl and copper vase in a sandstone alcove",
    className: "collection-brass",
  },
  {
    id: "textiles",
    number: "03",
    title: "Stories in every thread",
    category: "Textiles & keepsakes",
    description: "A considered celebration of pattern, texture and colour.",
    image: "/images/textile.webp",
    alt: "Maroon block-printed textile beside a brass lamp",
    className: "collection-textiles",
  },
];
export const highlights = [
  {
    name: "Gulab Brass Urli",
    craft: "The brass edit",
    price: 4850,
    image: "/images/urli.webp",
    alt: "Brass urli styled with floating ivory flowers",
  },
  {
    name: "Mehr Copper Vase",
    craft: "Objects for living",
    price: 3200,
    image: "/images/vase.webp",
    alt: "Hammered copper vase with delicate branches",
  },
  {
    name: "Gulnaar Printed Runner",
    craft: "The textile edit",
    price: 2400,
    image: "/images/textile.webp",
    alt: "Rich maroon patterned table textile",
  },
  {
    name: "Sandhya Brass Diya",
    craft: "Everyday rituals",
    price: 1650,
    image: "/images/diya.webp",
    alt: "Small sculptural brass oil lamp on sandstone",
  },
];
export const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
