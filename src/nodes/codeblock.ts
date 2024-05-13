import type { NodeSpec, DOMOutputSpec } from "prosemirror-model";

const preDOM: DOMOutputSpec = ["pre", ["code", 0]];

export const code_block = {
	content: "text*",
	marks: "",
	group: "block",
	code: true,
	defining: true,
	parseDOM: [{ tag: "pre", preserveWhitespace: "full" }],
	toDOM() {
		return preDOM;
	},
} as NodeSpec;
