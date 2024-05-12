import OrderedMap from "orderedmap";
import {
	Schema,
	type MarkSpec,
	type NodeSpec,
	type SchemaSpec,
} from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { doc } from "./nodes/doc.ts";
import { heading } from "./nodes/heading.ts";
import { paragraph } from "./nodes/paragraph.ts";
import { text } from "./nodes/text.ts";

const nodes: OrderedMap<NodeSpec> = OrderedMap.from({
	doc,
	heading,
	paragraph,
	text,
});

const { link, strong } = schema.spec.marks.toObject();
const marks: OrderedMap<MarkSpec> = OrderedMap.from({ link, strong });

const spec: SchemaSpec = {
	nodes: addListNodes(nodes, "paragraph block*", "block"),
	marks: marks,
};

const customSchema = new Schema(spec);

export { customSchema, schema };
