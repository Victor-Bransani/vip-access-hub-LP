import { useEffect, useState } from "react";
import { Lock, ShieldCheck, Zap, Users, ArrowRight, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.svg";
import fundoSvg from "@/assets/fundo-3.svg";
import handPhone from "@/assets/hand-phone.png";
import stickerMlShopeeAmazon from "@/assets/sticker-ml-shopee-amazon.png";
import boxLinkPng from "@/assets/box_link.png";
import { WHATSAPP_GROUP_URL } from "@/lib/urls";
import { PhoneMessageBubbles } from "@/components/PhoneMessageBubbles";

const pad = (n: number) => n.toString().padStart(2, "0");

const ctaLinkProps = {
  href: WHATSAPP_GROUP_URL,
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};

const Index = () => {
  const [vagas, setVagas] = useState(23);
  const [tick, setTick] = useState(false);
  const [countdown, setCountdown] = useState({ h: 1, m: 47, s: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) {
          s = 59;
          m--;
        }
        if (m < 0) {
          m = 59;
          h--;
        }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (vagas > 5) {
        setVagas((v) => v - 1);
        setTick(true);
        setTimeout(() => setTick(false), 400);
      }
    }, Math.random() * 20000 + 10000);
    return () => clearTimeout(timeout);
  }, [vagas]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={fundoSvg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-black/25 via-transparent to-black/60" />

      <div
        className="relative z-10 flex flex-col min-h-screen w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto px-5
          pb-[max(6.5rem,calc(4.5rem+env(safe-area-inset-bottom,0px)))] md:pb-12"
      >
        <div className="animate-slide-up stagger-1 flex justify-center pt-10 mb-3">
          <img
            src={logo}
            alt="Achadinhos do Bransa"
            className="w-56 sm:w-64 md:w-72 -translate-y-3 sm:-translate-y-4 drop-shadow-xl"
          />
        </div>

        <div className="animate-slide-up stagger-2 relative -mt-4 mb-2 flex w-full justify-center overflow-visible px-0 sm:-mt-5 sm:mb-3">
          <div className="relative mx-auto flex w-full max-w-sm sm:max-w-md md:max-w-lg flex-row flex-nowrap items-center justify-center gap-0 overflow-visible">
            <div className="relative z-10 w-56 sm:w-64 md:w-72 shrink-0 translate-x-5 sm:translate-x-7 md:translate-x-10">
              <PhoneMessageBubbles />
              <img
                src={handPhone}
                alt="Achadinhos no celular"
                className="relative z-10 block w-full drop-shadow-2xl animate-float"
              />
            </div>
            <div className="relative z-20 -ml-2 flex shrink-0 translate-x-8 -translate-y-8 sm:translate-x-12 sm:-translate-y-10 md:ml-1 md:translate-x-16 md:-translate-y-12">
              <img
                src={stickerMlShopeeAmazon}
                alt="As melhores ofertas do Mercado Livre, Amazon e Shopee no seu celular"
                className="pointer-events-none block w-[10rem] sm:w-[12.5rem] md:w-[15rem] max-w-[min(44vw,14.5rem)] md:max-w-[min(42vw,17rem)] -rotate-[6deg] md:-rotate-[5deg] drop-shadow-[0_10px_26px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 -mt-14 space-y-3">
          <div className="animate-slide-up stagger-4 relative isolate flex aspect-[424/212] w-full min-w-0 flex-col overflow-hidden rounded-2xl shadow-lg">
            <img
              src={boxLinkPng}
              alt=""
              className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-contain object-center"
              width={424}
              height={212}
              decoding="async"
            />
            <div
              className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col justify-between gap-1 pl-[10%] pr-[12%] pt-[9%] pb-[9%] sm:gap-1.5 sm:pl-[9%] sm:pr-[11%] sm:pt-[8%] sm:pb-[8%]"
            >
              <div className="flex min-h-[2.25rem] w-full items-center justify-between gap-2 sm:min-h-[2.5rem] sm:gap-3">
                <span className="max-w-[55%] text-left text-[10px] font-medium uppercase leading-snug tracking-[0.1em] text-white sm:max-w-[58%] sm:text-[11px] md:text-xs md:tracking-[0.12em]">
                  Vagas restantes
                </span>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-black/20 px-1.5 py-0.5 ring-1 ring-white/40 sm:gap-1.5 sm:px-2 sm:py-0.5">
                  <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
                  <span className="text-[9px] font-black uppercase leading-none text-white sm:text-[10px] md:text-[11px]">ao vivo</span>
                </span>
              </div>

              <div className="flex w-full items-end justify-between gap-3 sm:gap-4">
                <div className="-translate-y-2 flex min-w-0 items-baseline gap-1 sm:-translate-y-2.5 sm:gap-1.5">
                  <span
                    className={`text-6xl sm:text-7xl md:text-8xl font-black leading-[0.88] tracking-tight text-white ${
                      tick ? "animate-counter-tick" : ""
                    }`}
                  >
                    {pad(vagas)}
                  </span>
                  <span className="shrink-0 self-end pb-1 text-base font-light tabular-nums text-white/90 sm:pb-1.5 sm:text-lg">
                    /50
                  </span>
                </div>
                <div className="-translate-x-1 -translate-y-3 flex max-w-[42%] shrink-0 flex-col items-end gap-1 text-right sm:-translate-x-1.5 sm:-translate-y-3.5 sm:max-w-none">
                  <span className="text-[9px] font-medium uppercase tracking-wider text-white/95 sm:text-[10px]">
                    esgotando
                  </span>
                  <div className="h-1.5 w-full min-w-[4.5rem] max-w-[5.5rem] overflow-hidden rounded-full bg-white/35 sm:h-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-brand-peach transition-all duration-700"
                      style={{ width: `${(vagas / 50) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="animate-slide-up stagger-5 flex items-center justify-center gap-2 rounded-xl border border-primary/45
              bg-gradient-to-br from-primary/30 via-brand-coral/25 to-brand-peach/20 p-3 shadow-md backdrop-blur-sm"
          >
            <span className="mr-1 text-[10px] font-medium uppercase tracking-wider text-white">
              Fecha em
            </span>
            {[pad(countdown.h), pad(countdown.m), pad(countdown.s)].map((v, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="rounded-lg bg-black/25 px-2.5 py-0.5 font-black text-lg text-white ring-1 ring-primary/40">
                  {v}
                </span>
                {i < 2 && <span className="font-black text-sm text-primary">:</span>}
              </span>
            ))}
          </div>

          <div className="animate-slide-up stagger-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {[
              { icon: Lock, label: "Privado" },
              { icon: Zap, label: "Tempo real" },
              { icon: ShieldCheck, label: "Verificado" },
              { icon: Users, label: "+2mil" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="h-3 w-3 text-white" aria-hidden />
                <span className="text-[9px] font-medium uppercase tracking-wider text-white">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-slide-up stagger-7 mt-auto pb-2 pt-6">
          <a
            {...ctaLinkProps}
            className="cta-gradient cta-gradient-text animate-pulse-cta flex w-full items-center justify-center gap-3
              rounded-2xl px-6 py-5 text-center text-base font-black uppercase tracking-wide shadow-lg
              transition-transform duration-200 active:scale-[0.97]"
          >
            Entrar no grupo VIP no WhatsApp
            <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
          </a>
          <p className="mt-3 text-center text-[10px] font-light tracking-wide text-foreground/45">
            Acesso gratuito &middot; Sem spam &middot; Saia quando quiser
          </p>
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/85 px-4 pt-3 backdrop-blur-md
          supports-[backdrop-filter]:bg-background/75
          pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] md:hidden"
      >
        <div className="mx-auto max-w-md">
          <a
            {...ctaLinkProps}
            className="cta-gradient cta-gradient-text flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold shadow-md
              transition-transform active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
            Grupo VIP — WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
