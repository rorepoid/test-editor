import type { Transaction } from "prosemirror-state";
import type { EditorView } from "prosemirror-view";

class TransactionDispatcher {
	dispatch(
		transaction: Transaction,
		view: EditorView,
		debugBar: Element,
		debugBeforeChange: boolean,
		debugAfterChange: boolean,
	) {
		if (transaction.docChanged) {
			this.updateDebugBar(transaction, debugBar);
		}

		if (transaction.docChanged && debugBeforeChange) {
			// biome-ignore lint/suspicious/noDebugger: <explanation>
			debugger;
		}

		view.updateState(view.state.apply(transaction));

		if (transaction.docChanged && debugAfterChange) {
			// biome-ignore lint/suspicious/noDebugger: <explanation>
			debugger;
		}
	}

	private updateDebugBar(transaction: Transaction, debugBar: Element) {
		try {
			const transactionSelection = debugBar.querySelector(
				"#transaction-selection",
			) as Element;
			transactionSelection.innerHTML = `<pre>${JSON.stringify(transaction.selection.toJSON(), null, 2)}</pre>`;

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
}

export default TransactionDispatcher;
