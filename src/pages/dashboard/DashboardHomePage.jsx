import { useAuth } from "../../hooks/useAuth";

export function DashboardHomePage() {
	const { user } = useAuth();
	return (
		<div>
			<h1 className="text-2xl font-bold text-white mb-1">
				С возвращением, {user?.username} 👋
			</h1>
			<p className="text-dark-400 mb-8">Панель управления сайтом</p>

			{/* Карточки статистики (заглушки) */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				{[
					{ label: "Проекты", value: "—", color: "from-accent-400 to-purple-500" },
					{ label: "Пользователи", value: "—", color: "from-emerald-400 to-teal-500" },
					{ label: "Записей опыта", value: "—", color: "from-blue-400 to-indigo-500" },
					{ label: "Сообщений", value: "—", color: "from-amber-400 to-orange-500" },
				].map((card) => (
					<div key={card.label} className="glass rounded-2xl p-5 border border-white/5">
						<div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} mb-3`} />
						<p className="text-2xl font-bold text-white">{card.value}</p>
						<p className="text-sm text-dark-400">{card.label}</p>
					</div>
				))}
			</div>

			{/* Заглушка для будущего контента */}
			<div className="glass rounded-2xl p-8 border border-white/5 text-center">
				<p className="text-dark-400">Здесь будет графики иAnalytics</p>
			</div>
		</div>
	);
}