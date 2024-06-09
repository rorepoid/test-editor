import { Plugin, type Transaction } from "prosemirror-state";

class TransactionDispatcher {
	dispatch(
		transaction: Transaction,
		debugBar: Element,
		debugBeforeChange: boolean,
		debugAfterChange: boolean,
	) {
		this.updateDebugBar(transaction, debugBar);

		if (transaction.docChanged && debugBeforeChange) {
			// biome-ignore lint/suspicious/noDebugger: <explanation>
			debugger;
		}

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

			if (transaction.docChanged) {
				const appliedChanges = debugBar.querySelector(
					"#applied-changes",
				) as Element;

				appliedChanges.innerHTML = "";

				for (const step of transaction.steps) {
					for (const content of step.toJSON().slice.content ?? []) {
						console.log(content);
						// debugger;

						const box = document.createElement("div");
						// box.style.backgroundColor = "rgb(85, 85, 187)";
						box.style.backgroundColor = "rgb(119, 119, 238)";
						box.style.overflow = "auto";

						const div = document.createElement("div");
						div.style.backgroundColor = "rgb(119, 119, 238)";
						div.innerHTML = `<strong>${content.type}</strong>`;
						if (content.text) {
							div.innerHTML += `"${content.text}"`;
						} else if (content.content) {
							for (const node of content.content) {
								div.innerHTML += `<br />tyyyyyype: ${node.type}`;
								div.innerHTML += `<br />"${node.text}"`;
								if (node.marks) {
									for (const mark of node.marks) {
										const $mark = document.createElement("div");
										$mark.style.backgroundColor = "rgb(221, 153, 68)";
										$mark.innerHTML = `<strong>${mark.type}</strong>`;
										div.appendChild($mark);
									}
								}
							}
						}

						box.appendChild(div);
						appliedChanges.appendChild(box);
					}
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
}

const debugBarPlugin = (
	debugBar: Element,
	debugBeforeChange: HTMLInputElement,
	debugAfterChange: HTMLInputElement,
) => {
	return new Plugin({
		props: {
			handleTextInput: (view, fromPos, toPos, text) => {
				new TransactionDispatcher().dispatch(
					view.state.tr.insertText(text, fromPos, toPos),
					debugBar,
					debugBeforeChange.checked,
					debugAfterChange.checked,
				);
				console.log("handleTextInput", { fromPos, toPos, text });
				return false;
			},
			handlePaste: (view, _event, slice) => {
				new TransactionDispatcher().dispatch(
					view.state.tr.replaceSelection(slice),
					debugBar,
					debugBeforeChange.checked,
					debugAfterChange.checked,
				);
				return false;
			},
		},
	});
};

export { debugBarPlugin };
