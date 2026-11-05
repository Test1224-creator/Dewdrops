"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import moisturizer from "../images/best1.webp";
import faceOil from "../images/best2.webp";
import faceSerum from "../images/best3.webp";
import cleanser from "../images/best4.webp";
import sunscreen from "../images/best5.webp";
import "../styles/best-products.css";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: StaticImageData;
};

const products: Product[] = [
  {
    id: "moisturizer",
    name: "Moisturizer",
    description: "Deep, weightless hydration that strengthens the skin barrier.",
    price: "$24.00",
    image: moisturizer,
  },
  {
    id: "face-oil",
    name: "Face Oil",
    description: "Cold-pressed botanical oils that nourish and restore a natural glow.",
    price: "$32.00",
    image: faceOil,
  },
  {
    id: "face-serum",
    name: "Face Serum",
    description: "A lightweight serum that brightens and evens out skin tone.",
    price: "$38.00",
    image: faceSerum,
  },
  {
    id: "cleanser",
    name: "Gentle Cleanser",
    description: "A soft, low-foam wash that clears away the day without drying.",
    price: "$18.00",
    image: cleanser,
  },
  {
    id: "sunscreen",
    name: "Sunscreen",
    description: "Broad-spectrum SPF 50+ with no white cast, made for daily wear.",
    price: "$28.00",
    image: sunscreen,
  },
];

export default function BestProducts() {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const last = products.length - 1;

  const toggleLike = (id: string) =>
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="best" aria-labelledby="best-title">
      <div className="best__intro">
        <h2 id="best-title" className="best__title">
          Our Best
          <br />
          Products
        </h2>

        <div className="best__controls">
          <button
            type="button"
            className="best__arrow best__arrow--prev"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Previous product"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="best__arrow best__arrow--next"
            onClick={() => setIndex((i) => Math.min(last, i + 1))}
            disabled={index === last}
            aria-label="Next product"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="best__viewport">
        <ul
          className="best__track"
          style={{ ["--index" as string]: index }}
        >
          {products.map((p) => {
            return (
              <li key={p.id} className="best__card">
                <Image
                  src={p.image}
                  alt={p.name}
                  className="best__image"
                  fill
                  sizes="(max-width: 720px) 80vw, 30vw"
                />
                <div className="best__shade" aria-hidden="true" />

                <button
                  type="button"
                  className={liked[p.id] ? "best__like best__like--on" : "best__like"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(p.id);
                  }}
                  aria-pressed={!!liked[p.id]}
                  aria-label={`Add ${p.name} to wishlist`}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill={liked[p.id] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 20.3s-7.5-4.6-9.3-9.3C1.5 7.7 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.5 3.2 4.3 6.5-1.8 4.7-9.3 9.3-9.3 9.3Z" />
                  </svg>
                </button>

                <Link href={`/shop/${p.id}`} className="best__label">
                  {p.name}
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </Link>

                <div className="best__details">
                  <h3 className="best__name">{p.name}</h3>
                  <p className="best__desc">{p.description}</p>
                  <div className="best__actions">
                    <button type="button" className="best__cart">
                      <span className="best__cart-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                      <span className="best__cart-label">Add to Cart</span>
                    </button>
                    <span className="best__price">{p.price}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
