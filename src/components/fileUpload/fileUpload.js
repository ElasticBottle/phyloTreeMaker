import React from "react";
import FileUploadStyles from "./fileUpload.module.css";

function FileUpload({ fieldName, setNwkFile, setFieldValue, errors, touched }) {
  const handleChange = (e) => {
    setNwkFile(e.target.files[0]);
    setFieldValue(fieldName, e.target.files[0]);
  };

  return (
    <div className={`${FileUploadStyles.color} mr-4 ml-4`}>
      <div className={FileUploadStyles.files}>
        <label>Upload Your File </label>
        <input
          type="file"
          multiple={false}
          className={
            !!errors[fieldName] && touched[fieldName]
              ? FileUploadStyles.error
              : ""
          }
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default FileUpload;
