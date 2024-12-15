import { Node, mergeAttributes } from "@tiptap/core";

const Figure = Node.create({
  name: "figure",
  group: "block",
  content: "image figcaption",
  parseHTML() {
    return [
      {
        tag: "figure",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["figure", mergeAttributes(HTMLAttributes), 0];
  },
});

export default Figure;
