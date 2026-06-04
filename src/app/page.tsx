import Image from "next/image";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className="bg-[#FAFAF7] text-[#1a1a1a]">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-xl bg-[#FAFAF7]/80 border-b border-black/5">
        <div className="text-xl font-semibold tracking-tight">🌴 Пальма</div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#555]">
          <a href="#about" className="hover:text-black transition-colors">О центре</a>
          <a href="#training" className="hover:text-black transition-colors">Тренировки</a>
          <a href="#schedule" className="hover:text-black transition-colors">Расписание</a>
          <a href="#contacts" className="hover:text-black transition-colors">Контакты</a>
          <a href="/companion" className="text-[#F5A623] font-semibold hover:text-[#e09510] transition-colors">ИИ-напарник</a>
        </div>
        <a href="#cta" className="bg-[#F5A623] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#e09510] transition-colors">
          Записаться
        </a>
      </nav>

      {/* HERO */}
      <HeroSection />

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-[#F5A623] tracking-widest uppercase mb-4">О центре</p>
              <h2 className="text-5xl font-bold tracking-tight leading-tight mb-6">
                Песок — это<br />другой уровень
              </h2>
              <p className="text-lg text-[#555] leading-relaxed mb-6">
                «Пальма» — это пространство для тех, кто хочет развиваться в пляжном волейболе. Мы создали среду, где новички становятся стабильными игроками, а опытные — поднимаются на новый уровень.
              </p>
              <p className="text-lg text-[#555] leading-relaxed mb-10">
                Наши корты находятся под открытым небом. Живой песок, настоящие условия, профессиональные тренеры.
              </p>
              <a href="#training" className="inline-flex items-center gap-2 text-[#F5A623] font-semibold hover:gap-4 transition-all">
                Смотреть тренировки
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/about.png" alt="Тренировка" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* COURTS AERIAL */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image src="/courts.png" alt="Наши корты" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold text-[#F5A623] tracking-widest uppercase mb-3">Наша площадка</p>
            <h2 className="text-5xl font-bold tracking-tight mb-4">6 кортов под открытым небом</h2>
            <p className="text-lg text-white/80 max-w-xl">Живой песок, профессиональные сетки, освещение для вечерних игр. Всё для настоящего пляжного волейбола.</p>
          </div>
        </div>
      </section>

      {/* TRAINING */}
      <section id="training" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#F5A623] tracking-widest uppercase mb-4">Тренировки</p>
            <h2 className="text-5xl font-bold tracking-tight">Найди свой формат</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏐",
                title: "Для новичков",
                desc: "Базовая техника: приём, подача, атака. Маленькие группы, внимательные тренеры. Прогресс с первой тренировки.",
                price: "от 1 200 ₽",
                color: "#FFF8EE",
                border: "#F5A623",
              },
              {
                icon: "🔥",
                title: "Продвинутый",
                desc: "Тактика игры, командная слаженность, разбор ошибок. Для тех, кто уже умеет играть и хочет расти дальше.",
                price: "от 1 800 ₽",
                color: "#FFFBF0",
                border: "#E8921A",
              },
              {
                icon: "🏆",
                title: "Турнирный",
                desc: "Подготовка к соревнованиям. Физика, игровой интеллект, разбор соперников. Для амбициозных игроков.",
                price: "от 2 400 ₽",
                color: "#FFF5E5",
                border: "#D4801A",
              },
            ].map((t) => (
              <div
                key={t.title}
                className="rounded-3xl p-8 border-2 hover:scale-[1.02] transition-transform cursor-pointer"
                style={{ backgroundColor: t.color, borderColor: t.border }}
              >
                <div className="text-4xl mb-5">{t.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{t.title}</h3>
                <p className="text-[#666] leading-relaxed mb-6">{t.desc}</p>
                <div className="text-xl font-bold text-[#F5A623]">{t.price}</div>
                <div className="text-sm text-[#999] mt-1">за тренировку</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#F5A623] tracking-widest uppercase mb-4">Расписание</p>
            <h2 className="text-5xl font-bold tracking-tight">Тренировки каждый день</h2>
          </div>
          <div className="space-y-3">
            {[
              { day: "Понедельник — Пятница", time: "07:00 — 09:00", type: "Утренние группы (новички)", spots: "3 места" },
              { day: "Понедельник — Пятница", time: "18:00 — 20:00", type: "Вечерние группы (продвинутые)", spots: "2 места" },
              { day: "Суббота", time: "10:00 — 13:00", type: "Интенсив выходного дня", spots: "5 мест" },
              { day: "Воскресенье", time: "11:00 — 14:00", type: "Открытая игра + разбор", spots: "8 мест" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between px-7 py-5 rounded-2xl bg-[#FAFAF7] border border-black/5 hover:border-[#F5A623]/40 transition-colors">
                <div>
                  <div className="font-semibold">{r.type}</div>
                  <div className="text-sm text-[#888] mt-1">{r.day} · {r.time}</div>
                </div>
                <div className="text-sm font-medium text-[#F5A623] bg-[#FFF8EE] px-4 py-1.5 rounded-full">{r.spots}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI COMPANION TEASER */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1a00 50%, #1a1a1a 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-[#F5A623] tracking-widest uppercase mb-4">Новое</p>
              <h2 className="text-5xl font-bold tracking-tight leading-tight mb-6 text-white">
                ИИ-напарник<br />на корте
              </h2>
              <p className="text-lg text-[#aaa] leading-relaxed mb-4">
                Создай своего волейбольного персонажа. Настрой характер, стиль, роль на поле. Начни как новичок — прокачайся до легенды.
              </p>
              <p className="text-lg text-[#888] leading-relaxed mb-10">
                Твой ИИ-напарник знает всё о пляжном волейболе. И становится умнее вместе с тобой.
              </p>
              <a href="/companion" className="inline-flex items-center gap-2 bg-[#F5A623] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#e09510] transition-all hover:scale-105">
                Создать напарника →
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: '🧠', title: 'Claude AI', desc: 'Отвечает как настоящий игрок — в зависимости от уровня и характера' },
                { emoji: '👗', title: 'Редактор образа', desc: 'Пол, кожа, волосы, форма — полная кастомизация' },
                { emoji: '📈', title: 'Прокачка', desc: '6 уровней: от новичка до легенды' },
                { emoji: '🏐', title: 'Роль и стиль', desc: 'Либеро, нападающий, связующий — своя тактика' },
              ].map(c => (
                <div key={c.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
                  <div className="text-2xl mb-2">{c.emoji}</div>
                  <div className="text-white font-semibold text-sm mb-1">{c.title}</div>
                  <div className="text-[#888] text-xs leading-relaxed">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-6">🌴</div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Первая тренировка<br />бесплатно
          </h2>
          <p className="text-xl text-[#666] mb-12 max-w-xl mx-auto">
            Приходи и попробуй. Если понравится — продолжим вместе.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="tel"
              placeholder="Ваш телефон"
              className="flex-1 px-6 py-4 rounded-full border border-black/10 bg-white text-lg outline-none focus:border-[#F5A623] transition-colors"
            />
            <button type="submit" className="bg-[#F5A623] text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-[#e09510] transition-all hover:scale-105 whitespace-nowrap">
              Записаться →
            </button>
          </form>
          <p className="text-sm text-[#aaa] mt-5">Перезвоним в течение 30 минут</p>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 bg-white border-t border-black/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-2xl font-bold mb-2">🌴 Пальма</div>
            <p className="text-[#888] text-sm leading-relaxed">Пляжный волейбольный центр. Тренируйся, играй, побеждай.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-[#888] uppercase tracking-wider mb-4">Адрес</div>
            <p className="font-medium">ул. Пляжная, 42</p>
            <p className="text-[#888] text-sm mt-1">пн–вс 06:00 — 22:00</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-[#888] uppercase tracking-wider mb-4">Контакты</div>
            <a href="tel:+71234567890" className="font-medium hover:text-[#F5A623] transition-colors">+7 (123) 456-78-90</a>
            <p className="text-[#888] text-sm mt-2">palma@example.ru</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-black/5 text-center text-sm text-[#bbb]">
          © 2025 Пальма. Все права защищены.
        </div>
      </section>

    </div>
  );
}
