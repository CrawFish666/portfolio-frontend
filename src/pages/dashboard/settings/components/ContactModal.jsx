import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Modal from "../../../../components/ui/Modal";
import Input from "../../../../components/ui/Input/Input";


const DEFAULT_VALUES = {
	type: "",
	label: "",
	url: "",
	icon: "",
	order: 0,
	isActive: true,
};

export function ContactModal({
	isOpen,
	contact,
	onClose,
	onSave,
}) {

	const methods = useForm({
		mode: "onTouched",
		defaultValues: DEFAULT_VALUES,
	});

	const {
		handleSubmit,
		reset,
		register,
	} = methods;

	useEffect(() => {
		console.log('mi tyt')
		if (!isOpen) return;
		console.log('mi tyt2')
		if (contact) {
			reset(contact);
		} else {
			reset({
				type: "",
				label: "",
				url: "",
				icon: "",
				order: 0,
				isActive: true,
			});
		}
	}, [isOpen, contact, reset]);

	const onSubmit = (data) => {
		console.log("CONTACT SUBMIT", data);
		onSave(data);
		onClose();
	};

	return (
		<Modal isOpen={isOpen}
			onClose={onClose}
			title={contact
				? "Редактировать контакт"
				: "Добавить контакт"}>
			<FormProvider {...methods}>
				<form onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();

					handleSubmit(onSubmit)(e);
				}}>

					<Input
						label="Тип"
						{...register("type")}
					/>

					<Input
						label="Название"
						{...register("label")}
					/>

					<Input
						label="URL"
						{...register("url")}
					/>

					<Input
						label="Иконка"
						{...register("icon")}
					/>

					<Input
						type="number"
						label="Порядок"
						{...register("order", {
							valueAsNumber: true,
						})}
					/>

					<div className="flex gap-4">
						<label className="flex items-center gap-2">

							<input
								type="checkbox"
								{...register("isActive")}
							/>

							<span>
								Активен
							</span>

						</label>

						<label className="flex items-center gap-2">

							<input
								type="checkbox"
								{...register("isExternal")}
							/>

							<span>
								Внешняя ссылка?
							</span>

						</label>
					</div>

					<div className="flex justify-end gap-3">

						<button
							type="button"
							variant="secondary"
							onClick={onClose}
						>
							Отмена
						</button>

						<button type="submit">

							{contact
								? "Сохранить"
								: "Добавить"}

						</button>

					</div>
				</form>
			</FormProvider>
		</Modal>
	)
}