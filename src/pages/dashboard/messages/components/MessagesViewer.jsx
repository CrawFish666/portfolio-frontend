import { Mail } from "lucide-react"
import { MessagesHistory } from "./MessagesHistory"
import { MessagesReplyForm } from "./MessagesReplyForm"


export function MessagesViewer({
	selectedMessage,
	statusList,
	onClose,
	replyMessage,
	onReplyChange,
	onReplySubmit,
	sendingReply,
	onStatusChange,
	statusUpdating
}) {

	if (!selectedMessage) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-center p-12">
				<Mail className="h-26 w-26" />
				<p className="text-dark-400">
					Выберите сообщение
				</p>

				<p className="text-sm text-dark-500 mt-2">
					Нажмите на сообщение слева, чтобы открыть его
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-6">

			<div className="flex justify-between items-start">

				<h2 className=" font-semibold text-white">
					<span>Тема:</span>
					<p className="text-dark-400 text-sm">{selectedMessage.subject}</p>
				</h2>

				<button
					onClick={() => onClose(null)}
					className="text-dark-400 hover:text-white	cursor-pointer">
					Закрыть
				</button>

			</div>

			<div className="grid grid-cols-2">
				<div>
					<span className=" text-white">Имя:</span>
					<p className="text-dark-400 text-sm">{selectedMessage.name}</p>
				</div>
				<div>
					<span className=" text-white">Почта:</span>
					<p className="text-dark-400 text-sm">{selectedMessage.email}</p>
				</div>
			</div>

			<div className="grid grid-cols-2">
				<div>
					<span className=" text-white">IP:</span>
					<p className="text-dark-400 text-sm">{selectedMessage.ip}</p>
				</div>
				<div>
					<span className=" text-white">Дата:</span>
					<p className="text-dark-400 text-sm">{new Date(
						selectedMessage.createdAt).toLocaleString("ru-RU")}
					</p>
				</div>
			</div>

			<div className="flex flex-wrap gap-2">
				{statusList.filter((item) => item.value !== 'all').map((item) =>
				(<button
					key={item.value}
					disabled={statusUpdating || selectedMessage.status === item.value}
					onClick={() => onStatusChange(item.value)}
					className={`px-3 py-2 rounded-lg text-sm transition 
					${selectedMessage.status === item.value ? 'bg-accent-500 text-white cursor-default'
							: 'bg-dark-700 text-dark-300 hover:bg-dark-600 cursor-pointer'}`} >
					{item.label}
				</button>))
				}
			</div>

			<div>
				<p>Сообщение:</p>
				<div className="bg-dark-800 rounded-xl p-4 whitespace-pre-wrap break-all overflow-hidden overflow-y-auto max-h-[500px]">
					{selectedMessage.message}
				</div>
			</div>

			<MessagesReplyForm
				replyMessage={replyMessage}
				onReplyChange={onReplyChange}
				onReplySubmit={onReplySubmit}
				sendingReply={sendingReply}
			/>

			<MessagesHistory
				replies={selectedMessage.replies} />

		</div>
	)
}