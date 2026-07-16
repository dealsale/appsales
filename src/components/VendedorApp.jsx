import React from 'react';

const MONO = "'IBM Plex Mono',monospace";
const ARCHIVO = "'Archivo',sans-serif";

function VHome({ vm }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, padding: 14 }}>
          <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 22 }}>12</div>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: '#7C82A0', fontWeight: 600, marginTop: 2 }}>Mis clientes</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, padding: 14 }}>
          <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 22 }}>6</div>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: '#7C82A0', fontWeight: 600, marginTop: 2 }}>Pedidos hoy</div>
        </div>
      </div>
      <div onClick={vm.vGoNuevoCliente} className="hov-accent" style={{ marginTop: 12, background: '#E4572E', color: '#FFF6EE', borderRadius: 12, padding: '14px 16px', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Abrir cliente nuevo</span><span>→</span>
      </div>
      <div style={{ fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7C82A0', fontWeight: 700, margin: '18px 2px 8px' }}>Mis clientes</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {vm.vClientes.map((c) => (
          <div key={c.id} style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: '#E7EBFA', color: '#24256F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13 }}>{c.ini}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 13.5 }}>{c.nombre}</div>
              <div style={{ fontSize: 11.5, color: '#6B7089' }}>{c.zona} · {c.lista}</div>
            </div>
            <div onClick={c.pedido} className="hov-primary" style={{ padding: '8px 13px', borderRadius: 8, background: '#24256F', color: '#F3F5FB', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>Pedido</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VNuevo({ vm }) {
  const input = { fontFamily: ARCHIVO, padding: '13px 14px', border: '1px solid #CBD2E8', borderRadius: 10, fontSize: 14, background: '#FFFFFF', outline: 'none' };
  return (
    <div style={{ padding: 16 }}>
      <div onClick={vm.vGoHome} style={{ fontSize: 13, fontWeight: 700, color: '#24256F', cursor: 'pointer', marginBottom: 12 }}>← Volver</div>
      <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 14 }}>Abrir cliente nuevo</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input className="field" placeholder="Nombre del negocio" style={input} />
        <input className="field" placeholder="Nombre del encargado" style={input} />
        <input className="field" placeholder="Dirección / barrio" style={input} />
        <input className="field" placeholder="Teléfono / WhatsApp" style={input} />
        <div>
          <div style={{ fontSize: 11.5, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7C82A0', fontWeight: 700, margin: '6px 2px 8px' }}>Lista de precios sugerida</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ padding: '8px 14px', borderRadius: 99, background: '#24256F', color: '#F3F5FB', fontSize: 12.5, fontWeight: 700 }}>Pública</div>
            <div style={{ padding: '8px 14px', borderRadius: 99, border: '1px solid #CBD2E8', fontSize: 12.5, fontWeight: 700, color: '#6B7089' }}>Mayorista −8%</div>
            <div style={{ padding: '8px 14px', borderRadius: 99, border: '1px solid #CBD2E8', fontSize: 12.5, fontWeight: 700, color: '#6B7089' }}>Crédito +5%</div>
          </div>
          <div style={{ fontSize: 11.5, color: '#7C82A0', marginTop: 8 }}>El administrador aprueba la cuenta y puede asignar una lista especial.</div>
        </div>
        <div onClick={vm.vGuardarCliente} className="hov-primary" style={{ marginTop: 6, background: '#24256F', color: '#F3F5FB', borderRadius: 10, padding: 14, textAlign: 'center', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Enviar para aprobación</div>
      </div>
    </div>
  );
}

function VCatalogo({ vm }) {
  return (
    <div style={{ padding: '14px 16px' }}>
      <div style={{ background: '#FFF7E8', border: '1px solid #EAD9AE', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: '#8a6a1f', fontWeight: 600, flexShrink: 0 }}>Pedido para:</div>
        <select value={vm.vClienteSel} onChange={vm.setVCliente} style={{ fontFamily: ARCHIVO, flex: 1, fontSize: 13, fontWeight: 700, padding: '6px 8px', border: '1px solid #EAD9AE', borderRadius: 7, background: '#FFFFFF', color: '#191B2E' }}>
          {vm.clientOptions.map((op) => (
            <option key={op.id} value={op.id}>{op.nombre}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 10 }}>
        {vm.catChips.map((c, i) => (
          <div key={i} onClick={c.go} style={{ padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', border: `1px solid ${c.bd}`, background: c.bg, color: c.fg }}>{c.label}</div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {vm.catalogView.map((p) => (
          <div key={p.id} style={{ background: '#FFFFFF', border: '1px solid #DFE3F0', borderRadius: 12, padding: '11px 12px', display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: p.tileBg, color: p.tileFg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{p.ini}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 12.5, lineHeight: 1.25 }}>{p.nombre}</div>
              <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: '#24256F', marginTop: 3 }}>{p.precio} <span style={{ fontSize: 10.5, color: p.difColor, fontWeight: 600 }}>{p.dif}</span></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div onClick={p.sub} style={{ width: 30, height: 30, border: '1px solid #CBD2E8', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 800, color: '#6B7089' }}>−</div>
              <div style={{ width: 20, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 14, color: p.qtyColor }}>{p.qty}</div>
              <div onClick={p.add} className="hov-primary" style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 800, background: '#24256F', color: '#F3F5FB' }}>+</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Carrito({ vm }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 4 }}>Carrito</div>
      <div style={{ fontSize: 12.5, color: '#6B7089', marginBottom: 14 }}>{vm.carritoPara}</div>
      {vm.cartEmpty && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#7C82A0', fontSize: 13.5 }}>El carrito está vacío.<br />Agrega productos desde el catálogo.</div>
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
          <div onClick={vm.confirmarPedido} className="hov-accent" style={{ marginTop: 12, background: '#E4572E', borderRadius: 10, padding: 13, textAlign: 'center', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Confirmar pedido</div>
        </div>
      )}
    </div>
  );
}

export default function VendedorApp({ vm }) {
  return (
    <div data-noprint="1" data-screen-label="Vendedor TAT" style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '34px 16px 110px' }}>
      <div style={{ width: 400, maxWidth: '100%', height: 780, background: '#F3F5FB', borderRadius: 30, border: '1px solid #CBD2E8', boxShadow: '0 24px 60px -20px rgba(20,22,46,.35)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#1B1D52', color: '#F3F5FB', padding: '20px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: '#A9B2E0', fontWeight: 600 }}>Vendedor TAT</div>
              <div style={{ fontWeight: 900, fontSize: 19, marginTop: 2 }}>Hola, Andrés 👋</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#A9B2E0', fontWeight: 600 }}>Ventas hoy</div>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 15 }}>$ 1.284.600</div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {vm.vHome && <VHome vm={vm} />}
          {vm.vNuevo && <VNuevo vm={vm} />}
          {vm.vCat && <VCatalogo vm={vm} />}
          {vm.vCarr && <Carrito vm={vm} />}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid #DFE3F0', background: '#FFFFFF' }}>
          <div onClick={vm.vGoHome} style={{ padding: '13px 4px', textAlign: 'center', fontSize: 11.5, fontWeight: 800, cursor: 'pointer', color: vm.vNavHome }}>Inicio</div>
          <div onClick={vm.vGoCat} style={{ padding: '13px 4px', textAlign: 'center', fontSize: 11.5, fontWeight: 800, cursor: 'pointer', color: vm.vNavCat }}>Catálogo</div>
          <div onClick={vm.vGoCarr} style={{ padding: '13px 4px', textAlign: 'center', fontSize: 11.5, fontWeight: 800, cursor: 'pointer', color: vm.vNavCarr }}>Carrito ({vm.cartCount})</div>
        </div>
      </div>
    </div>
  );
}
