

export function MessagesPagination({
	getPageNumbers,
	onPageChange,
	page,
	pages,
	show
}) {

	if (!show) {
		return null;
	}

	return (
		<div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
			<button
				disabled={page === 1}
				onClick={() => onPageChange(page - 1)}
				className="px-3 py-2 rounded-lg bg-dark-700 text-white 
								transition enabled:hover:bg-dark-600 enabled:cursor-pointer 
								disabled:opacity-50 disabled:cursor-not-allowed">
				Назад
			</button>

			{getPageNumbers().map((item, index) =>
				item === "..." ? (
					<span key={index} className="px-2 text-dark-400">
						...
					</span>
				) : (
					<button
						type="button"
						key={item}
						onClick={() => onPageChange(item)}
						className={
							page === item
								? "px-3 py-2 rounded-lg bg-accent-500 text-white min-w-[40px] cursor-default"
								:
								"px-3 py-2 rounded-lg bg-dark-700 text-white hover:bg-dark-600 min-w-[40px] cursor-pointer transition"
						}>
						{item}
					</button>
				)
			)}

			<button
				disabled={page === pages}
				onClick={() => onPageChange(page + 1)}
				className="px-3 py-2 rounded-lg bg-dark-700 text-white 
								transition	enabled:hover:bg-dark-600 enabled:cursor-pointer 
								disabled:opacity-50	disabled:cursor-not-allowed">
				Вперёд
			</button>
		</div>
	)
}