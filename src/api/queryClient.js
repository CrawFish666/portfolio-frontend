import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60_000,
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
	mutationCache: new MutationCache({
		onError: (error, variables, context, mutation) => {
			// Опция для конкретной мутации отказаться от глобального тоста
			// и показать ошибку по-своему (например, в форме, а не тостом):
			// useMutation({ ..., meta: { skipGlobalErrorToast: true } })
			if (mutation.options.meta?.skipGlobalErrorToast) return;
			// Если есть fieldErrors — это ошибка вида "занят slug"/валидация,
			// её должна показать сама форма рядом с полем, а не общий тост.
			if (error.fieldErrors) return;
			toast.error(error.message || "Что-то пошло не так");
		},
	}),
	queryCache: new QueryCache({
		onError: (error, query) => {
			// Тост только если данных вообще нет (первая загрузка упала) —
			// иначе будет спамить при каждом неудачном фоновом рефетче
			// уже отображённого списка.
			if (query.state.data !== undefined) return;
			if (query.meta?.skipGlobalErrorToast) return;
			toast.error(error.message || "Не удалось загрузить данные");
		},
	}),
});