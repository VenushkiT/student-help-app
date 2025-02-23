import React, { useState, useEffect } from "react";
import UploadPopup from "./UploadPopup";
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt } from "react-icons/fa";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useNavigate } from "react-router-dom";

const StudyMaterials = ({ subjectId }) => {
  const [materials, setMaterials] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [pdfError, setPdfError] = useState(null);
  const navigate = useNavigate();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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

  const handleDeleteMaterial = async (materialId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this material?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/materials/${materialId}`, { method: "DELETE" });

      if (!response.ok) throw new Error(`Failed to delete material: ${response.status}`);

      setMaterials((prevMaterials) => prevMaterials.filter((m) => m._id !== materialId));
    } catch (error) {
      console.error("Error deleting material:", error);
      alert("Failed to delete the material.");
    }
  };

  const handleAsk = (material) => {
    const encodedFilePath = encodeURIComponent(material.filePath);
    const encodedTitle = encodeURIComponent(material.title);

    navigate(`/ask?file=${encodedFilePath}&title=${encodedTitle}`);
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
            <button onClick={() => setSelectedMaterial(material)} style={{ marginLeft: "10px" }}>
              View
            </button>
            <button onClick={() => handleAsk(material)} style={{ marginLeft: "5px" }}>
              Ask
            </button>
            <button onClick={() => handleDeleteMaterial(material._id)} style={{ marginLeft: "5px", color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => setShowPopup(true)}>Upload Material</button>

      {showPopup && (
        <UploadPopup onClose={() => setShowPopup(false)} onUpload={handleUploadSuccess} subjectId={subjectId} />
      )}

      {selectedMaterial && selectedMaterial.type === "pdf" && selectedMaterial.filePath && (
        <div style={{ height: "750px", border: "1px solid #ddd", marginTop: "20px" }}>
          {console.log("PDF file path:", selectedMaterial.filePath)}

          <Worker workerUrl="/pdf.worker.min.js">
            <Viewer
              fileUrl={`http://localhost:3000/${selectedMaterial.filePath}`}
              plugins={[defaultLayoutPluginInstance]}
              onError={(error) => setPdfError(error.message)}
            />
          </Worker>

          {pdfError && <div style={{ color: "red", marginTop: "10px" }}>Error loading PDF: {pdfError}</div>}
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;
