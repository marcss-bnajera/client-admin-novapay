# Client Admin - Panel de Administracion

Aplicacion web para el **panel de administracion** de NovaPay. Permite a los administradores gestionar usuarios, cuentas, tarjetas, transferencias, productos, roles y ver metricas del dashboard.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 18 | UI library |
| Vite 8 | Build tool y dev server |
| Tailwind CSS 4 | Estilos utilitarios |
| Zustand | State management |
| React Router 7 | Enrutamiento |
| React Hook Form | Formularios |
| Axios | Peticiones HTTP |
| React Hot Toast | Notificaciones |
| Lucide React | Iconos |
| Heroicons | Iconos |

---

## Estructura

```
client-admin/
├── src/
│   ├── app/               # Configuracion de la app (router, layout)
│   ├── assets/            # Imagenes y recursos estaticos
│   ├── features/          # Modulos por funcionalidad
│   ├── shared/            # Componentes, hooks, servicios compartidos
│   └── styles/            # Estilos globales
├── public/                # Archivos publicos
├── index.html             # Punto de entrada HTML
├── vite.config.js         # Configuracion de Vite
├── eslint.config.js       # Configuracion ESLint
├── Dockerfile
└── package.json
```

---

## Puerto

El servidor de desarrollo corre en el puerto **5173** por defecto.

---

## Variables de entorno (.env)

```
VITE_AUTH_URL=http://localhost:3000
VITE_ADMIN_URL=http://localhost:3001/NovaPay/admin/v1
```

| Variable | Descripcion |
|---|---|
| `VITE_AUTH_URL` | URL base del auth-service para login/registro |
| `VITE_ADMIN_URL` | URL base de la API de administracion |

---

## Ejecucion local (sin Docker)

```bash
npm install
npm run dev
```

La app estara disponible en `http://localhost:5173`.

---

## Ejecucion con Docker

Desde la carpeta raiz de NovaPay:

```bash
docker-compose up --build client-admin
```

---

## Scripts disponibles

| Comando | Descripcion |
|---|---|
| `npm run dev` | Iniciar servidor de desarrollo con hot reload |
| `npm run build` | Compilar para produccion |
| `npm run lint` | Ejecutar ESLint |
| `npm run preview` | Vista previa del build de produccion |
