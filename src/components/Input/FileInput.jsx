import { useState } from "react";

const FileInput = ({ accept, id, fileHandlenc, text }) => {
  const [fileSelected, setFileSelected] = useState("");
  const onChange = (e) => {
    setFileSelected(e.target.files[0].name);
    fileHandlenc(e.target.files[0]);
  };

  return (
    <div
      className={`text-center bg-transparent rounded border-2 border-solid ${
        fileSelected ? "border-purple-grey" : "border-white"
      }  py-2 px-4 focus:outline-blue focus:bg-white focus:text-purple-grey w-3/6 placeholder:text-purple-grey text-white text-sm m-4`}
    >
      <label className="cursor-pointer " htmlFor={id}>
        {fileSelected ? ` ${fileSelected} Selected ` : `Upload ${text}`}
      </label>
      <input
        onChange={onChange}
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default FileInput;
