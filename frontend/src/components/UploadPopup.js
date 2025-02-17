import React, { useState } from "react";

const UploadPopup = ({ onClose, onUpload, subjectId }) => {
  const [newMaterial, setNewMaterial] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const handleFileChange = (event) => {
    setNewMaterial(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", newMaterial);
    formData.append("title", title);
    formData.append("type", type);

    fetch(`/api/materials/subject/${subjectId}`, {
      method: "POST",
      body: formData
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Uploaded material:", data); // Log the response data
        onUpload(data); // Call the onUpload callback with the new material
        onClose(); // Close the popup
      })
      .catch((error) => {
        console.error("There was an error uploading the material!", error);
      });
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Upload New Material</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UploadPopup;
