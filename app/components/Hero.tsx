import Image from "next/image";
import Link from "next/link";
import heroImage from "../images/herosection.webp";
import review1 from "../images/users/user5.jpg";
import review2 from "../images/users/user6.jpg";
import review3 from "../images/users/user7.jpg";
import review4 from "../images/users/user8.jpg";
import "../styles/hero.css";

const reviewers = [
  { id: "r1", photo: review1 },
  { id: "r2", photo: review2 },
  { id: "r3", photo: review3 },
  { id: "r4", photo: review4 },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__frame">
        <Image
          src={heroImage}
          alt="Woman holding a Dewdrop botanical serum against her cheek"
          className="hero__image"
          placeholder="blur"
          priority
          fill
          sizes="100vw"
        />
        <div className="hero__shade" aria-hidden="true" />

        <div className="hero__content">
          <h1 className="hero__title">
            Pure, Rooted
            <br />
            in Nature.
          </h1>

          <div className="hero__aside">
            <p className="hero__copy">
              Botanical skincare drawn from leaf and dew, for skin that glows
              softly and naturally.
            </p>
            <Link href="/shop" className="hero__cta">
              Discover the Range
            </Link>
          </div>
        </div>

        <Link href="/journal" className="hero__proof">
          <div className="hero__avatars">
            {reviewers.map((r) => (
              <span key={r.id} className="hero__avatar" aria-hidden="true">
                <Image
                  src={r.photo}
                  alt=""
                  className="hero__avatar-img"
                  fill
                  sizes="38px"
                />
              </span>
            ))}
            <span className="hero__avatar hero__avatar--arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </div>
          <p className="hero__rating">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
              <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3-4.7-4.4 6.4-.8z" />
            </svg>
            <span>4.8/5</span>
            <span className="hero__rating-label">Glowing reviews</span>
          </p>
        </Link>
      </div>
    </section>
  );
}
