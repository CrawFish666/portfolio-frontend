# CrawFish666 — Portfolio

Frontend React developer portfolio с админ-панелью и интеграцией с backend.

[Live Demo](https://emelyan-chekushkin-portfolio-dev.vercel.app/)

[RoadMap](./ROADMAP.md)

## Стек

- **React 19** + **Vite**
- **Tailwind CSS v4** — стилизация с CSS variables для dark/light тем
- **TanStack Query** — серверное состояние, кэширование, мутации и инвалидация
- **React Hook Form + Zod** — формы и валидация
- **React Router DOM** — маршрутизация и защита роутов
- **Axios** — HTTP-клиент, interceptors и автоматическое обновление access token
- **Sonner** — toast-уведомления
- **Lucide React / React Icons** — иконки
- **JWT Decode** — работа с JWT
- **Vitest + Testing Library** — unit и component-тестирование

## Структура проекта

```
src/
├── api/
│   ├── client.js             # Axios instance + interceptors + refresh
│   ├── apiError.js           # Нормализация API/сетевых ошибок
│   ├── queryClient.js        # TanStack Query configuration
│   ├── auth.api.js           # Авторизация
│   ├── projects.api.js       # Проекты
│   ├── settings.api.js       # Настройки
│   └── ...
├── auth/
│   ├── auth.channel.js       # Канал синхронизации между вкладками
│   ├── auth.events.js        # События авторизации
│   ├── refresh.manager.js    # Управление refresh token
│   └── token.manager.js      # Хранение access token
│
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
├── utils/                  # Утилиты и схемы валидации
│
└── tests/
    ├── fakeServer.js         # Тестовый HTTP adapter/server
    └── setupTests.js         # Test setup
```

---

## Тестирование

Для тестирования используются **Vitest**, **Testing Library**, **User Event** и **jsdom**.

Покрыты:

- утилиты и Zod-схемы;
- `token manager` и `auth events`;
- API client и обработка ошибок;
- обновление access token;
- конкурентные запросы и refresh lock;
- ContactForm;
- интеграционные сценарии авторизации.

Запуск тестов:

```bash
# Watch-режим
npm run test

# Однократный запуск
npm run test:run
```

---

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

---

## Переменные окружения

Создайте файл `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FILE_BASE_URL=http://localhost:5000
VITE_DEV=true
```

Для production используются соответствующие URL backend API.

---

## Как запустить

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Проверка ESLint
npm run lint

# Автоматическое исправление ESLint
npm run lint:fix

# Запуск тестов в watch-режиме
npm run test

# Однократный запуск тестов
npm run test:run

# Production-сборка
npm run build
```

---

## Связанные репозитории

- Backend: `CrawFish666/portfolio-backend`

---

## Статус проекта

Проект находится в активной разработке.

Текущие задачи и планы находятся в [ROADMAP.md](./ROADMAP.md).