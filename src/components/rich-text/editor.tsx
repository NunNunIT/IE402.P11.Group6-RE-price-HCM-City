"use client";

// import libs
// import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
// import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
// import { TextSelection } from "prosemirror-state";

// import parts
import EditorToolbar from "./toolbar/editor-toolbar";
import Figcaption from "./custom-node/figcaption";
import Figure from "./custom-node/figure";
import CustomLink from "./custom-node/link";

// import styles
import "./editor.css";

interface EditorProps {
  content: string;
  onChange: (__value: string) => void;
}

const Editor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Placeholder.configure({
        placeholder: "Nhập nội dung",
      }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
      CustomLink,
      Image.extend({
        addNodeView() {
          return ({ node }) => {
            const dom = document.createElement("div");
            dom.style.width = "fit-content";
            dom.style.border = "1px solid #e5e7eb";
            dom.style.marginBottom = "0.5rem";
            dom.style.marginTop = "1rem";

            // Create image element
            const img = document.createElement("img");
            img.setAttribute("src", node.attrs.src);
            img.style.cursor = "pointer";

            img.addEventListener("click", async () => {
              try {
                const src = node.attrs.src;
                let url = src;

                // Check if URL is a data URL and convert to blob if needed
                if (src.startsWith("data:")) {
                  const response = await fetch(src);
                  const blob = await response.blob();
                  url = URL.createObjectURL(blob);
                }

                // Open image in a new tab
                const link = document.createElement("a");
                link.href = url;
                link.target = "_blank";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Revoke object URL if it was created
                if (src.startsWith("data:")) {
                  URL.revokeObjectURL(url);
                }
              } catch (error) {
                console.error("Error fetching image for Blob:", error);
              }
            });

            // Append image to the DOM
            dom.appendChild(img);

            return {
              dom,
              update: (updatedNode) => {
                if (updatedNode.type.name === "image" && updatedNode.attrs.src !== node.attrs.src) {
                  img.setAttribute("src", updatedNode.attrs.src);
                  return true;
                }
                return false;
              },
            };
          };
        },
      }),
      Figure,
      Figcaption,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return <></>;

  return (
    <div className="prose max-w-none w-full border dark:border-zinc-800 rounded-md border-input bg-background dark:prose-invert overflow-hidden">
      <EditorToolbar editor={editor} />
      <div className="editor min-h-64 max-h-[500px] dark:bg-zinc-800">
        <EditorContent editor={editor} className="dark:text-zinc-200" />
      </div>
    </div>
  );
};

export default Editor;
