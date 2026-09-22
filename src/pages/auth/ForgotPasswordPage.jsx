import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { forgotPasswordSchema } from "../../utils/authValidationScheme";
import { ROUTES } from "../../routes/pathsConstants";

export function ForgotPasswordPage() {
	const { forgotPassword } = useAuth();
	const navigate = useNavigate();
	const [isSent, setIsSent] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm({
		resolver: zodResolver(forgotPasswordSchema),
		mode: "onTouched",
	});

	const onSubmit = async (data) => {
		try {
			await forgotPassword(data.email);
			setIsSent(true);
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

	if (isSent) {
		return (
			<div className="w-full max-w-md mx-auto">
				<div className="text-center mb-6">
					<h1 className="text-3xl text-primary font-bold mb-2">
						Проверьте почту
					</h1>
					<p className="text-secondary">
						Мы отправили письмо со ссылкой для сброса пароля
					</p>
				</div>

				<div className="flex flex-col items-center w-full rounded-2xl bg-surface backdrop-blur-xl border border-subtle p-8">
					<CheckCircle className="h-16 w-16 text-green-400 mb-4" />
					<p className="text-thirdly text-center mb-6">
						Если аккаунт с таким email существует, вы получите письмо в течение нескольких минут.
					</p>
					<Link
						to={ROUTES.SIGN_IN}
						replace
						className="primary-button text-center w-full">
						Вернуться ко входу
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="text-center mb-6">
				<h1 className="text-3xl text-primary font-bold mb-2">
					Восстановление пароля
				</h1>
				<p className="text-secondary">
					Введите email, и мы вышлем ссылку для сброса
				</p>
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

				<div className="mb-5">
					<label
						className="block text-sm font-medium text-thirdly mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
						<input
							autoComplete="off"
							{...register("email")}
							className="input-field text-primary pl-10 pr-4 py-3 "
							id="email"
							type="email"
							placeholder="example@example.com"
						/>
					</div>
					{errors.email?.message && (
						<p className="text-red-400 text-sm mt-1">
							{errors.email.message}
						</p>
					)}
				</div>

				<button
					className="primary-button mb-5"
					type="submit"
					disabled={isSubmitting}>
					{isSubmitting ? "Отправка..." : "Отправить письмо"}
				</button>
			</form>
		</div>
	);
}