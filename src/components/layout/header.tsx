"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Lotus } from "@/components/patterns/ornaments";
const links = [
  { label: "Collections", href: "/#collections" },
  { label: "The favourites", href: "/#favourites" },
  { label: "Our story", href: "/#our-story" },
  { label: "The art of making", href: "/#craft" },
];
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onPointer = (event: PointerEvent) => {
      if (!megaRef.current?.contains(event.target as Node)) setMega(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);
  const close = () => {
    dialog.current?.close();
    document.body.style.overflow = "";
    toggle.current?.focus();
  };
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );
  return (
    <>
      <div className="announcement">
        A celebration of Indian craft <span aria-hidden="true">✧</span> A
        collection of things to treasure
      </div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="wordmark" href="/" aria-label="Raajsi home">
          <span>RAAJSI</span>
          <small>THE ART OF INDIAN ELEGANCE</small>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <div
            ref={megaRef}
            className="mega-wrap"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setMega(false);
                (
                  megaRef.current?.querySelector("button") as HTMLButtonElement
                )?.focus();
              }
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setMega(false);
            }}
          >
            <button
              className="nav-link"
              aria-expanded={mega}
              aria-controls="collection-menu"
              onClick={() => setMega(!mega)}
            >
              Collections <ChevronDown size={13} />
            </button>
            {mega && (
              <div id="collection-menu" className="mega-menu">
                <div>
                  <span className="eyebrow">THE WORLD OF RAAJSI</span>
                  <h2>
                    Find your everyday
                    <br />
                    <em>extraordinary.</em>
                  </h2>
                </div>
                <div className="mega-links">
                  {[
                    "Heritage living",
                    "Brass & copper",
                    "Textiles & keepsakes",
                  ].map((name, i) => (
                    <Link
                      onClick={() => setMega(false)}
                      key={name}
                      href={`/#${["living", "brass", "textiles"][i]}`}
                    >
                      {name}
                      <ArrowUpRight size={16} />
                    </Link>
                  ))}
                  <small>Collection previews · Full catalog coming soon</small>
                </div>
                <Lotus className="mega-lotus" />
              </div>
            )}
          </div>
          {links.slice(1).map((link) => (
            <Link className="nav-link" key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/#newsletter" className="header-invitation">
          Join our world <ArrowUpRight size={15} />
        </Link>
        <button
          ref={toggle}
          className="icon-button mobile-toggle"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          onClick={() => {
            dialog.current?.showModal();
            document.body.style.overflow = "hidden";
          }}
        >
          <Menu />
        </button>
      </header>
      <dialog
        ref={dialog}
        className="mobile-dialog"
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const focusable = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "a[href], button:not([disabled])",
            ),
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={() => {
          document.body.style.overflow = "";
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="mobile-menu">
          <div className="mobile-menu-top">
            <span className="wordmark">RAAJSI</span>
            <button
              className="icon-button"
              onClick={close}
              aria-label="Close navigation"
            >
              <X />
            </button>
          </div>
          <Lotus className="menu-lotus" />
          <p className="eyebrow">A WORLD OF INDIAN ELEGANCE</p>
          <nav aria-label="Mobile navigation">
            {links.map((link, i) => (
              <Link key={link.href} href={link.href} onClick={close}>
                <small>0{i + 1}</small>
                {link.label}
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </nav>
          <Link
            href="/#newsletter"
            className="button button-maroon"
            onClick={close}
          >
            Join our world <ArrowUpRight size={16} />
          </Link>
          <p className="mobile-note">
            Thoughtfully chosen. Beautifully Indian.
          </p>
        </div>
      </dialog>
    </>
  );
}
