# Distribuidora Rivera

Aplicación web para **Distribuidora Rivera** (NIT 74355864-1) que digitaliza la
operación de venta y distribución TAT (tienda a tienda). Implementada con
**Vite + React** a partir del diseño `Distribuidora Rivera.dc.html`.

## Roles

La app incluye tres experiencias, intercambiables desde el selector inferior:

- **Admin (panel de escritorio)** — dashboard con KPIs, pedidos con flujo de
  estados (pendiente → aprobado → en cargue → despachado → entregado),
  productos y catálogo, listas de precios, clientes, vendedores, facturación
  (manual y desde pedido), tirillas de cargue y control de canastillas.
- **Vendedor TAT (móvil)** — lista de clientes, apertura de cliente nuevo,
  catálogo con precios según la lista de cada cliente, carrito y confirmación
  de pedidos.
- **Cliente (móvil)** — catálogo, carrito y seguimiento de pedidos con barra
  de progreso.

Elementos compartidos: modal de detalle de pedido, documentos imprimibles
(factura y tirilla de cargue), selector de rol y notificaciones (toast).

## Requisitos

- Node.js 18+ (probado con Node 22)

## Puesta en marcha

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # build de producción en dist/
npm run preview  # previsualiza el build de producción
```

## Estructura del proyecto

```
index.html                     Punto de entrada HTML (fuentes Archivo / IBM Plex Mono)
src/
  main.jsx                     Bootstrap de React
  styles.css                   Estilos globales, hovers y reglas de impresión
  data.js                      Datos de dominio (productos, listas, clientes, pedidos) y helpers
  viewModel.js                 Lógica de la app: convierte el estado en el modelo de vista
  App.jsx                      Estado, ruteo por rol, selector de rol y toast
  components/
    AdminPanel.jsx             Las 9 pantallas del panel de administración
    VendedorApp.jsx            Experiencia móvil del vendedor TAT
    ClienteApp.jsx             Experiencia móvil del cliente
    Modals.jsx                 Modal de pedido + documentos factura/tirilla
```

## Precios y listas

Cada cliente tiene una lista de precios asignada, aplicada de forma consistente
en catálogo, carrito, facturas y totales de pedido:

- **Lista Pública** — precio base.
- **Mayorista −8%** — descuento porcentual sobre la lista pública.
- **Preferencial** — precios fijos por producto acordados con el cliente.
- **Crédito +5%** — recargo porcentual para pago a cartera.
