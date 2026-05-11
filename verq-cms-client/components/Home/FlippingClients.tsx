"use client";

import { useEffect, useRef, useState } from "react";

type Client = { id: number; logo: string };

const ALL_CLIENTS: Client[] = [
  { id: 1, logo: "/clients/ArtPharmacy.png" },
  { id: 2, logo: "/clients/cness.png" },
  { id: 3, logo: "/clients/coffebeans.png" },
  { id: 4, logo: "/clients/Cultyvate.png" },
  { id: 5, logo: "/clients/dora360.png" },
  { id: 6, logo: "/clients/fm_global.png" },
  { id: 7, logo: "/clients/gieom.png" },
  { id: 8, logo: "/clients/pop.png" },
  { id: 9, logo: "/clients/tctc.png" },
];

const TEXT_SLOT = 6;
const LOGO_SLOTS = [0, 1, 2, 3, 4, 5, 7, 8, 9];
const STAGGER_MS = 60;
const FLIP_MS = 480;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getLogoForSlot(logos: Client[], slot: number): Client {
  const idx = slot < TEXT_SLOT ? slot : slot - 1;
  return logos[idx];
}

export default function FlippingClients() {
  const [currentLogos, setCurrentLogos] = useState(ALL_CLIENTS);
  const [nextLogos, setNextLogos] = useState(() => shuffle(ALL_CLIENTS));
  const [flippedSlots, setFlippedSlots] = useState<Set<number>>(new Set());
  const [resetting, setResetting] = useState(false);
  const nextLogosRef = useRef(nextLogos);

  // Keep ref in sync with state
  useEffect(() => {
    nextLogosRef.current = nextLogos;
  }, [nextLogos]);

  useEffect(() => {
    const runCycle = () => {
      // Stagger flip (0deg → 180deg), showing back face (nextLogos)
      LOGO_SLOTS.forEach((slot, i) => {
        setTimeout(() => {
          setFlippedSlots((prev) => new Set([...prev, slot]));
        }, i * STAGGER_MS);
      });

      // After all cards finish flipping
      const allDone = (LOGO_SLOTS.length - 1) * STAGGER_MS + FLIP_MS;

      setTimeout(() => {
        const landed = nextLogosRef.current;
        const newNext = shuffle(ALL_CLIENTS);

        // Disable transitions, reset rotation to 0, swap front = what was back
        setResetting(true);
        setFlippedSlots(new Set());
        setCurrentLogos(landed);

        // Two rAF to let React paint the reset before re-enabling transitions
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setResetting(false);
            setNextLogos(newNext);
            nextLogosRef.current = newNext;
          });
        });
      }, allDone);
    };

    const interval = setInterval(runCycle, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 px-4 sm:px-8 md:px-14">
      {Array.from({ length: 10 }, (_, slot) => {
        if (slot === TEXT_SLOT) {
          return (
            <div
              key="text"
              className="rounded-xl px-6 py-6 flex flex-col items-start justify-center h-[150px]"
            >
              <p className="text-xl font-semibold tracking-tight text-white leading-snug">
                Trusted by
                <br />
                clients worldwide
              </p>
            </div>
          );
        }

        const front = getLogoForSlot(currentLogos, slot);
        const back = getLogoForSlot(nextLogos, slot);
        const isFlipped = flippedSlots.has(slot);

        return (
          <div key={slot} style={{ perspective: "800px" }}>
            <div
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: resetting ? "none" : `transform ${FLIP_MS}ms ease-in-out`,
                position: "relative",
                height: "150px",
              }}
            >
              {/* Front face */}
              <div
                className="absolute inset-0 bg-white rounded-md px-6 py-4 flex items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={front.logo}
                  alt={`Client ${front.id}`}
                  className="max-h-12 max-w-[120px] w-auto object-contain"
                />
              </div>

              {/* Back face */}
              <div
                className="absolute inset-0 bg-white rounded-md px-6 py-4 flex items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <img
                  src={back.logo}
                  alt={`Client ${back.id}`}
                  className="max-h-12 max-w-[120px] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
