import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { schema } from "./schema.ts";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { DOMParser } from "prosemirror-model";
import { content } from "./content";
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
	],
});
const view = new EditorView(prosemirrorEditor, {
	state,
	dispatchTransaction(transaction) {
		if (transaction.docChanged) {
			try {
				const appliedChanges = debugBar.querySelector(
					"#applied-changes",
				) as Element;
				appliedChanges.innerHTML = "";

				for (const step of transaction.steps) {
					for (const content of step.toJSON().slice?.content ?? []) {
						appliedChanges.innerHTML += `<p>${JSON.stringify(content, null, 2)}</p>`;
						console.log(appliedChanges.innerHTML);
					}
				}
			} catch (error) {
				console.error(error);
			}
		}

		if (transaction.docChanged && debugBeforeChange.checked) {
			// biome-ignore lint/suspicious/noDebugger: <explanation>
			debugger;
		}

		const transactionSelection = debugBar.querySelector(
			"#transaction-selection",
		) as Element;
		transactionSelection.innerHTML = `<pre>${JSON.stringify(transaction.selection.toJSON(), null, 2)}</pre>`;
		view.updateState(view.state.apply(transaction));

		if (transaction.docChanged && debugAfterChange.checked) {
			// biome-ignore lint/suspicious/noDebugger: <explanation>
			debugger;
		}
	},
});
