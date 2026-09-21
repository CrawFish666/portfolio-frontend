import { useRef } from "react";
import { Loader } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { feedbackSchema } from "../../../../utils/feedback.schema";
import { useFeedbackMutations } from "../../../../hooks/mutations/useFeedbackMutations";
import { toast } from "sonner";

export function ContactForm() {
	const formOpenedAt = useRef(Date.now());

	const {
		register,
		handleSubmit,
		reset,
		formState: {
			errors,
			isSubmitting,
			isDirty,
		},
	} = useForm({
		resolver: zodResolver(feedbackSchema),
		mode: "onTouched",
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
			website: "",
		},
	});

	const onSubmit = (data) => {
		send.mutate(
			{ ...data, formOpenedAt: formOpenedAt.current },
			{
				onSuccess: () => {
					toast.success("Сообщение успешно отправлено");
					reset();
					formOpenedAt.current = Date.now();
				},
			}
		);
	};

	const { send } = useFeedbackMutations();

	return (
		<section
			aria-labelledby="contact-form-title"
			className="glass-card p-8"
		>
			<h2
				id="contact-form-title"
				className="text-xl font-semibold text-primary mb-6">
				Отправить сообщение
			</h2>

			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-5">
				<input
					type="text"
					tabIndex={-1}
					autoComplete="off"
					className="hidden"
					{...register("website")}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					<div>
						<label
							htmlFor="name"
							className="block text-sm text-secondary mb-2"
						>
							Имя
						</label>

						<input
							id="name"
							type="text"
							placeholder="Ваше имя"
							{...register("name")}
							className="input-field"
						/>

						{errors.name && (
							<p className="mt-1 text-sm text-red-400">
								{errors.name.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm text-secondary mb-2"
						>
							Email
						</label>

						<input
							id="email"
							type="email"
							autoComplete="email"
							placeholder="mail@example.com"
							{...register("email")}
							className="input-field"
						/>

						{errors.email && (
							<p className="mt-1 text-sm text-red-400">
								{errors.email.message}
							</p>
						)}
					</div>
				</div>

				<div>
					<label
						htmlFor="subject"
						className="block text-sm text-secondary mb-2"
					>
						Тема
					</label>

					<input
						id="subject"
						type="text"
						placeholder="О чём хотите поговорить?"
						{...register("subject")}
						className="input-field"
					/>

					{errors.subject && (
						<p className="mt-1 text-sm text-red-400">
							{errors.subject.message}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="message"
						className="block text-sm text-secondary mb-2"
					>
						Сообщение
					</label>

					<textarea
						id="message"
						rows={6}
						placeholder="Ваше сообщение..."
						{...register("message")}
						className="input-field resize-none min-h-[150px]"
					/>

					{errors.message && (
						<p className="mt-1 text-sm text-red-400">
							{errors.message.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					disabled={send.isPending || !isDirty}
					className={`primary-button w-full py-3.5 ${send.isPending
						? "cursor-not-allowed opacity-60"
						: "cursor-pointer hover:scale-[1.02]"
						}`}
				>
					{send.isPending ? (
						<Loader className="w-5 h-5 animate-spin" />
					) : (
						"Отправить сообщение"
					)}
				</button>
			</form>
		</section>
	);
}