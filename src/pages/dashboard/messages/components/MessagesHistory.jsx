

export function MessagesHistory({
	replies = []
}) {

	if (!replies.length) {
		return null;
	}

	return (
		<div className="space-y-3">
			<p className="text-white">История ответов</p>
			{replies.map((reply, index) => (
				<details key={index} className="bg-dark-800 rounded-xl p-4">
					<summary className="cursor-pointer text-white"> Ответ #{index + 1} · {new Date(reply.sentAt).toLocaleString("ru-RU")}
					</summary>
					<div className="mt-3 text-dark-300 whitespace-pre-wrap break-words"> {reply.message}
					</div>
				</details>))}
		</div>

	)
}