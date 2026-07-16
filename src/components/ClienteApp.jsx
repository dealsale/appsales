import React from 'react';

const MONO = "'IBM Plex Mono',monospace";

function CCatalogo({ vm }) {
  return (
    <div style={{ padding: '14px 16px' }}>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 10 }}>
        {vm.catChips.map((c, i) => (
          <div key={i} onClick={c.go} style={{ padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', border: `1px solid ${c.bd}`, background: c.bg, color: c.fg }}>{c.label}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {vm.catalogView.map((p) => (
          <div key={p.id} style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 14, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ height: 64, borderRadius: 10, background: p.tileBg, color: p.tileFg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18 }}>{p.ini}</div>
            <div style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.3, minHeight: 31 }}>{p.nombre}</div>
            <div style={{ fontFamily: MONO, fontSize: 13.5, fontWeight: 800, color: '#24256F' }}>{p.precio}</div>
            {p.inCart ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div onClick={p.sub} style={{ width: 32, height: 32, border: '1px solid #CBD2E8', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 800, color: '#6B7089' }}>−</div>
                <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 14 }}>{p.qty}</div>
                <div onClick={p.add} style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 800, background: '#24256F', color: '#F3F5FB' }}>+</div>
              </div>
            ) : (
              <div onClick={p.add} className="hov-navy" style={{ padding: 9, borderRadius: 8, background: '#1B1D52', color: '#F3F5FB', textAlign: 'center', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>Agregar</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CCarrito({ vm }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 4 }}>Mi carrito</div>
      <div style={{ fontSize: 12.5, color: '#6B7089', marginBottom: 14 }}>Precios de tu lista preferencial</div>
      {vm.cartEmpty && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#7C82A0', fontSize: 13.5 }}>Tu carrito está vacío.</div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {vm.cartItems.map((i) => (
          <div key={i.id} style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 14, color: '#E4572E', width: 34 }}>×{i.qty}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 12.5 }}>{i.nombre}</div>
              <div style={{ fontFamily: MONO, fontSize: 11.5, color: '#6B7089', marginTop: 2 }}>{i.unit} c/u</div>
            </div>
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 13.5 }}>{i.total}</div>
            <div onClick={i.quitar} style={{ fontSize: 16, color: '#C0392B', cursor: 'pointer', fontWeight: 800, padding: '2px 6px' }}>×</div>
          </div>
        ))}
      </div>
      {vm.cartHasItems && (
        <div style={{ marginTop: 16, background: '#1B1D52', color: '#F3F5FB', borderRadius: 14, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#A9B2E0', fontWeight: 600 }}>
            <span>Total del pedido</span>
            <span style={{ fontFamily: MONO, color: '#F3F5FB', fontWeight: 800, fontSize: 17 }}>{vm.cartTotal}</span>
          </div>
          <div onClick={vm.confirmarPedido} className="hov-accent" style={{ marginTop: 12, background: '#E4572E', borderRadius: 10, padding: 13, textAlign: 'center', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Enviar pedido</div>
        </div>
      )}
    </div>
  );
}

function CPedidos({ vm }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 14 }}>Mis pedidos</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {vm.misPedidos.map((o, idx) => (
          <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 14, padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: '#7C82A0' }}>{o.ref}</div>
              <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 99, background: o.stBg, color: o.stFg }}>{o.estado}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <div style={{ fontSize: 12.5, color: '#6B7089' }}>{o.fecha} · {o.itemsCount} ítems</div>
              <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 14 }}>{o.totalF}</div>
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
              {o.steps.map((s, i) => (
                <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: s.bg }}></div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: '#6B7089', marginTop: 6, fontWeight: 600 }}>{o.stepLabel}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClienteApp({ vm }) {
  return (
    <div data-noprint="1" data-screen-label="Cliente" style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '34px 16px 110px' }}>
      <div style={{ width: 400, maxWidth: '100%', height: 780, background: '#F3F5FB', borderRadius: 30, border: '1px solid #CBD2E8', boxShadow: '0 24px 60px -20px rgba(20,22,46,.35)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#24256F', color: '#F3F5FB', padding: '20px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: '#A9B2E0', fontWeight: 600 }}>Distribuidora Rivera</div>
              <div style={{ fontWeight: 900, fontSize: 19, marginTop: 2 }}>EL BACAN II</div>
            </div>
            <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', background: 'rgba(243,245,251,.16)', padding: '6px 11px', borderRadius: 99 }}>Lista preferencial</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {vm.cCat && <CCatalogo vm={vm} />}
          {vm.cCarr && <CCarrito vm={vm} />}
          {vm.cPed && <CPedidos vm={vm} />}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid #DFE3F0', background: '#FFFFFF' }}>
          <div onClick={vm.cGoCat} style={{ padding: '13px 4px', textAlign: 'center', fontSize: 11.5, fontWeight: 800, cursor: 'pointer', color: vm.cNavCat }}>Catálogo</div>
          <div onClick={vm.cGoCarr} style={{ padding: '13px 4px', textAlign: 'center', fontSize: 11.5, fontWeight: 800, cursor: 'pointer', color: vm.cNavCarr }}>Carrito ({vm.cartCount})</div>
          <div onClick={vm.cGoPed} style={{ padding: '13px 4px', textAlign: 'center', fontSize: 11.5, fontWeight: 800, cursor: 'pointer', color: vm.cNavPed }}>Mis pedidos</div>
        </div>
      </div>
    </div>
  );
}
