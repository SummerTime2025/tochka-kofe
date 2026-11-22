import React, { useState, useMemo, useEffect } from 'react';
import {
  Coffee,
  MapPin,
  Phone,
  Clock,
  Star,
  Search,
  ShoppingBag,
  Plus,
  Minus,
  X,
  QrCode,
  Sparkles,
  Leaf,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Check,
  Printer,
  Copy,
  Flame,
} from 'lucide-react';

const CAFE = {
  name: 'Точка Кофе',
  tagline: 'Спешелти-кофейня в центре Нальчика',
  address: 'пр. Кулиева, 2А, Нальчик',
  phoneDisplay: '+7 988 721-19-99',
  phoneDigits: '79887211999',
  rating: '4.6',
  reviews: 212,
  openHour: 8,
  closeHour: 22,
  closeMinute: 30,
  hoursText: 'Ежедневно 08:00 – 22:30',
  maps: {
    yandex: 'https://yandex.ru/maps/?text=' + encodeURIComponent('Точка Кофе Нальчик проспект Кулиева 2А'),
    dgis: 'https://2gis.ru/nalchik/search/' + encodeURIComponent('Точка Кофе Кулиева 2А'),
    google: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Точка Кофе Нальчик проспект Кулиева 2А'),
  },
};

const PHOTOS = {
  hero: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80',
  latte: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
  cappuccino: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
  espresso: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  iced: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
  matcha: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80',
  croissant: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
  dessert: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
  breakfast: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80',
  creamy: 'https://images.unsplash.com/photo-1507807837335-4c6bda7fc803?auto=format&fit=crop&w=800&q=80',
};

const CATEGORIES = [
  { id: 'all', label: 'Всё меню' },
  { id: 'classic', label: 'Классика' },
  { id: 'signature', label: 'Авторские' },
  { id: 'noncoffee', label: 'Не кофе' },
  { id: 'pastry', label: 'Выпечка и еда' },
];

const SIZES = [
  { id: 'S', label: 'S · 250 мл', delta: 0 },
  { id: 'M', label: 'M · 350 мл', delta: 50 },
  { id: 'L', label: 'L · 450 мл', delta: 90 },
];

const MILKS = [
  { id: 'regular', label: 'Классическое', delta: 0 },
  { id: 'oat', label: 'Овсяное', delta: 60 },
  { id: 'coconut', label: 'Кокосовое', delta: 60 },
  { id: 'almond', label: 'Миндальное', delta: 70 },
  { id: 'lactose_free', label: 'Безлактозное', delta: 50 },
];

const SYRUPS = [
  { id: 'none', label: 'Без сиропа', delta: 0 },
  { id: 'vanilla', label: 'Мадагаскарская ваниль', delta: 40 },
  { id: 'caramel', label: 'Солёная карамель', delta: 40 },
  { id: 'hazelnut', label: 'Лесной орех', delta: 40 },
  { id: 'lavender', label: 'Лаванда', delta: 40 },
];

const MENU_ITEMS = [
  // Классика (5)
  {
    id: 1,
    name: 'Капучино',
    category: 'classic',
    price: 210,
    volume: '250 мл',
    desc: 'Двойной эспрессо на 100% арабике Бразилия и бархатная молочная пена.',
    image: PHOTOS.cappuccino,
    hit: true,
    altMilk: true,
    configurable: true,
    hasMilk: true,
  },
  {
    id: 2,
    name: 'Латте',
    category: 'classic',
    price: 230,
    volume: '300 мл',
    desc: 'Нежный молочный кофе с мягким сливочным вкусом и ореховым послевкусием.',
    image: PHOTOS.latte,
    hit: true,
    altMilk: true,
    configurable: true,
    hasMilk: true,
  },
  {
    id: 3,
    name: 'Флэт Уайт',
    category: 'classic',
    price: 240,
    volume: '220 мл',
    desc: 'Насыщенный двойной ристретто с тонким слоем глянцевого молока.',
    image: PHOTOS.creamy,
    hit: true,
    altMilk: true,
    configurable: true,
    hasMilk: true,
  },
  {
    id: 4,
    name: 'Американо',
    category: 'classic',
    price: 170,
    volume: '250 мл',
    desc: 'Чистый эспрессо, раскрытый мягкой горячей водой. Сбалансированная горчинка.',
    image: PHOTOS.espresso,
    hit: false,
    altMilk: false,
    configurable: true,
    hasMilk: false,
  },
  {
    id: 5,
    name: 'Двойной эспрессо',
    category: 'classic',
    price: 160,
    volume: '60 мл',
    desc: 'Плотный шот свежеобжаренной арабики с нотами тёмного шоколада и фундука.',
    image: PHOTOS.espresso,
    hit: false,
    altMilk: false,
    configurable: false,
    hasMilk: false,
  },

  // Авторские (5)
  {
    id: 6,
    name: 'Раф Лаванда-Ваниль',
    category: 'signature',
    price: 290,
    volume: '300 мл',
    desc: 'Взбитые сливки, эспрессо и натуральный лавандово-ванильный сахар.',
    image: PHOTOS.creamy,
    hit: true,
    altMilk: true,
    configurable: true,
    hasMilk: true,
  },
  {
    id: 7,
    name: 'Раф Солёная карамель',
    category: 'signature',
    price: 290,
    volume: '300 мл',
    desc: 'Сливочный десертный раф с домашней карамелью и щепоткой морской соли.',
    image: PHOTOS.latte,
    hit: true,
    altMilk: true,
    configurable: true,
    hasMilk: true,
  },
  {
    id: 8,
    name: 'Цитрусовый Бамбл',
    category: 'signature',
    price: 310,
    volume: '350 мл',
    desc: 'Свежевыжатый апельсиновый сок, карамельный сироп, лёд и шот эспрессо.',
    image: PHOTOS.iced,
    hit: true,
    altMilk: false,
    configurable: true,
    hasMilk: false,
  },
  {
    id: 9,
    name: 'Айс-Латте Фисташка',
    category: 'signature',
    price: 320,
    volume: '350 мл',
    desc: 'Охлаждённый латте с нежной фисташковой пастой и сливочной пенкой.',
    image: PHOTOS.iced,
    hit: false,
    altMilk: true,
    configurable: true,
    hasMilk: true,
  },
  {
    id: 10,
    name: 'Эспрессо-тоник',
    category: 'signature',
    price: 270,
    volume: '300 мл',
    desc: 'Освежающий тоник со льдом, долькой грейпфрута и двойным эспрессо.',
    image: PHOTOS.iced,
    hit: false,
    altMilk: false,
    configurable: true,
    hasMilk: false,
  },

  // Не кофе (4)
  {
    id: 11,
    name: 'Матча-Латте',
    category: 'noncoffee',
    price: 280,
    volume: '300 мл',
    desc: 'Церемониальный японский зелёный чай матча, взбитый с тёплым молоком.',
    image: PHOTOS.matcha,
    hit: true,
    altMilk: true,
    configurable: true,
    hasMilk: true,
  },
  {
    id: 12,
    name: 'Какао бельгийский',
    category: 'noncoffee',
    price: 240,
    volume: '300 мл',
    desc: 'Густой горячий какао на натуральном тёмном шоколаде с маршмеллоу.',
    image: PHOTOS.cappuccino,
    hit: false,
    altMilk: true,
    configurable: true,
    hasMilk: true,
  },
  {
    id: 13,
    name: 'Облепиховый чай с мёдом',
    category: 'noncoffee',
    price: 260,
    volume: '350 мл',
    desc: 'Протёртая ягода облепихи, апельсин, веточка розмарина и горный мёд.',
    image: PHOTOS.iced,
    hit: true,
    altMilk: false,
    configurable: false,
    hasMilk: false,
  },
  {
    id: 14,
    name: 'Пряный Масала-чай',
    category: 'noncoffee',
    price: 260,
    volume: '300 мл',
    desc: 'Чёрный чай со специями: кардамон, корица, имбирь и взбитое молоко.',
    image: PHOTOS.latte,
    hit: false,
    altMilk: true,
    configurable: true,
    hasMilk: true,
  },

  // Выпечка и еда (6)
  {
    id: 15,
    name: 'Круассан сливочный',
    category: 'pastry',
    price: 190,
    volume: '85 г',
    desc: 'Хрустящий французский круассан на натуральном сливочном масле 82,5%.',
    image: PHOTOS.croissant,
    hit: true,
    altMilk: false,
    configurable: false,
    hasMilk: false,
  },
  {
    id: 16,
    name: 'Круассан с миндалём',
    category: 'pastry',
    price: 250,
    volume: '115 г',
    desc: 'С нежным миндальным кремом франжипан и хрустящими лепестками миндаля.',
    image: PHOTOS.croissant,
    hit: false,
    altMilk: false,
    configurable: false,
    hasMilk: false,
  },
  {
    id: 17,
    name: 'Баскский чизкейк',
    category: 'pastry',
    price: 310,
    volume: '140 г',
    desc: 'Карамелизированная корочка и тающая кремовая серединка из творожного сыра.',
    image: PHOTOS.dessert,
    hit: true,
    altMilk: false,
    configurable: false,
    hasMilk: false,
  },
  {
    id: 18,
    name: 'Медовик домашний',
    category: 'pastry',
    price: 270,
    volume: '130 г',
    desc: 'Тонкие медовые коржи с лёгким сметанно-сливочным кремом.',
    image: PHOTOS.dessert,
    hit: false,
    altMilk: false,
    configurable: false,
    hasMilk: false,
  },
  {
    id: 19,
    name: 'Сырники со сметаной и ягодой',
    category: 'pastry',
    price: 320,
    volume: '190 г',
    desc: 'Три румяных сырника из фермерского творога с ягодным соусом и сметаной.',
    image: PHOTOS.breakfast,
    hit: true,
    altMilk: false,
    configurable: false,
    hasMilk: false,
  },
  {
    id: 20,
    name: 'Тост с авокадо и яйцом пашот',
    category: 'pastry',
    price: 360,
    volume: '210 г',
    desc: 'Ремесленный хлеб на закваске, гуакамоле, яйцо пашот и микрозелень.',
    image: PHOTOS.breakfast,
    hit: false,
    altMilk: false,
    configurable: false,
    hasMilk: false,
  },
];

const PICKUP_OPTIONS = [
  'Через 10 мин',
  'Через 20 мин',
  'Через 30 мин',
  'В зале',
];

function getNalchikStatus() {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Europe/Moscow',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 12);
    const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
    const totalMinutes = hour * 60 + minute;
    const openMin = CAFE.openHour * 60;
    const closeMin = CAFE.closeHour * 60 + CAFE.closeMinute;
    const isOpen = totalMinutes >= openMin && totalMinutes < closeMin;
    return {
      isOpen,
      label: isOpen ? 'Открыто до 22:30' : 'Закрыто · Откроемся в 08:00',
    };
  } catch {
    return { isOpen: true, label: 'Открыто до 22:30' };
  }
}

export default function App() {
  const [status, setStatus] = useState(getNalchikStatus);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [onlyHits, setOnlyHits] = useState(false);
  const [onlyAltMilk, setOnlyAltMilk] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [sizeId, setSizeId] = useState('S');
  const [milkId, setMilkId] = useState('regular');
  const [syrupId, setSyrupId] = useState('none');

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [pickupTime, setPickupTime] = useState(PICKUP_OPTIONS[0]);
  const [customerName, setCustomerName] = useState('');
  const [comment, setComment] = useState('');
  const [copiedOrder, setCopiedOrder] = useState(false);

  const [qrOpen, setQrOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://tochka-kofe.vercel.app');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location?.href) {
      setCurrentUrl(window.location.href);
    }
    const timer = setInterval(() => setStatus(getNalchikStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredMenu = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (onlyHits && !item.hit) return false;
      if (onlyAltMilk && !item.altMilk) return false;
      if (q && !item.name.toLowerCase().includes(q) && !item.desc.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [category, search, onlyHits, onlyAltMilk]);

  const openConfigurator = (item) => {
    if (!item.configurable) {
      addToCart(item, null);
      return;
    }
    setSelectedItem(item);
    setSizeId('S');
    setMilkId('regular');
    setSyrupId('none');
  };

  const configuredPrice = useMemo(() => {
    if (!selectedItem) return 0;
    const size = SIZES.find((s) => s.id === sizeId) || SIZES[0];
    const milk = selectedItem.hasMilk ? MILKS.find((m) => m.id === milkId) || MILKS[0] : MILKS[0];
    const syrup = SYRUPS.find((s) => s.id === syrupId) || SYRUPS[0];
    return selectedItem.price + size.delta + milk.delta + syrup.delta;
  }, [selectedItem, sizeId, milkId, syrupId]);

  const addToCart = (item, options) => {
    const key = options
      ? `${item.id}-${options.sizeId}-${options.milkId}-${options.syrupId}`
      : `${item.id}-base`;

    const unitPrice = options ? options.price : item.price;
    const details = options
      ? [
          options.sizeLabel,
          options.milkLabel && options.milkId !== 'regular' ? options.milkLabel + ' молоко' : null,
          options.syrupLabel && options.syrupId !== 'none' ? 'Сироп: ' + options.syrupLabel : null,
        ]
          .filter(Boolean)
          .join(' · ')
      : item.volume;

    setCart((prev) => {
      const existing = prev.find((c) => c.key === key);
      if (existing) {
        return prev.map((c) => (c.key === key ? { ...c, qty: c.qty + 1 } : c));
      }
      return [
        ...prev,
        {
          key,
          id: item.id,
          name: item.name,
          image: item.image,
          details,
          unitPrice,
          qty: 1,
        },
      ];
    });
  };

  const handleConfirmConfigurable = () => {
    if (!selectedItem) return;
    const size = SIZES.find((s) => s.id === sizeId) || SIZES[0];
    const milk = selectedItem.hasMilk ? MILKS.find((m) => m.id === milkId) || MILKS[0] : null;
    const syrup = SYRUPS.find((s) => s.id === syrupId) || SYRUPS[0];

    addToCart(selectedItem, {
      sizeId: size.id,
      sizeLabel: size.label,
      milkId: milk ? milk.id : 'regular',
      milkLabel: milk ? milk.label : null,
      syrupId: syrup.id,
      syrupLabel: syrup.label,
      price: configuredPrice,
    });
    setSelectedItem(null);
  };

  const updateQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((c) => (c.key === key ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);

  const buildOrderMessage = () => {
    const lines = [
      `Здравствуйте! Хочу оформить предзаказ в «${CAFE.name}» (${CAFE.address}):`,
      '',
      ...cart.map(
        (item, idx) =>
          `${idx + 1}. ${item.name} (${item.details}) × ${item.qty} — ${item.unitPrice * item.qty} ₽`
      ),
      '',
      `Итого: ${cartTotal} ₽`,
      `Получение: ${pickupTime}`,
    ];
    if (customerName.trim()) lines.push(`Имя: ${customerName.trim()}`);
    if (comment.trim()) lines.push(`Комментарий: ${comment.trim()}`);
    return lines.join('\n');
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const text = encodeURIComponent(buildOrderMessage());
    const url = `https://wa.me/${CAFE.phoneDigits}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyOrder = async () => {
    try {
      await navigator.clipboard.writeText(buildOrderMessage());
      setCopiedOrder(true);
      setTimeout(() => setCopiedOrder(false), 2000);
    } catch {
      // ignore
    }
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&color=1c1917&bgcolor=ffffff&data=${encodeURIComponent(
    currentUrl
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 pb-28">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg leading-none tracking-tight text-stone-900">
                {CAFE.name}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">Нальчик · пр. Кулиева, 2А</div>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQrOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-medium hover:bg-stone-100 transition-colors shadow-sm"
            >
              <QrCode className="w-4 h-4 text-amber-700" />
              <span>QR-меню</span>
            </button>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Заказ</span>
              {cartCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 rounded-md bg-amber-400 text-stone-950 font-bold text-[11px] leading-none">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="max-w-5xl mx-auto px-4 pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white shadow-xl">
          <img
            src={PHOTOS.hero}
            alt="Кофейня Точка Кофе"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/70 to-stone-900/30" />

          <div className="relative p-6 sm:p-10 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                  status.isOpen
                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                    : 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                {status.label}
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/15 text-amber-200 backdrop-blur-md border border-white/15">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                {CAFE.rating} · {CAFE.reviews} отзывов
              </span>
            </div>

            <div className="max-w-xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                Свежий спешелти-кофе и выпечка к вашему приходу
              </h1>
              <p className="mt-3 text-stone-200/90 text-sm sm:text-base leading-relaxed">
                Соберите напиток под себя — выберите объём, альтернативное молоко и сироп, а мы
                приготовим его без очереди к вашему визиту на Кулиева, 2А.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 text-stone-950 font-semibold text-sm hover:bg-amber-300 transition-colors shadow-lg shadow-amber-950/30"
              >
                <span>Смотреть меню</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:+${CAFE.phoneDigits}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-sm font-medium border border-white/15 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>{CAFE.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Info Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-stone-500">Адрес кофейни</div>
              <div className="font-semibold text-sm text-stone-900 mt-0.5">{CAFE.address}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                <a
                  href={CAFE.maps.yandex}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-md inline-flex items-center gap-1"
                >
                  Яндекс <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href={CAFE.maps.dgis}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md inline-flex items-center gap-1"
                >
                  2ГИС <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href={CAFE.maps.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1"
                >
                  Google <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500">Режим работы</div>
              <div className="font-semibold text-sm text-stone-900 mt-0.5">{CAFE.hoursText}</div>
              <div className="text-xs text-stone-500 mt-1">Предзаказ с собой за 10 минут</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500">Быстрый заказ в WhatsApp</div>
              <div className="font-semibold text-sm text-stone-900 mt-0.5">{CAFE.phoneDisplay}</div>
              <div className="text-xs text-stone-500 mt-1">Оплата при получении на стойке</div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <main id="menu" className="max-w-5xl mx-auto px-4 mt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Меню</h2>
            <p className="text-sm text-stone-500 mt-0.5">
              Нажмите на напиток, чтобы выбрать объём, молоко и сироп
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Найти раф, круассан..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills & Quick Filters */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
                  category === cat.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setOnlyHits((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                onlyHits
                  ? 'bg-amber-100 border-amber-300 text-amber-950'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Хиты гостей</span>
            </button>

            <button
              type="button"
              onClick={() => setOnlyAltMilk((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                onlyAltMilk
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-950'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>На альтернативном молоке</span>
            </button>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredMenu.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-stone-200">
            <Coffee className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <div className="font-semibold text-stone-800">Ничего не нашлось</div>
            <p className="text-sm text-stone-500 mt-1">
              Попробуйте сбросить фильтры или изменить поисковый запрос.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('all');
                setSearch('');
                setOnlyHits(false);
                setOnlyAltMilk(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-stone-900 text-white text-sm font-medium"
            >
              Показать всё меню
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                onClick={() => openConfigurator(item)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md hover:border-stone-300 transition-all flex sm:flex-col"
              >
                <div className="relative w-32 sm:w-full h-auto sm:h-48 shrink-0 bg-stone-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = PHOTOS.cappuccino;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                    {item.hit && (
                      <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-stone-950 text-[10px] font-bold uppercase tracking-wide shadow-sm">
                        Хит
                      </span>
                    )}
                    {item.altMilk && (
                      <span className="px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-sm text-emerald-800 text-[10px] font-semibold shadow-sm inline-flex items-center gap-0.5">
                        <Leaf className="w-2.5 h-2.5" />
                        Alt
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-base text-stone-900 leading-snug">
                        {item.name}
                      </h3>
                      <span className="text-[11px] text-stone-400 shrink-0 mt-0.5">
                        {item.volume}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="font-bold text-base text-stone-900">
                      {item.configurable ? `от ${item.price} ₽` : `${item.price} ₽`}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openConfigurator(item);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-medium group-hover:bg-amber-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{item.configurable ? 'Выбрать' : 'В заказ'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 mt-14 pt-8 border-t border-stone-200/80 text-sm text-stone-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-serif font-bold text-stone-900 text-base">{CAFE.name}</div>
          <div className="text-xs mt-1">
            {CAFE.address} · {CAFE.hoursText} · {CAFE.phoneDisplay}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setQrOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-medium hover:bg-stone-100 transition-colors"
        >
          <QrCode className="w-4 h-4 text-amber-700" />
          <span>Открыть QR-тейбл-тент для столиков</span>
        </button>
      </footer>

      {/* Floating Bottom Cart Bar */}
      {cartCount > 0 && !cartOpen && (
        <div className="fixed bottom-4 left-0 right-0 z-30 px-4">
          <div className="max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-stone-900 text-white shadow-2xl shadow-stone-900/35 hover:bg-stone-800 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center">
                  {cartCount}
                </span>
                <span className="font-medium text-sm">Открыть предзаказ</span>
              </div>
              <span className="font-bold text-base text-amber-300">{cartTotal} ₽</span>
            </button>
          </div>
        </div>
      )}

      {/* Drink Configurator Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full sm:max-w-md bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-44 bg-stone-200 shrink-0">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-5 right-5 text-white">
                <h3 className="font-serif text-2xl font-bold">{selectedItem.name}</h3>
                <p className="text-xs text-stone-200 mt-0.5 line-clamp-2">{selectedItem.desc}</p>
              </div>
            </div>

            <div className="p-5 overflow-y-auto space-y-5">
              {/* Size */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Объём
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSizeId(s.id)}
                      className={`p-2.5 rounded-2xl border text-center transition-all ${
                        sizeId === s.id
                          ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                          : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-xs font-semibold">{s.label}</div>
                      <div
                        className={`text-[11px] mt-0.5 ${
                          sizeId === s.id ? 'text-amber-300' : 'text-stone-400'
                        }`}
                      >
                        {s.delta === 0 ? 'База' : `+${s.delta} ₽`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk */}
              {selectedItem.hasMilk && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                    Молоко
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {MILKS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMilkId(m.id)}
                        className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                          milkId === m.id
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {m.label} {m.delta > 0 ? `+${m.delta} ₽` : ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Syrup */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Сироп
                </div>
                <div className="flex flex-wrap gap-2">
                  {SYRUPS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSyrupId(s.id)}
                      className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                        syrupId === s.id
                          ? 'bg-amber-100 text-amber-950 border-amber-400'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {s.label} {s.delta > 0 ? `+${s.delta} ₽` : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-stone-200">
              <button
                type="button"
                onClick={handleConfirmConfigurable}
                className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Добавить в заказ · {configuredPrice} ₽</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex justify-end"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#FAF7F2] h-full flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-white border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">Ваш предзаказ</h3>
                <p className="text-xs text-stone-500 mt-0.5">{CAFE.address}</p>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                  <div className="font-semibold text-stone-800">Корзина пока пуста</div>
                  <p className="text-xs text-stone-500 mt-1">
                    Выберите любимый кофе или десерт из меню
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.key}
                        className="bg-white p-3.5 rounded-2xl border border-stone-200/80 flex items-center gap-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-stone-900 truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                            {item.details}
                          </div>
                          <div className="font-bold text-sm text-stone-900 mt-1">
                            {item.unitPrice * item.qty} ₽
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 bg-stone-100 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => updateQty(item.key, -1)}
                            className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-stone-200"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.key, 1)}
                            className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-stone-200"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pickup time */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                      Когда заберёте?
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {PICKUP_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setPickupTime(opt)}
                          className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${
                            pickupTime === opt
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact inputs */}
                  <div className="space-y-2.5">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ваше имя (напишем на стаканчике)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                    />
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Комментарий: без сахара, погорячее..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                    />
                  </div>
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 bg-white border-t border-stone-200 space-y-2.5">
                <div className="flex items-center justify-between text-base">
                  <span className="text-stone-600">Итого к оплате на месте</span>
                  <span className="font-bold text-xl text-stone-900">{cartTotal} ₽</span>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Отправить заказ в WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyOrder}
                  className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedOrder ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Текст заказа скопирован</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Скопировать текст заказа</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR Table Tent Modal */}
      {qrOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
              <div className="text-sm font-semibold text-stone-900">Макет QR-меню для столиков</div>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div id="qr-print-area" className="p-6 bg-[#FAF7F2]">
              <div className="bg-stone-900 text-white rounded-3xl p-6 text-center shadow-xl border border-stone-800">
                <div className="inline-flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest font-semibold">
                  <Coffee className="w-4 h-4" />
                  <span>{CAFE.name}</span>
                </div>
                <h4 className="font-serif text-2xl font-bold mt-2">Онлайн-меню</h4>
                <p className="text-xs text-stone-300 mt-1">
                  Наведите камеру, чтобы посмотреть меню и заказать без очереди
                </p>

                <div className="mt-5 inline-block p-3 bg-white rounded-2xl shadow-inner">
                  <img
                    src={qrImageUrl}
                    alt="QR-код меню Точка Кофе"
                    className="w-48 h-48 mx-auto rounded-lg"
                  />
                </div>

                <div className="mt-4 text-[11px] text-stone-400">
                  {CAFE.address} · {CAFE.hoursText}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-stone-100 flex gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>Распечатать тейбл-тент</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
