import Image from "next/image";
import radiant from "../images/trust1.webp";
import expert from "../images/trust2.webp";
import botanicals from "../images/trust3.webp";
import lab from "../images/trust4.webp";
import "../styles/science-trust.css";

const pillars = [
  {
    id: "expert",
    image: expert,
    alt: "Skin specialist in a white coat treating a client",
    focus: "45% 40%",
    title: "Expert Tested",
    text: "Developed alongside skin specialists and tested for gentle, everyday use.",
  },
  {
    id: "botanicals",
    image: botanicals,
    alt: "Serum bottle with aloe, cucumber slices and green clay on a stone",
    focus: "58% 55%",
    title: "Pure Botanical Formulas",
    text: "Plant-powered extracts that soothe and nourish without harsh additives.",
  },
  {
    id: "lab",
    image: lab,
    alt: "Laboratory beaker of serum beside a microscope",
    focus: "62% 50%",
    title: "Lab Proven",
    text: "Every formula is studied in the lab to deliver results you can see and feel.",
  },
];

export default function ScienceTrust() {
  return (
    <section className="trust" aria-labelledby="trust-title">
      <h2 id="trust-title" className="trust__title">
        Backed by Science, Loved by Skin
      </h2>

      <div className="trust__diagram">
        <div className="trust__tree">
          {/* Connector lines, drawn in the same 1623×603 space as the layout */}
          <svg
            className="trust__lines"
            viewBox="0 0 1623 603"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M591 235 L300 394 Q270.5 410 270.5 442 L270.5 595" />
            <path d="M1032 235 L1323 394 Q1352.5 410 1352.5 442 L1352.5 595" />
            <path d="M811.5 478 L811.5 595" />
          </svg>

          <div className="trust__top">
            <div className="trust__circle trust__circle--lg">
              <Image
                src={radiant}
                alt="Woman with glowing skin, eyes closed, wearing a towel wrap"
                fill
                sizes="(max-width: 720px) 70vw, 25vw"
                style={{ objectPosition: "24% 45%" }}
              />
            </div>
          </div>
          <p className="trust__top-label">Radiant Results</p>
        </div>

        <ul className="trust__row">
          {pillars.map((p) => (
            <li key={p.id} className="trust__item">
              <div className="trust__circle">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 720px) 60vw, 20vw"
                  style={{ objectPosition: p.focus }}
                />
              </div>
              <h3 className="trust__item-title">{p.title}</h3>
              <p className="trust__item-text">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
