import Modal from "../../../../components/ui/Modal";
import { categorySchema } from "../../../../utils/category.schema"

import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import InputField from "../../../../components/ui/Input/InputField";

const DEFAULT_VALUES = {
	name: "",
	slug: "",
	color: "#64748B",
	icon: "",
	order: 0,
	isActive: true,
};

export function CategoryModal({
	isOpen,
	category,
	onClose,
	onSave
}) {

	const methods = useForm({
		resolver: zodResolver(categorySchema),
		mode: "onTouched",
		defaultValues: DEFAULT_VALUES
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

	useEffect(() => {
		if (!isOpen) return;

		if (category) {
			reset(category)
		} else {
			reset(DEFAULT_VALUES)
		}


	}, [reset, category, isOpen])

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
		<Modal isOpen={isOpen} onClose={onClose} title={category ? "Редактировать категорию" : "Новая категория"}>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(submit)}>

					<InputField label="Название" name="name" />
					<InputField label="Slug" name="slug" />
					<div>
						<label className="block text-sm mb-2">Цвет</label>
						<input
							type="color"
							{...register("color")}
							className="h-11 w-full rounded-xl"
						/>
					</div>
					<InputField label="Иконка" name="icon" />
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
						<button className="primary-button cursor-pointer" type="submit" disabled={isSubmitting}>{category ? "Сохранить" : "Создать"}</button>
					</div>
				</form>
			</FormProvider>
		</Modal>
	)
}