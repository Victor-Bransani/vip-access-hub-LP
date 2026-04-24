import { useEffect, useState } from "react";
import messagePng from "@/assets/message.png";
import airfryer from "@/assets/airfryer.png";
import eletrodomesticos from "@/assets/eletrodomesticos.png";
import foneHeadset from "@/assets/Fone headset PNG Transparente.png";
import iphone from "@/assets/iphone.png";
import mouse from "@/assets/mouse.png";
import skincare from "@/assets/skincare.png";

const PRODUCT_POOL = [
  airfryer,
  eletrodomesticos,
  foneHeadset,
  iphone,
  mouse,
  skincare,
] as const;

function pickUniqueRandom<T>(pool: readonly T[], count: number): T[] {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

/**
 * Tail no PNG fica no canto inferior-direito.
 * Bolhas à direita do celular: espelhar para o rabo apontar para a esquerda (em direção ao aparelho).
 * Bolhas à esquerda: sem espelho — o rabo natural tende para o centro do telefone.
 * O produto recebe contra-espelho para não ficar espelhado.
 */
const BUBBLE_SLOTS = [
  {
    className:
      "left-[-7%] top-[2%] w-[4.35rem] sm:left-[-6%] sm:top-[3%] sm:w-[5.05rem]",
    mirror: false,
  },
  {
    className:
      "right-[9%] top-[10%] w-[4.35rem] sm:right-[10%] sm:top-[12%] sm:w-[5.05rem]",
    mirror: true,
  },
  {
    className:
      "left-[-11%] top-[32%] w-[4.2rem] sm:left-[-9%] sm:top-[34%] sm:w-[4.9rem]",
    mirror: false,
  },
  {
    className:
      "right-[8%] bottom-[28%] w-[4.25rem] sm:right-[9%] sm:bottom-[30%] sm:w-[4.95rem]",
    mirror: true,
  },
] as const;

const STAGGER_MS = 115;
const HOLD_VISIBLE_MS = 2600;
const EXIT_DURATION_MS = 380;
const GAP_BEFORE_NEXT_MS = 280;

type BubbleBundle = { count: 3 | 4; products: string[] };

function newBubbleBundle(): BubbleBundle {
  const count: 3 | 4 = Math.random() < 0.45 ? 3 : 4;
  return { count, products: pickUniqueRandom(PRODUCT_POOL, count) };
}

type PhoneMessageBubblesProps = {
  className?: string;
};

export function PhoneMessageBubbles({ className }: PhoneMessageBubblesProps) {
  const [cycle, setCycle] = useState(0);
  const [hiding, setHiding] = useState(false);
  const [bundle, setBundle] = useState<BubbleBundle>(() => newBubbleBundle());

  useEffect(() => {
    if (cycle === 0) return;
    setBundle(newBubbleBundle());
  }, [cycle]);

  useEffect(() => {
    setHiding(false);
    const hideAt = HOLD_VISIBLE_MS;
    const exitDoneAt = hideAt + EXIT_DURATION_MS + STAGGER_MS * 3;
    const nextCycleAt = exitDoneAt + GAP_BEFORE_NEXT_MS;

    const t1 = window.setTimeout(() => setHiding(true), hideAt);
    const t2 = window.setTimeout(() => setCycle((c) => c + 1), nextCycleAt);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [cycle]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[15] overflow-visible ${className ?? ""}`}
      aria-hidden
    >
      {bundle.products.slice(0, bundle.count).map((src, i) => {
        const slot = BUBBLE_SLOTS[i];
        return (
          <div key={`${cycle}-${i}-${src}`} className={`absolute ${slot.className}`}>
            <div
              className={hiding ? "animate-msg-bubble-out" : "animate-msg-bubble-in"}
              style={{
                animationDelay: `${i * STAGGER_MS}ms`,
              }}
            >
              <div className={`relative w-full ${slot.mirror ? "-scale-x-100" : ""}`}>
                <img
                  src={messagePng}
                  alt=""
                  className="w-full select-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
                  decoding="async"
                />
                <div
                  className={`absolute inset-x-[12%] inset-y-[9%] bottom-[34%] flex items-center justify-center sm:inset-x-[11%] sm:bottom-[33%] ${slot.mirror ? "-scale-x-100" : ""}`}
                >
                  <img src={src} alt="" className="max-h-full max-w-full object-contain" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
