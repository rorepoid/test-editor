import type { DOMOutputSpec, MarkSpec } from "prosemirror-model";

const codeDOM: DOMOutputSpec = ["code", 0];

export const code = {
	parseDOM: [{ tag: "code" }],
	toDOM() {
		return codeDOM;
	},
} as MarkSpec;
