"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { Lotus, Rangoli } from "@/components/patterns/ornaments";
import type { HeroSlide } from "@/data/hero-slides";

const AUTOPLAY_MS = 6500;
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getMotionPreference = () => window.matchMedia(motionQuery).matches;
const getServerMotionPreference = () => null;

export function HeroSlider({ slides }: { slides: readonly HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [paused, setPaused] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    getMotionPreference,
    getServerMotionPreference,
  );

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Wait for the browser motion preference before starting. Every interruption
  // clears the timer; resuming gives the next story a full reading interval.
  useEffect(() => {
    if (
      reducedMotion !== false ||
      hovered ||
      focused ||
      hidden ||
      paused ||
      slides.length < 2
    )
      return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, hovered, focused, hidden, paused, reducedMotion, slides.length]);

  const goTo = (index: number) => {
    const next = (index + slides.length) % slides.length;
    setActive(next);
    setAnnouncement(
      `${slides[next].title}. Slide ${next + 1} of ${slides.length}.`,
    );
  };

  if (!slides.length) return null;

  return (
    <section
      id="top"
      className="hero"
      aria-label="Featured collections"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="hero-copy">
        <div className="hero-copy-stack">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              id={`hero-slide-${slide.id}`}
              className={`hero-panel ${index === active ? "is-active" : ""}`}
              aria-hidden={index !== active}
              inert={index !== active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
            >
              <p className="eyebrow">
                <span className="short-rule" />
                {slide.title}
              </p>
              <h1>
                {slide.headline}
                <br />
                <em>{slide.emphasis}</em>
              </h1>
              <p className="hero-description">{slide.description}</p>
              <a className="button button-maroon" href={slide.cta.href}>
                {slide.cta.label}
                <ArrowUpRight size={18} />
              </a>
            </div>
          ))}
        </div>
        <div className="hero-footnote">
          <Lotus />
          <span>Tradition, thoughtfully reimagined.</span>
        </div>
        <Rangoli className="hero-rangoli" />
      </div>
      <div className="hero-image">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-image-panel ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              sizes="(max-width: 767px) 100vw, 54vw"
              preload={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              style={{ objectPosition: slide.image.position }}
            />
            <div className="hero-image-shade" />
            <div className="hero-image-caption">
              <span>{slide.title}</span>
              <p>{slide.caption}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-controls" aria-label="Slideshow controls">
        <button
          className="icon-button"
          aria-label="Previous slide"
          onClick={() => goTo(active - 1)}
        >
          <ArrowLeft size={18} />
        </button>
        <div
          className="hero-indicators"
          role="group"
          aria-label="Choose a slide"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              aria-current={index === active ? "true" : undefined}
              aria-controls={`hero-slide-${slide.id}`}
              onClick={() => goTo(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          className="icon-button"
          aria-label="Next slide"
          onClick={() => goTo(active + 1)}
        >
          <ArrowRight size={18} />
        </button>
        {!reducedMotion && (
          <button
            className="icon-button hero-pause"
            aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        )}
        <span className="hero-slide-count" aria-hidden="true">
          0{active + 1} / 0{slides.length}
        </span>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </section>
  );
}
