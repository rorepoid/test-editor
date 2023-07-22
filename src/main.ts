import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

const state = EditorState.create({
	schema,
	plugins: [
		history(),
		keymap({ "Mod-z": undo, "Mod-y": redo }),
		keymap(baseKeymap),
	],
});
const view = new EditorView(document.body, {
	state,
	dispatchTransaction(transaction) {
		console.log(transaction);
		view.updateState(view.state.apply(transaction));
	},
});
