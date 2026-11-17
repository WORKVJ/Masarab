'use client';

import { useRef, useState } from 'react';
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extensions';
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from 'lucide-react';
import { uploadImage } from '@/lib/panelApi';
import { cx } from './ui';

/**
 * Word-processor style editor for blog articles. Produces HTML that the backend cleans (nh3) before saving.
 * The writing area uses the same `.blog-body` styles as the public article page, so what you see is what is published.
 */
export default function RichTextEditor({
  value,
  onChange,
  onError,
}: {
  value: string;
  onChange: (html: string) => void;
  onError: (message: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        code: false,
        codeBlock: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https', HTMLAttributes: { rel: 'noopener noreferrer', target: null } },
      }),
      Image.configure({ HTMLAttributes: { loading: 'lazy' } }),
      Placeholder.configure({ placeholder: 'Start writing your article… Use the toolbar for headings, lists, links and images.' }),
    ],
    content: value,
    editorProps: {
      attributes: { class: 'blog-body min-h-[420px] px-5 py-5 sm:px-8 sm:py-7 focus:outline-none', 'aria-label': 'Article text' },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? '' : editor.getHTML()),
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/25">
      {editor ? <Toolbar editor={editor} onError={onError} /> : <div className="h-[49px] border-b border-slate-200 bg-slate-50" />}
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor, onError }: { editor: Editor; onError: (message: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      underline: e.isActive('underline'),
      strike: e.isActive('strike'),
      bullet: e.isActive('bulletList'),
      ordered: e.isActive('orderedList'),
      quote: e.isActive('blockquote'),
      link: e.isActive('link'),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  const setLink = () => {
    const prev = (editor.getAttributes('link').href as string | undefined) ?? '';
    const url = window.prompt('Link address (https://…)', prev || 'https://');
    if (url === null) return;
    const clean = url.trim();
    if (!clean || clean === 'https://') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    const href = /^(https?:|mailto:|tel:|\/)/i.test(clean) ? clean : `https://${clean}`;
    if (editor.state.selection.empty && !editor.isActive('link')) {
      editor.chain().focus().insertContent({ type: 'text', text: clean, marks: [{ type: 'link', attrs: { href } }] }).run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
    }
  };

  const addImage = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const src = await uploadImage(file);
      const alt = window.prompt('Describe the image in a few words (helps Google and screen readers):', '') ?? '';
      editor.chain().focus().setImage({ src, alt: alt.trim() }).run();
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Could not upload the image.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const c = () => editor.chain().focus();
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50/95 px-2 py-1.5 backdrop-blur" role="toolbar" aria-label="Formatting">
      <Btn label="Heading" on={s.h2} onClick={() => c().toggleHeading({ level: 2 }).run()}>
        <Heading2 />
      </Btn>
      <Btn label="Sub-heading" on={s.h3} onClick={() => c().toggleHeading({ level: 3 }).run()}>
        <Heading3 />
      </Btn>
      <Sep />
      <Btn label="Bold" on={s.bold} onClick={() => c().toggleBold().run()}>
        <Bold />
      </Btn>
      <Btn label="Italic" on={s.italic} onClick={() => c().toggleItalic().run()}>
        <Italic />
      </Btn>
      <Btn label="Underline" on={s.underline} onClick={() => c().toggleUnderline().run()}>
        <Underline />
      </Btn>
      <Btn label="Strikethrough" on={s.strike} onClick={() => c().toggleStrike().run()}>
        <Strikethrough />
      </Btn>
      <Sep />
      <Btn label="Bullet list" on={s.bullet} onClick={() => c().toggleBulletList().run()}>
        <List />
      </Btn>
      <Btn label="Numbered list" on={s.ordered} onClick={() => c().toggleOrderedList().run()}>
        <ListOrdered />
      </Btn>
      <Btn label="Quote" on={s.quote} onClick={() => c().toggleBlockquote().run()}>
        <Quote />
      </Btn>
      <Btn label="Divider line" onClick={() => c().setHorizontalRule().run()}>
        <Minus />
      </Btn>
      <Sep />
      <Btn label={s.link ? 'Edit link' : 'Add link'} on={s.link} onClick={setLink}>
        <Link2 />
      </Btn>
      {s.link && (
        <Btn label="Remove link" onClick={() => c().extendMarkRange('link').unsetLink().run()}>
          <Link2Off />
        </Btn>
      )}
      <Btn label="Insert image" onClick={() => fileRef.current?.click()} disabled={uploading}>
        {uploading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
      </Btn>
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => addImage(e.target.files?.[0])} />
      <span className="ml-auto flex">
        <Btn label="Undo" onClick={() => c().undo().run()} disabled={!s.canUndo}>
          <Undo2 />
        </Btn>
        <Btn label="Redo" onClick={() => c().redo().run()} disabled={!s.canRedo}>
          <Redo2 />
        </Btn>
      </span>
    </div>
  );
}

function Btn({ label, on, disabled, onClick, children }: { label: string; on?: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={on}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} // keep the text selection
      onClick={onClick}
      className={cx(
        'grid h-9 w-9 place-items-center rounded-lg transition-colors disabled:opacity-35 [&>svg]:h-[18px] [&>svg]:w-[18px]',
        on ? 'bg-amber-100 text-amber-900 ring-1 ring-inset ring-amber-300' : 'text-slate-600 hover:bg-white hover:text-slate-900',
      )}
    >
      {children}
    </button>
  );
}

const Sep = () => <span className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />;
