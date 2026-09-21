import { Calendar, Trash2 } from "lucide-react";


export function MessagesItem({
	message,
	selectedMessage,
	onOpenMessage,
	onDeleteMessage,
	statusLabels
}) {

	return (
		<div onClick={() => onOpenMessage(message._id)}
			className={`border rounded-2xl p-3 cursor-pointer transition ${selectedMessage?._id === message._id
				? "border-accent-500 bg-accent-500/10"
				:
				"border-dark-700 hover:border-dark-500"}`}>
			<div className="flex justify-between items-center gap-2 mb-2">
				<span className="font-medium text-white">
					Имя: {message.name}
				</span>
				<button onClick={
					(e) => {
						e.stopPropagation();
						onDeleteMessage(message._id)
					}
				} className="cursor-pointer p-1 rounded hover:bg-red-500/20 hover:text-red-400">
					<Trash2 className="w-5 h-5" />
				</button>
			</div>

			<p className="text-sm text-dark-400 truncate">
				Тема: {message.subject}
			</p>

			<div className="flex justify-between items-center gap-2">
				<p className="text-xs text-dark-500 mt-2 flex gap-2 items-center">
					<Calendar className="w-4 h-4" />
					{new Date(message.createdAt).toLocaleString("ru-RU")}
				</p>

				<span className="text-xs text-dark-400">
					{statusLabels[message.status]}
				</span>
			</div>
		</div>
	)
}