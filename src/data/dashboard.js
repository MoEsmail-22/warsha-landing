// ✏️ Sample data shown in the service-center dashboard mockup. Every text is [English, Arabic].
export const MD = {
  user: { n: ["Ahmed", "أحمد"], full: ["Ahmed Auto Service", "خدمة أحمد للسيارات"], role: ["Owner", "المالك"] },
  kpi: [
    { ic: "calchk", t: ["Today's bookings", "حجوزات اليوم"], v: 12, d: ["+3 vs yesterday", "+3 مقارنة بالأمس"], up: true },
    { ic: "car", t: ["Cars in service", "سيارات قيد الصيانة"], v: 5, d: ["2 awaiting approval", "2 بانتظار الموافقة"] },
    { ic: "wallet", t: ["Revenue today", "إيرادات اليوم"], v: 8450, egp: true, d: ["+12% vs yesterday", "+12% مقارنة بالأمس"], up: true },
    { ic: "star", t: ["Average rating", "متوسط التقييم"], v: 4.8, dec: 1, d: ["126 reviews", "126 تقييم"], am: true },
  ],
  week: [6200, 7400, 5800, 8900, 9600, 4100, 7300], // Sun → Sat; today's bar always shows "Revenue today"
  sched: [
    { n: ["Sara Mohamed", "سارة محمد"], i: "SM", c: "#C8730A", v: "BMW X1", s: ["Oil Change", "تغيير الزيت"], t: "09:30", st: "completed" },
    { n: ["Karim Hassan", "كريم حسن"], i: "KH", c: "#0E5C5B", v: "Hyundai Elantra", s: ["AC Service", "صيانة التكييف"], t: "10:15", st: "in_progress" },
    { n: ["Mostafa Ibrahim", "مصطفى إبراهيم"], i: "MI", c: "#6366F1", v: "Kia Sportage", s: ["Brake Repair", "إصلاح الفرامل"], t: "11:00", st: "confirmed" },
    { n: ["Nadia Saleh", "نادية صالح"], i: "NS", c: "#DB2777", v: "Toyota Corolla", s: ["Engine Diagnostic", "فحص المحرك"], t: "12:30", st: "pending" },
    { n: ["Omar Reda", "عمر رضا"], i: "OR", c: "#0284C7", v: "MG ZS", s: ["Oil Change", "تغيير الزيت"], t: "14:00", st: "pending" },
  ],
  more: [
    { n: ["Youssef Adel", "يوسف عادل"], i: "YA", c: "#059669", v: "Nissan Sunny", s: ["Brake Repair", "إصلاح الفرامل"], t: "10:00", st: "confirmed", d: 1 },
    { n: ["Hana Fathy", "هنا فتحي"], i: "HF", c: "#9333EA", v: "Chevrolet Optra", s: ["AC Service", "صيانة التكييف"], t: "16:00", st: "cancelled", d: -1 },
  ],
  newBooking: { n: ["Laila Mansour", "ليلى منصور"], i: "LM", c: "#E08B2F", v: "Mini Cooper S", s: ["Tire Change", "تغيير الإطارات"], t: "17:00", st: "pending", d: 0 },
  total: 48,
  services: [
    { n: ["Oil Change", "تغيير الزيت"], c: "maintenance", m: 45, p: [450, 650], on: true },
    { n: ["Brake Repair", "إصلاح الفرامل"], c: "repair", m: 90, p: [900, 1400], on: true },
    { n: ["Engine Diagnostic", "فحص المحرك بالكمبيوتر"], c: "diagnostics", m: 60, p: [350, 500], on: true },
    { n: ["AC Service", "صيانة التكييف"], c: "maintenance", m: 75, p: [600, 950], on: true },
    { n: ["Tire Change", "تغيير الإطارات"], c: "maintenance", m: 40, p: [250, 400], on: false },
    { n: ["Dent & Paint", "سمكرة ودهان"], c: "bodywork", m: 240, p: [1500, 3500], on: true },
  ],
};

export const STATUS = {
  pending: ["Pending", "قيد الانتظار"],
  confirmed: ["Confirmed", "مؤكد"],
  in_progress: ["In Progress", "قيد التنفيذ"],
  completed: ["Completed", "مكتمل"],
  cancelled: ["Cancelled", "ملغي"],
};

export const CATEGORY = {
  maintenance: ["Maintenance", "صيانة"],
  repair: ["Repair", "إصلاح"],
  diagnostics: ["Diagnostics", "تشخيص"],
  bodywork: ["Bodywork", "أعمال الهيكل"],
};

export const DAYS = [["Sun", "الأحد"], ["Mon", "الإثنين"], ["Tue", "الثلاثاء"], ["Wed", "الأربعاء"], ["Thu", "الخميس"], ["Fri", "الجمعة"], ["Sat", "السبت"]];

// [icon, label, screen index (undefined = not clickable)]
export const NAV = [
  ["dash", ["Dashboard", "لوحة التحكم"], 0],
  ["brief", ["Jobs Board", "لوحة المهام"]],
  ["cal", ["Bookings", "الحجوزات"], 1],
  ["file", ["Quotes", "عروض الأسعار"]],
  ["wr", ["Services & Pricing", "الخدمات والأسعار"], 2],
  ["star", ["Reviews", "التقييمات"]],
  ["gear", ["Settings", "الإعدادات"]],
];

export const SCREEN_PATH = ["", "bookings", "services"];

export const weekData = () => {
  const w = MD.week.slice();
  w[new Date().getDay()] = MD.kpi[2].v;
  return w;
};
