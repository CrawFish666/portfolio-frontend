import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../api/queryClient";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function QueryProvider({ children }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}