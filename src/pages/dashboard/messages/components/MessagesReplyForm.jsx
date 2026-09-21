

export function MessagesReplyForm({
	replyMessage,
	onReplyChange,
	onReplySubmit,
	sendingReply
}) {
	return (
		<div className="space-y-3">
			<p className="text-white">Ответить:</p>
			<textarea value={replyMessage}
				onChange={(e) => onReplyChange(e.target.value)}
				placeholder="Введите ответ пользователю..."
				className="input-field min-h-[140px] resize-none" />
			<div className="flex justify-end">
				<button onClick={onReplySubmit}
					disabled={sendingReply || !replyMessage.trim()}
					className=" primary-button px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed " >
					{sendingReply ? "Отправка..." : "Отправить ответ"}
				</button>
			</div>
		</div>
	)
}