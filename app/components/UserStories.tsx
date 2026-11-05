"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import creator1 from "../images/creators/creator1.jpg";
import creator2 from "../images/creators/creator2.jpg";
import creator3 from "../images/creators/creator3.jpg";
import creator4 from "../images/creators/creator4.jpg";
import creator5 from "../images/creators/creator5.jpg";
import "../styles/user-stories.css";

type Story = {
  id: string;
  video: string;
  poster: string;
  name: string;
  avatar: StaticImageData;
  caption: string;
  product: string;
};

// Videos live in public/videos (Next.js serves static media from public/).
const stories: Story[] = [
  {
    id: "ugc1",
    video: "/videos/ugc1.mp4",
    poster: "/videos/posters/ugc1.jpg",
    name: "Sofia Marin",
    avatar: creator1,
    caption: "#My skin hasn't felt this soft in years. This moisturizer is a dream.",
    product: "moisturizer",
  },
  {
    id: "ugc2",
    video: "/videos/ugc2.mp4",
    poster: "/videos/posters/ugc2.jpg",
    name: "Leah Carter",
    avatar: creator2,
    caption: "#Two drops of face oil at night and I wake up actually glowing.",
    product: "face-oil",
  },
  {
    id: "ugc3",
    video: "/videos/ugc3.mp4",
    poster: "/videos/posters/ugc3.jpg",
    name: "Nadia Rahman",
    avatar: creator3,
    caption: "#Three weeks in and my skin tone looks so much more even.",
    product: "face-serum",
  },
  {
    id: "ugc4",
    video: "/videos/ugc4.mp4",
    poster: "/videos/posters/ugc4.jpg",
    name: "Priya Sethi",
    avatar: creator4,
    caption: "#My morning routine got so simple, and my skin still feels fresh all day.",
    product: "cleanser",
  },
  {
    id: "ugc5",
    video: "/videos/ugc5.mp4",
    poster: "/videos/posters/ugc5.jpg",
    name: "Amara Khan",
    avatar: creator5,
    caption: "#Finally an SPF with no white cast that I'm happy to wear every day.",
    product: "sunscreen",
  },
];

export default function UserStories() {
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(stories.length - 1);
  const [playing, setPlaying] = useState<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Stop sliding once the last card is fully in view (no empty space at the end).
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>(".stories__card");
    if (!viewport || !card) return;
    const gap = parseFloat(getComputedStyle(viewport).getPropertyValue("--card-gap")) || 0;
    const visible = Math.max(
      1,
      Math.floor((viewport.clientWidth + gap) / (card.offsetWidth + gap)),
    );
    const max = Math.max(0, stories.length - visible);
    setMaxIndex(max);
    setIndex((i) => Math.min(i, max));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const toggle = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;
    if (playing === id) {
      video.pause();
      setPlaying(null);
      return;
    }
    // Only one story plays at a time.
    Object.entries(videoRefs.current).forEach(([key, v]) => {
      if (key !== id && v && !v.paused) v.pause();
    });
    video.play().then(
      () => setPlaying(id),
      () => setPlaying(null),
    );
  };

  return (
    <section className="stories" aria-labelledby="stories-title">
      <div className="stories__intro">
        <h2 id="stories-title" className="stories__title">
          Real Glow from
          <br />
          Real People
        </h2>

        <div className="stories__controls">
          <button
            type="button"
            className="stories__arrow stories__arrow--prev"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Previous stories"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="stories__arrow stories__arrow--next"
            onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
            disabled={index >= maxIndex}
            aria-label="Next stories"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="stories__viewport" ref={viewportRef}>
        <ul className="stories__track" style={{ ["--index" as string]: index }}>
          {stories.map((s) => {
            const isPlaying = playing === s.id;
            return (
              <li
                key={s.id}
                className={isPlaying ? "stories__card stories__card--playing" : "stories__card"}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[s.id] = el;
                  }}
                  className="stories__video"
                  src={s.video}
                  poster={s.poster}
                  preload="none"
                  playsInline
                  loop
                  onEnded={() => setPlaying(null)}
                  onClick={() => toggle(s.id)}
                />
                <div className="stories__shade" aria-hidden="true" />

                <button
                  type="button"
                  className="stories__play"
                  onClick={() => toggle(s.id)}
                  aria-label={isPlaying ? `Pause ${s.name}'s story` : `Play ${s.name}'s story`}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                    </svg>
                  )}
                </button>

                <div className="stories__info">
                  <div className="stories__creator">
                    <span className="stories__avatar">
                      <Image src={s.avatar} alt="" fill sizes="32px" />
                    </span>
                    <span className="stories__name">{s.name}</span>
                  </div>
                  <p className="stories__caption">{s.caption}</p>
                  <Link href={`/shop/${s.product}`} className="stories__buy">
                    Purchase the product
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
