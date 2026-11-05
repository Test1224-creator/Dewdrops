"use client";

import Image from "next/image";
import { useState } from "react";
import banner from "../images/banner.webp";
import "../styles/skin-concerns.css";

// The photo is 1620x971 but the frame shows a shorter 1620x640 crop
// (object-position 50% 57%). Spot positions are given on the full photo
// and converted to the cropped frame here.
const IMG_H = 971;
const FRAME_H = 640;
const FOCUS_Y = 0.57;
const toFrameY = (imgPct: number) => {
  const cropTop = (IMG_H - FRAME_H) * FOCUS_Y;
  return ((imgPct / 100) * IMG_H - cropTop) / FRAME_H * 100;
};

type Spot = {
  id: string;
  x: number; // % from left of the photo
  y: number; // % from top of the full photo
  title: string;
  text: string;
};

const spots: Spot[] = [
  {
    id: "lines",
    x: 52,
    y: 25,
    title: "Fine Lines?",
    text: "Our botanical face serum smooths the look of fine lines and firms skin, with visible results in just four weeks of nightly use.",
  },
  {
    id: "dull",
    x: 39,
    y: 50,
    title: "Dull Skin?",
    text: "Bring back your glow with our face serum, rich in plant vitamin C to brighten tired skin and even out tone day by day.",
  },
  {
    id: "oily",
    x: 53,
    y: 43,
    title: "Oily T-Zone?",
    text: "Our gentle cleanser lifts away excess oil and buildup without stripping, leaving pores clear and skin balanced, never tight.",
  },
  {
    id: "dry",
    x: 64,
    y: 52,
    title: "Dry Skin?",
    text: "Lock in moisture for up to 24 hours with our plant-based moisturizer, shown to restore hydration to dry skin after a single use.",
  },
  {
    id: "texture",
    x: 52,
    y: 65,
    title: "Rough Texture?",
    text: "A few drops of our cold-pressed face oil soften rough, flaky patches overnight for skin that feels smooth and supple.",
  },
  {
    id: "sun",
    x: 60,
    y: 78,
    title: "Sun Damage?",
    text: "Shield your skin every day with our SPF 50+ sunscreen: broad-spectrum protection that sits light, with no white cast.",
  },
];

export default function SkinConcerns() {
  const [activeId, setActiveId] = useState<string | null>("sun");
  const active = spots.find((s) => s.id === activeId) ?? null;

  return (
    <section className="concerns" aria-label="Skin concerns we care for">
      <div className="concerns__frame">
        <Image
          src={banner}
          alt="Woman receiving a facial with moisturizer applied to her cheeks"
          className="concerns__image"
          placeholder="blur"
          fill
          sizes="100vw"
        />

        {spots.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              className={isActive ? "concerns__dot concerns__dot--active" : "concerns__dot"}
              style={{ left: `${s.x}%`, top: `${toFrameY(s.y)}%` }}
              onClick={() => setActiveId(isActive ? null : s.id)}
              aria-pressed={isActive}
              aria-label={s.title.replace("?", "")}
            />
          );
        })}

        {active && (
          <div
            key={active.id}
            className={[
              "concerns__card",
              active.x > 65 && "concerns__card--flip",
              toFrameY(active.y) < 45 && "concerns__card--below",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ left: `${active.x}%`, top: `${toFrameY(active.y)}%` }}
            role="status"
          >
            <h3 className="concerns__title">{active.title}</h3>
            <p className="concerns__text">{active.text}</p>
          </div>
        )}
      </div>
    </section>
  );
}
