"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.3) % 90}%`,
  size: 4 + (i % 4) * 2,
  duration: 8 + (i % 5) * 3,
  delay: (i * 0.7) % 7,
  opacity: 0.3 + (i % 4) * 0.15,
}));

// Floating palm leaves around the title
const LEAVES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  emoji: "🌿",
  x: -30 + (i * 18) % 160, // percent offset from center, -30% to 130%
  startY: 20 + (i * 7) % 40,
  size: 16 + (i % 4) * 6,
  duration: 4 + (i % 4) * 2,
  delay: (i * 0.6) % 5,
  rotate: -30 + (i * 23) % 60,
  drift: -15 + (i * 11) % 30,
}));

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const parallax = scrollY * 0.4;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">

      {/* BG Image with Ken Burns + parallax */}
      <div
        className="absolute inset-0 z-0 animate-bg-ken"
        style={{ transform: `translateY(${parallax}px) scale(1.08)` }}
      >
        <Image
          src="/hero2.png"
          alt="Beach volleyball"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/10 to-[#FAFAF7]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/30 via-transparent to-black/20" />

      {/* Warm glow orbs */}
      <div className="absolute z-10 rounded-full blur-3xl animate-float-slow pointer-events-none"
        style={{ width: 500, height: 500, bottom: "10%", left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(245,166,35,0.25) 0%, transparent 70%)" }} />
      <div className="absolute z-10 rounded-full blur-2xl animate-float-med pointer-events-none"
        style={{ width: 300, height: 300, top: "15%", right: "10%",
          background: "radial-gradient(circle, rgba(255,140,66,0.2) 0%, transparent 70%)" }} />

      {/* Floating gold particles */}
      {PARTICLES.map((p) => (
        <span key={p.id} className="absolute z-10 rounded-full pointer-events-none"
          style={{ left: p.left, bottom: "-10px", width: p.size, height: p.size,
            opacity: p.opacity, background: "rgba(245,166,35,0.7)",
            animation: `particles ${p.duration}s ${p.delay}s linear infinite` }} />
      ))}

      {/* ─── CORNER PALMS ─── anchored to edges, overflowing outside viewport */}

      {/* Top-left palm — anchored to top-left corner, hangs down-right */}
      <div className="absolute z-20 pointer-events-none animate-float-slow"
        style={{ top: -40, left: -60, width: 340, height: 340, transformOrigin: "top left" }}>
        <Image src="/palms.png" alt="" width={340} height={340}
          className="object-contain drop-shadow-2xl" style={{ opacity: 0.92 }} />
      </div>

      {/* Top-right palm — mirrored, anchored to top-right */}
      <div className="absolute z-20 pointer-events-none animate-float-med"
        style={{ top: -40, right: -60, width: 340, height: 340, transform: "scaleX(-1)", transformOrigin: "top right" }}>
        <Image src="/palms.png" alt="" width={340} height={340}
          className="object-contain drop-shadow-2xl" style={{ opacity: 0.85 }} />
      </div>

      {/* CONTENT */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 pt-24 pb-32">

        {/* Badge */}
        <div className={`inline-flex items-center gap-2 glass px-5 py-2 rounded-full text-white text-sm font-medium mb-8 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "0ms" }}>
          <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
          Пляжный волейбольный центр · Москва
        </div>

        {/* Title with floating palm leaves */}
        <div className={`relative inline-block mb-6 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{ transitionDelay: "150ms" }}>

          {/* Palm leaf emojis floating around the word */}
          {loaded && LEAVES.map((l) => (
            <span key={l.id} className="absolute pointer-events-none select-none"
              style={{
                fontSize: l.size,
                left: `${l.x}%`,
                bottom: `${l.startY}%`,
                animation: `leafFloat ${l.duration}s ${l.delay}s ease-in-out infinite`,
                transform: `rotate(${l.rotate}deg)`,
                opacity: 0.85,
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))",
                zIndex: 1,
              }}>
              🌿
            </span>
          ))}

          <h1 className="relative text-7xl md:text-9xl font-black tracking-tighter leading-none text-white drop-shadow-[0_4px_32px_rgba(245,166,35,0.5)]"
            style={{ textShadow: "0 0 60px rgba(245,166,35,0.4), 0 4px 20px rgba(0,0,0,0.6)" }}>
            Пальма
          </h1>
        </div>

        {/* Subheadline */}
        <p className={`text-xl md:text-3xl text-white/90 font-light mb-4 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "300ms" }}>
          Тренируйся на песке.
        </p>
        <p className={`text-xl md:text-3xl font-semibold text-[#FFD166] mb-14 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "400ms" }}>
          Играй на уровне профи.
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-20 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "550ms" }}>
          <a href="#cta" className="glow-btn gradient-bg text-white font-bold px-10 py-5 rounded-full text-lg hover:scale-105 active:scale-95 transition-transform shadow-xl">
            Первая тренировка бесплатно →
          </a>
          <a href="#about" className="glass text-white font-semibold px-10 py-5 rounded-full text-lg hover:scale-105 active:scale-95 transition-transform hover:bg-white/20">
            Узнать больше
          </a>
        </div>

        {/* Stats */}
        <div className={`flex flex-wrap justify-center gap-6 md:gap-12 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "700ms" }}>
          {[
            { num: "6", label: "кортов" },
            { num: "200+", label: "игроков" },
            { num: "12", label: "тренеров" },
            { num: "5 лет", label: "опыта" },
          ].map((s) => (
            <div key={s.label} className="glass px-6 py-4 rounded-2xl text-center min-w-[100px]">
              <div className="text-2xl md:text-3xl font-black text-[#F5A623]">{s.num}</div>
              <div className="text-xs text-white/70 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 z-30 flex flex-col items-center gap-2 animate-scroll">
        <span className="text-xs text-white/50 tracking-widest uppercase">Листай</span>
        <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
}
