'use client';
import { useState } from 'react';

const NAV = ['Услуги', 'Маршруты', 'Отслеживание', 'О компании', 'Тарифы', 'Контакты'];

const SHIPMENTS = [
  { id: 'TF-28471', from: 'Алматы', to: 'Москва', status: 'В пути', progress: 65, eta: '15 мая', weight: '2 400 кг', type: 'Сборный груз' },
  { id: 'TF-28465', from: 'Нур-Султан', to: 'Бишкек', status: 'Доставлен', progress: 100, eta: '11 мая', weight: '800 кг', type: 'Экспресс' },
  { id: 'TF-28459', from: 'Шымкент', to: 'Ташкент', status: 'Ожидает отправки', progress: 10, eta: '17 мая', weight: '5 200 кг', type: 'FTL' },
  { id: 'TF-28451', from: 'Алматы', to: 'Новосибирск', status: 'В пути', progress: 40, eta: '16 мая', weight: '1 100 кг', type: 'LTL' },
];

const SERVICES = [
  { icon: '🚛', title: 'FTL — Полная загрузка', desc: 'Отдельный грузовик под ваш груз. Прямая доставка без перегрузок. Идеально для 5+ тонн.', price: 'от 120 ₸/км' },
  { icon: '📦', title: 'LTL — Сборный груз', desc: 'Оплачиваете только место вашего груза. Регулярные рейсы по фиксированному расписанию.', price: 'от 45 ₸/кг' },
  { icon: '⚡', title: 'Экспресс-доставка', desc: 'Приоритетная доставка с гарантией срока. Индивидуальный водитель и отслеживание.', price: 'от 180 ₸/км' },
  { icon: '🌡️', title: 'Рефрижератор', desc: 'Термостатированные фуры для пищевых продуктов и фармацевтики. Температура -25°C до +20°C.', price: 'от 160 ₸/км' },
  { icon: '🏭', title: 'Складское хранение', desc: 'Собственные склады класса A в Алматы и Нур-Султане. Ответственное хранение, кросс-докинг.', price: 'от 800 ₸/м²/мес' },
  { icon: '📋', title: 'Таможенное оформление', desc: 'Полное сопровождение ВЭД: декларирование, сертификаты, разрешения по всем странам СНГ.', price: 'от 15 000 ₸' },
];

const ROUTES = [
  { from: 'Алматы', to: 'Москва', days: '4–6', freq: 'Ежедневно', km: 3847 },
  { from: 'Алматы', to: 'Ташкент', days: '1–2', freq: 'Ежедневно', km: 688 },
  { from: 'Алматы', to: 'Бишкек', days: '1', freq: '2 раза в день', km: 244 },
  { from: 'Нур-Султан', to: 'Новосибирск', days: '2–3', freq: 'Через день', km: 1412 },
  { from: 'Шымкент', to: 'Ташкент', days: '1', freq: 'Ежедневно', km: 323 },
  { from: 'Алматы', to: 'Стамбул', days: '8–10', freq: 'Еженедельно', km: 5100 },
];

const REVIEWS = [
  { name: 'Берик Асанов', company: 'KazTex Group', text: 'Работаем с TransitFlow уже 2 года. Ни разу не подвели по срокам. Отслеживание в реальном времени — очень удобно.', rating: 5 },
  { name: 'Анна Мартынова', company: 'FoodExpress KZ', text: 'Перевозим продукты питания в рефрижераторах. Температурный режим всегда соблюдается, документы без нареканий.', rating: 5 },
  { name: 'Санжар Нурланов', company: 'BuildMat Kazakhstan', text: 'Регулярные маршруты Алматы–Москва. Цены ниже рынка, менеджер всегда на связи. Рекомендую.', rating: 5 },
];

const STATUS_COLOR: Record<string, string> = {
  'В пути': 'bg-blue-100 text-blue-700',
  'Доставлен': 'bg-green-100 text-green-700',
  'Ожидает отправки': 'bg-yellow-100 text-yellow-700',
};

export default function TransitFlowPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [trackId, setTrackId] = useState('');
  const [tracked, setTracked] = useState<typeof SHIPMENTS[0] | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = () => {
    const found = SHIPMENTS.find(s => s.id.toLowerCase() === trackId.toLowerCase().trim());
    if (found) { setTracked(found); setNotFound(false); }
    else { setTracked(null); setNotFound(true); }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* TOP BAR */}
      <div className="bg-[#0a2540] text-gray-300 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <span>📍 Алматы, ул. Rayымбека 212 · info@transitflow.kz</span>
          <span className="hidden md:block">📞 +7 (727) 300-10-20 · Пн–Пт 8:00–20:00, Сб 9:00–17:00</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#0a2540] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-sm">TF</span>
            </div>
            <div>
              <div className="font-black text-[#0a2540] text-lg leading-none">TransitFlow</div>
              <div className="text-[10px] text-[#2563eb] font-semibold tracking-wider">LOGISTICS</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {NAV.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-gray-600 hover:text-[#2563eb] transition-colors font-medium">{item}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#отслеживание" className="border border-[#2563eb] text-[#2563eb] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Отследить груз
            </a>
            <a href="#контакты" className="bg-[#2563eb] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Рассчитать стоимость
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1.5">
              {[0,1,2].map(i => <span key={i} className="block w-6 h-0.5 bg-gray-800" />)}
            </div>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 pb-4">
            {NAV.map(item => <a key={item} href="#" className="block py-3 text-sm border-b border-gray-100 text-gray-600">{item}</a>)}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0a2540] to-[#1e3a5f] text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#2563eb]/30 border border-[#2563eb]/40 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              🌍 Казахстан · СНГ · Европа
            </div>
            <h1 className="text-4xl lg:text-5xl font-black mb-5 leading-tight">
              Грузовые перевозки<br />
              <span className="text-[#60a5fa]">без границ</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Более 200 маршрутов по СНГ. Собственный парк из 150+ единиц техники. Гарантированные сроки доставки и отслеживание онлайн.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="#услуги" className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors text-center">
                Наши услуги
              </a>
              <a href="#отслеживание" className="border-2 border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-all text-center">
                Отследить груз
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {[['150+', 'единиц техники'], ['200+', 'маршрутов'], ['98.6%', 'вовремя']].map(([v, l]) => (
                <div key={l}>
                  <div className="text-2xl font-black text-white">{v}</div>
                  <div className="text-blue-300 text-xs">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live shipments widget */}
          <div className="hidden md:block bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-sm">Активные отправления</span>
              <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live
              </span>
            </div>
            {SHIPMENTS.slice(0, 3).map(s => (
              <div key={s.id} className="mb-3 last:mb-0 bg-white/5 rounded-xl p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-xs font-mono text-blue-300">{s.id}</div>
                    <div className="text-sm font-semibold">{s.from} → {s.to}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[s.status]}`}>{s.status}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div className="bg-[#60a5fa] h-1.5 rounded-full transition-all" style={{ width: `${s.progress}%` }} />
                </div>
                <div className="flex justify-between text-xs text-blue-300 mt-1">
                  <span>{s.weight}</span><span>ETA: {s.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKING */}
      <section id="отслеживание" className="py-16 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[#2563eb] text-xs font-bold uppercase tracking-widest mb-2">Онлайн отслеживание</p>
          <h2 className="text-2xl font-black text-gray-900 mb-6">Где ваш груз прямо сейчас?</h2>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Введите номер отправления (например: TF-28471)"
              value={trackId}
              onChange={e => setTrackId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2563eb] transition-colors"
            />
            <button onClick={handleTrack} className="bg-[#2563eb] text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm">
              Найти
            </button>
          </div>
          <p className="text-xs text-gray-400 mb-6">Попробуйте: TF-28471, TF-28465, TF-28459</p>

          {tracked && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs font-mono text-blue-500 mb-1">{tracked.id}</div>
                  <div className="text-xl font-black">{tracked.from} → {tracked.to}</div>
                  <div className="text-sm text-gray-500 mt-1">{tracked.type} · {tracked.weight}</div>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full font-semibold ${STATUS_COLOR[tracked.status]}`}>{tracked.status}</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Прогресс</span><span>{tracked.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-[#2563eb] h-3 rounded-full transition-all" style={{ width: `${tracked.progress}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📅</span><span>Ожидаемая дата доставки: <strong>{tracked.eta}</strong></span>
              </div>
            </div>
          )}
          {notFound && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-600">
              Отправление не найдено. Проверьте номер или свяжитесь с менеджером.
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section id="услуги" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#2563eb] text-xs font-bold uppercase tracking-widest mb-2">Что мы делаем</p>
            <h2 className="text-2xl font-black">Услуги TransitFlow</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-[#2563eb]/20 transition-all group">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#2563eb] transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{s.desc}</p>
                <span className="text-[#2563eb] font-bold text-sm">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTES */}
      <section id="маршруты" className="py-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#2563eb] text-xs font-bold uppercase tracking-widest mb-2">География</p>
            <h2 className="text-2xl font-black">Популярные маршруты</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <thead className="bg-[#0a2540] text-white text-sm">
                <tr>
                  {['Откуда', 'Куда', 'Расстояние', 'Срок доставки', 'Частота'].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROUTES.map((r, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-sm">{r.from}</td>
                    <td className="px-5 py-3.5 font-semibold text-sm">{r.to}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{r.km.toLocaleString()} км</td>
                    <td className="px-5 py-3.5 text-sm"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">{r.days} дней</span></td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{r.freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#2563eb] text-xs font-bold uppercase tracking-widest mb-2">Клиенты</p>
            <h2 className="text-2xl font-black">Нам доверяют</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
                <div className="flex mb-3">{[...Array(r.rating)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}</div>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#0a2540] rounded-full flex items-center justify-center text-white font-bold text-sm">{r.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="тарифы" className="py-16 bg-[#0a2540] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Рассчитайте стоимость перевозки</h2>
          <p className="text-blue-200 mb-8">Оставьте заявку — менеджер свяжется в течение 15 минут и рассчитает точную стоимость.</p>
          <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-4">
            <input type="text" placeholder="Откуда (город)" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-blue-300 outline-none text-sm" />
            <input type="text" placeholder="Куда (город)" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-blue-300 outline-none text-sm" />
            <input type="text" placeholder="Вес груза (кг)" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-blue-300 outline-none text-sm" />
            <input type="tel" placeholder="Ваш телефон" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-blue-300 outline-none text-sm" />
          </div>
          <button className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-xl transition-colors">
            Получить расчёт
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="контакты" className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">TF</span>
              </div>
              <span className="text-white font-black">TransitFlow</span>
            </div>
            <p className="text-xs leading-relaxed">Надёжные грузоперевозки по СНГ с 2016 года.</p>
          </div>
          {[
            { title: 'Услуги', links: ['FTL перевозки', 'LTL сборный груз', 'Экспресс', 'Рефрижератор', 'Склад'] },
            { title: 'Компания', links: ['О нас', 'Маршруты', 'Тарифы', 'Партнёрам', 'Вакансии'] },
            { title: 'Контакты', links: ['+7 (727) 300-10-20', 'info@transitflow.kz', 'Алматы, ул. Рaйымбека 212', 'Пн–Пт 8:00–20:00'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2 text-xs">{col.links.map(l => <li key={l} className="hover:text-white cursor-pointer transition-colors">{l}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs">© 2026 TransitFlow Logistics. Все права защищены.</div>
      </footer>
    </div>
  );
}
