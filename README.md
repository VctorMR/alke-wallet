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

## Flujo de Git y ramas (recomendado)

Usamos un flujo simple con `main` como rama estable y ramas `feature/*` para trabajo en funcionalidades.

- Ramas principales:
	- `main` — código estable listo para producción.
	- `feature/login` — trabajo en autenticación.
	- `feature/transacciones` — mejoras en listado y lógica de movimientos.
	- `feature/depositos` — manejo de depósitos y validaciones.

Ejemplos de comandos comunes:

```bash
# Crear y cambiar a una rama de feature
git checkout -b feature/nombre-feature

# Hacer cambios, stage y commit con mensaje claro
git add .
git commit -m "feature(nombre): descripción corta y clara"

# Subir la rama al remoto
git push -u origin feature/nombre-feature
```

Para abrir un Pull Request:

1. Empuja tu rama (`git push`) al remoto.
2. Abre GitHub en la URL del repositorio y crea un Pull Request desde tu rama hacia `main`.
3. En el PR explica los cambios brevemente y asigna revisores si corresponde.

Consejos para mensajes de commit (convención recomendada):

- `feature(...)`: nuevas funcionalidades.
- `fix(...)`: correcciones de bugs.
- `chore(...)`: tareas de mantenimiento.

Ejemplo:

```bash
git commit -m "feature(login): validar formulario y usar notificación en login"
```

## Pull Requests y revisión

- Crea PRs pequeños y enfocados (una funcionalidad o bugfix por PR).
- Añade descripción: qué se cambió, por qué y cómo probarlo.
- Usa comentarios en el PR para discutir cambios y solicita revisiones.

## Contribuir

Para colaborar, crea una rama `feature/*`, haz commits claros y abre un Pull Request hacia `main`.

## Autor y contacto

Proyecto creado por Víctor — https://github.com/VctorMR

## Licencia

Licencia MIT — disponible para uso educativo.

Muchas gracias por revisar y contribuir!
