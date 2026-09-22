import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { registerSchema } from "../../utils/authValidationScheme";
import { ROUTES } from '../../routes/pathsConstants';

export function SignUpPage() {
	const { setAuthData, signUp } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setError,
	} = useForm({
		resolver: zodResolver(registerSchema),
		mode: "onTouched",
	});

	const onSubmit = async (data) => {
		try {
			const { repeatPassword, ...body } = data;
			const json = await signUp(body);
			// Автоматический вход после регистрации
			setAuthData(json.accessToken);
			reset();
			navigate(ROUTES.HOME, {
				replace: true
			});
		} catch (error) {
			setError("root", { message: error.message });
		}
	};

	const handleBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate("/");
		}
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="text-center mb-6">
				<h1 className="text-3xl text-primary font-bold mb-2">Создать аккаунт</h1>
				<p className="text-secondary">Зарегистрируйтесь, чтобы начать</p>
			</div>
			<button
				className="text-sm text-secondary mb-2 flex gap-1 items-center cursor-pointer"
				onClick={handleBack}>
				<ArrowLeft className="h-4 w-4" />
				Назад
			</button>
			<form
				noValidate
				className="flex flex-col w-full rounded-2xl overflow-hidden bg-surface backdrop-blur-xl border border-subtle p-8"
				onSubmit={handleSubmit(onSubmit)}>
				{errors.root?.message && (
					<div className="text-red-400 text-sm mb-3">{errors.root.message}</div>
				)}
				{/* Логин */}
				<div className="mb-5">
					<label className="block text-sm font-medium text-thirdly mb-2" htmlFor="username">
						Логин
					</label>
					<input
						autoComplete="off"
						{...register("username")}
						className="input-field text-primary"
						id="username"
						type="text"
						placeholder="Ваш логин"
					/>
					{errors.username?.message && (
						<p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
					)}
				</div>
				{/* Имя (необязательно) */}
				<div className="mb-5">
					<label className="block text-sm font-medium text-thirdly mb-2" htmlFor="name">
						Имя
					</label>
					<input
						autoComplete="off"
						{...register("name")}
						className="input-field"
						id="name"
						type="text"
						placeholder="Необязательно"/>
					{errors.name?.message && (
						<p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
					)}
				</div>
				{/* Email */}
				<div className="mb-5">
					<label className="block text-sm font-medium text-thirdly mb-2" htmlFor="email">
						Email
					</label>
					<input
						autoComplete="off"
						{...register("email")}
						className="input-field"
						id="email"
						type="email"
						placeholder="example@example.com"/>
					{errors.email?.message && (
						<p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
					)}
				</div>

				{/* Пароль */}
				<div className="mb-5">
					<label className="block text-sm font-medium text-thirdly mb-2" htmlFor="password">
						Пароль
					</label>
					<input
						autoComplete="new-password"
						{...register("password")}
						className="input-field"
						id="password"
						type="password"
						placeholder="Минимум 8 символов"/>
					{errors.password?.message && (
						<p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
					)}
				</div>

				{/* Повторите пароль */}
				<div className="mb-5">
					<label className="block text-sm font-medium text-thirdly mb-2" htmlFor="repeatPassword">
						Повторите пароль
					</label>
					<input
						autoComplete="new-password"
						{...register("repeatPassword")}
						className="input-field"
						id="repeatPassword"
						type="password"
						placeholder="Повторите пароль"/>
					{errors.repeatPassword?.message && (
						<p className="text-red-400 text-sm mt-1">{errors.repeatPassword.message}</p>
					)}
				</div>

				<button
					className="primary-button mb-5"
					type="submit">
					{isSubmitting ? "Загрузка..." : "Регистрация"}
				</button>

				<div className="text-center">
					<span>Уже есть аккаунт? </span>
					<Link className="text-blue-400" to={ROUTES.SIGN_IN}>
						Войти
					</Link>
				</div>
			</form>
		</div>
	);
}