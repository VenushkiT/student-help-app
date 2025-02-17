import React, { useState, useEffect } from "react";
import UploadPopup from "./UploadPopup";
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt } from "react-icons/fa"; // Import icons from react-icons

const StudyMaterials = ({ subjectId }) => {
  const [materials, setMaterials] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!subjectId) {
      console.error("No subjectId provided!");
      return;
    }

    console.log(`Fetching materials for subjectId: ${subjectId}`);

    fetch(`/api/materials/subject/${subjectId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched materials:", data);
        setMaterials(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the materials!", error);
      });
  }, [subjectId]);

  const handleUploadSuccess = (newMaterial) => {
    setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
    setShowPopup(false);
  };

  const getIconForType = (type) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf />;
      case "word":
        return <FaFileWord />;
      case "image":
        return <FaFileImage />;
      default:
        return <FaFileAlt />;
    }
  };

  return (
    <div>
      <h1>Study Materials</h1>
      <ul>
        {materials.map((material) => (
          <li key={material._id}>
            {getIconForType(material.type)} {material.title}
          </li>
        ))}
      </ul>
      <button onClick={() => setShowPopup(true)}>Upload Material</button>
      {showPopup && (
        <UploadPopup onClose={() => setShowPopup(false)} onUpload={handleUploadSuccess} subjectId={subjectId} />
      )}
    </div>
  );
};

export default StudyMaterials;
