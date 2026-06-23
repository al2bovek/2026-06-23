Project scaffold

```
project/
├── .gitignore
├── README.md
├── docker-compose.dev.yml        ← Postgres + server + client
├── render.yaml                   ← Render.com deploy blueprint
│
├── server/                       ← Express 5 + PostgreSQL (MVC)
│   ├── Dockerfile.dev
│   ├── package.json              (deps already installed)
│   ├── .env.example
│   ├── server.js                 (entry, runs migrations on boot)
│   ├── config/db.js              (postgres singleton)
│   ├── db/
│   │   ├── schema.sql            (users, categories, items + indexes)
│   │   ├── data.sql              (neutral demo data: Group A/B/C)
│   │   └── migrate.js            (applies schema + data at startup)
│   ├── models/                   ← all SQL lives here
│   │   ├── user.model.js
│   │   ├── category.model.js
│   │   └── item.model.js         (smart filter builder)
│   ├── controllers/              ← thin HTTP glue
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   └── item.controller.js
│   ├── routes/                   ← URL → controller wiring
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   └── item.routes.js
│   ├── middleware/
│   │   ├── authRequired.js       (JWT cookie verification)
│   │   ├── validate.js
│   │   └── errorHandler.js
│   ├── validators/               (express-validator chains)
│   │   ├── auth.validator.js
│   │   ├── category.validator.js
│   │   └── item.validator.js
│   └── utils/
│       ├── password.js           (argon2)
│       └── token.js              (JWT)
│
└── client/                       ← React 19 + Vite + Tailwind 4
    ├── Dockerfile.dev
    ├── package.json              (deps already installed)
    ├── .env.example
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx, App.jsx, index.css
        ├── api/                  (axios + 3 API modules)
        ├── context/AuthContext.jsx
        ├── routes/ProtectedRoute.jsx
        ├── hooks/useDebounce.js
        ├── components/           (Navbar, ItemCard, ItemForm,
        │                          CategoryForm, FiltersBar,
        │                          SearchBar, ConfirmDialog)
        └── pages/                (Home, ItemDetails, Categories,
                                   Login, Register, NotFound)
```

## Features included
- **Auth**: register / login / logout / me — JWT in httpOnly cookie, argon2 hashing.
- **Categories**: full CRUD (protected). Deleting a category cascades to its items.
- **Items**: full CRUD (protected) with image URL, rating, free/course flag.
- **Filters**: by category, type, free/course, rating min/max.
- **Search**: by name (debounced, ILIKE).
- **Item details** page (`Read more` button).
- **Responsive grid**: 1 col mobile → 2 col tablet → 3 col desktop.
- **Validation**: server-side via `express-validator`, client-side via `react-hook-form`.
- **Neutral naming**: `categories` / `items` — no hardcoded city or place names.
- **Dev Docker**: one command (`docker compose -f docker-compose.dev.yml up --build`).
- **Render.com**: `render.yaml` declares DB + Node web service + static client.

## To run locally

cd /app/project
docker compose -f docker-compose.dev.yml up --build

Then open http://localhost:5173 — register an account and start managing items.
# project 2026 06 23
