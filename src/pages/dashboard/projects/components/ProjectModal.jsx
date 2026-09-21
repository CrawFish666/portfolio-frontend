import { FormProvider, useForm } from "react-hook-form";
import Modal from "../../../../components/ui/Modal";
import InputField from "../../../../components/ui/Input/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { TechnologySelect } from "../../../../components/ui/MultiSelect/TechnologySelect";
import { projectSchema } from "../../../../utils/projectsValidationScheme";

const DEFAULT_VALUES = {
	title: "",
	slug: "",
	liveDemo_url: "",
	image_url: "",
	source_url: "",

	status: "",

	short_description: "",
	full_description: "",

	tech: [],

	favorite: false,
	is_public: true,
};

export function ProjectModal({
	isOpen,
	project,
	statuses,
	technologies,
	onClose,
	onSave,
}) {

	const methods = useForm({
		resolver: zodResolver(projectSchema),
		mode: "onTouched",
		defaultValues: DEFAULT_VALUES,
	});

	const {
		register,
		handleSubmit,
		reset,
		control,
		setError,
		formState: {
			isSubmitting,
			isDirty
		}
	} = methods;

	useEffect(() => {

		if (!isOpen) return;
		if (project) {
			reset({
				...project,
				status: project.status?._id ?? "",
				tech: project.tech
					? project.tech.map(t => t._id)
					: [],
			});

		} else {
			reset(DEFAULT_VALUES);
		}

	}, [project, isOpen, reset]);

	const submit = async (data) => {
		try {
			await onSave(data);
		} catch (error) {
			if (error.fieldErrors) {
				Object.entries(error.fieldErrors).forEach(([field, message]) => {
					setError(field, { type: "server", message });
				});
			}
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={
				project
					? "Редактировать проект"
					: "Новый проект"
			}
			size="lg">

			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(submit)}
					className="space-y-4">
					<div className="flex gap-4">
						<InputField
							name="title"
							label="Название"
						/>
						<InputField
							name="slug"
							label="Slug"
						/>
					</div>

					<div className="flex gap-4">
						<InputField
							name="liveDemo_url"
							label="Live Demo"
						/>

						<InputField
							name="source_url"
							label="GitHub"
						/>
					</div>

					<div className="flex gap-4">
						<InputField
							name="image_url"
							label="Изображение"
						/>

						<InputField
							name="short_description"
							label="Краткое описание"
						/>
					</div>
					<div>

						<label className="block text-sm mb-2">
							Полное описание
						</label>

						<textarea
							{...register("full_description")}
							className="input-field min-h-32 resize-none"
						/>
					</div>
					<div>

						<label className="block text-sm mb-2">
							Статус
						</label>

						<select
							{...register("status")}
							className="input-field">

							<option value="">
								Выберите статус
							</option>

							{statuses.map(status => (
								<option
									key={status._id}
									value={status._id}>
									{status.title}
								</option>
							))
							}

						</select>
					</div>

					<div>

						<label className="block text-sm mb-2">
							Технологии
						</label>

						<Controller
							name="tech"
							control={control}
							render={({ field }) => (

								<TechnologySelect
									technologies={technologies}
									value={field.value ?? []}
									onChange={field.onChange}
								/>

							)}
						/>
					</div>

					<div className="flex gap-4">

						<label className="flex gap-2 items-center">

							<input
								type="checkbox"
								{...register("favorite")}
							/>
							Избранное
						</label>

						<label className="flex gap-2 items-center">
							<input
								type="checkbox"
								{...register("is_public")}/>
							Публичный
						</label>
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<button
							type="button"
							className="glass-button"
							onClick={onClose}>
							Отмена
						</button>

						<button
							type="submit"
							disabled={isSubmitting || !isDirty}
							className="primary-button">
							{project	? "Сохранить" : "Создать"}
						</button>
					</div>
				</form>

			</FormProvider>

		</Modal>
	)
}