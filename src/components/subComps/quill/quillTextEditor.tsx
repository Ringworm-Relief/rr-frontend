import "./quillTextEditor.css";
import { useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const [value, setValue] = useState("");
  
  return (
    <div className="wrapper">
      <label className="label">Editor Content</label>
      <QuillEditor
        className="editor"
        theme="snow"
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  )
};

export default Editor;