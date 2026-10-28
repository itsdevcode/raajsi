export interface HeroSlide {
  id: string;
  title: string;
  headline: string;
  emphasis: string;
  description: string;
  cta: { label: string; href: string };
  image: { src: string; alt: string; position: string };
  caption: string;
}

export const heroSlides: readonly HeroSlide[] = [
  {
    id: "heritage",
    title: "The Heritage Collection",
    headline: "Some things are made.",
    emphasis: "Others, inherited.",
    description:
      "Discover objects of quiet beauty, shaped by Indian heritage and the art of the human hand.",
    cta: { label: "Explore Collections", href: "#collections" },
    image: {
      src: "/images/campaign.webp",
      alt: "Brass urli filled with ivory flowers, a copper vase and a maroon textile in a sunlit palace alcove",
      position: "57% center",
    },
    caption: "A slower kind of luxury.",
  },
  {
    id: "craftsmanship",
    title: "The Art of Craftsmanship",
    headline: "Crafted by hands.",
    emphasis: "Treasured for generations.",
    description:
      "An ode to timeless Indian craftsmanship, thoughtful details, and enduring beauty.",
    cta: { label: "Discover Our Story", href: "#our-story" },
    image: {
      src: "/images/palace.webp",
      alt: "Sunlit ochre walls, carved arches and layered courtyards of Amer Fort in Jaipur",
      position: "center 38%",
    },
    caption: "Beauty in every considered detail.",
  },
  {
    id: "elegance",
    title: "Timeless Indian Elegance",
    headline: "Where tradition finds",
    emphasis: "a new expression.",
    description:
      "Bring home the warmth of Indian artistry, heritage-inspired design, and considered luxury.",
    cta: { label: "Explore the Edit", href: "#favourites" },
    image: {
      src: "/images/textile.webp",
      alt: "Rich maroon fabric with intricate gold floral patterns and the warm edge of an antique brass bowl",
      position: "center center",
    },
    caption: "Tradition, woven into today.",
  },
];
