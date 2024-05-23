import { defineConfig } from 'vite';
import ViteRestart from 'vite-plugin-restart';

export default defineConfig({
    server: {
        hmr: true,
        watch: {
            include: 'src/**/*',
        },
    },
    plugins: [
        ViteRestart({
            restart: ['src/**/*'],
        }),
    ],
});
