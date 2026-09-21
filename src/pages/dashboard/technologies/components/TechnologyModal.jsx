import Modal from "../../../../components/ui/Modal";
import { technologySchema } from "../../../../utils/technology.schema";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import InputField from "../../../../components/ui/Input/InputField";


const DEFAULT_VALUES = {
	name: "",
	slug: "",
	icon: "",
	category: "",
	website: "",
	order: 0,
	isActive: true,
};

export function TechnologyModal({
	isOpen,
	technology,
	categories,
	onClose,
	onSave,
	selectedCategory
}) {

	const methods = useForm({
		resolver: zodResolver(technologySchema),
		mode: "onTouched",
		defaultValues: DEFAULT_VALUES,
	})

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: {

			isSubmitting
		}
	} = methods;

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

	useEffect(() => {
		if (!isOpen) return;

		if (technology) {
			reset({
				...technology,
				category: technology.category?._id ?? "",
			})
		} else {
			reset({
				...DEFAULT_VALUES,
				category: selectedCategory?._id ?? ""
			})
		}


	}, [reset, technology, isOpen, selectedCategory])

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={technology ? "Редактировать технологию" : "Новая технология"} >
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(submit)}>
					<InputField name="name" label="Название" />
					<InputField name="slug" label="Slug" />
					<InputField name="icon" label="Иконка" />
					<label className="">Категория</label>
					<select
						disabled={!technology}
						{...register("category")}
						className={`input-field mb-2 ${!technology && "opacity-40"}`}
					>
						<option value="">
							Выберите категорию
						</option>

						{categories.map(category => (
							<option
								key={category._id}
								value={category._id}
							>
								{category.name}
							</option>
						))}
					</select>
					<InputField name="website" label="Url website" />

					<InputField type="number" label="Порядок" name="order"
						registerOptions={{
							valueAsNumber: true
						}} />

					<label className="flex items-center gap-3">
						<input type="checkbox" {...register("isActive")} />
						<span>
							Активна
						</span>
					</label>

					<div className="flex justify-end gap-3">
						<button className="glass-button" type="button" onClick={onClose}>Отмена</button>
						<button className="primary-button cursor-pointer" type="submit" disabled={isSubmitting}>{technology ? "Сохранить" : "Создать"}</button>
					</div>
				</form>
			</FormProvider>
		</Modal>
	)
}