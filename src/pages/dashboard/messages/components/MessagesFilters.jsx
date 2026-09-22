export function MessagesFilters({
	status,
	statusList,
	onStatusChange,
}) {
	return (
		<div className="flex gap-2 flex-wrap mb-4">
			{statusList.map((item) => (
				<button
					key={item.value}
					type="button"
					onClick={() => onStatusChange(item.value)}
					className={`px-3 py-1 rounded-lg text-sm transition ${status === item.value
							? "bg-accent-500 text-white cursor-default"
							: "bg-dark-700 text-dark-300 hover:bg-dark-600 cursor-pointer"
						}`}
				>
					{item.label}
				</button>
			))}
		</div>
	);
}