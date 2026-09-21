import { MessagesItem } from "./MessagesItem"


export function MessagesList({
	messages,
	selectedMessage,
	loading,
	onOpenMessage,
	onDeleteMessage,
	statusLabels
}) {

	if (loading) {
		return (
			<div className="py-10 text-center text-dark-400">
				Загрузка сообщений...
			</div>
		)
	}

	if (!messages.length) {
		return (
			<div className="py-10 text-center">
				<p className="text-dark-400">
					Сообщений нет
				</p>

				<p className="text-sm text-dark-500 mt-1">
					Попробуйте изменить фильтр или поиск
				</p>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-4">
			{messages.map(messages => (
				<MessagesItem key={messages._id}
					message={messages}
					selectedMessage={selectedMessage}
					onOpenMessage={onOpenMessage}
					onDeleteMessage={onDeleteMessage}
					statusLabels={statusLabels}
				/>
			))}
		</div>
	)
}