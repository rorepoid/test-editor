export const link = {
	attrs: {
		href: {},
		title: {
			default: null,
		},
	},
	inclusive: false,
	parseDOM: [
		{
			tag: "a[href]",
		},
	],
};
