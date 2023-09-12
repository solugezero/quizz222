import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

export default defineConfig({
	theme: {
		colors: {
			f: {
				white: '#FFFFFF',
				blue: "#0D91EC",
				darkBlue: '#0F7BC6',
				red: "#E9585B",
				green: "#3DC67D",
				lightGreen: "#24FF00",
				yellow: '#FFE600',
				purple: "#8846FF",
				gray: {
					100: "#DBF5FD",
					200: "#DFE6EB",
					250: "#9EA7B3",
					300: "#A0B4C2",
					400: "#6F7F8A",
					500: "#354855",
					600: "#2C3C47",
					700: "#243038",
					800: "#1B252B",
					850: "#171F24",
					900: "#131A1D",
				},
			},
		},
		breakpoints: {
			sm: "576px",
			md: "768px",
			lg: "992px",
			xl: "1200px",
			xxl: "1400px",
			xxxl: "1920px",
		},

		boxShadow: {
			f: "0px 4px 4px rgba(0, 0, 0, 0.25)",
		},
	},
	rules: [
		["h-medium", {height: "48px"}],
		["h-small", {height: "38px"}],
		["h-compact", {height: "28px"}],
		["h-mini", {height: "20px"}],
		["w-medium", {width: "48px"}],
		["w-small", {width: "38px"}],
		["w-compact", {width: "28px"}],
		["w-mini", {width: "20px"}],
		["rounded-medium", {'border-radius': "8px"}],
		["rounded-mini", {'border-radius': "4px"}],
	],
	shortcuts: [
		["trs", "transition duration-300"],
		[
			"btn",
			"bg-f-blue hover:bg-f-blue/80 rounded-8px px-24px py-12px text-white leading-none tracking-[0.54px] font-500 text-14px disabled:bg-f-gray-700 disabled:hover:bg-f-gray-700 disabled:cursor-default disabled:text-f-gray-400 trs",
		],
		[
			"text-medium",
			"text-14px leading-16px"
		],
		[
			"text-mini",
			"text-12px leading-14px"
		],
		[
			"btn-line",
			"border-2 border-f-gray-700 rounded-8px px-22px py-10px text-f-gray-200 leading-none tracking-[0.54px] font-500 text-14px disabled:text-f-gray-500 disabled:cursor-default enabled:hover:border-f-gray-300 trs",
		],
		["btn-line-blue", "btn-line border-f-blue text-f-blue disabled:text-f-blue/50 enabled:hover:border-f-blue/50"],
	],
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			warn: true,
		}),
		presetTypography(),
		presetWebFonts({
			fonts: {
				sans: "Manrope:300,400,500,600,700",
			},
		}),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	safelist: "prose prose-sm m-auto text-left".split(" "),
});
