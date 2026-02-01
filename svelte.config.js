//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),

		paths: {
			base: dev ? '' : '/StudentHelper',
			assets: dev ? '' : 'https://cljnilsson.github.io/StudentHelper'
		}
	}
};

export default config;
