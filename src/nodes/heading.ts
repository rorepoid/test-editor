import type { NodeSpec } from "prosemirror-model";

export const heading = {
	attrs: {
		level: {
			default: 4,
		},
	},
	content: "inline*",
	group: "block",
	defining: true,
	parseDOM: [
		{
			tag: "h3",
			attrs: {
				level: 3,
			},
		},
		{
			tag: "h4",
			attrs: {
				level: 4,
			},
		},
		{
			tag: "h5",
			attrs: {
				level: 5,
			},
		},
		{
			tag: "h6",
			attrs: {
				level: 6,
			},
		},
	],
	toDOM(node) {
		return [`h${node.attrs.level}`, 0];
	},
} as NodeSpec;
