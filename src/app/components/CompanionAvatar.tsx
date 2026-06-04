'use client';

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
}

const SKIN: Record<string, string> = {
  light: '#FFE8D0', medium: '#E8C090', tan: '#D4A568', dark: '#8B5E3C',
};
const SKIN_SHADOW: Record<string, string> = {
  light: '#EAC8A8', medium: '#CCA870', tan: '#BB8848', dark: '#6E4428',
};
const HAIR: Record<string, string> = {
  blonde: '#F0C040', brunette: '#7B3F00', black: '#1A1A1A', red: '#C83200', gray: '#888888',
};
const BROW: Record<string, string> = {
  blonde: '#8B6914', brunette: '#5C3317', black: '#1A1A1A', red: '#7A2000', gray: '#555555',
};
const EYE_IRIS: Record<string, string> = {
  brown: '#6B4226', blue: '#3A7BC8', green: '#3A8040', gray: '#607080',
};

function darken(hex: string, pct: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (n >> 16) - Math.round(((n >> 16) * pct) / 100));
  const g = Math.max(0, ((n >> 8) & 0xff) - Math.round((((n >> 8) & 0xff) * pct) / 100));
  const b = Math.max(0, (n & 0xff) - Math.round(((n & 0xff) * pct) / 100));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function FemaleFace({ skin, brow, eyeIris }: { skin: string; brow: string; eyeIris: string }) {
  return (
    <g>
      {/* Eyebrows */}
      <path d="M 82 46 Q 88 42 94 45" stroke={brow} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M 106 45 Q 112 42 118 46" stroke={brow} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Eyelash upper */}
      <path d="M 79 50 Q 84 47 88 48 Q 93 47 97 50" stroke="#1A1A1A" strokeWidth="1.5" fill="none"/>
      <path d="M 103 50 Q 107 47 112 48 Q 116 47 121 50" stroke="#1A1A1A" strokeWidth="1.5" fill="none"/>
      {/* Eyes white */}
      <ellipse cx="88" cy="54" rx="9" ry="7" fill="white"/>
      <ellipse cx="112" cy="54" rx="9" ry="7" fill="white"/>
      {/* Iris */}
      <ellipse cx="88" cy="54" rx="6" ry="6.5" fill={eyeIris}/>
      <ellipse cx="112" cy="54" rx="6" ry="6.5" fill={eyeIris}/>
      {/* Pupil */}
      <circle cx="88" cy="54" r="3.5" fill="#0A0A0A"/>
      <circle cx="112" cy="54" r="3.5" fill="#0A0A0A"/>
      {/* Highlight */}
      <circle cx="90" cy="52" r="1.8" fill="white"/>
      <circle cx="114" cy="52" r="1.8" fill="white"/>
      {/* Nose subtle */}
      <path d="M 99 62 Q 97 70 99 72 Q 100 73 101 72 Q 103 70 101 62" stroke={SKIN_SHADOW['medium']} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Lips */}
      <path d="M 90 79 Q 95 75 100 76.5 Q 105 75 110 79 Q 107 86 100 87.5 Q 93 86 90 79 Z" fill="#E07060"/>
      <path d="M 90 79 Q 100 82 110 79" stroke="#C55040" strokeWidth="1" fill="none"/>
      {/* Blush */}
      <ellipse cx="78" cy="66" rx="9" ry="5.5" fill="#FF8888" fillOpacity="0.18"/>
      <ellipse cx="122" cy="66" rx="9" ry="5.5" fill="#FF8888" fillOpacity="0.18"/>
    </g>
  );
}

function MaleFace({ skin, brow, eyeIris }: { skin: string; brow: string; eyeIris: string }) {
  void skin;
  return (
    <g>
      {/* Eyebrows - thicker, straighter */}
      <path d="M 81 46 Q 88 42 95 44" stroke={brow} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M 105 44 Q 112 42 119 46" stroke={brow} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Eyes */}
      <ellipse cx="88" cy="55" rx="8.5" ry="7" fill="white"/>
      <ellipse cx="112" cy="55" rx="8.5" ry="7" fill="white"/>
      <ellipse cx="88" cy="55" rx="5.5" ry="6" fill={eyeIris}/>
      <ellipse cx="112" cy="55" rx="5.5" ry="6" fill={eyeIris}/>
      <circle cx="88" cy="55" r="3.2" fill="#0A0A0A"/>
      <circle cx="112" cy="55" r="3.2" fill="#0A0A0A"/>
      <circle cx="90" cy="53" r="1.6" fill="white"/>
      <circle cx="114" cy="53" r="1.6" fill="white"/>
      {/* Nose - stronger */}
      <path d="M 98 62 Q 95 72 98 75 Q 100 76.5 102 75 Q 105 72 102 62" stroke={SKIN_SHADOW['medium']} strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Lips - thinner */}
      <path d="M 91 80 Q 96 78 100 79 Q 104 78 109 80 Q 107 85 100 86 Q 93 85 91 80 Z" fill="#C07060"/>
      {/* Jaw shadow hint */}
      <path d="M 68 78 Q 100 94 132 78" stroke={SKIN_SHADOW['medium']} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
    </g>
  );
}

function FemaleHair({ style, color }: { style: string; color: string }) {
  const dark = darken(color, 20);
  if (style === 'long') return (
    <g>
      <path d="M 64 44 C 52 85 50 170 56 220 Q 66 252 80 250 Q 90 248 96 228 Q 100 215 104 228 Q 110 248 120 250 Q 134 252 144 220 C 150 170 148 85 136 44 Q 118 18 100 18 Q 82 18 64 44 Z" fill={color}/>
      <path d="M 64 44 C 56 75 54 130 58 180 Q 62 210 66 222" stroke={dark} strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M 136 44 C 144 75 146 130 142 180 Q 138 210 134 222" stroke={dark} strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round"/>
      {/* Front face-frame strands */}
      <path d="M 72 38 Q 64 55 66 90 Q 67 105 69 114" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M 128 38 Q 136 55 134 90 Q 133 105 131 114" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round"/>
    </g>
  );
  if (style === 'ponytail') return (
    <g>
      <path d="M 66 44 C 60 70 60 100 64 130 L 62 108 Q 100 118 138 108 L 136 130 C 140 100 140 70 134 44 Q 117 18 100 18 Q 83 18 66 44 Z" fill={color}/>
      <path d="M 90 25 Q 100 18 110 25 L 116 130 Q 108 152 100 154 Q 92 152 84 130 Z" fill={dark}/>
      <path d="M 97 25 L 100 18 L 103 25" fill={color}/>
      {/* Ponytail strand lines */}
      <path d="M 93 130 Q 100 138 107 130" stroke={color} strokeWidth="2" fill="none" opacity="0.5"/>
    </g>
  );
  if (style === 'bun') return (
    <g>
      <path d="M 66 44 C 60 70 60 100 66 120 L 64 108 Q 100 118 136 108 L 134 120 C 140 100 140 70 134 44 Q 117 18 100 18 Q 83 18 66 44 Z" fill={color}/>
      {/* Bun */}
      <circle cx="100" cy="22" r="18" fill={dark}/>
      <circle cx="100" cy="22" r="16" fill={color}/>
      <path d="M 88 22 Q 100 16 112 22" stroke={dark} strokeWidth="2" fill="none" opacity="0.5"/>
    </g>
  );
  // short
  return (
    <g>
      <path d="M 67 44 C 62 70 62 95 66 110 Q 100 120 134 110 C 138 95 138 70 133 44 Q 116 18 100 18 Q 84 18 67 44 Z" fill={color}/>
      <path d="M 66 80 Q 63 95 66 110" stroke={dark} strokeWidth="2" fill="none" opacity="0.4"/>
      <path d="M 134 80 Q 137 95 134 110" stroke={dark} strokeWidth="2" fill="none" opacity="0.4"/>
    </g>
  );
}

function MaleHair({ style, color }: { style: string; color: string }) {
  const dark = darken(color, 25);
  if (style === 'long') return (
    <g>
      <path d="M 68 42 C 58 70 56 130 60 170 Q 64 200 70 210 Q 80 215 86 200 L 84 108 Q 100 115 116 108 L 114 200 Q 120 215 130 210 Q 136 200 140 170 C 144 130 142 70 132 42 Q 116 18 100 18 Q 84 18 68 42 Z" fill={color}/>
      <path d="M 68 42 C 62 70 60 120 62 160" stroke={dark} strokeWidth="2" fill="none" opacity="0.4"/>
    </g>
  );
  if (style === 'ponytail') return (
    <g>
      <path d="M 68 42 C 62 68 62 95 66 115 Q 100 124 134 115 C 138 95 138 68 132 42 Q 116 18 100 18 Q 84 18 68 42 Z" fill={color}/>
      <path d="M 93 22 Q 100 15 107 22 L 110 90 Q 104 110 100 112 Q 96 110 90 90 Z" fill={dark}/>
    </g>
  );
  if (style === 'bun') return (
    <g>
      <path d="M 68 42 C 62 68 62 95 66 115 Q 100 124 134 115 C 138 95 138 68 132 42 Q 116 18 100 18 Q 84 18 68 42 Z" fill={color}/>
      <circle cx="100" cy="22" r="16" fill={dark}/>
      <circle cx="100" cy="22" r="14" fill={color}/>
    </g>
  );
  // short
  return (
    <g>
      <path d="M 69 42 C 63 65 63 90 67 110 Q 100 122 133 110 C 137 90 137 65 131 42 Q 115 18 100 18 Q 85 18 69 42 Z" fill={color}/>
    </g>
  );
}

function FemaleBody({ skin, skinShadow }: { skin: string; skinShadow: string }) {
  return (
    <g>
      {/* Neck */}
      <path d="M 88 89 L 112 89 L 114 112 L 86 112 Z" fill={skin}/>
      {/* Torso */}
      <path d="M 46 108 L 154 108 L 132 198 L 68 198 Z" fill={skin}/>
      {/* Hips */}
      <path d="M 68 196 L 132 196 L 138 225 L 62 225 Z" fill={skin}/>
      {/* Subtle waist shadow */}
      <path d="M 70 180 Q 100 186 130 180" stroke={skinShadow} strokeWidth="1.5" fill="none" opacity="0.3"/>
      {/* Left upper arm */}
      <path d="M 44 108 L 62 108 L 46 196 L 26 196 Z" fill={skin}/>
      {/* Left forearm */}
      <path d="M 26 196 L 46 196 L 42 268 L 22 268 Z" fill={skin}/>
      {/* Left hand */}
      <ellipse cx="32" cy="274" rx="11" ry="8" fill={skin}/>
      {/* Right upper arm */}
      <path d="M 138 108 L 156 108 L 174 196 L 154 196 Z" fill={skin}/>
      {/* Right forearm */}
      <path d="M 154 196 L 174 196 L 178 268 L 158 268 Z" fill={skin}/>
      {/* Right hand */}
      <ellipse cx="168" cy="274" rx="11" ry="8" fill={skin}/>
      {/* Left leg */}
      <path d="M 62 223 L 98 223 L 95 328 L 60 328 Z" fill={skin}/>
      <path d="M 60 326 L 94 326 L 91 372 L 58 372 Z" fill={skin}/>
      <ellipse cx="74" cy="376" rx="18" ry="8" fill={skin}/>
      {/* Right leg */}
      <path d="M 102 223 L 138 223 L 140 328 L 105 328 Z" fill={skin}/>
      <path d="M 106 326 L 140 326 L 141 372 L 108 372 Z" fill={skin}/>
      <ellipse cx="124" cy="376" rx="18" ry="8" fill={skin}/>
      {/* Inner leg shadow */}
      <path d="M 94 230 L 93 320" stroke={skinShadow} strokeWidth="2" fill="none" opacity="0.2"/>
      <path d="M 106 230 L 107 320" stroke={skinShadow} strokeWidth="2" fill="none" opacity="0.2"/>
    </g>
  );
}

function MaleBody({ skin, skinShadow }: { skin: string; skinShadow: string }) {
  return (
    <g>
      {/* Neck - wider */}
      <path d="M 85 89 L 115 89 L 116 112 L 84 112 Z" fill={skin}/>
      {/* Torso - straighter, broader */}
      <path d="M 40 108 L 160 108 L 134 205 L 66 205 Z" fill={skin}/>
      {/* Hips - similar to waist */}
      <path d="M 66 203 L 134 203 L 136 225 L 64 225 Z" fill={skin}/>
      {/* Chest muscle shadow */}
      <path d="M 55 120 Q 95 128 100 125 Q 105 128 145 120" stroke={skinShadow} strokeWidth="2" fill="none" opacity="0.25"/>
      <path d="M 66 155 Q 100 162 134 155" stroke={skinShadow} strokeWidth="1.5" fill="none" opacity="0.2"/>
      {/* Abs hint */}
      <path d="M 84 170 Q 100 175 116 170" stroke={skinShadow} strokeWidth="1.5" fill="none" opacity="0.2"/>
      <path d="M 84 188 Q 100 193 116 188" stroke={skinShadow} strokeWidth="1.5" fill="none" opacity="0.2"/>
      {/* Left upper arm - wider */}
      <path d="M 38 108 L 58 108 L 40 196 L 18 196 Z" fill={skin}/>
      {/* Left forearm */}
      <path d="M 18 196 L 40 196 L 36 268 L 14 268 Z" fill={skin}/>
      {/* Left hand */}
      <ellipse cx="25" cy="274" rx="12" ry="9" fill={skin}/>
      {/* Right upper arm */}
      <path d="M 142 108 L 162 108 L 182 196 L 160 196 Z" fill={skin}/>
      {/* Right forearm */}
      <path d="M 160 196 L 182 196 L 186 268 L 164 268 Z" fill={skin}/>
      {/* Right hand */}
      <ellipse cx="175" cy="274" rx="12" ry="9" fill={skin}/>
      {/* Left leg */}
      <path d="M 64 223 L 100 223 L 97 330 L 62 330 Z" fill={skin}/>
      <path d="M 62 328 L 96 328 L 93 372 L 60 372 Z" fill={skin}/>
      <ellipse cx="76" cy="376" rx="19" ry="8" fill={skin}/>
      {/* Right leg */}
      <path d="M 100 223 L 136 223 L 138 330 L 103 330 Z" fill={skin}/>
      <path d="M 104 328 L 138 328 L 139 372 L 106 372 Z" fill={skin}/>
      <ellipse cx="122" cy="376" rx="19" ry="8" fill={skin}/>
      {/* Inner leg shadow */}
      <path d="M 96 230 L 95 322" stroke={skinShadow} strokeWidth="2" fill="none" opacity="0.2"/>
      <path d="M 104 230 L 105 322" stroke={skinShadow} strokeWidth="2" fill="none" opacity="0.2"/>
    </g>
  );
}

function FemaleOutfit({ style, color, number }: { style: string; color: string; number: number }) {
  const dark = darken(color, 22);
  const numStr = String(number);

  if (style === 'sporty') return (
    <g>
      {/* Sports bra */}
      <path d="M 50 108 L 150 108 L 142 158 L 58 158 Z" fill={color}/>
      <path d="M 50 108 L 150 108 L 148 118 L 52 118 Z" fill={dark}/>
      {/* Cleavage line */}
      <path d="M 100 115 L 100 156" stroke={dark} strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* Shoulders straps */}
      <path d="M 68 108 L 62 108" stroke={dark} strokeWidth="3" strokeLinecap="round"/>
      <path d="M 132 108 L 138 108" stroke={dark} strokeWidth="3" strokeLinecap="round"/>
      {/* Shorts */}
      <path d="M 60 194 L 140 194 L 144 268 L 56 268 Z" fill={color}/>
      <path d="M 60 194 L 140 194 L 142 206 L 58 206 Z" fill={dark}/>
      {/* Number */}
      <text x="100" y="250" textAnchor="middle" fill="white" fontWeight="bold" fontSize="26" fontFamily="system-ui">{numStr}</text>
    </g>
  );

  if (style === 'beach') return (
    <g>
      {/* Bikini top - halter cups */}
      <path d="M 56 108 L 98 108 L 94 150 Q 78 156 62 144 Q 52 132 56 108 Z" fill={color}/>
      <path d="M 102 108 L 144 108 Q 148 132 138 144 Q 122 156 106 150 Z" fill={color}/>
      {/* Top shading */}
      <path d="M 56 108 L 98 108 L 97 118 L 58 116 Z" fill={dark} opacity="0.5"/>
      <path d="M 102 108 L 144 108 L 142 116 L 103 118 Z" fill={dark} opacity="0.5"/>
      {/* Center clasp */}
      <circle cx="100" cy="110" r="4" fill={dark}/>
      {/* Neck ties */}
      <path d="M 78 108 Q 100 104 122 108" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Bikini bottom */}
      <path d="M 63 196 L 137 196 C 142 218 140 246 130 250 Q 100 258 70 250 C 60 246 58 218 63 196 Z" fill={color}/>
      <path d="M 63 196 L 137 196 L 138 207 L 62 207 Z" fill={dark} opacity="0.5"/>
      {/* Number on bottom */}
      <text x="100" y="236" textAnchor="middle" fill="white" fontWeight="bold" fontSize="20" fontFamily="system-ui">{numStr}</text>
    </g>
  );

  // bold
  return (
    <g>
      {/* Bold bikini top - smaller cups, bolder cut */}
      <path d="M 62 112 L 97 112 L 93 150 Q 78 158 64 146 Q 56 134 62 112 Z" fill={color}/>
      <path d="M 103 112 L 138 112 Q 144 134 136 146 Q 122 158 107 150 Z" fill={color}/>
      <path d="M 62 112 L 97 112 L 96 122 L 64 120 Z" fill={dark} opacity="0.5"/>
      <path d="M 103 112 L 138 112 L 136 120 L 104 122 Z" fill={dark} opacity="0.5"/>
      {/* Center ring */}
      <circle cx="100" cy="113" r="5" fill={dark}/>
      <circle cx="100" cy="113" r="3" fill={color}/>
      {/* Neck strap */}
      <path d="M 80 110 Q 100 105 120 110" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Bold V-cut bikini bottom */}
      <path d="M 68 196 L 100 204 L 132 196 C 136 216 134 244 124 250 Q 100 258 76 250 C 66 244 64 216 68 196 Z" fill={color}/>
      <path d="M 68 196 L 100 204 L 132 196 L 130 207 L 100 214 L 70 207 Z" fill={dark} opacity="0.5"/>
      {/* Number */}
      <text x="100" y="240" textAnchor="middle" fill="white" fontWeight="bold" fontSize="18" fontFamily="system-ui">{numStr}</text>
    </g>
  );
}

function MaleOutfit({ style, color, number }: { style: string; color: string; number: number }) {
  const dark = darken(color, 22);
  const numStr = String(number);

  if (style === 'sporty') return (
    <g>
      {/* Jersey (sleeveless) */}
      <path d="M 44 108 L 156 108 L 132 210 L 68 210 Z" fill={color}/>
      {/* V-neck */}
      <path d="M 86 108 L 100 135 L 114 108" fill="none" stroke="white" strokeWidth="2"/>
      {/* Jersey top shading */}
      <path d="M 44 108 L 156 108 L 154 120 L 46 120 Z" fill={dark} opacity="0.4"/>
      {/* Number */}
      <text x="100" y="188" textAnchor="middle" fill="white" fontWeight="bold" fontSize="28" fontFamily="system-ui">{numStr}</text>
      {/* Shorts (knee length) */}
      <path d="M 62 202 L 138 202 L 140 310 L 60 310 Z" fill={color}/>
      <path d="M 62 202 L 138 202 L 139 214 L 61 214 Z" fill={dark} opacity="0.5"/>
      {/* Shorts seam */}
      <path d="M 100 202 L 100 308" stroke={dark} strokeWidth="1.5" fill="none" opacity="0.3"/>
    </g>
  );

  if (style === 'beach') return (
    <g>
      {/* Board shorts */}
      <path d="M 62 202 L 138 202 L 140 314 L 60 314 Z" fill={color}/>
      <path d="M 62 202 L 138 202 L 139 215 L 61 215 Z" fill={dark} opacity="0.5"/>
      {/* Waistband */}
      <path d="M 62 202 L 138 202 L 138 210 L 62 210 Z" fill={dark} opacity="0.6"/>
      {/* Board shorts pattern/stripe */}
      <path d="M 66 230 L 66 310 L 72 310 L 72 230 Z" fill={dark} opacity="0.25"/>
      {/* Number */}
      <text x="105" y="270" textAnchor="middle" fill="white" fontWeight="bold" fontSize="22" fontFamily="system-ui">{numStr}</text>
    </g>
  );

  // bold - fitted shorts, bare chest
  return (
    <g>
      {/* Compression shorts */}
      <path d="M 63 202 L 137 202 L 139 272 L 61 272 Z" fill={color}/>
      <path d="M 63 202 L 137 202 L 137 214 L 63 214 Z" fill={dark} opacity="0.6"/>
      {/* Side stripe */}
      <path d="M 62 202 L 68 202 L 68 272 L 63 272 Z" fill={dark} opacity="0.4"/>
      <path d="M 132 202 L 138 202 L 137 272 L 132 272 Z" fill={dark} opacity="0.4"/>
      {/* Number */}
      <text x="100" y="248" textAnchor="middle" fill="white" fontWeight="bold" fontSize="22" fontFamily="system-ui">{numStr}</text>
    </g>
  );
}

export default function CompanionAvatar({ config }: { config: AvatarConfig }) {
  const skin = SKIN[config.skinTone] || SKIN.medium;
  const skinShadow = SKIN_SHADOW[config.skinTone] || SKIN_SHADOW.medium;
  const hair = HAIR[config.hairColor] || HAIR.blonde;
  const brow = BROW[config.hairColor] || BROW.brunette;
  const eyeIris = EYE_IRIS[config.eyeColor] || EYE_IRIS.brown;
  const outfit = config.outfitColor || '#F5A623';

  const glowColor = config.level >= 5 ? '#F5A623' : config.level >= 3 ? '#F5A62388' : 'transparent';
  const glowSize = config.level >= 5 ? 28 : config.level >= 3 ? 18 : 0;

  return (
    <svg viewBox="0 0 200 388" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glowColor} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={glowColor} stopOpacity="0"/>
        </radialGradient>
        <filter id="glow-filter">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Aura for high levels */}
      {glowSize > 0 && (
        <ellipse cx="100" cy="220" rx={80 + glowSize} ry={160 + glowSize} fill="url(#aura)"/>
      )}

      {/* Hair back layer */}
      {config.gender === 'female'
        ? <FemaleHair style={config.hairStyle} color={hair}/>
        : <MaleHair style={config.hairStyle} color={hair}/>
      }

      {/* Body skin */}
      {config.gender === 'female'
        ? <FemaleBody skin={skin} skinShadow={skinShadow}/>
        : <MaleBody skin={skin} skinShadow={skinShadow}/>
      }

      {/* Outfit */}
      {config.gender === 'female'
        ? <FemaleOutfit style={config.outfitStyle} color={outfit} number={config.number}/>
        : <MaleOutfit style={config.outfitStyle} color={outfit} number={config.number}/>
      }

      {/* Head on top */}
      <circle cx="100" cy="55" r="36" fill={skin}/>

      {/* Face */}
      {config.gender === 'female'
        ? <FemaleFace skin={skin} brow={brow} eyeIris={eyeIris}/>
        : <MaleFace skin={skin} brow={brow} eyeIris={eyeIris}/>
      }

      {/* Level sparkle at high levels */}
      {config.level >= 5 && (
        <g filter="url(#glow-filter)" opacity="0.8">
          <polygon points="100,4 102,10 108,10 103,14 105,20 100,16 95,20 97,14 92,10 98,10" fill="#F5A623"/>
        </g>
      )}
    </svg>
  );
}
