import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { Lotus, Rangoli } from "@/components/patterns/ornaments";
import { Newsletter } from "@/components/home/newsletter";
import { HeritageSkyline } from "@/components/patterns/heritage-skyline";

const groups = [
  {
    title: "Quick Links",
    links: [
      ["Home", "/#top"],
      ["Shop Collections", "/#collections"],
      ["About Us", "/#our-story"],
    ],
  },
  {
    title: "Discover Raajsi",
    links: [
      ["Our Favourites", "/#favourites"],
      ["The Festive Edit", "/#campaign"],
      ["The Art of Making", "/#craft"],
    ],
  },
  {
    title: "Our World",
    links: [
      ["Our Story", "/#our-story"],
      ["Indian Craft", "/#craft"],
      ["Letters from Raajsi", "/#newsletter"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="heritage-footer">
      <div className="heritage-footer-paper">
        <div className="heritage-footer-content">
          <div className="heritage-footer-top">
            <div className="heritage-footer-brand">
              <Link
                href="/"
                className="heritage-footer-logo"
                aria-label="Raajsi home"
              >
                <span className="heritage-footer-seal">
                  <Rangoli />
                  <Lotus />
                </span>
                <span>raajsi</span>
              </Link>
              <p>
                Where tradition meets thoughtful living. Discover objects,
                textiles and timeless details that celebrate the beauty of
                Indian craft.
              </p>
            </div>
            <Newsletter />
          </div>
          <div className="heritage-footer-links">
            {groups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2>{group.title}</h2>
                {group.links.map(([label, href]) => (
                  <Link href={href} key={label}>
                    {label}
                  </Link>
                ))}
              </nav>
            ))}
            <div className="heritage-footer-connect">
              <h2>Connect With Us</h2>
              <p>A little craft. A little inspiration.</p>
              <Link href="/#newsletter">Stay in touch with Raajsi</Link>
              <div
                className="heritage-footer-socials"
                aria-label="Share Raajsi"
              >
                <a
                  href="https://pinterest.com/pin/create/button/?description=RAAJSI%20%E2%80%94%20The%20Art%20of%20Indian%20Elegance"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share inspiration on Pinterest"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2a10 10 0 0 0-3.64 19.31c-.03-.79 0-1.74.2-2.6l1.29-5.45s-.32-.64-.32-1.58c0-1.48.86-2.59 1.93-2.59.91 0 1.35.68 1.35 1.49 0 .91-.58 2.28-.88 3.55-.25 1.06.53 1.92 1.58 1.92 1.9 0 3.36-2 3.36-4.9 0-2.56-1.84-4.35-4.46-4.35-3.04 0-4.83 2.28-4.83 4.64 0 .92.35 1.9.8 2.44.09.11.1.2.08.31l-.3 1.22c-.04.2-.16.24-.36.15-1.34-.62-2.18-2.57-2.18-4.14 0-3.37 2.45-6.47 7.07-6.47 3.71 0 6.59 2.65 6.59 6.2 0 3.7-2.33 6.68-5.56 6.68-1.09 0-2.11-.57-2.46-1.24l-.67 2.54c-.24.93-.91 2.09-1.35 2.8A10 10 0 1 0 12 2Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Explore Instagram"
                >
                  <Instagram size={19} strokeWidth={2.4} />
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={19} fill="currentColor" strokeWidth={0} />
                </a>
              </div>
            </div>
          </div>
          <div className="heritage-footer-copyright">
            © {new Date().getFullYear()} RAAJSI. All Rights Reserved.
          </div>
        </div>
        <HeritageSkyline />
      </div>
    </footer>
  );
}
