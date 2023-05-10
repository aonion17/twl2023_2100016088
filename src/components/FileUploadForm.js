import React, { useState } from 'react';
import axios from 'axios';

function FileUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadError('File belum dipilih.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const response = await axios.post('https://pie.dev/post', formData, {
      });
  
      if (response.status === 200) {
        setUploadSuccess(true);
        setUploadError(null);
      }
    } catch (error) {
      console.error(error);
      setUploadError('File gagal diunggah.');
    }
  };
  

  return (
    <div className='container'>
      <div className='form'>
      <h2>Formulir Upload Berkas</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileInput} />
        </div>
        <p></p>
        <div className='button-container'>
          <button type="submit">Upload</button>
        </div>
        <div className='upload-container'>
          {uploadSuccess && <p className='success-message'>Upload success!</p>}
          {uploadError && (
            <div style={{ color: 'red' }}>{uploadError}</div>
          )}
        </div>
      </form>
    </div>
    </div>
  );
}

export default FileUploadForm;



