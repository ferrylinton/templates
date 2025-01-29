import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		root: 'src',
		build: {
			outDir: '../dist/client',
			emptyOutDir: true,
		},
		plugins: [react()],
	};
});
