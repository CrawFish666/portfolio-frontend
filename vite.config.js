import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
	plugins: [react(), tailwindcss()],

	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/tests/setupTests.js",
	},

	server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
			},
		},
	},

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});