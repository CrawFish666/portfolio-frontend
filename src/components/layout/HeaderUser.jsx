import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import { HeaderUserSkeleton } from "../skeletons/HeaderUserSkeleton"
import { LayoutDashboard, LogOut, Settings, UserRound } from "lucide-react";
import { ROUTES } from "../../routes/pathsConstants";
import { useState } from "react";


export function HeaderUser({
	mobile = false,
	onNavigate
}) {

	const { user, loading, signOut } = useAuth();
	const location = useLocation();
	const [userMenuOpen, setUserMenuOpen] = useState(false);

	if (loading) {
		return <HeaderUserSkeleton />
	}

	if (!user) {
		return (
			<Link state={{ from: location.pathname }}
				to={ROUTES.SIGN_IN}
				className={
					mobile
						? "primary-button w-full justify-center"
						: "primary-button text-base"
				}
				onClick={onNavigate}>
				<UserRound className="w-6 h-6" />
				Войти
			</Link>
		)
	}

	if (mobile) {
		return (
			<div className="flex flex-col gap-2">

				<Link
					to={ROUTES.PROFILE}
					onClick={onNavigate}
					className="px-4 py-3 rounded-xl text-secondary hover:text-primary hover:bg-active"
				>
					<Settings className="inline w-4 h-4 mr-2" />
					Настройки
				</Link>

				{user.role === "admin" && (
					<Link
						to={ROUTES.ADMIN}
						onClick={onNavigate}
						className="px-4 py-3 rounded-xl text-secondary hover:text-primary hover:bg-active"
					>
						<LayoutDashboard className="inline w-4 h-4 mr-2" />
						Админ-панель
					</Link>
				)}

				<button
					onClick={() => {
						signOut();
						onNavigate?.();
					}}
					className="px-4 py-3	text-left rounded-xl	text-red-400 hover:bg-active">
					<LogOut className="inline w-4 h-4 mr-2" />
					Выйти
				</button>

			</div>
		);
	}


	return (
		<div className="relative">
			<button
				className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-active transition-colors"
				onClick={() => setUserMenuOpen(!userMenuOpen)}>
				<img className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-400 to-emerald-400" src={user.avatar} />
				<span className="text-base text-secondary hidden sm:block">{user.username}</span>
			</button>

			{userMenuOpen && (
				<div className="absolute right-0 mt-2 w-56 dropdown animate-slide-down flex flex-col">
					{user?.role === 'admin' && (
						<Link to={ROUTES.ADMIN} className=" dropdown-item" onClick={() => setUserMenuOpen(false)}>
							<LayoutDashboard className="w-4 h-4" />
							Админ-панель
						</Link>
					)}

					<Link to={ROUTES.PROFILE} className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
						<Settings className="w-4 h-4" />
						Настройки
					</Link>

					<div className="h-px bg-subtle my-1" />
					<button className="dropdown-item text-red-400 cursor-pointer"
						onClick={() => {
							setUserMenuOpen(false);
							signOut();
						}}>
						<LogOut className="w-4 h-4" />
						Выйти
					</button>

				</div>
			)}
		</div>
	)
}