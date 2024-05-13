import type { NodeSpec } from "prosemirror-model";

export const paragraph = {
	content: "inline*",
	group: "block",
	parseDOM: [
		{
			tag: "p",
		},
	],
	toDOM(_node) {
		return ["p", 0];
	},
} as NodeSpec;
