import type { NodeSpec } from "prosemirror-model";

export const image = {
	inline: true,
	attrs: {
		src: {},
		alt: { default: null },
		title: { default: null },
	},
	group: "inline",
	draggable: true,
	parseDOM: [
		{
			tag: "img[src]",
			getAttrs(dom: HTMLElement) {
				return {
					src: dom.getAttribute("src"),
					title: dom.getAttribute("title"),
					alt: dom.getAttribute("alt"),
				};
			},
		},
	],
	toDOM(node) {
		const { src, alt, title } = node.attrs;
		return ["img", { src, alt, title }];
	},
} as NodeSpec;
