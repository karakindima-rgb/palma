'use client';

import { useState, useEffect, useRef } from 'react';
import CompanionAvatar, { AvatarConfig } from '../components/CompanionAvatar';

interface CharacterConfig extends AvatarConfig {
  name: string;
  personality: 'serious' | 'playful' | 'flirty' | 'motivational' | 'analytical';
  reactionLoss: 'analyze' | 'support' | 'tease';
  reactionWin: 'calm' | 'euphoria' | 'team';
  philosophy: 'team' | 'star' | 'tactician';
  position: 'libero' | 'setter' | 'attacker' | 'blocker';
  strength: 'serve' | 'block' | 'receive' | 'attack';
  xp: number;
}

interface Message { role: 'user' | 'assistant'; content: string; }

const XP_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 99999];
const LEVEL_NAMES = ['', 'Новичок', 'Пляжник', 'Игрок', 'Ветеран', 'Мастер', 'Легенда'];
const LEVEL_EMOJIS = ['', '🌱', '🏖️', '🏐', '⚡', '🔥', '👑'];

const OUTFIT_COLORS = ['#F5A623', '#E63946', '#2196F3', '#4CAF50', '#9C27B0', '#1A1A1A', '#FFFFFF'];
const HAIR_COLORS_MAP: Record<string, string> = {
  blonde: '#F0C040', brunette: '#7B3F00', black: '#1A1A1A', red: '#C83200', gray: '#888888',
};

const DEFAULT: CharacterConfig = {
  gender: 'female', name: 'Алекса', skinTone: 'tan', hairColor: 'blonde',
  hairStyle: 'ponytail', outfitStyle: 'beach', outfitColor: '#F5A623',
  eyeColor: 'brown', number: 7, personality: 'playful', reactionLoss: 'support',
  reactionWin: 'euphoria', philosophy: 'team', position: 'attacker', strength: 'attack',
  level: 1, xp: 0,
};

function xpToNextLevel(level: number, xp: number) {
  const next = XP_THRESHOLDS[level] || 99999;
  const prev = XP_THRESHOLDS[level - 1] || 0;
  return { need: next - prev, have: xp - prev };
}

function Option({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${active ? 'bg-[#F5A623] text-white' : 'bg-black/5 text-[#555] hover:bg-black/10'}`}>
      {label}
    </button>
  );
}

function ColorSwatch({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-8 h-8 rounded-full border-2 transition-all ${active ? 'border-[#F5A623] scale-110' : 'border-transparent hover:scale-105'}`}
      style={{ backgroundColor: color }}/>
  );
}

export default function CompanionPage() {
  const [config, setConfig] = useState<CharacterConfig>(DEFAULT);
  const [tab, setTab] = useState<'appearance' | 'personality' | 'role'>('appearance');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('palma-companion');
      if (saved) setConfig(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('palma-companion', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function set<K extends keyof CharacterConfig>(key: K, val: CharacterConfig[K]) {
    setConfig(prev => ({ ...prev, [key]: val }));
  }

  function addXP(amount: number) {
    setConfig(prev => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;
      while (newLevel < 6 && newXp >= XP_THRESHOLDS[newLevel]) newLevel++;
      return { ...prev, xp: newXp, level: newLevel };
    });
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/companion/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, config }),
      });
      const data = await res.json();
      if (data.text) {
        setMessages(m => [...m, { role: 'assistant', content: data.text }]);
        addXP(5);
      } else {
        setMessages(m => [...m, { role: 'assistant', content: '⚠️ Ошибка ответа.' }]);
      }
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: '⚠️ Нет связи с сервером.' }]);
    }
    setLoading(false);
  }

  const { need, have } = xpToNextLevel(config.level, config.xp);
  const xpPct = config.level >= 6 ? 100 : Math.round((have / need) * 100);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1a1a1a]">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-xl bg-[#FAFAF7]/80 border-b border-black/5">
        <a href="/" className="text-xl font-semibold tracking-tight">🌴 Пальма</a>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#555]">
          <a href="/#about" className="hover:text-black transition-colors">О центре</a>
          <a href="/#training" className="hover:text-black transition-colors">Тренировки</a>
          <a href="/#schedule" className="hover:text-black transition-colors">Расписание</a>
          <a href="/companion" className="text-[#F5A623] font-semibold">ИИ-напарник</a>
          <a href="/#contacts" className="hover:text-black transition-colors">Контакты</a>
        </div>
        <a href="/#cta" className="bg-[#F5A623] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#e09510] transition-colors">
          Записаться
        </a>
      </nav>

      <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-[#F5A623] tracking-widest uppercase mb-3">Модуль F</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">ИИ-напарник</h1>
          <p className="text-[#777] text-lg">Создай персонажа — и тренируйся вместе</p>
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-[320px_1fr] gap-6 mb-8">

          {/* Left: Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-56 h-72 md:w-64 md:h-80 relative">
              <CompanionAvatar config={config}/>
            </div>

            {/* Name + level */}
            <div className="text-center">
              <div className="text-2xl font-bold tracking-tight">{config.name}</div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-lg">{LEVEL_EMOJIS[config.level]}</span>
                <span className="text-sm font-semibold text-[#F5A623]">{LEVEL_NAMES[config.level]}</span>
                <span className="text-xs text-[#aaa]">Ур. {config.level}/6</span>
              </div>
            </div>

            {/* XP bar */}
            <div className="w-full max-w-[240px]">
              <div className="flex justify-between text-xs text-[#aaa] mb-1">
                <span>Опыт</span>
                <span>{config.level < 6 ? `${have}/${need} XP` : 'Максимум!'}</span>
              </div>
              <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#F5A623] to-[#e09510] rounded-full transition-all duration-500"
                  style={{ width: `${xpPct}%` }}/>
              </div>
              <p className="text-[10px] text-[#bbb] mt-1 text-center">+5 XP за каждое сообщение</p>
            </div>

            {/* Position badge */}
            <div className="flex gap-2 flex-wrap justify-center">
              {[
                { label: { libero: 'Либеро', setter: 'Связующий', attacker: 'Нападающий', blocker: 'Блокирующий' }[config.position], color: '#F5A623' },
                { label: { serve: 'Подача', block: 'Блок', receive: 'Приём', attack: 'Атака' }[config.strength], color: '#E63946' },
              ].map(b => b.label && (
                <span key={b.label} className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: b.color }}>
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Editor */}
          <div className="bg-white rounded-3xl border border-black/5 p-6 shadow-sm">

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-black/5 rounded-2xl p-1">
              {(['appearance', 'personality', 'role'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${tab === t ? 'bg-white shadow-sm text-[#1a1a1a]' : 'text-[#777] hover:text-[#1a1a1a]'}`}>
                  {{ appearance: 'Внешность', personality: 'Характер', role: 'Роль' }[t]}
                </button>
              ))}
            </div>

            {/* APPEARANCE TAB */}
            {tab === 'appearance' && (
              <div className="space-y-6">
                {/* Gender */}
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Пол</label>
                  <div className="flex gap-2">
                    <Option label="Девушка" active={config.gender === 'female'} onClick={() => set('gender', 'female')}/>
                    <Option label="Парень" active={config.gender === 'male'} onClick={() => set('gender', 'male')}/>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Имя</label>
                  <input value={config.name} onChange={e => set('name', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-sm outline-none focus:border-[#F5A623] transition-colors bg-[#FAFAF7]"
                    placeholder="Имя персонажа" maxLength={20}/>
                </div>

                {/* Number */}
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Номер на форме</label>
                  <input type="number" min={1} max={99} value={config.number}
                    onChange={e => set('number', Math.max(1, Math.min(99, Number(e.target.value))))}
                    className="w-24 px-4 py-2.5 rounded-xl border border-black/10 text-sm outline-none focus:border-[#F5A623] transition-colors bg-[#FAFAF7]"/>
                </div>

                {/* Skin tone */}
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Тон кожи</label>
                  <div className="flex gap-2">
                    {(['light', 'medium', 'tan', 'dark'] as const).map(s => (
                      <ColorSwatch key={s} color={{ light: '#FFE8D0', medium: '#E8C090', tan: '#D4A568', dark: '#8B5E3C' }[s]}
                        active={config.skinTone === s} onClick={() => set('skinTone', s)}/>
                    ))}
                  </div>
                </div>

                {/* Hair color */}
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Цвет волос</label>
                  <div className="flex gap-2">
                    {(Object.entries(HAIR_COLORS_MAP) as [CharacterConfig['hairColor'], string][]).map(([k, v]) => (
                      <ColorSwatch key={k} color={v} active={config.hairColor === k} onClick={() => set('hairColor', k)}/>
                    ))}
                  </div>
                </div>

                {/* Hair style */}
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Причёска</label>
                  <div className="flex flex-wrap gap-2">
                    {(['long', 'short', 'ponytail', 'bun'] as const).map(s => (
                      <Option key={s} label={{ long: 'Длинные', short: 'Короткие', ponytail: 'Хвостик', bun: 'Пучок' }[s]}
                        active={config.hairStyle === s} onClick={() => set('hairStyle', s)}/>
                    ))}
                  </div>
                </div>

                {/* Eye color */}
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Цвет глаз</label>
                  <div className="flex gap-2">
                    {(['brown', 'blue', 'green', 'gray'] as const).map(e => (
                      <ColorSwatch key={e} color={{ brown: '#6B4226', blue: '#3A7BC8', green: '#3A8040', gray: '#607080' }[e]}
                        active={config.eyeColor === e} onClick={() => set('eyeColor', e)}/>
                    ))}
                  </div>
                </div>

                {/* Outfit style */}
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Стиль формы</label>
                  <div className="flex gap-2">
                    <Option label="Спортивный" active={config.outfitStyle === 'sporty'} onClick={() => set('outfitStyle', 'sporty')}/>
                    <Option label="Пляжный" active={config.outfitStyle === 'beach'} onClick={() => set('outfitStyle', 'beach')}/>
                    <Option label="Дерзкий" active={config.outfitStyle === 'bold'} onClick={() => set('outfitStyle', 'bold')}/>
                  </div>
                </div>

                {/* Outfit color */}
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Цвет формы</label>
                  <div className="flex gap-2 flex-wrap">
                    {OUTFIT_COLORS.map(c => (
                      <ColorSwatch key={c} color={c} active={config.outfitColor === c} onClick={() => set('outfitColor', c)}/>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PERSONALITY TAB */}
            {tab === 'personality' && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Стиль общения</label>
                  <div className="space-y-2">
                    {[
                      { k: 'serious', label: '🎯 Серьёзный', desc: 'Только дело, только волейбол' },
                      { k: 'playful', label: '😄 Игривый', desc: 'С юмором и лёгкостью' },
                      { k: 'flirty', label: '😏 Флиртующий', desc: 'Комплименты, намёки, обаяние' },
                      { k: 'motivational', label: '💪 Мотиватор', desc: 'Вдохновляет и заряжает' },
                      { k: 'analytical', label: '🧠 Аналитик', desc: 'Разбирает технику и схемы' },
                    ].map(({ k, label, desc }) => (
                      <button key={k} onClick={() => set('personality', k as CharacterConfig['personality'])}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all text-left ${config.personality === k ? 'border-[#F5A623] bg-[#FFF8EE]' : 'border-black/5 hover:border-black/10 bg-[#FAFAF7]'}`}>
                        <span className="font-medium text-sm">{label}</span>
                        <span className="text-xs text-[#888]">{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Реакция на поражение</label>
                  <div className="flex flex-wrap gap-2">
                    <Option label="Анализирует" active={config.reactionLoss === 'analyze'} onClick={() => set('reactionLoss', 'analyze')}/>
                    <Option label="Поддерживает" active={config.reactionLoss === 'support'} onClick={() => set('reactionLoss', 'support')}/>
                    <Option label="Подтрунивает" active={config.reactionLoss === 'tease'} onClick={() => set('reactionLoss', 'tease')}/>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Реакция на победу</label>
                  <div className="flex flex-wrap gap-2">
                    <Option label="Сдержанный" active={config.reactionWin === 'calm'} onClick={() => set('reactionWin', 'calm')}/>
                    <Option label="Эйфория" active={config.reactionWin === 'euphoria'} onClick={() => set('reactionWin', 'euphoria')}/>
                    <Option label="Хвалит команду" active={config.reactionWin === 'team'} onClick={() => set('reactionWin', 'team')}/>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Философия игры</label>
                  <div className="flex flex-wrap gap-2">
                    <Option label="Командный игрок" active={config.philosophy === 'team'} onClick={() => set('philosophy', 'team')}/>
                    <Option label="Звезда корта" active={config.philosophy === 'star'} onClick={() => set('philosophy', 'star')}/>
                    <Option label="Тактик" active={config.philosophy === 'tactician'} onClick={() => set('philosophy', 'tactician')}/>
                  </div>
                </div>
              </div>
            )}

            {/* ROLE TAB */}
            {tab === 'role' && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Позиция</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { k: 'libero', label: '🛡️ Либеро', desc: 'Мастер защиты и приёма' },
                      { k: 'setter', label: '🎯 Связующий', desc: 'Дирижёр атаки' },
                      { k: 'attacker', label: '⚡ Нападающий', desc: 'Острие атаки' },
                      { k: 'blocker', label: '🧱 Блокирующий', desc: 'Стена у сетки' },
                    ].map(({ k, label, desc }) => (
                      <button key={k} onClick={() => set('position', k as CharacterConfig['position'])}
                        className={`flex flex-col items-start px-4 py-3 rounded-2xl border-2 transition-all text-left ${config.position === k ? 'border-[#F5A623] bg-[#FFF8EE]' : 'border-black/5 hover:border-black/10 bg-[#FAFAF7]'}`}>
                        <span className="font-semibold text-sm">{label}</span>
                        <span className="text-xs text-[#888] mt-0.5">{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider block mb-2">Сильная сторона</label>
                  <div className="flex flex-wrap gap-2">
                    <Option label="Подача" active={config.strength === 'serve'} onClick={() => set('strength', 'serve')}/>
                    <Option label="Блок" active={config.strength === 'block'} onClick={() => set('strength', 'block')}/>
                    <Option label="Приём" active={config.strength === 'receive'} onClick={() => set('strength', 'receive')}/>
                    <Option label="Атака" active={config.strength === 'attack'} onClick={() => set('strength', 'attack')}/>
                  </div>
                </div>

                {/* Level debug */}
                <div className="mt-4 p-4 rounded-2xl bg-black/3 border border-black/5">
                  <div className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">Прокачка</div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[1, 2, 3, 4, 5, 6].map(l => (
                      <button key={l} onClick={() => setConfig(p => ({ ...p, level: l, xp: XP_THRESHOLDS[l - 1] || 0 }))}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${config.level === l ? 'bg-[#F5A623] text-white' : 'bg-black/5 text-[#777] hover:bg-black/10'}`}>
                        {LEVEL_EMOJIS[l]} {l}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#aaa] text-center">Уровень влияет на знания и речь персонажа</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat section */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-black/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FFF0D0] flex items-center justify-center text-lg">
              {config.gender === 'female' ? '👩' : '👨'}
            </div>
            <div>
              <div className="font-semibold text-sm">{config.name}</div>
              <div className="text-xs text-[#aaa]">{LEVEL_NAMES[config.level]} · {LEVEL_EMOJIS[config.level]}</div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-green-400"/>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="h-72 overflow-y-auto p-6 space-y-4 scroll-smooth">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-4xl mb-3">{LEVEL_EMOJIS[config.level]}</div>
                <p className="text-sm text-[#aaa] max-w-xs">
                  Напиши что-нибудь — {config.name} ответит исходя из своего уровня и характера
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#FFF0D0] flex items-center justify-center text-sm flex-shrink-0 mt-1">
                    {config.gender === 'female' ? '👩' : '👨'}
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#F5A623] text-white rounded-tr-sm'
                    : 'bg-[#F5F5F0] text-[#1a1a1a] rounded-tl-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFF0D0] flex items-center justify-center text-sm">
                  {config.gender === 'female' ? '👩' : '👨'}
                </div>
                <div className="bg-[#F5F5F0] px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1 items-center h-5">
                    <div className="w-2 h-2 bg-[#aaa] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <div className="w-2 h-2 bg-[#aaa] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                    <div className="w-2 h-2 bg-[#aaa] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-4 border-t border-black/5 flex gap-3">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder={`Написать ${config.name}...`}
              className="flex-1 px-5 py-3 rounded-full bg-[#F5F5F0] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#F5A623]/30 transition-all"
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}
              className="w-11 h-11 rounded-full bg-[#F5A623] text-white flex items-center justify-center hover:bg-[#e09510] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
