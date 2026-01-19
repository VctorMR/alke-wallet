# Alke Wallet

Pequeña aplicación de front-end para simular una billetera electrónica. Ideal para prácticas de JavaScript, manejo de estado local y UI con Bootstrap.

**Estado:** Entrega para módulo de Bootcamp — interfaz completa; lógica de backend simulada con `localStorage`.

## 🚀 Funcionalidades principales

- **Login**: `login.html` — autenticación simulada en frontend.
- **Inicio / Menú**: `index.html` / `menu.html` — muestra saldo, últimos movimientos y navegación.
- **Depósitos**: `deposit.html` — agregar saldo y registrar transacciones.
- **Transferencias**: `sendmoney.html` — enviar dinero entre contactos (modal de monto).
- **Historial**: `transactions.html` — listado de movimientos.

## Estructura del proyecto

- `assets/js/` — lógica central (`script.js`) y scripts por página (`login-page.js`, `menu-page.js`, `deposit-page.js`, `sendmoney-page.js`).
- `assets/css/` — estilos personalizados.
- `assets/img/` — iconos y avatares.
- Páginas principales en la raíz: `index.html`, `login.html`, `menu.html`, `deposit.html`, `sendmoney.html`, `transactions.html`.

## Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari).
- No requiere servidor backend — utiliza `localStorage`.

## Ejecutar localmente

Una forma rápida de levantar el proyecto (sirve estático):

```bash
git clone https://github.com/VctorMR/alke-wallet.git
cd alke-wallet
# Servir con Python 3 (puerto 8000)
python3 -m http.server 8000
# Abrir en el navegador:
# http://localhost:8000/menu.html
```

O usa el Live Server de VS Code u otro servidor estático.
