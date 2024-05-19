import type { DOMOutputSpec, NodeSpec } from "prosemirror-model";

export const figure = {
	attrs: {
		src: { default: null },
		alt: { default: null },
	},
	content: "inline*",
	group: "block",
	draggable: true,
	parseDOM: [
		{
			tag: "figure",
			contentElement: "figcaption",
			getAttrs(node) {
				const img = node.querySelector("img");
				if (!img || img.parentElement !== node) {
					return {
						src: "/vite.svg",
						alt: "vite",
					};
				}
				console.log("node", node.outerHTML);
				return {
					src: img.getAttribute("src"),
					alt: img.getAttribute("alt"),
				};
			},
		},
	],
	toDOM(_node) {
		console.log("node", _node);
		return [
			"figure",
			["img", { src: _node.attrs.src }],
			["figcaption", 0],
		] as DOMOutputSpec;
	},
} as NodeSpec;
