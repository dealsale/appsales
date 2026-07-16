// Domain data and pure helpers for Distribuidora Rivera.

export const ACCENT = '#E4572E';

export const ESTADOS = ['pendiente', 'aprobado', 'en cargue', 'despachado', 'entregado'];

// Status pill colors per estado.
export const STC = {
  pendiente: { bg: '#FBEED3', fg: '#8a6a1f' },
  aprobado: { bg: '#DEEAF7', fg: '#2F6DB3' },
  'en cargue': { bg: '#EDE3F6', fg: '#7A4CB0' },
  despachado: { bg: '#DFF0EE', fg: '#20776B' },
  entregado: { bg: '#DFE3FA', fg: '#24256F' },
};

export const CATCOLORS = {
  Embutidos: { bg: '#F6DFD4', fg: '#A33E14' },
  Salsas: { bg: '#F4E8CC', fg: '#8A6A1F' },
  Congelados: { bg: '#D9E7F2', fg: '#2F6DB3' },
  Abarrotes: { bg: '#E7E2D2', fg: '#6B6046' },
  Lácteos: { bg: '#E0E9F6', fg: '#2F6DB3' },
};

export const PRODUCTS = [
  { id: 'p1', nombre: 'Salchicha Super Perro Zenú x18 unds', cat: 'Embutidos', base: 45000 },
  { id: 'p2', nombre: 'Tocineta Premium KL Jhosping', cat: 'Embutidos', base: 24000 },
  { id: 'p3', nombre: 'Jamón Ahumado x3KL Nojos', cat: 'Embutidos', base: 44000 },
  { id: 'p4', nombre: 'Chorizo Santarrosano x12 unds', cat: 'Embutidos', base: 21500 },
  { id: 'p5', nombre: 'Salsa BBQ BG Casino', cat: 'Salsas', base: 37200 },
  { id: 'p6', nombre: 'Mayonesa BG Casino', cat: 'Salsas', base: 54100 },
  { id: 'p7', nombre: 'Salsa de Piña BG Casino', cat: 'Salsas', base: 32800 },
  { id: 'p8', nombre: 'Papa Criolla 150grs x20 unds Frozen', cat: 'Congelados', base: 28000 },
  { id: 'p9', nombre: 'Croquetas de Yuca x30 Frozen', cat: 'Congelados', base: 31500 },
  { id: 'p10', nombre: 'Cabello de Ángel 1000gr Kronky Snack', cat: 'Abarrotes', base: 9000 },
  { id: 'p11', nombre: 'Queso Doble Crema KL Del Vecchio', cat: 'Lácteos', base: 26400 },
  { id: 'p12', nombre: 'Mantequilla Industrial 15KL', cat: 'Abarrotes', base: 118000 },
];

export const LISTAS = [
  { id: 'l1', nombre: 'Lista Pública', tipo: 'Base', desc: 'Precios públicos por defecto' },
  { id: 'l2', nombre: 'Mayorista −8%', tipo: 'Descuento porcentual', desc: '−8% sobre la lista pública' },
  { id: 'l3', nombre: 'Preferencial El Bacán', tipo: 'Precios fijos por producto', desc: 'Acuerdo específico con el cliente' },
  { id: 'l4', nombre: 'Crédito +5%', tipo: 'Recargo porcentual', desc: '+5% para pago a cartera' },
];

// Fixed per-product prices for the "Preferencial El Bacán" list.
export const L3 = { p1: 43500, p6: 52000, p2: 22800, p8: 26500 };

export const CLIENTS = [
  { id: 'c1', nombre: 'EL BACAN II', zona: 'Suba', tel: '3143731996', lista: 'l3', vendedor: 'Andrés Peña', pedidos: 24 },
  { id: 'c2', nombre: 'DONDE PACHO', zona: 'Engativá', tel: '3108845210', lista: 'l2', vendedor: 'Andrés Peña', pedidos: 17 },
  { id: 'c3', nombre: 'MERKA EXPRESS', zona: 'Bosa', tel: '3005531184', lista: 'l1', vendedor: 'Marcela Ríos', pedidos: 9 },
  { id: 'c4', nombre: 'TIENDA LA 80', zona: 'Kennedy', tel: '3216677030', lista: 'l4', vendedor: 'Julián Soto', pedidos: 12 },
  { id: 'c5', nombre: 'SUPERMERCADO JR', zona: 'Fontibón', tel: '3129984471', lista: 'l2', vendedor: 'Marcela Ríos', pedidos: 31 },
];

export const VENDEDORES = [
  { nombre: 'Andrés Peña', zona: 'Suba / Engativá', clientes: 12, pedidos: 38, ventas: 18425000 },
  { nombre: 'Marcela Ríos', zona: 'Bosa / Fontibón', clientes: 9, pedidos: 29, ventas: 14210000 },
  { nombre: 'Julián Soto', zona: 'Kennedy', clientes: 7, pedidos: 21, ventas: 9861000 },
];

export const TODAY_LABEL = '15 jul';

export const INITIAL_ORDERS = [
  {
    id: 'o1', ref: 'PED-509994', cliente: 'c1', fecha: '15 jul', estado: 'aprobado',
    items: [
      { pid: 'p1', cant: 4 }, { pid: 'p5', cant: 1 }, { pid: 'p8', cant: 3 }, { pid: 'p6', cant: 1 },
      { pid: 'p3', cant: 1 }, { pid: 'p2', cant: 3 }, { pid: 'p10', cant: 1 },
    ],
  },
  {
    id: 'o2', ref: 'PED-509995', cliente: 'c2', fecha: '15 jul', estado: 'pendiente',
    items: [{ pid: 'p4', cant: 2 }, { pid: 'p6', cant: 1 }, { pid: 'p11', cant: 4 }],
  },
  {
    id: 'o3', ref: 'PED-509996', cliente: 'c3', fecha: '15 jul', estado: 'en cargue',
    items: [{ pid: 'p12', cant: 1 }, { pid: 'p9', cant: 2 }, { pid: 'p1', cant: 2 }],
  },
  {
    id: 'o4', ref: 'PED-509993', cliente: 'c4', fecha: '14 jul', estado: 'despachado',
    items: [{ pid: 'p7', cant: 2 }, { pid: 'p2', cant: 2 }, { pid: 'p10', cant: 6 }],
  },
  {
    id: 'o5', ref: 'PED-509990', cliente: 'c5', fecha: '13 jul', estado: 'entregado',
    items: [{ pid: 'p1', cant: 6 }, { pid: 'p6', cant: 2 }, { pid: 'p8', cant: 4 }, { pid: 'p3', cant: 2 }],
  },
];

export const INITIAL_CANASTILLAS = [
  { cliente: 'EL BACAN II', salieron: 14, volvieron: 10 },
  { cliente: 'DONDE PACHO', salieron: 8, volvieron: 8 },
  { cliente: 'MERKA EXPRESS', salieron: 11, volvieron: 6 },
  { cliente: 'TIENDA LA 80', salieron: 6, volvieron: 2 },
  { cliente: 'SUPERMERCADO JR', salieron: 18, volvieron: 17 },
];

export const fmt = (n) => '$ ' + Math.round(n).toLocaleString('es-CO');
export const fmtN = (n) => Math.round(n).toLocaleString('es-CO');
export const prod = (pid) => PRODUCTS.find((p) => p.id === pid);
export const client = (cid) => CLIENTS.find((c) => c.id === cid);

export function price(pid, listaId) {
  const b = prod(pid).base;
  if (listaId === 'l2') return Math.round((b * 0.92) / 100) * 100;
  if (listaId === 'l4') return Math.round((b * 1.05) / 100) * 100;
  if (listaId === 'l3') return L3[pid] !== undefined ? L3[pid] : b;
  return b;
}

export function orderTotal(o) {
  const lista = client(o.cliente).lista;
  return o.items.reduce((s, i) => s + price(i.pid, lista) * i.cant, 0);
}

export const ini = (n) =>
  n
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
