import OrderedMap from "orderedmap";
import {
	Schema,
	type MarkSpec,
	type NodeSpec,
	type SchemaSpec,
} from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";

const { doc, heading, paragraph, text } = schema.spec.nodes.toObject();
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
