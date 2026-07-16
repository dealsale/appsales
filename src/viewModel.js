// Port of the Distribuidora Rivera design logic: turns raw state into the
// view model consumed by every screen component.
import {
  ACCENT,
  CATCOLORS,
  CLIENTS,
  ESTADOS,
  LISTAS,
  PRODUCTS,
  STC,
  TODAY_LABEL,
  VENDEDORES,
  client,
  fmt,
  fmtN,
  ini,
  orderTotal,
  price,
  prod,
} from './data';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
  { id: 'pedidos', label: 'Pedidos', icon: 'M9 4h6v3H9zM9 4H5v17h14V4h-4M9 12h6M9 16h6' },
  { id: 'productos', label: 'Productos', icon: 'M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8' },
  { id: 'precios', label: 'Listas de precios', icon: 'M3 12l9-9h9v9l-9 9zM16.5 7.5h.01' },
  {
    id: 'clientes', label: 'Clientes',
    icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM4 20c0-3.3 2.2-5 5-5s5 1.7 5 5M16 10.8a3 3 0 000-5.6M15.5 15.2c2.5.3 4.5 1.9 4.5 4.8',
  },
  { id: 'vendedores', label: 'Vendedores', icon: 'M4 8h16v12H4zM9 8V5h6v3M4 13h16M12 12v3' },
  { id: 'factura', label: 'Facturación', icon: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h4' },
  { id: 'tirillas', label: 'Tirillas de cargue', icon: 'M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21zM9 8h6M9 12h6' },
  { id: 'canastillas', label: 'Canastillas', icon: 'M3 8h18v12H3zM3 8l2-4h14l2 4M8 12h8M8 16h8' },
];

const TITLES = {
  dashboard: 'Dashboard',
  pedidos: 'Pedidos',
  productos: 'Productos y catálogo',
  precios: 'Listas de precios',
  clientes: 'Clientes',
  vendedores: 'Vendedores',
  factura: 'Facturación',
  tirillas: 'Tirillas de cargue',
  canastillas: 'Control de canastillas',
};

function stepsFor(estado) {
  const idx = ESTADOS.indexOf(estado);
  return ESTADOS.map((e, i) => ({
    label: e,
    bg: i <= idx ? '#24256F' : '#DFE3F0',
    fg: i <= idx ? '#24256F' : '#A5ABC4',
  }));
}

function facturaFromOrder(o) {
  const c = client(o.cliente);
  const lista = c.lista;
  return {
    type: 'factura',
    cliente: c.nombre,
    dir: c.zona.toUpperCase(),
    tel: c.tel,
    ref: o.ref,
    items: o.items.map((i) => ({
      cant: i.cant,
      nombre: prod(i.pid).nombre,
      unitN: fmtN(price(i.pid, lista)),
      totalN: fmtN(price(i.pid, lista) * i.cant),
    })),
    totalF: fmt(orderTotal(o)),
  };
}

function tirillaFromOrders(orders) {
  const agg = {};
  orders.forEach((o) => o.items.forEach((i) => { agg[i.pid] = (agg[i.pid] || 0) + i.cant; }));
  const rows = Object.keys(agg)
    .map((pid) => ({ nombre: prod(pid).nombre, cant: agg[pid] }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
  return {
    type: 'tirilla',
    refs: orders.map((o) => o.ref).join(', '),
    rows,
    totalU: rows.reduce((s, r) => s + r.cant, 0),
  };
}

export function buildViewModel(S, set, toast) {
  const advanceOrder = (id) => {
    set((s) => ({
      orders: s.orders.map((o) => {
        if (o.id !== id) return o;
        const i = ESTADOS.indexOf(o.estado);
        return i < ESTADOS.length - 1 ? { ...o, estado: ESTADOS[i + 1] } : o;
      }),
    }));
    toast('Estado actualizado');
  };

  const cartContextLista = () =>
    S.role === 'cliente' ? client('c1').lista : client(S.vClienteSel).lista;

  // nav
  const navItems = NAV.map((n) => ({
    ...n,
    fw: S.screen === n.id ? 800 : 500,
    bg: S.screen === n.id ? 'rgba(231,234,248,.16)' : 'transparent',
    fg: S.screen === n.id ? '#F3F5FB' : '#B9C1E8',
    go: () => set({ screen: n.id }),
  }));

  // orders view
  const mkOrder = (o) => {
    const c = client(o.cliente);
    const st = STC[o.estado];
    const idx = ESTADOS.indexOf(o.estado);
    const canAdvance = idx < ESTADOS.length - 1;
    return {
      ref: o.ref,
      cliente: c.nombre,
      fecha: o.fecha,
      estado: o.estado,
      stBg: st.bg,
      stFg: st.fg,
      itemsCount: o.items.length,
      totalF: fmt(orderTotal(o)),
      canAdvance,
      advanceLabel: o.estado === 'pendiente' ? 'Aprobar' : '→ ' + ESTADOS[idx + 1],
      advance: () => advanceOrder(o.id),
      open: () => set({ selOrderId: o.id }),
      facturar: () => set({ doc: facturaFromOrder(o) }),
      tirilla: () => set({ doc: tirillaFromOrders([o]) }),
      steps: stepsFor(o.estado),
      stepLabel: 'Estado: ' + o.estado.charAt(0).toUpperCase() + o.estado.slice(1),
    };
  };
  const filtered =
    S.estadoFilter && S.estadoFilter !== 'todos'
      ? S.orders.filter((o) => o.estado === S.estadoFilter)
      : S.orders;
  const ordersView = filtered.map(mkOrder);
  const estadoChips = ['todos', ...ESTADOS].map((e) => {
    const active = (S.estadoFilter || 'todos') === e;
    return {
      label: e === 'todos' ? 'Todos' : e.charAt(0).toUpperCase() + e.slice(1),
      bg: active ? '#24256F' : '#FFFFFF',
      fg: active ? '#F3F5FB' : '#4E5268',
      bd: active ? '#24256F' : '#CBD2E8',
      go: () => set({ estadoFilter: e }),
    };
  });

  // KPIs
  const ventasHoy = S.orders
    .filter((o) => o.fecha === TODAY_LABEL)
    .reduce((s, o) => s + orderTotal(o), 0);
  const pendientes = S.orders.filter((o) => o.estado === 'pendiente').length;
  const canFuera = S.canastillas.reduce((s, c) => s + (c.salieron - c.volvieron), 0);
  const kpis = [
    { label: 'Ventas de hoy', value: fmt(ventasHoy), sub: '+12% vs ayer', subColor: '#24256F' },
    {
      label: 'Pedidos de hoy',
      value: String(S.orders.filter((o) => o.fecha === TODAY_LABEL).length),
      sub: pendientes + ' por aprobar',
      subColor: '#B7791F',
    },
    { label: 'Clientes activos', value: '28', sub: '3 nuevos esta semana', subColor: '#24256F' },
    { label: 'Canastillas fuera', value: String(canFuera), sub: 'en la calle', subColor: '#B7791F' },
  ];

  // products
  const catList = ['Todos', ...Object.keys(CATCOLORS)];
  const catChips = catList.map((c) => {
    const active = S.catFilter === c;
    return {
      label: c,
      bg: active ? '#24256F' : '#FFFFFF',
      fg: active ? '#F3F5FB' : '#4E5268',
      bd: active ? '#24256F' : '#CBD2E8',
      go: () => set({ catFilter: c }),
    };
  });
  const prodFiltered =
    S.catFilter === 'Todos' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === S.catFilter);
  const productsView = prodFiltered.map((p) => ({
    nombre: p.nombre,
    cat: p.cat,
    ini: ini(p.nombre),
    tileBg: CATCOLORS[p.cat].bg,
    tileFg: CATCOLORS[p.cat].fg,
    base: fmt(p.base),
    mayor: fmt(price(p.id, 'l2')),
    recargo: fmt(price(p.id, 'l4')),
  }));

  // catalog (vendedor/cliente context)
  const ctxLista = cartContextLista();
  const catalogView = prodFiltered.map((p) => {
    const pr = price(p.id, ctxLista);
    const qty = S.cart[p.id] || 0;
    const dif = pr - p.base;
    return {
      id: p.id,
      nombre: p.nombre,
      ini: ini(p.nombre),
      tileBg: CATCOLORS[p.cat].bg,
      tileFg: CATCOLORS[p.cat].fg,
      precio: fmt(pr),
      qty: String(qty),
      qtyColor: qty > 0 ? '#E4572E' : '#A5ABC4',
      inCart: qty > 0,
      notInCart: qty === 0,
      dif: dif === 0 ? '' : dif < 0 ? '−' + fmtN(-dif) : '+' + fmtN(dif),
      difColor: dif < 0 ? '#24256F' : '#B7791F',
      add: () => set((s) => ({ cart: { ...s.cart, [p.id]: (s.cart[p.id] || 0) + 1 } })),
      sub: () =>
        set((s) => {
          const q = (s.cart[p.id] || 0) - 1;
          const c = { ...s.cart };
          if (q <= 0) delete c[p.id];
          else c[p.id] = q;
          return { cart: c };
        }),
    };
  });
  const cartPids = Object.keys(S.cart);
  const cartItems = cartPids.map((pid) => {
    const p = prod(pid);
    const pr = price(pid, ctxLista);
    const q = S.cart[pid];
    return {
      id: pid,
      nombre: p.nombre,
      qty: String(q),
      unit: fmt(pr),
      total: fmt(pr * q),
      quitar: () =>
        set((s) => {
          const c = { ...s.cart };
          delete c[pid];
          return { cart: c };
        }),
    };
  });
  const cartTotalN = cartPids.reduce((s, pid) => s + price(pid, ctxLista) * S.cart[pid], 0);
  const cartCount = cartPids.reduce((s, pid) => s + S.cart[pid], 0);
  const confirmarPedido = () => {
    if (!cartPids.length) return;
    const cid = S.role === 'cliente' ? 'c1' : S.vClienteSel;
    const ref = 'PED-' + S.nextRef;
    set((s) => ({
      orders: [
        {
          id: 'o' + Date.now(),
          ref,
          cliente: cid,
          fecha: TODAY_LABEL,
          estado: 'pendiente',
          items: Object.keys(s.cart).map((pid) => ({ pid, cant: s.cart[pid] })),
        },
        ...s.orders,
      ],
      cart: {},
      nextRef: s.nextRef + 1,
      cScreen: s.role === 'cliente' ? 'pedidos' : s.cScreen,
      vScreen: s.role === 'vendedor' ? 'home' : s.vScreen,
    }));
    toast('Pedido ' + ref + ' enviado · pendiente de aprobación');
  };

  // listas de precios
  const listasView = LISTAS.map((l) => {
    const n = CLIENTS.filter((c) => c.lista === l.id).length;
    return {
      ...l,
      clientes: n + (n === 1 ? ' cliente asignado' : ' clientes asignados'),
      bd: S.listSel === l.id ? '#24256F' : '#DFE3F0',
      go: () => set({ listSel: l.id }),
    };
  });
  const lSel = LISTAS.find((l) => l.id === S.listSel);
  const listaRows = PRODUCTS.map((p) => {
    const pr = price(p.id, S.listSel);
    const d = pr - p.base;
    return {
      id: p.id,
      nombre: p.nombre,
      base: fmt(p.base),
      precio: fmt(pr),
      dif: d === 0 ? '=' : d < 0 ? '−' + fmtN(-d) : '+' + fmtN(d),
      difColor: d === 0 ? '#A5ABC4' : d < 0 ? '#24256F' : '#B7791F',
    };
  });

  // clientes / vendedores
  const clientsView = CLIENTS.map((c) => ({
    ...c,
    lista: LISTAS.find((l) => l.id === c.lista).nombre,
  }));
  const vendedoresView = VENDEDORES.map((v) => ({
    ...v,
    ini: v.nombre.split(' ').map((w) => w[0]).join(''),
    clientes: String(v.clientes),
    pedidos: String(v.pedidos),
    ventas: fmt(v.ventas),
  }));

  // factura manual
  const mPids = Object.keys(S.mCart);
  const mTotalN = mPids.reduce(
    (s, pid) => s + price(pid, client(S.mCliente).lista) * S.mCart[pid],
    0
  );
  const manualRows = PRODUCTS.map((p) => {
    const q = S.mCart[p.id] || 0;
    return {
      id: p.id,
      nombre: p.nombre,
      precio: fmtN(price(p.id, client(S.mCliente).lista)),
      qty: String(q),
      qtyColor: q > 0 ? '#E4572E' : '#A5ABC4',
      add: () => set((s) => ({ mCart: { ...s.mCart, [p.id]: (s.mCart[p.id] || 0) + 1 } })),
      sub: () =>
        set((s) => {
          const n = (s.mCart[p.id] || 0) - 1;
          const c = { ...s.mCart };
          if (n <= 0) delete c[p.id];
          else c[p.id] = n;
          return { mCart: c };
        }),
    };
  });
  const genManual = () => {
    if (!mPids.length) {
      toast('Agrega productos a la factura');
      return;
    }
    const c = client(S.mCliente);
    set({
      doc: {
        type: 'factura',
        cliente: c.nombre,
        dir: c.zona.toUpperCase(),
        tel: c.tel,
        ref: 'MANUAL-' + S.nextRef,
        items: mPids.map((pid) => ({
          cant: S.mCart[pid],
          nombre: prod(pid).nombre,
          unitN: fmtN(price(pid, c.lista)),
          totalN: fmtN(price(pid, c.lista) * S.mCart[pid]),
        })),
        totalF: fmt(mTotalN),
      },
      mCart: {},
      nextRef: S.nextRef + 1,
    });
  };

  // tirillas
  const tirCandidates = S.orders.filter((o) => o.estado === 'aprobado' || o.estado === 'en cargue');
  const tirillaOrders = tirCandidates.map((o) => {
    const sel = !!S.tirillaSel[o.id];
    const st = STC[o.estado];
    const c = client(o.cliente);
    return {
      id: o.id,
      ref: o.ref,
      cliente: c.nombre,
      itemsCount: o.items.length,
      estado: o.estado,
      stBg: st.bg,
      stFg: st.fg,
      ck: sel ? '✓' : '',
      ckBd: sel ? '#24256F' : '#B6BFDE',
      ckBg: sel ? '#24256F' : '#FFFFFF',
      rowBg: sel ? '#F0F3FC' : '#FFFFFF',
      toggle: () => set((s) => ({ tirillaSel: { ...s.tirillaSel, [o.id]: !s.tirillaSel[o.id] } })),
    };
  });
  const tirCount = tirCandidates.filter((o) => S.tirillaSel[o.id]).length;
  const genTirilla = () => {
    const sel = tirCandidates.filter((o) => S.tirillaSel[o.id]);
    if (!sel.length) {
      toast('Selecciona al menos un pedido');
      return;
    }
    set({ doc: tirillaFromOrders(sel) });
  };

  // canastillas
  const canastillasView = S.canastillas.map((c, idx) => {
    const pend = c.salieron - c.volvieron;
    return {
      ...c,
      salieron: String(c.salieron),
      volvieron: String(c.volvieron),
      pendientes: String(pend),
      pendColor: pend > 0 ? '#B7791F' : '#24256F',
      devolver: () => {
        if (pend <= 0) {
          toast('Este cliente no tiene canastillas pendientes');
          return;
        }
        set((s) => ({
          canastillas: s.canastillas.map((x, i) =>
            i === idx ? { ...x, volvieron: x.volvieron + 1 } : x
          ),
        }));
        toast('Devolución registrada · ' + c.cliente);
      },
    };
  });

  // vendedor phone
  const vClientes = CLIENTS.slice(0, 5).map((c) => ({
    id: c.id,
    nombre: c.nombre,
    zona: c.zona,
    ini: ini(c.nombre),
    lista: LISTAS.find((l) => l.id === c.lista).nombre,
    pedido: () => set({ vClienteSel: c.id, vScreen: 'catalogo', cart: {} }),
  }));

  // cliente phone
  const misPedidos = S.orders.filter((o) => o.cliente === 'c1').map(mkOrder);

  // selected order
  const selO = S.orders.find((o) => o.id === S.selOrderId);
  const so = selO
    ? {
        ...mkOrder(selO),
        dir: client(selO.cliente).zona,
        tel: client(selO.cliente).tel,
        items: selO.items.map((i) => {
          const lista = client(selO.cliente).lista;
          const pr = price(i.pid, lista);
          return {
            cant: String(i.cant),
            nombre: prod(i.pid).nombre,
            unit: fmt(pr),
            total: fmt(pr * i.cant),
          };
        }),
      }
    : null;

  const roleBtn = (r) => ({
    bg: S.role === r ? ACCENT : 'transparent',
    fg: S.role === r ? '#FFF6EE' : '#9BA0B8',
  });

  return {
    isAdmin: S.role === 'admin',
    isVendedor: S.role === 'vendedor',
    isCliente: S.role === 'cliente',
    goRolAdmin: () => set({ role: 'admin', cart: {} }),
    goRolVendedor: () => set({ role: 'vendedor', cart: {}, vScreen: 'home' }),
    goRolCliente: () => set({ role: 'cliente', cart: {}, cScreen: 'catalogo' }),
    rolAdminBg: roleBtn('admin').bg,
    rolAdminFg: roleBtn('admin').fg,
    rolVendBg: roleBtn('vendedor').bg,
    rolVendFg: roleBtn('vendedor').fg,
    rolCliBg: roleBtn('cliente').bg,
    rolCliFg: roleBtn('cliente').fg,

    navItems,
    screenTitle: TITLES[S.screen],
    sDash: S.screen === 'dashboard',
    sPedidos: S.screen === 'pedidos',
    sProductos: S.screen === 'productos',
    sPrecios: S.screen === 'precios',
    sClientes: S.screen === 'clientes',
    sVendedores: S.screen === 'vendedores',
    sFactura: S.screen === 'factura',
    sTirillas: S.screen === 'tirillas',
    sCanastillas: S.screen === 'canastillas',
    goPedidos: () => set({ screen: 'pedidos' }),
    goCanastillas: () => set({ screen: 'canastillas' }),
    goFactura: () => set({ screen: 'factura' }),
    goTirillas: () => set({ screen: 'tirillas' }),
    goClientes: () => set({ screen: 'clientes' }),

    kpis,
    recentOrders: ordersView.slice(0, 4),
    ordersView,
    estadoChips,
    canastillasFuera: String(canFuera),
    canastillasVueltas: '43',
    canastillasCobradas: '2',
    catChips,
    productsView,
    catalogView,
    cartItems,
    cartTotal: fmt(cartTotalN),
    cartCount: String(cartCount),
    cartEmpty: cartPids.length === 0,
    cartHasItems: cartPids.length > 0,
    confirmarPedido,
    carritoPara: S.role === 'vendedor' ? 'Pedido para: ' + client(S.vClienteSel).nombre : '',

    listasView,
    listaSelNombre: lSel.nombre,
    listaSelTipo: lSel.tipo,
    listaRows,
    clientsView,
    vendedoresView,
    canastillasView,

    clientOptions: CLIENTS.map((c) => ({ id: c.id, nombre: c.nombre })),
    mCliente: S.mCliente,
    setMCliente: (e) => set({ mCliente: e.target.value, mCart: {} }),
    manualRows,
    mTotal: fmt(mTotalN),
    genManual,
    mBtnBg: mPids.length ? '#24256F' : '#A5ABC4',

    tirillaOrders,
    tirCount: String(tirCount),
    genTirilla,
    tirBtnBg: tirCount > 0 ? '#24256F' : '#A5ABC4',

    vHome: S.vScreen === 'home',
    vNuevo: S.vScreen === 'nuevo',
    vCat: S.vScreen === 'catalogo',
    vCarr: S.vScreen === 'carrito',
    vGoHome: () => set({ vScreen: 'home' }),
    vGoCat: () => set({ vScreen: 'catalogo' }),
    vGoCarr: () => set({ vScreen: 'carrito' }),
    vGoNuevoCliente: () => set({ vScreen: 'nuevo' }),
    vGuardarCliente: () => {
      set({ vScreen: 'home' });
      toast('Cliente enviado para aprobación del admin');
    },
    vNavHome: S.vScreen === 'home' ? '#24256F' : '#9BA0B8',
    vNavCat: S.vScreen === 'catalogo' ? '#24256F' : '#9BA0B8',
    vNavCarr: S.vScreen === 'carrito' ? '#24256F' : '#9BA0B8',
    vClientes,
    vClienteSel: S.vClienteSel,
    setVCliente: (e) => set({ vClienteSel: e.target.value, cart: {} }),

    cCat: S.cScreen === 'catalogo',
    cCarr: S.cScreen === 'carrito',
    cPed: S.cScreen === 'pedidos',
    cGoCat: () => set({ cScreen: 'catalogo' }),
    cGoCarr: () => set({ cScreen: 'carrito' }),
    cGoPed: () => set({ cScreen: 'pedidos' }),
    cNavCat: S.cScreen === 'catalogo' ? '#24256F' : '#9BA0B8',
    cNavCarr: S.cScreen === 'carrito' ? '#24256F' : '#9BA0B8',
    cNavPed: S.cScreen === 'pedidos' ? '#24256F' : '#9BA0B8',
    misPedidos,

    hasSelOrder: !!so,
    so: so || {},
    cerrarOrden: () => set({ selOrderId: null }),
    stop: (e) => e.stopPropagation(),

    hasDoc: !!S.doc,
    doc: S.doc || {},
    docFactura: S.doc ? S.doc.type === 'factura' : false,
    docTirilla: S.doc ? S.doc.type === 'tirilla' : false,
    cerrarDoc: () => set({ doc: null }),
    imprimirDoc: () => window.print(),

    hasToast: !!S.toast,
    toastText: S.toast || '',
    toastNuevoProducto: () => toast('Formulario de nuevo producto (siguiente iteración)'),
    toastNuevaLista: () => toast('Creación de listas (siguiente iteración)'),
    toastNuevoCliente: () => toast('Formulario de nueva cuenta (siguiente iteración)'),
  };
}
