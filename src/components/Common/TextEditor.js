import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (value) {
      const contentBlock = draftToHtml(value);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
  }, [value]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    // Customize draftToHtml output to remove <p> tags
    const htmlContent = draftToHtml(rawContentState, {}, false, (entity, text) => {
      if (entity.type === 'paragraph') {
        return text.trim() ? `<div>${text}</div>` : '';
      }
      return undefined;
    });

    onChange(htmlContent);
  };

  return (
    <div style={{ direction: "ltr", textAlign: "left" }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorStyle={{
          textAlign: "left",
          direction: "ltr",
          background:'#ffffff',
          border:'1px solid #dee2e6',
          borderRadius:'6px'
        }}
      />
      {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      /> */}
    </div>
  );
};

export default TextEditor;
