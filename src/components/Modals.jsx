import React from 'react';

const MONO = "'IBM Plex Mono',monospace";

export function OrderModal({ vm }) {
  if (!vm.hasSelOrder) return null;
  const so = vm.so;
  return (
    <div data-noprint="1" onClick={vm.cerrarOrden} style={{ position: 'fixed', inset: 0, background: 'rgba(18,20,42,.55)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'fadeIn .15s ease' }}>
      <div onClick={vm.stop} style={{ background: '#FFFFFF', borderRadius: 16, width: 560, maxWidth: '100%', maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 30px 80px -20px rgba(0,0,0,.4)' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #E8EBF5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#FFFFFF' }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 12.5, color: '#7C82A0' }}>{so.ref}</div>
            <div style={{ fontWeight: 900, fontSize: 17 }}>{so.cliente}</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 99, background: so.stBg, color: so.stFg }}>{so.estado}</div>
        </div>
        <div style={{ padding: '14px 22px 6px' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {so.steps.map((s, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ height: 5, borderRadius: 99, background: s.bg }}></div>
                <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', color: s.fg, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12.5, color: '#6B7089', marginTop: 12 }}>{so.dir} · Tel {so.tel} · {so.fecha}</div>
        </div>
        <div style={{ padding: '8px 22px' }}>
          {so.items.map((i, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #EEF1F8', fontSize: 13, alignItems: 'center' }}>
              <div style={{ fontFamily: MONO, fontWeight: 700, width: 30, color: '#E4572E' }}>{i.cant}</div>
              <div style={{ flex: 1, fontWeight: 600 }}>{i.nombre}</div>
              <div style={{ fontFamily: MONO, color: '#6B7089', fontSize: 12 }}>{i.unit}</div>
              <div style={{ fontFamily: MONO, fontWeight: 700, width: 86, textAlign: 'right' }}>{i.total}</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: 900, fontSize: 16 }}>
            <div>Total a pagar</div>
            <div style={{ fontFamily: MONO }}>{so.totalF}</div>
          </div>
        </div>
        <div style={{ padding: '14px 22px 20px', display: 'flex', gap: 8, flexWrap: 'wrap', borderTop: '1px solid #E8EBF5' }}>
          {so.canAdvance && (
            <div onClick={so.advance} className="hov-primary" style={{ padding: '10px 16px', borderRadius: 9, background: '#24256F', color: '#F3F5FB', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>{so.advanceLabel}</div>
          )}
          <div onClick={so.facturar} className="hov-lightbg" style={{ padding: '10px 16px', borderRadius: 9, border: '1.5px solid #24256F', color: '#24256F', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>Factura PDF</div>
          <div onClick={so.tirilla} className="hov-border-ink" style={{ padding: '10px 16px', borderRadius: 9, border: '1.5px solid #CBD2E8', color: '#4E5268', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>Tirilla de cargue</div>
          <div onClick={vm.cerrarOrden} className="hov-ink" style={{ marginLeft: 'auto', padding: '10px 16px', borderRadius: 9, fontSize: 13, fontWeight: 800, cursor: 'pointer', color: '#6B7089' }}>Cerrar</div>
        </div>
      </div>
    </div>
  );
}

export function DocModal({ vm }) {
  if (!vm.hasDoc) return null;
  const doc = vm.doc;
  return (
    <div data-docwrap="1" onClick={vm.cerrarDoc} style={{ position: 'fixed', inset: 0, background: 'rgba(18,20,42,.6)', zIndex: 70, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '30px 20px', overflowY: 'auto', animation: 'fadeIn .15s ease' }}>
      <div onClick={vm.stop} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <div data-docbtns="1" style={{ display: 'flex', gap: 8 }}>
          <div onClick={vm.imprimirDoc} className="hov-accent" style={{ padding: '10px 18px', borderRadius: 9, background: '#E4572E', color: '#FFF6EE', fontSize: 13, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 20px -8px rgba(228,87,46,.6)' }}>Imprimir / Guardar PDF</div>
          <div onClick={vm.cerrarDoc} style={{ padding: '10px 18px', borderRadius: 9, background: '#FFFFFF', fontSize: 13, fontWeight: 800, cursor: 'pointer', color: '#4E5268' }}>Cerrar</div>
        </div>

        <div data-doccard="1" style={{ background: '#FFFFFF', width: 360, padding: '26px 24px', fontFamily: MONO, color: '#111', boxShadow: '0 30px 80px -20px rgba(0,0,0,.45)' }}>
          {vm.docFactura && (
            <div data-screen-label="Documento — Factura">
              <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 16, letterSpacing: '.02em' }}>FACTURA DE COMPRA</div>
              <div style={{ textAlign: 'center', fontSize: 12, marginTop: 2 }}>DISTRIBUIDORA RIVERA · NIT: 74355864-1</div>
              <div style={{ borderTop: '1.5px dashed #999', margin: '12px 0' }}></div>
              <div style={{ fontSize: 12, lineHeight: 1.7 }}>
                <div><b>Cliente:</b> {doc.cliente}</div>
                <div><b>Dir:</b> {doc.dir} | <b>Tel:</b> {doc.tel}</div>
                <div><b>Fecha:</b> 2026-07-15 &nbsp; <b>Ref:</b> {doc.ref}</div>
              </div>
              <div style={{ borderTop: '1.5px dashed #999', margin: '12px 0' }}></div>
              <div style={{ fontSize: 11, lineHeight: 1.6 }}><b>Forma de Pago:</b> DAVIPLATA · NEQUI · BANCOLOMBIA · EFECTIVO · CARTERA</div>
              <div style={{ borderTop: '1.5px dashed #999', margin: '12px 0' }}></div>
              <div style={{ display: 'flex', fontSize: 11, fontWeight: 700, gap: 8 }}>
                <div style={{ width: 28 }}>Cant</div><div style={{ flex: 1 }}>Descripción</div><div style={{ width: 62, textAlign: 'right' }}>V.Unit</div><div style={{ width: 66, textAlign: 'right' }}>Total</div>
              </div>
              {doc.items.map((i, idx) => (
                <div key={idx} style={{ display: 'flex', fontSize: 11, gap: 8, marginTop: 6 }}>
                  <div style={{ width: 28 }}>{i.cant}</div><div style={{ flex: 1, textTransform: 'uppercase' }}>{i.nombre}</div><div style={{ width: 62, textAlign: 'right' }}>{i.unitN}</div><div style={{ width: 66, textAlign: 'right' }}>{i.totalN}</div>
                </div>
              ))}
              <div style={{ borderTop: '1.5px dashed #999', margin: '12px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 14 }}><div>Total a Pagar:</div><div>{doc.totalF}</div></div>
              <div style={{ borderTop: '1.5px dashed #999', margin: '12px 0' }}></div>
              <div style={{ textAlign: 'center', fontSize: 10.5, fontStyle: 'italic', lineHeight: 1.5 }}>Encomienda al señor tus esfuerzos<br />y tus planes serán afirmados</div>
            </div>
          )}
          {vm.docTirilla && (
            <div data-screen-label="Documento — Tirilla de cargue">
              <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 15, letterSpacing: '.02em' }}>TIRILLA DE CARGUE DEFINITIVA</div>
              <div style={{ fontSize: 11, marginTop: 8, lineHeight: 1.7 }}>
                <div><b>Fecha de Generación:</b> 15/7/2026 14:48</div>
                <div><b>Referencias:</b> {doc.refs}</div>
              </div>
              <div style={{ borderTop: '1.5px dashed #999', margin: '12px 0' }}></div>
              <div style={{ display: 'flex', fontSize: 11, fontWeight: 700, gap: 8 }}><div style={{ flex: 1 }}>PRODUCTO</div><div style={{ width: 90, textAlign: 'right' }}>CANTIDAD</div></div>
              {doc.rows.map((r, idx) => (
                <div key={idx} style={{ display: 'flex', fontSize: 11, gap: 8, marginTop: 6 }}><div style={{ flex: 1, textTransform: 'uppercase' }}>{r.nombre}</div><div style={{ width: 90, textAlign: 'right' }}>{r.cant}</div></div>
              ))}
              <div style={{ borderTop: '1.5px dashed #999', margin: '12px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 12.5 }}><div>TOTAL UNIDADES</div><div>{doc.totalU}</div></div>
              <div style={{ fontSize: 11.5, marginTop: 16 }}>CANTIDAD DE CANASTILLAS: ____________</div>
              <div style={{ fontSize: 11.5, marginTop: 10 }}>GASTOS DEL DÍA:</div>
              <div style={{ height: 34, borderBottom: '1px solid #999' }}></div>
              <div style={{ display: 'flex', gap: 20, marginTop: 38 }}>
                <div style={{ flex: 1, borderTop: '1px solid #111', paddingTop: 5, fontSize: 10, textAlign: 'center' }}>Firma Responsable Bodega</div>
                <div style={{ flex: 1, borderTop: '1px solid #111', paddingTop: 5, fontSize: 10, textAlign: 'center' }}>Firma Conductor / Repartidor</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
