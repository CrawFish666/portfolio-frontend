# 🗺️ Roadmap — CrawFish666 Portfolio

Frontend React developer portfolio с админ-панелью и интеграцией с backend.

---

## ✅ СДЕЛАНО

### 1. Архитектура и инфраструктура
- [x] **React 19 + Vite** — сборка и dev-сервер
- [x] **Tailwind CSS v4** — стилизация с CSS variables для тем
- [x] **React Router DOM v7** — роутинг с защитой
- [x] **React Query** — управление серверным состоянием (кэш, мутации, инвалидация)
- [x] **Axios** — HTTP клиент с interceptors + refresh-очередь
- [x] **React Hook Form + Zod** — валидация форм
- [x] **Sonner** — toast-уведомления
- [x] **Token Manager** — хранение access token в памяти
- [x] **AuthProvider** — состояние аутентификации, signIn/signUp/logout
- [x] **ThemeContext** — dark/light темы через CSS variables
- [x] **Splash Screen** — экран загрузки при инициализации auth
- [x] **Vite proxy** — `/api` → `localhost:5000`
- [x] **Alias `@`** — импорт от `src/`

### 2. Роутинг и защита
- [x] Публичные роуты (`/`, `/about`, `/projects`, `/experience`, `/contact`)
- [x] Гостевые роуты (`/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password/:token`)
- [x] Защищённые роуты (`ProtectedRoutes`)
- [x] Админ-роуты (`AdminOnlyRoutes`)
- [x] Dashboard layout (`/dashboard/*`)
- [x] 404 страница

### 3. Публичные страницы
- [x] **HomePage**
  - Hero секция с настройками из API
  - Tech Stack секция
  - Избранные проекты (из API)
  - CTA секция
- [x] **AboutPage**
  - Sidebar с информацией (из API)
  - Bio секция
  - Принципы работы
  - Tech Stack (из API, сгруппирован по категориям)
  - Карьера и цели
- [x] **ProjectsPage**
  - Поиск с debounce (500ms)
  - Фильтры по статусу и технологиям
  - Список проектов (из API)
- [x] **ProjectDetailPage**
  - Загрузка по slug (из API)
  - Информация: название, описание, изображение, даты, стек
  - Ссылки: Demo онлайн, Исходный код
  - Обработка ошибок и 404
- [x] **ExperiencePage**
  - Timeline опыта работы
  - Образование
  - Языки
- [x] **ContactPage**
  - Форма обратной связи (RHF + Zod)
  - Статус доступности (из API)
  - Контактная информация (из API)
  - Социальные сети (из API)

### 4. Страницы авторизации
- [x] **SignInPage**
  - Email + пароль (RHF + Zod)
  - Ссылка на восстановление пароля
  - Редирект после успеха
  - Ошибки с бэкенда
- [x] **SignUpPage**
  - Логин, имя, email, пароль (RHF + Zod)
  - Повтор пароля
  - Автоматический вход после регистрации
  - Ошибки с бэкенда
- [x] **ForgotPasswordPage**
  - Email ввод
  - Состояние "письмо отправлено"
  - Ошибки с бэкенда
- [x] **ResetPasswordPage**
  - Проверка токена (4 состояния: verifying / expired / valid / success)
  - Ввод нового пароля
  - Ошибки валидации и бэкенда

### 5. Админ-панель (Dashboard)
- [x] **DashboardLayout** — общий layout с навигацией
- [x] **DashboardHomePage** — приветствие, заглушки статистики
- [x] **Projects CRUD**
  - Таблица с проектами (фото, название, статус, доступность, технологии, избранное)
  - Поиск с debounce
  - Модалка создания/редактирования (RHF + Zod схема)
  - Удаление с подтверждением
  - Статусы и технологии подгружаются из API
- [x] **Categories & Technologies CRUD**
  - Категории с технологиями в группах
  - CRUD для категорий (модалка)
  - CRUD для технологий (модалка)
  - Привязка технологии к категории
  - Удаление с подтверждением
- [x] **Settings**
  - Основные настройки сайта
  - Управление контактами
  - CV секция (загрузка/удаление)
  - Статусы доступности (заглушка)
  - Единая форма с кнопкой сохранения
- [x] **Messages (Feedback)**
  - Список сообщений с пагинацией (3 на страницу)
  - Фильтры по статусу (new / read / answered / archived)
  - Поиск с debounce
  - Просмотр сообщения
  - Ответ на сообщение
  - Смена статуса
  - Удаление с подтверждением
- [x] **Experience CRUD**
  - 3 таба: Опыт / Образование / Языки
  - Список записей с left panel
  - Создание/редактирование в right panel
  - Опыт: должность, компания, локация, описание, технологии, достижения (динамический список), даты, isVisible, order
  - Образование: учреждение, степень, описание, даты, isVisible, order
  - Языки: название, код флага, уровень, описание, isVisible, order
  - Удаление с подтверждением

### 6. UI-компоненты
- [x] **Modal** — модальное окно с overlay, title, size
- [x] **Input / InputField** — поля ввода с label, error, placeholder
- [x] **MultiSelect / TechnologySelect** — мульти-селект для технологий
- [x] **Skeleton** — базовый скелетон
- [x] **SkeletonLine / SkeletonCircle** — типизированные скелетоны
- [x] **Card** — карточка с title
- [x] **TechTags** — теги технологий
- [x] **EducationCard** — карточка образования
- [x] **LanguageCard** — карточка языка
- [x] **ExperienceTrackerCard** — карточка в timeline

### 7. Layout-компоненты
- [x] **Header** — шапка с логотипом, навигацией, переключателем темы, user dropdown
- [x] **HeaderNav** — навигационные ссылки
- [x] **HeaderUser** — dropdown пользователя
- [x] **Footer** — подвал с брендом, навигацией, соцсетями
- [x] **MobileMenu** — мобильное меню
- [x] **ScrollToTop** — автоскролл наверх при смене роута

### 8. API-слой
- [x] `api/client.js` — axios инстанс с interceptors
- [x] `api/queryClient.js` — QueryClient конфиг с toast на ошибках
- [x] `api/auth.api.js` — signIn, signUp, me, refresh, forgotPassword, resetPassword
- [x] `api/projects.api.js` — список, детали, CRUD
- [x] `api/settings.api.js` — настройки, CV, контакты
- [x] `api/technologies.api.js` — категории, технологии, CRUD
- [x] `api/categories.api.js` — CRUD категорий
- [x] `api/experience.api.js` — опыт
- [x] `api/education.api.js` — образование
- [x] `api/languages.api.js` — языки
- [x] `api/feedback.api.js` — сообщения, CRUD, пагинация
- [x] `api/availabilityStatuses.api.js` — статусы доступности
- [x] `api/apiError.js` — обработка ошибок

### 9. Хуки
- [x] `useAuth` — авторизация, user, accessToken, loading
- [x] `useDebounce` — debounce для поиска
- [x] `useDelayedUnmount` — задержка удаления компонента (для splash)
- [x] `queries/useProjects` — список проектов
- [x] `queries/useAdminProjects` — проекты для админки
- [x] `queries/useSettings` — настройки
- [x] `queries/useTechnologies` — технологии
- [x] `queries/useCategories` — категории
- [x] `queries/useFeedback` — одно сообщение
- [x] `queries/useFeedbackList` — список сообщений с пагинацией
- [x] `queries/useExperience` — опыт
- [x] `queries/useAvailabilityStatuses` — статусы доступности
- [x] `queries/useAdminContent` — универсальный hook для admin content
- [x] `mutations/useProjectMutations` — CRUD проектов
- [x] `mutations/useCategoryMutations` — CRUD категорий
- [x] `mutations/useTechnologyMutations` — CRUD технологий
- [x] `mutations/useSettingsMutations` — настройки, CV
- [x] `mutations/useFeedbackMutations` — сообщения
- [x] `mutations/useAdminContentMutations` — универсальный для admin content

### 10. Утилиты и константы
- [x] `ROUTES` — константы путей
- [x] `iconMap` — маппинг иконок для соцсетей
- [x] `projectStatus` — статусы проектов
- [x] `cn.js` — merge классов
- [x] `colorAlpha.js` — работа с alpha-цветами
- [x] `formatDate.js` — форматирование дат
- [x] `authValidationScheme.js` — Zod схемы для auth
- [x] `projectsValidationScheme.js` — Zod схема для проектов
- [x] `category.schema.js` — Zod схема для категорий
- [x] `technology.schema.js` — Zod схема для технологий
- [x] `feedback.schema.js` — Zod схема для сообщений
- [x] `availability.js` — утилиты для статусов доступности

---

## 🔨 В РАЗРАБОТКЕ

### 1. Админ-панель(dashboard)
- [ ] **Users CRUD** (`pages/dashboard/users/UsersPage.jsx`)
  - Статус: заглушка "Раздел в разработке"
  - Нужно: таблица пользователей, поиск, роли, блокировка, удаление
- [ ] **Availability Statuses CRUD** (`pages/dashboard/availability/AvailabilityStatusesPage.jsx`)
  - Статус: заглушка "Раздел в разработке"
  - Нужно: CRUD для статусов (цвет, название, порядок, code)

---

## 📋 ОЧЕРЕДЬ (TODO)

### 1. Админ-панель
- [ ] **Users CRUD** — полный функционал управления пользователями
- [ ] **Availability Statuses CRUD** — полноценный CRUD статусов
- [ ] **DashboardHomePage** — реальная статистика (количество проектов, сообщений, пользователей)
- [ ] **Analytics** — графики и аналитика (заглушка в DashboardHomePage)
- [ ] **SettingPage** - рефактор кода
- [ ] **TechnologiesPage** — добавить аккордеон для категорий

### 2. Рефакторинг кода
- [ ] **Modals** — пересмотреть код Modal/ProjectModal/TechnologyModal/etc. Привести к MainModal to OtherModal's 
- [ ] **Skeletons** — добавить отдельный UI для скелетонов. Проверить isLoading = Skeleton во всем приложении
- [ ] **Forms** — проверить, что на каждой форме мы правильно обрабатывает zod fields error с бекенда
- [ ] **Validations** — вынести всех zod схемы в одно место и произвести ренейминг

### 2. Загрузки файлов
- [ ] **Загрузка изображений проектов** — загрузка файла/ов с компьютера → бэкенд -> хранилище
- [ ] **Загрузка CV** — загрузка файла с компьютера → бэкенд -> хранилище
- [ ] **Preview изображений** — превью перед загрузкой

### 3. Улучшения UX
- [ ] **Toast вместо window.confirm** — кастомные модалки подтверждения
- [ ] **Уведомления на страницах auth** — тосты при ошибках входа/регистрации + выброс в формы по fields
- [ ] **Inline-редактирование** — редактирование без модалок где возможно
- [ ] **Drag & Drop** — сортировка проектов, категорий, записей опыта
- [ ] Добавить дефолт(fallback) картинки при их отсутствии для user profile/projects

### 4. Публичные страницы
- [ ] **ProfilePage** — добавить для юзеров личный кабинет(профиль) с возможностью менять пароль, почту, аватарку
- [ ] **Регистрация** — убрать возможность регистрации с почт согласно закону РФ 
- [ ] **Авторизация** — дописать логику "запомнить меня"
- [ ] **HomePage параллакс** — видео-параллакс эффект (На HomePage добавить паралакс эффект используя видео, которое воспроизводится скроллом(Референс: Темная комната. На заднем плане находится стол, включенные мониторы, системный блок. На ближнем плане человек на стуле у которого сверху такая старая лампа накаливания накрытая черным/темным палафоном, которая слегка светит и мерцает. Человек сидящий на стуле находится полубоком к камере. Сзади стула окно с видом на улицу. На улице темно и лишь изредка сверкают огни/звезды. Скролл привязан к воспроизведению видео. Соответственно при скролле вниз камера наезжает на монитор и след. секция будто бы мы находимся внутри монитора)
- [ ] **Анимации** — переходы между страницами, появление элементов
- [ ] **Lazy loading** — ленивая загрузка тяжёлых компонентов

### 5. Оптимизации
- [ ] **Code splitting** — разделение бандла по роутам
- [ ] **React Query оптимизация** — инвалидация кэша, prefetch
- [ ] **Virtual scrolling** — для больших списков
- [ ] **Оптимизация изображений** — WebP, lazy loading, sizes

### 6. Безопасность
- [ ] **CSRF защита** — если бэкенд требует
- [ ] **Rate limiting** — на стороне фронта для форм
- [ ] **XSS защита** — экранирование пользовательского контента

### 7. Тесты
- [ ] **Unit-тесты** — утилиты, хуки, схемы валидации
- [ ] **Component-тесты** — ключевые компоненты (Modal, Input, SocialLink)
- [ ] **E2E тесты** — критические пути (auth, CRUD операции)
- [ ] **CI/CD** — автоматический прогон тестов

### 8. Документация
- [ ] **API docs** — Swagger / OpenAPI спецификация
- [ ] **README** — инструкция по запуску и деплою

---

## 🚀 Фичи на будущее

- [ ] **Email verification** — верификация почты после регистрации
- [ ] **Demo-admin режим** — демо-доступ к админке для посетителей
- [ ] **SEO** — meta tags, sitemap, Open Graph
- [ ] **i18n** — мультиязычность (EN/RU)
- [ ] **Analytics** — интеграция аналитики (Я.Метрика / GA)
- [ ] **Комментарии к проектам** — система комментариев
- [ ] **Лайки проектов** — система лайков от посетителей
- [ ] **Блог** — раздел с постами
- [ ] **Keyboard shortcuts** — горячие клавиши в админке
- [ ] **Export/Import** — экспорт/импорт данных админки
- [ ] **Bulk actions** — массовые операции в таблицах
- [ ] **Notifications center** — центр уведомлений в админке

---


## 🔄 Процесс работы

### Как вести Roadmap:
1. Перемещай задачи из `📋 ОЧЕРЕДЬ` в `🔨 В РАЗРАБОТКЕ` когда начинаешь
2. Перемещай из `🔨 В РАЗРАБОТКЕ` в `✅ СДЕЛАНО` когда готово
3. Добавляй новые задачи в `📋 ОЧЕРЕДЬ` по мере необходимости

### Commit conventions:
- `feat:` — новая функциональность
- `fix:` — исправление бага
- `refactor:` — рефакторинг без изменения поведения
- `chore:` — инфраструктурные изменения
- `docs:` — документация
- `style:` — форматирование, пробелы и т.д.
- `test:` — тесты
- `perf:` — оптимизация производительности