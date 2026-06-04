'use client';

import { useEffect, useState, useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';

export interface AvatarConfig {
  gender: 'female' | 'male';
  skinTone: 'light' | 'medium' | 'tan' | 'dark';
  hairColor: 'blonde' | 'brunette' | 'black' | 'red' | 'gray';
  hairStyle: 'long' | 'short' | 'ponytail' | 'bun';
  outfitStyle: 'sporty' | 'beach' | 'bold';
  outfitColor: string;
  eyeColor: 'brown' | 'blue' | 'green' | 'gray';
  number: number;
  level: number;
  personality?: string;
  name: string;
  generatedImageUrl?: string;
}

/* ─── Mapping helpers ─────────────────────────────────────── */

const SKIN_HEX: Record<string, string> = {
  light: 'f9dbc8', medium: 'e8ba90', tan: 'd4945a', dark: '8b5e3c',
};

const HAIR_HEX: Record<string, string> = {
  blonde: 'f0c040', brunette: '7b3f00', black: '1a1a1a', red: 'c83200', gray: '888888',
};

// Female hair styles (adventurer long/short keys)
const FEMALE_HAIR: Record<string, string> = {
  long: 'long04', short: 'short04', ponytail: 'long10', bun: 'long19',
};
// Male hair styles
const MALE_HAIR: Record<string, string> = {
  long: 'long06', short: 'short03', ponytail: 'long10', bun: 'short14',
};

// Eyes by personality
const EYES_MAP: Record<string, string> = {
  flirty: 'variant10', playful: 'variant02', serious: 'variant06',
  motivational: 'variant08', analytical: 'variant14', default: 'variant04',
};

// Mouth by personality
const MOUTH_MAP: Record<string, string> = {
  flirty: 'variant15', playful: 'variant09', serious: 'variant01',
  motivational: 'variant04', analytical: 'variant03', default: 'variant05',
};

// Eyebrow variants — stronger for male
const EYEBROW_MALE: Record<string, string> = {
  flirty: 'variant06', playful: 'variant03', serious: 'variant09',
  motivational: 'variant04', analytical: 'variant08', default: 'variant07',
};
const EYEBROW_FEMALE: Record<string, string> = {
  flirty: 'variant02', playful: 'variant01', serious: 'variant05',
  motivational: 'variant03', analytical: 'variant07', default: 'variant01',
};

/* Features by personality + outfit */
function getFeatures(personality: string, outfitStyle: string): string[] {
  const f: string[] = [];
  if (personality === 'flirty' || personality === 'playful') f.push('blush');
  if (outfitStyle === 'bold' && personality === 'flirty') f.push('blush');
  return f;
}

/* Glow color from outfitColor at various levels */
function hexToRgba(hex: string, alpha: number) {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${n >> 16},${(n >> 8) & 0xff},${n & 0xff},${alpha})`;
}

/* ─── Sub-components ──────────────────────────────────────── */

/** Animated sparkles around the avatar for levels 5–6 */
function Sparkles({ color }: { color: string }) {
  const positions = [
    { top: '-12%', left: '50%', delay: '0s', size: '18px' },
    { top: '10%', left: '-8%', delay: '0.4s', size: '14px' },
    { top: '10%', left: '108%', delay: '0.8s', size: '14px' },
    { top: '55%', left: '-14%', delay: '0.2s', size: '10px' },
    { top: '55%', left: '114%', delay: '0.6s', size: '10px' },
    { top: '88%', left: '20%', delay: '1.0s', size: '12px' },
    { top: '88%', left: '80%', delay: '0.3s', size: '12px' },
  ];
  return (
    <>
      {positions.map((p, i) => (
        <span key={i} style={{
          position: 'absolute', top: p.top, left: p.left,
          fontSize: p.size, color, transform: 'translateX(-50%)',
          animation: `pulse-glow 2s ease-in-out infinite`,
          animationDelay: p.delay, lineHeight: 1,
        }}>✦</span>
      ))}
    </>
  );
}

/** Volleyball indicator badge at bottom of portrait */
function VolleyballBadge({ outfitColor, number, outfitStyle }:
  { outfitColor: string; number: number; outfitStyle: string }) {
  const styleLabels: Record<string, string> = {
    sporty: 'Спорт', beach: 'Пляж', bold: 'Дерзкий',
  };
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg"
      style={{ backgroundColor: outfitColor, whiteSpace: 'nowrap' }}>
      🏐 #{number} · {styleLabels[outfitStyle]}
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────── */

export default function CompanionAvatar({ config }: { config: AvatarConfig }) {
  const [svgHtml, setSvgHtml] = useState('');
  const personality = config.personality ?? 'playful';

  const avatarOptions = useMemo(() => ({
    seed: `${config.name}-${config.gender}-v2`,
    skinColor: [SKIN_HEX[config.skinTone] ?? 'f9c9b6'],
    hairColor: [HAIR_HEX[config.hairColor] ?? 'f0c040'],
    hair: [config.gender === 'female'
      ? FEMALE_HAIR[config.hairStyle]
      : MALE_HAIR[config.hairStyle]],
    eyes: [EYES_MAP[personality] ?? EYES_MAP.default],
    mouth: [MOUTH_MAP[personality] ?? MOUTH_MAP.default],
    eyebrows: [config.gender === 'male'
      ? (EYEBROW_MALE[personality] ?? EYEBROW_MALE.default)
      : (EYEBROW_FEMALE[personality] ?? EYEBROW_FEMALE.default)],
    features: getFeatures(personality, config.outfitStyle),
    featuresProbability: 100,
    backgroundColor: ['b6e3f4', 'c0aede', 'ffd5dc', 'ffdfbf', 'd1f4d0'].slice(0, 1),
    backgroundType: ['solid'],
  }), [config.name, config.gender, config.skinTone, config.hairColor, config.hairStyle,
       personality, config.outfitStyle]);

  useEffect(() => {
    try {
      const avatar = createAvatar(adventurer, avatarOptions as Parameters<typeof createAvatar>[1]);
      setSvgHtml(avatar.toString());
    } catch (e) {
      console.error('DiceBear error:', e);
    }
  }, [avatarOptions]);

  const outfitColor = config.outfitColor || '#F5A623';
  const glowStrong = config.level >= 5;
  const glowMid = config.level >= 3;

  /* Dynamic background behind the portrait based on outfit */
  const bgGradient = `radial-gradient(circle at 40% 35%, ${hexToRgba(outfitColor, 0.22)}, ${hexToRgba(outfitColor, 0.06)} 70%)`;

  return (
    <div className="relative flex flex-col items-center select-none">

      {/* Outer glow ring — visible at level 3+ */}
      {glowMid && (
        <div className="absolute inset-[-6px] rounded-full opacity-60 blur-xl transition-all duration-700"
          style={{ background: `radial-gradient(circle, ${hexToRgba(outfitColor, 0.7)}, transparent 70%)` }}/>
      )}

      {/* Portrait card */}
      <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-2xl"
        style={{
          background: bgGradient,
          boxShadow: glowStrong
            ? `0 0 0 4px ${outfitColor}, 0 0 40px ${hexToRgba(outfitColor, 0.6)}`
            : glowMid
            ? `0 0 0 3px ${outfitColor}88`
            : `0 0 0 2px ${outfitColor}44`,
        }}>

        {/* Portrait — generated photo OR DiceBear SVG */}
        {config.generatedImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={config.generatedImageUrl} alt={config.name}
            className="w-full h-full object-cover object-top"/>
        ) : svgHtml ? (
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: svgHtml }}
            style={{ lineHeight: 0 }}/>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#F5A623] border-t-transparent animate-spin"/>
          </div>
        )}

        {/* Outfit badge */}
        <VolleyballBadge outfitColor={outfitColor} number={config.number} outfitStyle={config.outfitStyle}/>
      </div>

      {/* Sparkles at high levels */}
      {glowStrong && (
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles color={outfitColor}/>
        </div>
      )}

      {/* Level indicator dots below portrait */}
      <div className="flex gap-1.5 mt-3">
        {[1, 2, 3, 4, 5, 6].map(l => (
          <div key={l} className="rounded-full transition-all duration-300"
            style={{
              width: l <= config.level ? 10 : 7,
              height: l <= config.level ? 10 : 7,
              backgroundColor: l <= config.level ? outfitColor : '#E0E0E0',
              boxShadow: l <= config.level && glowStrong ? `0 0 6px ${outfitColor}` : 'none',
            }}/>
        ))}
      </div>
    </div>
  );
}
