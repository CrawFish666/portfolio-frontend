const Card = ({
	title,
	description,
	children,
	className = "",
	actions
}) => {
	return (
		<div
			className={`glass-card p-6 space-y-5 ${className}`}>
			<div className="mb-6 flex items-start justify-between gap-4">
				<div>
					{title &&
						<h2 className="text-lg font-semibold text-white flex items-center gap-2">
							{title}
						</h2>}

					{description && (
						<p className="text-sm text-dark-400 mt-1">
							{description}
						</p>
					)}
				</div>
				{actions && (
					<div className="primary-button">
						{actions}
					</div>
				)}
			</div>
			{children}
		</div>

	);
};

export default Card;