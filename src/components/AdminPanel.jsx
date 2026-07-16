import React from 'react';

const MONO = "'IBM Plex Mono',monospace";

function Pill({ bg, fg, children }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '.06em',
        textTransform: 'uppercase',
        padding: '4px 10px',
        borderRadius: 99,
        background: bg,
        color: fg,
      }}
    >
      {children}
    </span>
  );
}

function Dashboard({ vm }) {
  return (
    <div data-screen-label="Admin — Dashboard">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {vm.kpis.map((k, i) => (
          <div key={i} style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, padding: '18px 18px 16px' }}>
            <div style={{ fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7C82A0', fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, marginTop: 8, fontFamily: MONO, letterSpacing: '-.02em' }}>{k.value}</div>
            <div style={{ fontSize: 12, color: k.subColor, marginTop: 4, fontWeight: 600 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginTop: 14 }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid #E8EBF5' }}>
            <div style={{ fontWeight: 800, fontSize: 14.5 }}>Pedidos recientes</div>
            <div onClick={vm.goPedidos} style={{ fontSize: 12.5, fontWeight: 700, color: '#24256F', cursor: 'pointer' }}>Ver todos →</div>
          </div>
          {vm.recentOrders.map((o, i) => (
            <div key={i} onClick={o.open} className="hov-row" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: '1px solid #EEF1F8', cursor: 'pointer' }}>
              <div style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 600, color: '#7C82A0', width: 96 }}>{o.ref}</div>
              <div style={{ flex: 1, fontWeight: 700, fontSize: 13.5 }}>{o.cliente}</div>
              <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600 }}>{o.totalF}</div>
              <Pill bg={o.stBg} fg={o.stFg}>{o.estado}</Pill>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#24256F', color: '#F3F5FB', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#A9B2E0', fontWeight: 600 }}>Canastillas en la calle</div>
            <div style={{ fontSize: 34, fontWeight: 900, fontFamily: MONO, marginTop: 6 }}>{vm.canastillasFuera}</div>
            <div onClick={vm.goCanastillas} style={{ marginTop: 10, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', color: '#E7EAF8', textDecoration: 'underline' }}>Control de canastillas →</div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, padding: 18 }}>
            <div style={{ fontWeight: 800, fontSize: 14.5 }}>Acciones rápidas</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              <div onClick={vm.goFactura} className="hov-quick" style={{ padding: '10px 12px', border: '1px solid #DFE3F0', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Factura manual</div>
              <div onClick={vm.goTirillas} className="hov-quick" style={{ padding: '10px 12px', border: '1px solid #DFE3F0', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Generar tirilla de cargue</div>
              <div onClick={vm.goClientes} className="hov-quick" style={{ padding: '10px 12px', border: '1px solid #DFE3F0', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Nueva cuenta de cliente</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pedidos({ vm }) {
  const cols = '110px 1.4fr 90px 70px 110px 130px 170px';
  return (
    <div data-screen-label="Admin — Pedidos">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {vm.estadoChips.map((c, i) => (
          <div key={i} onClick={c.go} style={{ padding: '7px 14px', borderRadius: 99, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', border: `1px solid ${c.bd}`, background: c.bg, color: c.fg }}>{c.label}</div>
        ))}
      </div>
      <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, padding: '11px 18px', borderBottom: '1px solid #DFE3F0', fontSize: 11, letterSpacing: '.09em', textTransform: 'uppercase', color: '#7C82A0', fontWeight: 700 }}>
          <div>Ref</div><div>Cliente</div><div>Fecha</div><div>Ítems</div><div>Total</div><div>Estado</div><div style={{ textAlign: 'right' }}>Acciones</div>
        </div>
        {vm.ordersView.map((o, i) => (
          <div key={i} className="hov-row" style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, padding: '13px 18px', borderBottom: '1px solid #EEF1F8', alignItems: 'center' }}>
            <div style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 600, color: '#4E5268' }}>{o.ref}</div>
            <div style={{ fontWeight: 700, fontSize: 13.5 }}>{o.cliente}</div>
            <div style={{ fontSize: 12.5, color: '#6B7089' }}>{o.fecha}</div>
            <div style={{ fontSize: 12.5, color: '#6B7089' }}>{o.itemsCount}</div>
            <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600 }}>{o.totalF}</div>
            <div><Pill bg={o.stBg} fg={o.stFg}>{o.estado}</Pill></div>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
              <div onClick={o.open} className="hov-border" style={{ padding: '6px 12px', border: '1px solid #CBD2E8', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Ver</div>
              {o.canAdvance && (
                <div onClick={o.advance} className="hov-primary" style={{ padding: '6px 12px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer', background: '#24256F', color: '#F3F5FB' }}>{o.advanceLabel}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Productos({ vm }) {
  const cols = '52px 1.6fr 130px 120px 120px 120px';
  return (
    <div data-screen-label="Admin — Productos">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {vm.catChips.map((c, i) => (
            <div key={i} onClick={c.go} style={{ padding: '7px 14px', borderRadius: 99, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', border: `1px solid ${c.bd}`, background: c.bg, color: c.fg }}>{c.label}</div>
          ))}
        </div>
        <div onClick={vm.toastNuevoProducto} className="hov-primary" style={{ padding: '9px 16px', borderRadius: 8, background: '#24256F', color: '#F3F5FB', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Nuevo producto</div>
      </div>
      <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 12, padding: '11px 18px', borderBottom: '1px solid #DFE3F0', fontSize: 11, letterSpacing: '.09em', textTransform: 'uppercase', color: '#7C82A0', fontWeight: 700, alignItems: 'center' }}>
          <div></div><div>Producto</div><div>Categoría</div><div>P. Público</div><div>Mayorista</div><div>Recargo</div>
        </div>
        {vm.productsView.map((p, i) => (
          <div key={i} className="hov-row" style={{ display: 'grid', gridTemplateColumns: cols, gap: 12, padding: '11px 18px', borderBottom: '1px solid #EEF1F8', alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 9, background: p.tileBg, color: p.tileFg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13 }}>{p.ini}</div>
            <div style={{ fontWeight: 700, fontSize: 13.5 }}>{p.nombre}</div>
            <div style={{ fontSize: 12, color: '#6B7089' }}>{p.cat}</div>
            <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600 }}>{p.base}</div>
            <div style={{ fontFamily: MONO, fontSize: 12.5, color: '#24256F' }}>{p.mayor}</div>
            <div style={{ fontFamily: MONO, fontSize: 12.5, color: '#B7791F' }}>{p.recargo}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Precios({ vm }) {
  return (
    <div data-screen-label="Admin — Listas de precios" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 14, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {vm.listasView.map((l, i) => (
          <div key={i} onClick={l.go} style={{ background: '#FFFFFF', border: `2px solid ${l.bd}`, borderRadius: 12, padding: '14px 16px', cursor: 'pointer' }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>{l.nombre}</div>
            <div style={{ fontSize: 12, color: '#6B7089', marginTop: 3 }}>{l.desc}</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: '#24256F', marginTop: 8 }}>{l.clientes}</div>
          </div>
        ))}
        <div onClick={vm.toastNuevaLista} className="hov-border-ink" style={{ border: '1.5px dashed #B6BFDE', borderRadius: 12, padding: 13, textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#7C82A0', cursor: 'pointer' }}>+ Crear lista de precios</div>
      </div>
      <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '15px 18px', borderBottom: '1px solid #DFE3F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 14.5 }}>{vm.listaSelNombre}</div>
          <div style={{ fontSize: 12, color: '#6B7089' }}>{vm.listaSelTipo}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 120px 120px 90px', gap: 12, padding: '10px 18px', borderBottom: '1px solid #DFE3F0', fontSize: 11, letterSpacing: '.09em', textTransform: 'uppercase', color: '#7C82A0', fontWeight: 700 }}>
          <div>Producto</div><div>P. Público</div><div>Precio lista</div><div>Dif.</div>
        </div>
        {vm.listaRows.map((r, i) => (
          <div key={i} className="hov-row" style={{ display: 'grid', gridTemplateColumns: '1.7fr 120px 120px 90px', gap: 12, padding: '10px 18px', borderBottom: '1px solid #EEF1F8', alignItems: 'center', fontSize: 13 }}>
            <div style={{ fontWeight: 600 }}>{r.nombre}</div>
            <div style={{ fontFamily: MONO, color: '#7C82A0' }}>{r.base}</div>
            <div style={{ fontFamily: MONO, fontWeight: 700 }}>{r.precio}</div>
            <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: r.difColor }}>{r.dif}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Clientes({ vm }) {
  const cols = '1.5fr 110px 120px 160px 150px 80px';
  return (
    <div data-screen-label="Admin — Clientes">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <div onClick={vm.toastNuevoCliente} className="hov-primary" style={{ padding: '9px 16px', borderRadius: 8, background: '#24256F', color: '#F3F5FB', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Nueva cuenta de cliente</div>
      </div>
      <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, padding: '11px 18px', borderBottom: '1px solid #DFE3F0', fontSize: 11, letterSpacing: '.09em', textTransform: 'uppercase', color: '#7C82A0', fontWeight: 700 }}>
          <div>Negocio</div><div>Zona</div><div>Teléfono</div><div>Lista de precios</div><div>Vendedor</div><div>Pedidos</div>
        </div>
        {vm.clientsView.map((c, i) => (
          <div key={i} className="hov-row" style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, padding: '13px 18px', borderBottom: '1px solid #EEF1F8', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 13.5 }}>{c.nombre}</div>
            <div style={{ fontSize: 12.5, color: '#6B7089' }}>{c.zona}</div>
            <div style={{ fontSize: 12.5, color: '#6B7089', fontFamily: MONO }}>{c.tel}</div>
            <div><span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99, background: '#E7EBFA', color: '#24256F' }}>{c.lista}</span></div>
            <div style={{ fontSize: 12.5 }}>{c.vendedor}</div>
            <div style={{ fontFamily: MONO, fontSize: 13 }}>{c.pedidos}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Vendedores({ vm }) {
  return (
    <div data-screen-label="Admin — Vendedores" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
      {vm.vendedoresView.map((v, i) => (
        <div key={i} style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1B1D52', color: '#F3F5FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15 }}>{v.ini}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{v.nombre}</div>
              <div style={{ fontSize: 12, color: '#6B7089' }}>Vendedor TAT · {v.zona}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
            <div style={{ background: '#F3F5FB', borderRadius: 8, padding: 10, textAlign: 'center' }}>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 17 }}>{v.clientes}</div>
              <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.06em', color: '#7C82A0', fontWeight: 600, marginTop: 2 }}>Clientes</div>
            </div>
            <div style={{ background: '#F3F5FB', borderRadius: 8, padding: 10, textAlign: 'center' }}>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 17 }}>{v.pedidos}</div>
              <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.06em', color: '#7C82A0', fontWeight: 600, marginTop: 2 }}>Pedidos</div>
            </div>
            <div style={{ background: '#E7EBFA', borderRadius: 8, padding: 10, textAlign: 'center' }}>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 13, color: '#24256F', paddingTop: 3 }}>{v.ventas}</div>
              <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.06em', color: '#24256F', fontWeight: 600, marginTop: 4 }}>Mes</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Factura({ vm }) {
  return (
    <div data-screen-label="Admin — Facturación" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 14, alignItems: 'start' }}>
      <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '15px 18px', borderBottom: '1px solid #DFE3F0', fontWeight: 800, fontSize: 14.5 }}>Facturar desde pedido</div>
        {vm.ordersView.map((o, i) => (
          <div key={i} className="hov-row" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: '1px solid #EEF1F8' }}>
            <div style={{ fontFamily: MONO, fontSize: 12, color: '#7C82A0', width: 92 }}>{o.ref}</div>
            <div style={{ flex: 1, fontWeight: 700, fontSize: 13 }}>{o.cliente}</div>
            <div style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 600 }}>{o.totalF}</div>
            <div onClick={o.facturar} className="hov-primary" style={{ padding: '6px 12px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer', background: '#24256F', color: '#F3F5FB' }}>Factura PDF</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '15px 18px', borderBottom: '1px solid #DFE3F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 800, fontSize: 14.5 }}>Factura manual</div>
          <select value={vm.mCliente} onChange={vm.setMCliente} style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, fontWeight: 600, padding: '7px 10px', border: '1px solid #CBD2E8', borderRadius: 8, background: '#F3F5FB', color: '#191B2E' }}>
            {vm.clientOptions.map((op) => (
              <option key={op.id} value={op.id}>{op.nombre}</option>
            ))}
          </select>
        </div>
        <div style={{ maxHeight: 380, overflowY: 'auto' }}>
          {vm.manualRows.map((m) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 18px', borderBottom: '1px solid #EEF1F8' }}>
              <div style={{ flex: 1, fontSize: 12.5, fontWeight: 600 }}>{m.nombre}</div>
              <div style={{ fontFamily: MONO, fontSize: 12, color: '#6B7089', width: 76, textAlign: 'right' }}>{m.precio}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div onClick={m.sub} className="hov-border-ink" style={{ width: 26, height: 26, border: '1px solid #CBD2E8', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 800, fontSize: 14, color: '#6B7089' }}>−</div>
                <div style={{ width: 24, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 13, color: m.qtyColor }}>{m.qty}</div>
                <div onClick={m.add} className="hov-border-ink" style={{ width: 26, height: 26, border: '1px solid #CBD2E8', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 800, fontSize: 14, color: '#6B7089' }}>+</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderTop: '1px solid #DFE3F0', background: '#F7F9FD' }}>
          <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 16 }}>{vm.mTotal}</div>
          <div onClick={vm.genManual} style={{ padding: '9px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', background: vm.mBtnBg, color: '#F3F5FB' }}>Generar factura PDF</div>
        </div>
      </div>
    </div>
  );
}

function Tirillas({ vm }) {
  return (
    <div data-screen-label="Admin — Tirillas de cargue">
      <div style={{ background: '#FFF7E8', border: '1px solid #EAD9AE', borderRadius: 12, padding: '13px 18px', fontSize: 13, color: '#8a6a1f', marginBottom: 14 }}>
        Selecciona los pedidos <b>aprobados</b> del día. La tirilla consolida las cantidades por producto para el cargue en bodega.
      </div>
      <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, overflow: 'hidden' }}>
        {vm.tirillaOrders.map((o) => (
          <div key={o.id} onClick={o.toggle} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: '1px solid #EEF1F8', cursor: 'pointer', background: o.rowBg }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${o.ckBd}`, background: o.ckBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F3F5FB', fontSize: 13, fontWeight: 900 }}>{o.ck}</div>
            <div style={{ fontFamily: MONO, fontSize: 12.5, color: '#7C82A0', width: 96 }}>{o.ref}</div>
            <div style={{ flex: 1, fontWeight: 700, fontSize: 13.5 }}>{o.cliente}</div>
            <div style={{ fontSize: 12.5, color: '#6B7089' }}>{o.itemsCount} ítems</div>
            <Pill bg={o.stBg} fg={o.stFg}>{o.estado}</Pill>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <div onClick={vm.genTirilla} style={{ padding: '11px 20px', borderRadius: 9, fontSize: 14, fontWeight: 800, cursor: 'pointer', background: vm.tirBtnBg, color: '#F3F5FB' }}>Generar tirilla de cargue ({vm.tirCount})</div>
      </div>
    </div>
  );
}

function Canastillas({ vm }) {
  const cols = '1.5fr 110px 110px 110px 160px';
  const cards = [
    { label: 'En la calle', value: vm.canastillasFuera, color: '#B7791F' },
    { label: 'Devueltas este mes', value: vm.canastillasVueltas, color: '#24256F' },
    { label: 'Cobradas por pérdida', value: vm.canastillasCobradas, color: '#C0392B' },
  ];
  return (
    <div data-screen-label="Admin — Canastillas">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 14 }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7C82A0', fontWeight: 600 }}>{c.label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, fontFamily: MONO, marginTop: 6, color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, padding: '11px 18px', borderBottom: '1px solid #DFE3F0', fontSize: 11, letterSpacing: '.09em', textTransform: 'uppercase', color: '#7C82A0', fontWeight: 700 }}>
          <div>Cliente</div><div>Salieron</div><div>Volvieron</div><div>Pendientes</div><div style={{ textAlign: 'right' }}>Acción</div>
        </div>
        {vm.canastillasView.map((c, i) => (
          <div key={i} className="hov-row" style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, padding: '12px 18px', borderBottom: '1px solid #EEF1F8', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 13.5 }}>{c.cliente}</div>
            <div style={{ fontFamily: MONO, fontSize: 13 }}>{c.salieron}</div>
            <div style={{ fontFamily: MONO, fontSize: 13, color: '#24256F' }}>{c.volvieron}</div>
            <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: c.pendColor }}>{c.pendientes}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div onClick={c.devolver} className="hov-border-ink" style={{ padding: '6px 12px', border: '1px solid #CBD2E8', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Registrar devolución</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPanel({ vm }) {
  return (
    <div data-noprint="1" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: 230, flexShrink: 0, color: '#E7EAF8', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', backgroundColor: '#24256F' }}>
        <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid rgba(231,234,248,.14)' }}>
          <div style={{ fontWeight: 900, fontSize: 19, letterSpacing: '.04em', textTransform: 'uppercase', lineHeight: 1.1 }}>Distribuidora<br />Rivera</div>
          <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#A9B2E0', marginTop: 6 }}>Panel administrador</div>
        </div>
        <div style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', flex: 1 }}>
          {vm.navItems.map((n) => (
            <div key={n.id} onClick={n.go} className="hov-nav" style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13.5, fontWeight: n.fw, background: n.bg, color: n.fg }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={n.icon}></path></svg>
              <span>{n.label}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(231,234,248,.14)', fontSize: 12, color: '#A9B2E0' }}>NIT 74355864-1</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', borderBottom: '1px solid #DFE3F0', position: 'sticky', top: 0, zIndex: 5, backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.01em' }}>{vm.screenTitle}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 12.5, color: '#6B7089' }}>Miércoles, 15 de julio 2026</div>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#24256F', color: '#F3F5FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>DR</div>
          </div>
        </div>

        <div style={{ padding: '26px 28px 90px', flex: 1 }}>
          {vm.sDash && <Dashboard vm={vm} />}
          {vm.sPedidos && <Pedidos vm={vm} />}
          {vm.sProductos && <Productos vm={vm} />}
          {vm.sPrecios && <Precios vm={vm} />}
          {vm.sClientes && <Clientes vm={vm} />}
          {vm.sVendedores && <Vendedores vm={vm} />}
          {vm.sFactura && <Factura vm={vm} />}
          {vm.sTirillas && <Tirillas vm={vm} />}
          {vm.sCanastillas && <Canastillas vm={vm} />}
        </div>
      </div>
    </div>
  );
}
