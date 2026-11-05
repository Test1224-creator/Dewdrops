import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo-mark.webp";
import "../styles/navbar.css";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <Link href="/" className="navbar__brand">
        <Image
          src={logo}
          alt="Aurelia"
          className="navbar__logo"
          priority
        />
      </Link>

      <nav className="navbar__nav" aria-label="Main">
        <ul className="navbar__links">
          {links.map((link) => (
            <li key={link.href} className="navbar__item">
              <Link href={link.href} className="navbar__link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/cart" className="navbar__cart" aria-label="Cart">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2.5 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20 8H6" />
            <circle cx="9.5" cy="19.5" r="1.3" />
            <circle cx="16.5" cy="19.5" r="1.3" />
            <path d="M13 9.5v4M11 11.5h4" />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
