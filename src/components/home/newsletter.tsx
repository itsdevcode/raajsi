"use client";
import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <section
      id="newsletter"
      className="footer-newsletter"
      aria-labelledby="footer-newsletter-title"
    >
      <h2 id="footer-newsletter-title">Newsletter</h2>
      {submitted ? (
        <div role="status" className="footer-newsletter-success">
          <p>
            <Check size={15} /> Thank you for stopping by.
          </p>
          <p>
            This is a demo signup. Your email has not been stored or subscribed.
          </p>
          <button onClick={() => setSubmitted(false)}>Try another email</button>
        </div>
      ) : (
        <>
          <form onSubmit={submit}>
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter email address"
              required
              maxLength={254}
            />
            <button type="submit" aria-label="Join the newsletter">
              Submit
            </button>
          </form>
          <p>
            Stay connected with our world. Get updates on new collections, craft
            stories, and inspiration from our artisans.
          </p>
        </>
      )}
    </section>
  );
}
