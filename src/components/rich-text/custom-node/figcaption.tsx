import { Node, mergeAttributes } from "@tiptap/core";

const Figcaption = Node.create({
  name: "figcaption",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "figcaption",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["figcaption", mergeAttributes(HTMLAttributes), 0];
  },
});

export default Figcaption;
