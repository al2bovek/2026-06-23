# 2026-06-23
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