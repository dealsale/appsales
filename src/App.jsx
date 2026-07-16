import React, { useCallback, useMemo, useRef, useState } from 'react';
import { INITIAL_CANASTILLAS, INITIAL_ORDERS } from './data';
import { buildViewModel } from './viewModel';
import AdminPanel from './components/AdminPanel';
import VendedorApp from './components/VendedorApp';
import ClienteApp from './components/ClienteApp';
import { DocModal, OrderModal } from './components/Modals';

const INITIAL_STATE = {
  role: 'admin',
  screen: 'dashboard',
  catFilter: 'Todos',
  estadoFilter: 'todos',
  selOrderId: null,
  doc: null,
  cart: {},
  mCart: {},
  mCliente: 'c1',
  vScreen: 'home',
  cScreen: 'catalogo',
  vClienteSel: 'c2',
  listSel: 'l3',
  tirillaSel: {},
  toast: null,
  nextRef: 510001,
  orders: INITIAL_ORDERS,
  canastillas: INITIAL_CANASTILLAS,
};

function RoleSwitcher({ vm }) {
  const btn = (bg, fg, label, onClick) => (
    <div onClick={onClick} style={{ padding: '8px 18px', borderRadius: 99, fontSize: 12.5, fontWeight: 800, cursor: 'pointer', background: bg, color: fg }}>{label}</div>
  );
  return (
    <div data-noprint="1" style={{ position: 'fixed', bottom: 18, left: '50%', transform: 'translateX(-50%)', zIndex: 80, background: '#191B2E', borderRadius: 99, padding: 5, display: 'flex', gap: 3, boxShadow: '0 14px 36px -10px rgba(0,0,0,.5)' }}>
      {btn(vm.rolAdminBg, vm.rolAdminFg, 'Admin', vm.goRolAdmin)}
      {btn(vm.rolVendBg, vm.rolVendFg, 'Vendedor TAT', vm.goRolVendedor)}
      {btn(vm.rolCliBg, vm.rolCliFg, 'Cliente', vm.goRolCliente)}
    </div>
  );
}

function Toast({ vm }) {
  if (!vm.hasToast) return null;
  return (
    <div data-noprint="1" style={{ position: 'fixed', bottom: 78, left: '50%', transform: 'translateX(-50%)', zIndex: 90, background: '#24256F', color: '#F3F5FB', padding: '11px 20px', borderRadius: 10, fontSize: 13.5, fontWeight: 700, boxShadow: '0 14px 36px -10px rgba(0,0,0,.4)', animation: 'toastUp .2s ease' }}>{vm.toastText}</div>
  );
}

export default function App() {
  const [state, setState] = useState(INITIAL_STATE);
  const toastTimer = useRef(null);

  // set() accepts either an object patch or an updater fn, mirroring the design's setState.
  const set = useCallback((patch) => {
    setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }));
  }, []);

  const toast = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setState((s) => ({ ...s, toast: msg }));
    toastTimer.current = setTimeout(() => {
      setState((s) => ({ ...s, toast: null }));
    }, 2400);
  }, []);

  const vm = useMemo(() => buildViewModel(state, set, toast), [state, set, toast]);

  return (
    <div style={{ fontFamily: "'Archivo',sans-serif", color: '#191B2E', background: '#F3F5FB', minHeight: '100vh' }}>
      {vm.isAdmin && <AdminPanel vm={vm} />}
      {vm.isVendedor && <VendedorApp vm={vm} />}
      {vm.isCliente && <ClienteApp vm={vm} />}

      <OrderModal vm={vm} />
      <DocModal vm={vm} />
      <RoleSwitcher vm={vm} />
      <Toast vm={vm} />
    </div>
  );
}
