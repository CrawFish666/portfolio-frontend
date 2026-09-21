import { Pencil, Trash2 } from "lucide-react";


export function ContactItem({ onDelete, contact, onEdit }) {


	return (
		<div>
			<label>
				{contact.label}
			</label>
			<div className="flex gap-4">
				<input readOnly value={contact.url} className="input-field" />
				<div className="flex gap-2 items-center">
					<button
						type="button"
						className="rounded-lg p-2 text-dark-300 transition	hover:bg-dark-700	hover:text-white"
						onClick={onEdit}>
						<Pencil size={18} />
					</button>
					<button
						type="button"
						className="rounded-lg p-2 text-dark-300 transition	hover:bg-dark-700	hover:text-white"
						onClick={onDelete}>
						<Trash2 size={18} />
					</button>
				</div>
			</div>
		</div>

	);
};