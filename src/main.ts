import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { schema } from "./schema.ts";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { DOMParser } from "prosemirror-model";
import { content } from "./content";

const prosemirrorContent = document.createElement("div");
const prosemirrorEditor = document.querySelector("#editor");

if (!prosemirrorContent || !prosemirrorEditor) {
	throw new ReferenceError("Editor element not found");
}

prosemirrorContent.innerHTML = content;

const state = EditorState.create({
	doc: DOMParser.fromSchema(schema).parse(prosemirrorContent),
	schema,
	plugins: [
		keymap(baseKeymap),
		keymap({ "Mod-z": undo, "Mod-Z": redo, "Mod-y": redo }),
		history(),
	],
});
const view = new EditorView(prosemirrorEditor, {
	state,
	dispatchTransaction(transaction) {
		// console.log(transaction);
		view.updateState(view.state.apply(transaction));
		console.log(view.state.doc.content);
	},
});

// console.log(view.state.schema.nodes);
