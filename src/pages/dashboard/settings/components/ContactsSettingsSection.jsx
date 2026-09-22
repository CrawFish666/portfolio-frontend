import { Mail } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import Card from "../../../../components/ui/Card";
import { ContactItem } from "./ContactItem";
import { useState } from "react";
import { ContactModal } from "./ContactModal";

export function ContactsSettingsSection() {

	const { control, watch, setValue } = useFormContext();

	const contacts = watch("contacts") ?? [];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingContact, setEditingContact] = useState(null);
	const [editingIndex, setEditingIndex] = useState(null);



	const {
		fields,
		append,
		remove,
	} = useFieldArray({
		control,
		name: "contacts",
	});

	const handleCreate = () => {
		setEditingContact(null);
		setEditingIndex(null);
		setIsModalOpen(true);
	};

	const handleEdit = (contact, index) => {
		setEditingContact(contact);
		setEditingIndex(index);
		setIsModalOpen(true);
	};

	const handleClose = () => {
		setIsModalOpen(false);
		setEditingContact(null);
		setEditingIndex(null);
	};

	const handleSave = (contact) => {

		const currentContacts = contacts ?? [];

		let updatedContacts;


		if (editingIndex === null) {

			updatedContacts = [
				...currentContacts,
				contact,
			];

		} else {

			updatedContacts = currentContacts.map(
				(item, index) =>
					index === editingIndex
						? contact
						: item
			);

		}

		setValue(
			"contacts",
			updatedContacts,
			{
				shouldDirty: true,
			}
		);
		handleClose();
	};

	const handleDelete = (index) => {
		remove(index);
	};

	return (
		<>
			<Card title="Контакты"
				actions={
					<button
						type="button"
						onClick={handleCreate}>
						Добавить контакт
					</button>
				}>

				{contacts.length === 0 ? (
					<div className="rounded-xl border border-dashed border-dark-700 p-8 text-center">
						<p className="text-dark-400">
							Сейчас нет контактов.
						</p>

						<p className="mt-1 text-sm text-dark-500">
							Нажмите «Добавить контакт».
						</p>
					</div>
				) : (
					<div className="space-y-4">
						{contacts.map((contact, index) => (
							<ContactItem
								key={index}
								contact={contact}
								onEdit={() => handleEdit(contact, index)}
								onDelete={() => handleDelete(index)}
							/>
						))}
					</div>
				)}

			</Card>
			<ContactModal
				isOpen={isModalOpen}
				contact={editingContact}
				onClose={handleClose}
				onSave={handleSave}
			/>
		</>

	)
}