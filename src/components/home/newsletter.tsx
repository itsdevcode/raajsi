"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Rangoli } from "@/components/patterns/ornaments";
export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <section id="newsletter" className="newsletter">
      <Rangoli className="newsletter-pattern" />
      <div>
        <p className="eyebrow">LET THE STORY CONTINUE</p>
        <h2>
          A little more beauty
          <br />
          in your <em>everyday.</em>
        </h2>
        <p>
          New collections, craft stories, and thoughtful inspiration.
          <br />
          An occasional letter from our world to yours.
        </p>
      </div>
      <div className="newsletter-form-wrap">
        {submitted ? (
          <div role="status" className="newsletter-success">
            <Check size={24} />
            <h3>You’re part of the story.</h3>
            <p>
              This is a demo signup. Your email has not been stored or
              subscribed.
            </p>
            <button className="text-link" onClick={() => setSubmitted(false)}>
              Try another email <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <label htmlFor="newsletter-email">Your email address</label>
            <div className="newsletter-input">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                required
                maxLength={254}
              />
              <button type="submit" aria-label="Join the newsletter">
                <ArrowRight size={22} />
              </button>
            </div>
            <p className="form-note">
              Demonstration only. No email is collected or sent.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
