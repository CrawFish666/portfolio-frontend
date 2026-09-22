// Нужно добавить аккордион, а то большая портянка
// В technologymodal добавить схему валидации из БД
// Создать service для api

import { useForm, } from "react-hook-form";
import { Pencil, Trash, Trash2 } from "lucide-react";
import { CategoryModal } from "./components/CategoryModal";
import { TechnologyModal } from "./components/TechnologyModal";
import { useCategories } from "../../../hooks/queries/useCategories";
import { useAdminTechnologies } from "../../../hooks/queries/useTechnologies";
import { useCategoryMutations } from "../../../hooks/mutations/useCategoryMutations";
import { useTechnologyMutations } from "../../../hooks/mutations/useTechnologyMutations";
import { useMemo, useState } from "react";

export function TechnologiesPage() {

	const {
		data: categoriesData = [],
		isLoading: categoriesLoading,
		isError: categoriesError,
	} = useCategories();

	const {
		data: technologies = [],
		isLoading: technologiesLoading,
		isError: technologiesError,
	} = useAdminTechnologies();

	const categories = useMemo(() => {
		return categoriesData.map((category) => ({
			...category,
			technologies: technologies.filter(
				(technology) =>
					technology.category?._id === category._id
			),
		}));
	}, [categoriesData, technologies]);

	const {
		createCategory,
		updateCategory,
		deleteCategory,
	} = useCategoryMutations();

	const {
		createTechnology,
		updateTechnology,
		deleteTechnology,
	} = useTechnologyMutations();

	const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState(null);

	const [isTechstackModalOpen, setTechstackModalOpen] = useState(false);
	const [editingTechstack, setEditingTechstack] = useState(null);
	const [selectedCategoryForTech, setSelectedCategoryForTech] = useState(null);

	const handleCreateCategory = () => {
		handleCloseTechnology()
		setEditingCategory(null);
		setCategoryModalOpen(true);
	};

	const handleEditCategory = (category) => {
		setEditingCategory(category);
		setCategoryModalOpen(true);
	};

	const handleCloseCategory = () => {
		setEditingCategory(null);
		setCategoryModalOpen(false);
	};

	const handleCategorySubmit = async (data) => {
		if (editingCategory) {
			await updateCategory.mutateAsync({
				id: editingCategory._id,
				data,
			});
		} else {
			await createCategory.mutateAsync(data);
		}

		handleCloseCategory();
	};

	const handleDeleteCategory = async (category) => {
		const confirmed = window.confirm(
			`Удалить категорию "${category.name}"?`
		);

		if (!confirmed) {
			return;
		}

		await deleteCategory.mutateAsync(category._id);
	};



	const handleCreateTechnology = (category) => {
		handleCloseCategory();
		setEditingTechstack(null);
		setSelectedCategoryForTech(category);
		setTechstackModalOpen(true);
	}

	const handleEditTechnology = (technology) => {
		setSelectedCategoryForTech(null);
		setEditingTechstack(technology);
		setTechstackModalOpen(true);
	}

	const handleCloseTechnology = () => {
		setEditingTechstack(null);
		setSelectedCategoryForTech(null);
		setTechstackModalOpen(false);
	}

	const handleTechnologySubmit = async (data) => {
		if (editingTechstack) {
			await updateTechnology.mutateAsync({
				id: editingTechstack._id,
				data,
			});
		} else {
			await createTechnology.mutateAsync(data);
		}

		handleCloseTechnology();
	};

	const handleDeleteTechnology = async (technology) => {
		const confirmed = window.confirm(
			`Удалить технологию "${technology.name}"?`
		);

		if (!confirmed) {
			return;
		}

		await deleteTechnology.mutateAsync(technology._id);
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			name: '',
			slug: '',
			color: '#64748B',
			icon: '',
			order: 0,
			isActive: true,
		},
	})

	return (
		<div>
			<div className="flex justify-between gap-5 items-center">
				<div>
					<h1 className="text-2xl font-bold text-white mb-1">Категории и тех. стек</h1>
					<p className="text-dark-400 mb-6">Управление категориями и тех. стеком.</p>
				</div>
				<button className="primary-button cursor-pointer" onClick={handleCreateCategory}>+ Добавить категорию</button>
			</div>
			<div className="flex flex-col gap-4">
				{categories.length === 0 ? (<div className="glass rounded-2xl p-8 border border-white/5 text-center">
					<p className="text-dark-400">Пока что нет категорий... Добавьте первую</p>
				</div>) : (
					<div className="space-y-4">
						{categories.map((category) => (
							<div key={category._id} className="glass rounded-2xl border border-white/5 p-5">
								{/** Заголовок */}
								<div className="flex gap-3 items-center border-b-1 border-white pb-5 mb-5">
									<div
										className="w-4 h-4 rounded"
										style={{ backgroundColor: category?.color }}
									/>
									<h2 className="text-lg font-semibold text-white">{category.name}</h2>
									<span className="grow">
										{category.technologies.length} шт.
									</span>
									<div className="flex items-center gap-4">
										<button onClick={() => handleCreateTechnology(category)} className="glass-button">Добавить технологию</button>
										<button className="cursor-pointer" onClick={() => handleEditCategory(category)} type="button"><Pencil className="w-6 h-6" /></button>
										<button className="cursor-pointer" onClick={() => handleDeleteCategory(category)} type="button"><Trash2 className="w-6 h-6" /></button>
									</div>
								</div>
								{category.technologies.length === 0 ? (
									<p className="text-dark-400 text-sm">У категории нет тех. стека</p>
								)
									:
									<table className="w-full table-fixed">
										<thead className="">
											<tr className="border-b border-white/10">
												<th className="text-left pb-3 font-medium text-dark-300 w-[20%]">Название</th>
												<th className="text-left pb-3 font-medium text-dark-300 w-[20%]">Slug</th>
												<th className="text-left pb-3 font-medium text-dark-300 w-[20%]">Иконка</th>
												<th className="text-left pb-3 font-medium text-dark-300 w-[20%]">Website</th>
												<th className="text-left pb-3 font-medium text-dark-300 w-[20%] text-right">Действия</th>
											</tr>
										</thead>
										<tbody>
											{category.technologies.map((tech) => (
												<tr key={tech._id}>
													<td className="py-3 text-white">{tech.name}</td>
													<td className="py-3 text-dark-400 font-mono text-sm">{tech.slug}</td>
													<td className="py-3 text-white">{tech.icon ? tech.icon : "Отсутствует"}</td>
													<td>
														{tech.website ? (
															<a> Ссылка </a>
														)
															:
															<span className="text-dark-400 text-sm">Отсутствует</span>
														}
													</td>
													<td className="py-3">
														<div className="flex justify-end items-center gap-3">
															<button
																className="cursor-pointer text-dark-300 hover:text-white transition"
																onClick={() => handleEditTechnology(tech)}
																type="button"
															>
																<Pencil className="w-5 h-5" />
															</button>

															<button
																className="cursor-pointer text-dark-300 hover:text-red-400 transition"
																onClick={() => handleDeleteTechnology(tech)}
																type="button"
															>
																<Trash2 className="w-5 h-5" />
															</button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								}
							</div>
						))}
					</div>
				)}
			</div>
			<CategoryModal
				isOpen={isCategoryModalOpen}
				category={editingCategory}
				onClose={handleCloseCategory}
				onSave={handleCategorySubmit}
			/>
			<TechnologyModal
				isOpen={isTechstackModalOpen}
				technology={editingTechstack}
				onClose={handleCloseTechnology}
				onSave={handleTechnologySubmit}
				categories={categories}
				selectedCategory={selectedCategoryForTech}
			/>
		</div>
	)
}