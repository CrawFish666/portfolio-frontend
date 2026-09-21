import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

export function TechnologySelect({
	technologies = [],
	value = [],
	onChange,
}) {

	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const wrapperRef = useRef(null);

	// закрытие при клике вне компонента
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(e.target)
			) {
				setIsOpen(false);
				setSearch("")
			}
		};

		document.addEventListener(
			"mousedown",
			handleClickOutside
		);

		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside
			);
		};

	}, []);

	const selectedTechnologies = technologies.filter(
		tech => value.includes(tech._id)
	);

	const filteredTechnologies = technologies.filter(
		tech =>
			tech.name
				.toLowerCase()
				.includes(search.toLowerCase())
	);

	const handleSelect = (id) => {
		if (value.includes(id)) {
			return;
		}

		onChange([
			...value,
			id
		]);

		setSearch("");
	};

	const toggleTechnology = (id) => {
		const exists = value.includes(id);
		if (exists) {
			onChange(
				value.filter(item => item !== id)
			);
		} else {
			onChange([
				...value,
				id
			]);
		}
	};


	const handleRemove = (id) => {

		onChange(
			value.filter(
				item => item !== id
			)
		);

	};


	return (

		<div
			ref={wrapperRef}
			className="relative"
		>

			<div
				className="
					min-h-11
					w-full
					rounded-xl
					bg-dark-800
					border
					border-dark-700
					flex
					flex-wrap
					items-center
					gap-2
					p-2
					cursor-text
				"
				onClick={() => setIsOpen(true)}
			>


				{
					selectedTechnologies.map(tech => (

						<div
							key={tech._id}
							className="
								flex
								items-center
								gap-1
								bg-primary/20
								text-primary
								px-2
								py-1
								rounded-full
								text-sm
							"
						>

							<span>
								{tech.name}
							</span>


							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									handleRemove(tech._id);
								}}
							>

								<X
									className="
										w-3
										h-3
									"
								/>

							</button>


						</div>

					))
				}


				<input
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setIsOpen(true);
					}}
					placeholder={
						selectedTechnologies.length
							? ""
							: "Выберите технологии..."
					}
					className="
						flex-1
						bg-transparent
						outline-none
						text-white
						min-w-[120px]
					"
				/>

			</div>



			{
				isOpen && (

					<div
						className="
							absolute
							z-50
							mt-2
							w-full
							max-h-60
							overflow-y-auto
							bg-dark-900
							border
							border-white/10
							rounded-xl
							shadow-xl
						"
					>

						{
							filteredTechnologies.length === 0 ? (

								<div className="
									p-3
									text-dark-400
									text-sm
								">
									Ничего не найдено
								</div>

							) : (

								filteredTechnologies.map(tech => (

									<button
										key={tech._id}
										type="button"
										onClick={() =>
											toggleTechnology(tech._id)
										}
										className="
											w-full
											text-left
											px-3
											py-2
											hover:bg-white/5
											text-white
											flex
											justify-between
										"
									>

										<span>
											{tech.name}
										</span>


										{
											value.includes(tech._id) && (
												<span className="
													text-primary
													text-xs
												">
													Выбрано
												</span>
											)
										}

									</button>

								))

							)
						}

					</div>

				)
			}


		</div>

	);
}