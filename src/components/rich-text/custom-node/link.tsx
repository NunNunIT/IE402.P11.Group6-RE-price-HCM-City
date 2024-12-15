import { Node } from "@tiptap/core";

const CustomLink = Node.create({
  name: "customLink",

  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      href: {
        default: null,
      },
      linkTitle: {
        default: "link",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "a[href]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { href, linkTitle } = HTMLAttributes;
    return [
      "a",
      { ...HTMLAttributes, target: "_blank", rel: "noopener noreferrer nofollow", href },
      ["span", { class: "link-title" }, linkTitle || "link"],
      ["span", { class: "temp-url" }, ` (${href})`],
    ];
  },
});

export default CustomLink;
