import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* ── Colour name helper ── */
function colorName(hex: string): string {
  const map: Record<string, string> = {
    '#F5A623': 'golden yellow', '#E63946': 'red', '#2196F3': 'blue',
    '#4CAF50': 'green', '#9C27B0': 'purple', '#1A1A1A': 'black', '#FFFFFF': 'white',
  };
  return map[hex] ?? hex;
}

/* ── Build photorealistic DALL-E prompt from character config ── */
function buildPrompt(config: Record<string, unknown>): string {
  const gender = config.gender === 'female' ? 'young woman' : 'young man';
  const genderPossessive = config.gender === 'female' ? 'her' : 'his';

  const skinDesc = {
    light: 'fair porcelain skin', medium: 'warm medium skin tone',
    tan: 'sun-kissed tanned skin', dark: 'rich dark complexion',
  }[config.skinTone as string] ?? 'medium skin tone';

  const hairColorDesc = {
    blonde: 'golden blonde', brunette: 'warm brunette', black: 'jet black',
    red: 'fiery red', gray: 'silver gray',
  }[config.hairColor as string] ?? 'dark';

  const hairStyleDesc = {
    long: 'long flowing hair', short: 'short stylish hair',
    ponytail: 'sporty ponytail', bun: 'elegant hair bun',
  }[config.hairStyle as string] ?? 'hair';

  const outfitColor = colorName(config.outfitColor as string);

  const outfitDesc = {
    sporty: `athletic volleyball jersey and fitted shorts in ${outfitColor}, number ${config.number} on the jersey`,
    beach: `beach volleyball bikini in ${outfitColor}, athletic and sporty, number ${config.number}`,
    bold: `minimal beach volleyball competition bikini in ${outfitColor}, confident athletic physique, number ${config.number}`,
  }[config.outfitStyle as string] ?? `volleyball outfit in ${outfitColor}`;

  const expressionDesc = {
    serious:      'focused, intense, determined expression',
    playful:      'bright genuine smile, cheerful and approachable',
    flirty:       'alluring confident smile, slightly raised eyebrow, magnetic expression',
    motivational: 'energetic, inspiring, passionate expression',
    analytical:   'sharp intelligent gaze, composed and confident',
  }[config.personality as string] ?? 'confident athletic expression';

  const levelDesc = {
    1: 'beginner player, eager and fresh-faced',
    2: 'enthusiastic recreational player',
    3: 'skilled club-level volleyball player',
    4: 'experienced competitive athlete',
    5: 'elite professional volleyball player, peak athletic form',
    6: 'legendary world-class volleyball champion, iconic presence',
  }[config.level as number] ?? 'volleyball player';

  const positionDesc = {
    libero: 'defensive specialist, low athletic stance',
    setter: 'playmaker, hands raised ready to set',
    attacker: 'powerful attacking pose, arm raised for spike',
    blocker: 'strong blocking stance at the net',
  }[config.position as string] ?? 'volleyball player';

  const bgStyle = Number(config.level) >= 4
    ? 'dramatic golden sunset on a professional beach volleyball court, bokeh background'
    : 'sunny beach volleyball court with white sand, clear sky';

  return `Professional sports photography portrait of a ${gender}, ${levelDesc}. ` +
    `${skinDesc}, ${hairColorDesc} ${hairStyleDesc}. ` +
    `Wearing ${outfitDesc}. ` +
    `${expressionDesc}. ${positionDesc}. ` +
    `${bgStyle}. ` +
    `Sharp focus on face and upper body, warm natural lighting, photorealistic, high resolution, ` +
    `professional athletic magazine quality. The ${genderPossessive} physique is fit and athletic.`;
}

export async function POST(req: NextRequest) {
  try {
    const { config } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY не задан' }, { status: 500 });
    }

    const prompt = buildPrompt(config);
    console.log('[generate] prompt:', prompt);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd',
      response_format: 'b64_json',
    });

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) return NextResponse.json({ error: 'Пустой ответ от DALL-E' }, { status: 500 });
    const dataUrl = `data:image/png;base64,${b64}`;

    return NextResponse.json({ imageUrl: dataUrl, prompt });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[generate] error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
