import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react";

export function SingInPage() {

	const navigate = useNavigate();

	const singInSchema = z.object({
		email: z.string()
			.trim()
			.min(1, "Email обязателен")
			.email("Неверный формат email"),
		password: z.string()
			.trim()
			.min(1, "Введите пароль"),
		rememberMe: z.boolean()
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		// для отчистки формы после sucсess отправки
		reset
	} = useForm({
		resolver: zodResolver(singInSchema),
		// Валидация при первом blur, потом при каждом onChange
		mode: 'onTouched'
	})

	const onSubmitSuccess = async (data) => {
		console.log(data)   // { email: "...", password: "..." }
		// Искуственно добавил время ответа
		await new Promise((resolve) => {
			setTimeout(resolve, 5000);
		});
		reset()
	}

	const onSubmitError = async (error) => {
		console.log(error)
	}

	const handleBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate("/")
		}
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="text-center mb-6">
				<h1 className="text-3xl text-white font-bold mb-2">С возвращением!</h1>
				<p className="text-gray-400">Залогиньтесь, чтобы продолжить</p>
			</div>
			<button className="text-sm text-gray-400 mb-2 flex gap-1 items-center cursor-pointer" onClick={handleBack}>
				<ArrowLeft className="h-4 w-4" />
				Назад
			</button>
			<form noValidate className="flex flex-col w-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-6 p-8" onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}>
				<div className="mb-5">
					<label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">Email</label>
					<input autoComplete="email" {...register('email')} className="w-full px-4 py-3 bg-surface-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200" id="email" type="email" placeholder="example@example.com" />
					{errors.email?.message && <p>{errors.email.message}</p>}
				</div>
				<div className="mb-5">
					<label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">Password</label>
					<input autoComplete="current-password" {...register('password')} className="w-full px-4 py-3 bg-surface-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200" id="password" type="password" placeholder="Enter your password" />
				</div>
				<div className="flex justify-between gap-4 mb-5">
					<label className="flex items-center gap-2" htmlFor="checkbox">
						<input {...register('rememberMe')} id="checkbox" type="checkbox"
							className="w-4 h-4 rounded border-white/10 bg-surface-800 text-primary-500 focus:ring-primary-500/50"
						/>
						<span className="text-sm text-gray-400">Запомнить меня</span>
					</label>

					<Link className="text-blue-400" to="/reset-password">Забыли пароль?</Link>
				</div>
				<button className="primary-button mb-5" type="submit">Вход</button>
				<div className="text-center">
					<span>Еще нет аккаунта? </span>
					<Link className="text-blue-400" to="/sing-up">Регистрация</Link>
				</div>
			</form>
		</div>
	)
}