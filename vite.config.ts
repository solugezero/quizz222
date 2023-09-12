import path from "path";
import { defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import generateSitemap from "vite-ssg-sitemap";
import Layouts from "vite-plugin-vue-layouts";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import Inspect from "vite-plugin-inspect";
import Unocss from "unocss/vite";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig(({ mode }) => {
	console.log('ENV_MODE: ', mode)
	return {
		resolve: {
			alias: {
				"~/": `${path.resolve(__dirname, "src")}/`,
			},
		},

		plugins: [
			Vue({
				include: [/\.vue$/],
				reactivityTransform: true,
			}),

			Pages({
				extensions: ["vue"],
				exclude:
					mode === "development" || mode === "stage"
						? []
						: ['**/dev/*.vue'],
			}),
			Layouts({
				layoutsDirs: 'src/layouts',
				defaultLayout: 'default'
			  }),
			AutoImport({
				imports: [
					"vue",
					"vue-router",
					"vue-i18n",
					"vue/macros",
					"@vueuse/head",
					"@vueuse/core",
					"pinia",
					{
						axios: [["default", "axios"]],
					},
				],
				resolvers: [ElementPlusResolver()],
				dts: "src/auto-imports.d.ts",
				dirs: ["src/composables", "src/store/**", "src/hooks/**", "src/keys/**"],
				vueTemplate: true,
			}),

			Components({
				extensions: ["vue"],
				include: [/\.vue$/, /\.vue\?vue/],
				resolvers: [ElementPlusResolver()],
				dts: "src/components.d.ts",
				deep: true,
				directoryAsNamespace: true,
			}),

			Unocss(),

			VueI18n({
				runtimeOnly: true,
				compositionOnly: true,
				include: [path.resolve(__dirname, "locales/**")],
			}),

			Inspect(),
		],

		ssr: {
			// SSG Vue-i18n workaround
			noExternal: [/vue-i18n/],
		},

		ssgOptions: {
			script: "async",
			formatting: "minify",
			onFinished() {
				generateSitemap();
			},
		},
	}
});
