import { Link, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordSchema } from "../../utils/authValidationScheme";
import { ArrowLeft, CheckCircle, Loader, Loader2, XCircle, Lock } from "lucide-react";
import { ROUTES } from "../../routes/pathsConstants";


export function ResetPasswordPage() {
	const { token } = useParams();
	const { verifyResetPwdToken, resetPasswordViaToken } = useAuth();
	const [status, setStatus] = useState('verifying');
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (!token) {
			setStatus("expired");
			setErrorMessage("Токен отсутствует");
			return;
		}

		const checkToken = async () => {
			try {
				const response = await verifyResetPwdToken(token);
				console.log(response)
				setStatus('valid');
			}
			catch (error) {
				setStatus("expired");
				setErrorMessage(error.message || "Токен недействителен или истёк")
			}
		}

		checkToken()
	}, [token, verifyResetPwdToken])

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: zodResolver(resetPasswordSchema),
		mode: "onTouched"
	})

	const onSubmit = async (data) => {
		try {
			// Отправляем запрос и после успеха меняем статус
			await resetPasswordViaToken(token, data.password);
			setStatus("success");
		}
		catch (error) {
			setError("root", { message: error.message });
		}
	}

	// ⏳ Загрузка (проверка токена)
	if (status === "verifying") {
		return (
			<div className="w-full max-w-md mx-auto">
				<div className="flex flex-col items-center w-full rounded-2xl bg-surface backdrop-blur-xl border border-subtle p-8">
					<Loader2 className="h-12 w-12 text-indigo-400 animate-spin mb-4" />
					<p className="text-gray-300">Проверка токена...</p>
				</div>
			</div>
		);
	}

	// ❌ Токен истёк
	if (status === "expired") {
		return (
			<div className="w-full max-w-md mx-auto">
				<div className="text-center mb-6">
					<h1 className="text-3xl text-primary font-bold mb-2">
						Ссылка недействительна
					</h1>
					<p className="text-secondary">Возможно, срок действия истёк</p>
				</div>

				<div className="flex flex-col items-center w-full rounded-2xl bg-surface backdrop-blur-xl border border-subtle p-8">
					<XCircle className="h-16 w-16 text-red-400 mb-4" />
					<p className="text-gray-300 text-center mb-6">{errorMessage}</p>
					<Link
						to={ROUTES.FORGOT_PASSWORD}
						replace
						className="primary-button text-center w-full">
						Запросить новую ссылку
					</Link>
				</div>
			</div>
		);
	}

	// ✅ Успешная смена пароля
	if (status === "success") {
		return (
			<div className="w-full max-w-md mx-auto">
				<div className="text-center mb-6">
					<h1 className="text-3xl text-primary font-bold mb-2">
						Пароль изменён
					</h1>
					<p className="text-gray-400">Теперь можно войти с новым паролем</p>
				</div>

				<div className="flex flex-col items-center w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
					<CheckCircle className="h-16 w-16 text-green-400 mb-4" />
					<p className="text-gray-300 text-center mb-6">
						Пароль успешно обновлён
					</p>
					<Link
						to={ROUTES.SIGN_IN}
						replace
						className="primary-button text-center w-full">
						Войти
					</Link>
				</div>
			</div>
		);
	}

	// 🔐 Форма ввода нового пароля (токен валиден)
	return (
		<div className="w-full max-w-md mx-auto">
			<div className="text-center mb-6">
				<h1 className="text-3xl text-primary font-bold mb-2">
					Новый пароль
				</h1>
				<p className="text-secondary">Введите новый пароль для входа</p>
			</div>
			<button
				className="text-sm text-secondary mb-2 flex gap-1 items-center cursor-pointer">
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

				<div className="mb-5">
					<label className="block text-sm font-medium text-thirdly mb-1.5">
						Новый пароль
					</label>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="password"
							{...register("password")}
							className="pl-10 pr-4 py-2.5 input-field"
							placeholder="Новый пароль"/>
					</div>
					{errors.password && (
						<p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
					)}
				</div>
				<div className="mb-5">
					<label className="block text-sm font-medium text-thirdly mb-1.5">
						Повторите пароль
					</label>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-thirdly" />
						<input
							type="password"
							{...register("repeatPassword")}
							className="pl-10 pr-4 py-2.5 input-field"
							placeholder="Повторите пароль"/>
					</div>
					{errors.repeatPassword && (
						<p className="text-red-400 text-xs mt-1">{errors.repeatPassword.message}</p>
					)}
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className="primary-button w-full">
					{isSubmitting ? "Сохранение..." : "Сохранить пароль"}
				</button>
			</form>
		</div>
	);

}