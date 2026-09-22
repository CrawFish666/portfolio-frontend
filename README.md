# CrawFish666 — Portfolio

Frontend React developer portfolio с админ-панелью и интеграцией с backend.

[Live Demo](https://google.com)

[RoadMap](./ROADMAP.md)

## Стек

- **React 19** + **Vite**
- **Tailwind CSS v4** — dark/light темы через CSS variables
- **Tanstack Query** — управление серверным состоянием
- **React Hook Form + Zod** — валидация форм
- **React Router DOM** — роутинг с защитой
- **Axios** — HTTP клиент с interceptors и refresh-очередью
- **Sonner** — тосты

## Структура проекта

```
src/
├── api/                    # API клиенты (axios instances)
│   ├── client.js           # Базовый axios инстанс
│   ├── auth.api.js         # Авторизация
│   ├── projects.api.js     # Проекты
│   ├── settings.api.js     # Настройки
│   ├── technologies.api.js # Категории и технологии
│   └── ...
├── auth/                   # Auth утилиты
│   ├── token.manager.js    # Хранение access token
│   └── auth.events.js
├── components/
│   ├── layout/             # Header, Footer, MobileMenu
│   ├── ui/                 # Переиспользуемые UI компоненты
│   │   ├── Modal/          # Модальное окно
│   │   ├── Input/          # Инпуты
│   │   ├── MultiSelect/    # Мульти-селект
│   │   └── skeleton/       # Скелетоны
│   └── skeletons/          # Page-level скелетоны
├── constants/              # Константы (ROUTES, iconMap, projectStatus)
├── context/                # React контексты
│   ├── AuthProvider.jsx    # Аутентификация
│   └── ThemeContext.jsx    # Темы (dark/light)
├── hooks/
│   ├── useAuth.jsx         # Хук авторизации
│   ├── queries/            # React Query hooks
│   └── mutations/          # React Query mutations
├── layouts/                # AppLayout, AuthLayout, DashboardLayout
├── pages/
│   ├── public/             # Публичные страницы
│   │   ├── home/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── experience/
│   │   └── projects/
│   ├── auth/               # SignIn, SignUp, ForgotPassword, ResetPassword
│   └── dashboard/          # Админ-панель
│       ├── projects/
│       ├── users/
│       ├── settings/
│       ├── messages/
│       ├── technologies/
│       ├── experience/
│       └── availability/
├── providers/              # QueryProvider и другие провайдеры
├── routes/                 # Роутинг с защитой
│   ├── pathsConstants.js   # Константы путей
│   ├── ProtectedRoutes.jsx
│   ├── GuestOnlyRoutes.jsx
│   └── AdminOnlyRoutes.jsx
└── utils/                  # Утилиты и схемы валидации
```

## Роуты

### Публичные
| Роут | Страница |
|------|----------|
| `/` | HomePage |
| `/about` | AboutPage |
| `/projects` | ProjectsPage |
| `/projects/:slug` | ProjectDetailPage |
| `/experience` | ExperiencePage |
| `/contact` | ContactPage |

### Авторизация
| Роут | Страница |
|------|----------|
| `/sign-in` | SignInPage |
| `/sign-up` | SignUpPage |
| `/forgot-password` | ForgotPasswordPage |
| `/reset-password/:token` | ResetPasswordPage |

### Админ-панель (`/dashboard`)
| Роут | Страница |
|------|----------|
| `/dashboard` | DashboardHomePage |
| `/dashboard/projects` | Projects CRUD |
| `/dashboard/categories-technologies` | Категории и технологии |
| `/dashboard/settings` | Настройки |
| `/dashboard/messages` | Сообщения |
| `/dashboard/users` | Управление пользователями |
| `/dashboard/experience` | Управление опытом |
| `/dashboard/availability-statuses` | Статусы доступности |

## Как запустить

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка
npm run build

```

## Описание сервисов

- `src/auth/tokenManager.js` — хранит access token в памяти
- `src/api/client.js` — Axios с interceptors + refresh очередь
- `src/context/AuthProvider.jsx` — состояние пользователя и логика auth
- `src/providers/QueryProvider.jsx` — React Query client
