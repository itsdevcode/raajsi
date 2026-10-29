import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Flower2,
  Gem,
  Hand,
  Star,
} from "lucide-react";
import { Divider, Lotus } from "@/components/patterns/ornaments";
import { Reveal } from "@/components/ui/reveal";
import { HeroSlider } from "@/components/home/hero-slider";
import { heroSlides } from "@/data/hero-slides";
import { collections, highlights, formatINR } from "@/data/home";
export default function Home() {
  return (
    <main id="main-content">
      <HeroSlider slides={heroSlides} />
      <div className="values-strip">
        <span>
          <Hand size={19} /> The beauty of the handmade
        </span>
        <span>
          <Flower2 size={19} /> Rooted in Indian heritage
        </span>
        <span>
          <Gem size={19} /> Objects to treasure
        </span>
      </div>
      <section id="collections" className="section collections-section">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">A WORLD, BEAUTIFULLY CURATED</p>
              <h2>
                For a life <em>well adorned.</em>
              </h2>
            </div>
            <p>
              Familiar traditions. Fresh perspectives.
              <br />
              Find the pieces that feel like you.
            </p>
          </div>
        </Reveal>
        <div className="collection-grid">
          {collections.map((collection) => (
            <Reveal
              key={collection.id}
              className={`collection ${collection.className}`}
            >
              <a
                href={`#${collection.id}`}
                aria-label={`Explore ${collection.category}`}
              >
                <div className="collection-image">
                  <Image
                    src={collection.image}
                    alt={collection.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                  <span className="collection-number">{collection.number}</span>
                  <span className="collection-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </div>
              </a>
              <div id={collection.id} className="collection-caption">
                <p className="eyebrow">{collection.category}</p>
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <a href="#favourites" className="text-link">
                  Discover the edit <ArrowRight size={15} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section id="our-story" className="story-section">
        <div className="story-architecture">
          <Image
            src="/images/palace.webp"
            alt="Ochre walls, courtyards and arches of Amer Fort in Jaipur"
            fill
            sizes="(max-width: 767px) 100vw, 46vw"
          />
          <span className="image-label">RAJASTHAN, INDIA</span>
        </div>
        <Reveal className="story-copy">
          <Lotus />
          <p className="eyebrow">THE SOUL OF RAAJSI</p>
          <h2>
            Not just a place.
            <br />
            <em>A way of feeling.</em>
          </h2>
          <p>
            India lives in the details. In the rhythm of a carved arch. The
            warmth of burnished brass. The patient repetition of a printed
            flower.
          </p>
          <p>
            Raajsi is an invitation to bring that beauty home — to surround
            yourself with objects that carry a little history, and make room for
            your own.
          </p>
          <a className="text-link" href="#craft">
            Meet the art of making <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </section>
      <section id="favourites" className="section favourites-section">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE PIECES WE COME BACK TO</p>
              <h2>
                Timeless, for <em>a reason.</em>
              </h2>
            </div>
            <a className="text-link" href="#collections">
              Explore all collections <ArrowRight size={16} />
            </a>
          </div>
          <p className="demo-label">
            The bestseller edit · Illustrative products and pricing · Shopping
            coming soon
          </p>
        </Reveal>
        <div className="product-preview-grid">
          {highlights.map((product, i) => (
            <Reveal className="product-preview" key={product.name}>
              <div className="product-preview-image">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {i === 0 && (
                  <span className="product-tag">THE SIGNATURE PIECE</span>
                )}
              </div>
              <p className="eyebrow">{product.craft}</p>
              <div className="product-title">
                <h3>{product.name}</h3>
                <span>{formatINR(product.price)}</span>
              </div>
              <small>Concept collection</small>
            </Reveal>
          ))}
        </div>
      </section>
      <section id="craft" className="craft-section">
        <Reveal className="craft-intro">
          <p className="eyebrow">PATIENT HANDS. ENDURING BEAUTY.</p>
          <h2>
            There is no shortcut
            <br />
            to <em>something special.</em>
          </h2>
          <p>
            Our design language takes its cues from the techniques that give
            Indian craft its character.
          </p>
        </Reveal>
        <div className="craft-grid">
          {[
            {
              n: "01",
              name: "The mark of the maker",
              text: "The slight irregularity of a hammered surface. A detail that feels alive. We find beauty in the human touch.",
              icon: Hand,
            },
            {
              n: "02",
              name: "A language of pattern",
              text: "From block-printed florals to the geometry of jali screens, repeating forms connect objects to architecture.",
              icon: Flower2,
            },
            {
              n: "03",
              name: "Made to mean more",
              text: "Brass that deepens with time. Textiles that soften with use. Materials that become part of a home’s story.",
              icon: Gem,
            },
          ].map((item) => (
            <Reveal key={item.n} className="craft-item">
              <div className="craft-item-top">
                <item.icon size={28} strokeWidth={1} />
                <span>{item.n}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
        <Divider />
      </section>
      <section id="campaign" className="campaign-section">
        <Image
          src="/images/campaign-wide.webp"
          alt="Warm brass, ivory flowers and maroon textiles arranged for a festive gathering"
          fill
          sizes="100vw"
        />
        <div className="campaign-shade" />
        <Reveal className="campaign-copy">
          <p className="eyebrow">THE ART OF COMING TOGETHER</p>
          <h2>
            For the moments
            <br />
            that become <em>memories.</em>
          </h2>
          <p>
            A table set with love. A light left glowing.
            <br />
            The little things that make a celebration yours.
          </p>
          <a href="#favourites" className="button button-ivory">
            Discover the festive edit <ArrowUpRight size={17} />
          </a>
        </Reveal>
        <span className="campaign-index">THE FESTIVE EDIT / 01</span>
      </section>
      <section
        className="testimonials section"
        aria-labelledby="testimonials-title"
      >
        <p className="eyebrow">A FEELING WORTH SHARING</p>
        <h2 id="testimonials-title">
          A place in <em>your story.</em>
        </h2>
        <p className="demo-label">
          Demonstration testimonials · Fictional examples, not customer reviews
        </p>
        <div className="testimonial-grid">
          {[
            {
              quote:
                "The kind of piece that makes an everyday corner feel like it has always had a story.",
              name: "Ananya",
              city: "Jaipur",
            },
            {
              quote:
                "Quietly beautiful. The warmth, the texture, the little details — everything feels considered.",
              name: "Meera",
              city: "Bengaluru",
            },
            {
              quote:
                "A gift that feels personal before it is even unwrapped. A lovely celebration of Indian design.",
              name: "Rhea",
              city: "Mumbai",
            },
          ].map((item) => (
            <figure key={item.name}>
              <div
                className="review-stars"
                role="img"
                aria-label="5 out of 5 stars, demonstration"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={11} fill="currentColor" />
                ))}
              </div>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                {item.name}
                <span>{item.city} · Illustrative review</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
