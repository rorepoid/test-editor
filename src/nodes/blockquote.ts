import type { DOMOutputSpec, NodeSpec } from "prosemirror-model";

const blockquoteDOM: DOMOutputSpec = ["blockquote", "paragraph"];

export const blockquote = {
	content: "block+",
	parseDOM: [{ tag: "blockquote" }],
	toDOM() {
		return blockquoteDOM;
	},
} as NodeSpec;
