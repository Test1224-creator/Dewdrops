"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import footerImage from "../images/footer.webp";
import "../styles/footer.css";

const support = [
  { label: "FAQ's", href: "/faq" },
  { label: "Delivery", href: "/delivery" },
  { label: "Policy", href: "/policy" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // No newsletter backend yet: just confirm on screen.
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="footer">
      <Image
        src={footerImage}
        alt=""
        className="footer__image"
        placeholder="blur"
        fill
        sizes="100vw"
      />
      <div className="footer__shade" aria-hidden="true" />

      <div className="footer__inner">
        <div className="footer__connect">
          <h2 className="footer__heading">Connect with us</h2>
          <p className="footer__lead">
            Subscribe for early access to new launches and members-only offers.
          </p>

          <form className="footer__form" onSubmit={onSubmit}>
            <label htmlFor="footer-email" className="footer__sr">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSent(false);
              }}
              placeholder={sent ? "Thanks! You're on the list." : "Enter your email"}
              className="footer__input"
            />
            <button type="submit" className="footer__submit" aria-label="Subscribe">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </button>
          </form>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <div className="footer__col">
            <h3 className="footer__heading">Support</h3>
            <ul>
              {support.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="footer__link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Socials</h3>
            <ul>
              {socials.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="footer__bottom">
        <span>© 2026 Aurelia. All rights reserved.</span>
        <span>Botanical skincare, made with care.</span>
      </div>
    </footer>
  );
}
