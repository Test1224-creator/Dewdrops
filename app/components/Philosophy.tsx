"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import user1 from "../images/users/user1.jpg";
import user2 from "../images/users/user2.jpg";
import user3 from "../images/users/user3.jpg";
import user4 from "../images/users/user4.jpg";
import "../styles/philosophy.css";

const statement =
  "We believe beauty grows from what the earth gives freely. Gentle botanicals, honest ingredients, and slow-made formulas that care for every skin, every season, and every story.";

const words = statement.split(" ");
// Words shown dark before any scrolling (matches the reference's split).
const INITIAL_LIT = 13;

const users = [
  { id: "u1", photo: user1 },
  { id: "u2", photo: user2 },
  { id: "u3", photo: user3 },
  { id: "u4", photo: user4 },
];

export default function Philosophy() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(INITIAL_LIT);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(words.length);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the paragraph enters at the bottom, 1 when its top reaches mid-screen.
      const progress = (vh - rect.top) / (vh * 0.5);
      const clamped = Math.min(1, Math.max(0, progress));
      setLit(Math.max(INITIAL_LIT, Math.round(clamped * words.length)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="philosophy" aria-labelledby="philosophy-title">
      <h2 id="philosophy-title" className="philosophy__eyebrow">
        Our Roots
      </h2>

      <p ref={textRef} className="philosophy__statement">
        {words.map((word, i) => (
          <span
            key={i}
            className={
              i < lit ? "philosophy__word philosophy__word--lit" : "philosophy__word"
            }
          >
            {word}{" "}
          </span>
        ))}
      </p>

      <div className="philosophy__trust">
        <div className="philosophy__avatars" aria-hidden="true">
          {users.map((u) => (
            <span key={u.id} className="philosophy__avatar">
              <Image src={u.photo} alt="" fill sizes="44px" />
            </span>
          ))}
        </div>
        <p className="philosophy__trust-text">Loved by 15k+ glowing customers</p>
      </div>
    </section>
  );
}
