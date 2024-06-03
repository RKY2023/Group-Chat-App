import React, { useState } from 'react'
import classes from './FileUpload.module.css';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUploadHandler = () => {
    const formData = new FormData();

    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name
    );
    console.log(selectedFile);


  }

  return (
    <div>
      {/* <h1>GeeksforGeeks</h1>
      <h3>File Upload using React!</h3>
      <div>
          <input
              type="file"
              onChange={onFileChangeHandler}
          />
          <button onClick={onFileUploadHandler}>
              Upload!
          </button>
      </div> */}
      <div className={classes['file-upload']}>
        <img src='' alt="upload" />
        <h3> {"Click box to upload"}</h3>
        <p>Maximun file size 10mb</p>
        <input type="file" onChange={onFileChangeHandler} />
      </div>
      {/* {this.fileData()} */}
    </div>
  )
}

export default FileUpload;