import { FormProvider, useForm } from "react-hook-form";
import Modal from "../../../../components/ui/Modal";
import InputField from "../../../../components/ui/Input/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { TechnologySelect } from "../../../../components/ui/MultiSelect/TechnologySelect";
import { projectSchema } from "../../../../utils/projectsValidationScheme";

const DEFAULT_VALUES = {
	title: "",
	slug: "",
	liveDemo_url: "",
	source_url: "",

	image: null,

	status: "",

	short_description: "",
	full_description: "",

	tech: [],

	favorite: false,
	is_public: true,
};

function ImageField({ project, control }) {
	return (
		<Controller
			name="image"
			control={control}
			render={({ field, fieldState }) => (
				<ImageFieldContent
					project={project}
					field={field}
					fieldState={fieldState}
				/>
			)}
		/>
	);
}

function ImageFieldContent({ project, field, fieldState }) {
	const [previewUrl, setPreviewUrl] = useState(project?.image_url);

	useEffect(() => {
		if (!field.value) {
			setPreviewUrl(project?.image_url);
			return;
		}

		const url = URL.createObjectURL(field.value);

		setPreviewUrl(url);

		return () => {
			URL.revokeObjectURL(url);
		};
	}, [field.value, project?.image_url]);

	return (
		<div className="min-w-0 h-full flex flex-col">
			<label className="block text-sm mb-2">
				Изображение
			</label>

			<div className="flex items-center gap-4 p-3 rounded-xl border border-dark-600 bg-dark-800/50 !h-[104px]">
				<div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-dark-700 flex items-center justify-center">
					{previewUrl ? (
						<img
							src={previewUrl}
							alt={
								field.value?.name ??
								project?.title ??
								"Изображение проекта"
							}
							className="w-full h-full object-cover"
						/>
					) : (
						<span className="text-dark-400 text-xs text-center px-2">
							Нет фото
						</span>
					)}
				</div>

				<div className="min-w-0 flex-1">
					<label className="inline-flex cursor-pointer">
						<span className="glass-button">
							Выбрать изображение
						</span>

						<input
							type="file"
							accept="image/jpeg,image/png,image/webp,image/gif"
							className="hidden"
							onChange={(event) => {
								field.onChange(
									event.target.files?.[0] ?? null
								);
							}}
						/>
					</label>

					<p className="mt-2 text-xs text-dark-400 truncate">
						{field.value
							? field.value.name
							: "JPG, PNG, WEBP или GIF · до 10 МБ"}
					</p>
				</div>
			</div>

			{fieldState.error && (
				<p className="mt-1 text-sm text-red-400">
					{fieldState.error.message}
				</p>
			)}
		</div>
	);
}

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
				title: project.title ?? "",
				slug: project.slug ?? "",
				liveDemo_url: project.liveDemo_url ?? "",
				source_url: project.source_url ?? "",

				image: null,

				status: project.status?._id ?? "",

				short_description: project.short_description ?? "",
				full_description: project.full_description ?? "",

				tech: project.tech
					? project.tech.map((t) => t._id)
					: [],

				favorite: project.favorite ?? false,
				is_public: project.is_public ?? true,
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
			size="lg"
		>
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(submit)}
					className="space-y-5"
				>
					<div className="grid grid-cols-2 gap-4">
						<InputField
							name="title"
							label="Название"
						/>

						<InputField
							name="slug"
							label="Slug"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<InputField
							name="liveDemo_url"
							label="Live Demo"
						/>

						<InputField
							name="source_url"
							label="GitHub"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<ImageField
							project={project}
							control={control}
						/>

						<div className="min-w-0">
							<label className="block text-sm mb-2">
								Краткое описание
							</label>

							<textarea
								{...register("short_description")}
								className="input-field w-full !h-[104px] resize-none"
								placeholder="Краткое описание проекта"
							/>
						</div>
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
							className="input-field"
						>
							<option value="">
								Выберите статус
							</option>

							{statuses.map((status) => (
								<option
									key={status._id}
									value={status._id}
								>
									{status.title}
								</option>
							))}
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

					<div className="flex gap-6">
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
								{...register("is_public")}
							/>
							Публичный
						</label>
					</div>

					<div className="flex justify-end gap-3 pt-2">
						<button
							type="button"
							className="glass-button"
							onClick={onClose}
						>
							Отмена
						</button>

						<button
							type="submit"
							disabled={isSubmitting || !isDirty}
							className="primary-button"
						>
							{project ? "Сохранить" : "Создать"}
						</button>
					</div>
				</form>
			</FormProvider>
		</Modal>
	)
}

