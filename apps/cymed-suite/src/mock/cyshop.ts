import { seededRandom } from "@/lib/utils";
import { MENU_ITEMS } from "./names";

const r = seededRandom(505);

export const cyshopStats = {
  ordersToday: 194,
  revenueToday: 8_420,
  activeTables: 18,
  totalTables: 32,
  kitchenQueue: 12,
  avgOrderTime: 14,
  lowStockAlerts: 6,
  topItemToday: "Grilled Chicken Shawarma",
};

const orderStatuses = [
  "New",
  "In Kitchen",
  "Ready",
  "Served",
  "Paid",
  "Cancelled",
] as const;

const channels = ["Dine-in", "Takeaway", "Talabat", "Noon Food", "HungerStation"] as const;
const stations = ["Grill", "Cold", "Fry", "Drinks"] as const;

export const orderQueue = Array.from({ length: 14 }, (_, i) => {
  const item = MENU_ITEMS[i % MENU_ITEMS.length];
  const status = orderStatuses[i % orderStatuses.length];
  return {
    id: `ORD-${String(3400 + i).padStart(5, "0")}`,
    channel: channels[i % channels.length],
    table: i % 3 === 0 ? `T-${(i % 32) + 1}` : "—",
    items: [
      { name: item.name, qty: 1 + (i % 3), station: stations[i % stations.length] },
      { name: MENU_ITEMS[(i + 3) % MENU_ITEMS.length].name, qty: 1, station: stations[(i + 1) % stations.length] },
    ],
    status,
    total: item.price + MENU_ITEMS[(i + 3) % MENU_ITEMS.length].price,
    createdAt: new Date(Date.now() - r() * 3_600_000).toISOString(),
    timerMinutes: Math.round(r() * 20),
  };
});

export const kdsTickets = orderQueue
  .filter((o) => o.status === "New" || o.status === "In Kitchen")
  .flatMap((o) =>
    o.items.map((it, idx) => ({
      ticket: `${o.id}-${idx + 1}`,
      station: it.station,
      item: it.name,
      qty: it.qty,
      table: o.table,
      elapsed: o.timerMinutes,
      urgency: o.timerMinutes > 12 ? "over" : o.timerMinutes > 8 ? "warn" : "ok",
    }))
  );

export const salesByHour = Array.from({ length: 12 }, (_, i) => ({
  hour: `${i + 11}:00`,
  revenue: Math.round(200 + r() * 900),
  orders: Math.round(6 + r() * 20),
}));

export const topItems = MENU_ITEMS.map((m) => ({
  item: m.name,
  category: m.cat,
  soldToday: Math.round(4 + r() * 40),
  revenue: Math.round(4 + r() * 40) * m.price,
  margin: 1 - m.cost / m.price,
}))
  .sort((a, b) => b.soldToday - a.soldToday)
  .slice(0, 8);

export const menuCategories = [
  "Pizza",
  "Mains",
  "Salads",
  "Wraps",
  "Drinks",
  "Desserts",
  "Sides",
];
