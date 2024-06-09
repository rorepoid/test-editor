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

						const $nodeContainer = document.createElement("div");
						$nodeContainer.classList.add("node-container");

						const $node = document.createElement("div");
						$node.classList.add("node");

						$node.innerHTML += `<strong>${content.type}</strong>`;
						$nodeContainer.appendChild($node);

						if (content.text) {
							$node.innerHTML += `"${content.text}"`;
						} else if (content.content) {
							const $boxContainer = document.createElement("div");
							$boxContainer.classList.add("box-container");
							for (const node of content.content) {
								const $box = document.createElement("div");
								$box.classList.add("box");
								$box.innerHTML += `"${node.text}"`;
								if (node.marks) {
									for (const mark of node.marks) {
										const $mark = document.createElement("div");
										$mark.classList.add("mark");
										$mark.innerHTML = `<strong>${mark.type}</strong>`;
										$box.appendChild($mark);
									}
								}
								$boxContainer.appendChild($box);
							}
							$node.appendChild($boxContainer);
						}

						appliedChanges.appendChild($nodeContainer);
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
