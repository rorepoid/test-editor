import type { DOMOutputSpec, MarkSpec } from "prosemirror-model";

const emDOM: DOMOutputSpec = ["em", 0];

export const em = {
	parseDOM: [
		{ tag: "i" },
		{ tag: "em" },
		{ style: "font-style=italic" },
		{ style: "font-style=normal", clearMark: (m) => m.type.name === "em" },
	],
	toDOM() {
		return emDOM;
	},
} as MarkSpec;
