import OrderedMap from "orderedmap";
import {
	Schema,
	type MarkSpec,
	type NodeSpec,
	type SchemaSpec,
} from "prosemirror-model";
// import { addListNodes } from "prosemirror-schema-list";
import { link } from "./marks/link.ts";
import { strong } from "./marks/strong.ts";
import { doc } from "./nodes/doc.ts";
import { heading } from "./nodes/heading.ts";
import { paragraph } from "./nodes/paragraph.ts";
import { text } from "./nodes/text.ts";
import { code_block } from "./nodes/codeblock";
import { figure } from "./nodes/figure.ts";
import { blockquote } from "./nodes/blockquote.ts";

const nodes: OrderedMap<NodeSpec> = OrderedMap.from({
	doc,
	heading,
	paragraph,
	text,
	code_block,
	figure,
	blockquote,
});

const marks: OrderedMap<MarkSpec> = OrderedMap.from({ link, strong });

const spec: SchemaSpec = {
	// nodes: addListNodes(nodes, "paragraph block*", "block"),
	nodes,
	marks: marks,
};

const schema = new Schema(spec);

export { schema };
