import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Lotus, PalaceLine } from "@/components/patterns/ornaments";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Lotus />
          <Link className="wordmark" href="/">
            RAAJSI
          </Link>
          <p>The Art of Indian Elegance</p>
          <small>
            Rooted in heritage.
            <br />
            Made for the way we live today.
          </small>
        </div>
        <nav aria-label="Explore">
          <p className="eyebrow">EXPLORE</p>
          <Link href="/#collections">The collections</Link>
          <Link href="/#favourites">The favourites</Link>
          <Link href="/#campaign">The festive edit</Link>
        </nav>
        <nav aria-label="About Raajsi">
          <p className="eyebrow">OUR WORLD</p>
          <Link href="/#our-story">Our story</Link>
          <Link href="/#craft">The art of making</Link>
          <Link href="/#newsletter">
            Letters from Raajsi <ArrowUpRight size={13} />
          </Link>
        </nav>
        <div className="footer-note">
          <p className="eyebrow">A THOUGHTFUL BEGINNING</p>
          <p>
            A demonstration storefront celebrating Indian design. Products,
            prices and reviews are illustrative. Shopping is coming soon.
          </p>
          <Link href="/#top" className="text-link">
            Back to the beginning ↑
          </Link>
        </div>
      </div>
      <PalaceLine className="footer-palace" />
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} RAAJSI · A demonstration experience
        </span>
        <span>
          Designed with a love for India <span aria-hidden="true">✧</span>
        </span>
      </div>
    </footer>
  );
}
