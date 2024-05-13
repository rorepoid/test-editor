import type { DOMOutputSpec, MarkSpec } from "prosemirror-model";

const strongDOM: DOMOutputSpec = ["strong", 0];

export const strong = {
	parseDOM: [
		{ tag: "strong" },
		// This works around a Google Docs misbehavior where
		// pasted content will be inexplicably wrapped in `<b>`
		// tags with a font-weight normal.
		{
			tag: "b",
			getAttrs: (node: HTMLElement) =>
				node.style.fontWeight !== "normal" && null,
		},
		{ style: "font-weight=400", clearMark: (m) => m.type.name === "strong" },
		{
			style: "font-weight",
			getAttrs: (value: string) =>
				/^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
		},
	],
	toDOM() {
		return strongDOM;
	},
} as MarkSpec;
