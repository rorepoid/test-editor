import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { schema } from "./schema.ts";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { DOMParser } from "prosemirror-model";
import { content } from "./content";
import { debugBarPlugin } from "./plugins/transactionDispatcher.ts";
// import { schema } from "prosemirror-schema-basic";
// import { text } from "./nodes/text";

const prosemirrorContent = document.createElement("div") as Element;
const prosemirrorEditor = document.querySelector("#editor") as Element;
const debugBar = document.querySelector("#debug-bar") as Element;
const debugBeforeChange = document.querySelector(
	"[name='debug-before-change']",
) as HTMLInputElement;
const debugAfterChange = document.querySelector(
	"[name='debug-after-change']",
) as HTMLInputElement;

prosemirrorContent.innerHTML = content;

const state = EditorState.create({
	doc: DOMParser.fromSchema(schema).parse(prosemirrorContent),
	schema,
	plugins: [
		keymap(baseKeymap),
		keymap({ "Mod-z": undo, "Mod-Z": redo, "Mod-y": redo }),
		history(),
		debugBarPlugin(debugBar, debugBeforeChange, debugAfterChange),
	],
});

const view = new EditorView(prosemirrorEditor, {
	state,
	// dispatchTransaction(transaction) {
	// 	const dispatcher = new TransactionDispatcher();
	// 	dispatcher.dispatch(
	// 		transaction,
	// 		view,
	// 		debugBar,
	// 		debugBeforeChange.checked,
	// 		debugAfterChange.checked,
	// 	);
	// },
});
