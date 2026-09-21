import {
	LayoutDashboard, FolderKanban, Users, Briefcase, Settings,
	ChevronLeft, Menu, LogOut, ArrowLeftFromLine,
	ExternalLink, CircleDot, Layers, Mail
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../routes/pathsConstants";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{ path: ROUTES.ADMIN, label: "Дашборд", icon: LayoutDashboard, end: true },
	{ path: "/dashboard/projects", label: "Проекты", icon: FolderKanban },
	{ path: "/dashboard/experience", label: "Опыт", icon: Briefcase },
	{ path: "/dashboard/users", label: "Пользователи", icon: Users },
	{ path: "/dashboard/settings", label: "Настройки", icon: Settings },
	{ path: "/dashboard/availability-statuses", label: "Статусы доступности", icon: CircleDot },
	{ path: "/dashboard/categories-technologies", label: "Категории/Тех стек", icon: Layers },
	{ path: "/dashboard/messages", label: "Сообщения", icon: Mail }
];

export function DashboardLayout() {

	const [mobileOpen, setMobileOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	const { user, signOut } = useAuth();

	const handleLogout = async () => {
		await signOut();
	};

	const linkClass = ({ isActive }) =>
		`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
			? "bg-accent-400/10 text-accent-400"
			: "text-dark-400 hover:text-white hover:bg-white/5"
		} ${collapsed ? "justify-center" : ""}`;

	return (
		<div className="min-h-screen bg-dark-950 flex">
			{/* Бэкдроп для мобилки */}
			{mobileOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={() => setMobileOpen(false)}
				/>
			)}

			{/* Сайдбар */}
			<aside
				className={`fixed lg:sticky top-0 h-screen inset-y-0 left-0 z-50 flex flex-col glass border-r border-white/10 
                    transition-all duration-300 ${collapsed ? "w-16" : "w-64"
					} ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
			>
				{/* Шапка сайдбара */}
				<div className={`flex items-center h-16 border-b border-white/10 px-4 ${collapsed ? "justify-center" : "justify-between"}`}>
					{!collapsed && (
						<span className="font-semibold text-white text-lg">Админка</span>
					)}
					<button
						onClick={() => setCollapsed(!collapsed)}
						className="p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 hidden lg:block"
					>
						<ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
					</button>
					<button
						onClick={() => setMobileOpen(false)}
						className="p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 lg:hidden"
					>
						<ArrowLeftFromLine className="w-5 h-5" />
					</button>
				</div>

				{/* Навигация */}
				<nav className="flex-1 p-3 space-y-1 overflow-y-auto">
					{SIDEBAR_ITEMS.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							end={item.end}
							className={linkClass}
							onClick={() => setMobileOpen(false)}
						>
							{item?.icon && (<item.icon className="w-5 h-5 shrink-0" />)}
							{!collapsed && <span>{item.label}</span>}
						</NavLink>
					))}
				</nav>

				{/* Нижняя часть: юзер и выход */}
				<div className="border-t border-white/10 p-3">
					{!collapsed && (
						<div className="flex items-center gap-2 mb-2 px-1">
							<img
								src={user?.avatar}
								className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-400 to-emerald-400"
							/>
							<div className="flex-1 min-w-0">
								<p className="text-sm text-white truncate">{user?.username}</p>
								<p className="text-xs text-dark-400">{user.role}</p>
							</div>
						</div>
					)}
					<button
						onClick={handleLogout}
						className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium 
                            text-red-400 hover:bg-red-400/10 transition-colors ${collapsed ? "justify-center" : ""}`}
					>
						<LogOut className="w-5 h-5 shrink-0" />
						{!collapsed && <span>Выйти</span>}
					</button>
				</div>
			</aside>

			{/* Основной контент */}
			<div className="flex-1 flex flex-col h-screen overflow-hidden">
				{/* Верхняя панель */}
				<header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-dark-950/80 backdrop-blur-xl sticky top-0 z-30">
					<button
						onClick={() => setMobileOpen(true)}
						className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 lg:hidden"
					>
						<Menu className="w-6 h-6" />
					</button>
					<div className="flex-1 lg:hidden" />
					{/* Кнопка вернуться "На сайт" */}
					<Link
						to={ROUTES.HOME}
						className="flex items-center gap-1.5 mr-4 px-3 py-1.5 rounded-lg text-sm text-dark-400 hover:text-white hover:bg-white/5 transition-colors"
					>
						<ExternalLink className="w-4 h-4" />
						<span className="hidden sm:inline">Вернуться на сайт</span>
					</Link>
					<span className="text-sm text-dark-400">
						{new Date().toLocaleDateString("ru-RU", {
							day: "numeric", month: "long", year: "numeric"
						})}
					</span>
				</header>

				{/* Контент страницы */}
				<main className="flex-1 p-6 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	)

}