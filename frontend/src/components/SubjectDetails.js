import { useState } from "react";
import { useSubjectContext } from "../hooks/useSubjectContext";

const SubjectDetails = ({ subject }) => {
  const { dispatch } = useSubjectContext();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(subject.title);
  const [updatedDescription, setUpdatedDescription] = useState(subject.description);

  const handleClick = async () => {
    const response = await fetch(`/api/subjects/` + subject._id, {
      method: "DELETE"
    });

    if (response.ok) {
      console.log(`Subject with id: ${subject._id} deleted successfully`);
      dispatch({ type: "DELETE_SUBJECT", payload: { _id: subject._id } });
    } else {
      console.error(`Failed to delete subject with id: ${subject._id}`);
    }
  };

  const handleUpdate = async () => {
    const response = await fetch(`/api/subjects/` + subject._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: updatedTitle, description: updatedDescription })
    });

    if (response.ok) {
      const updatedSubject = await response.json();
      console.log(`Subject with id: ${subject._id} updated successfully`);
      dispatch({ type: "UPDATE_SUBJECT", payload: updatedSubject });
      setIsEditing(false);
    } else {
      console.error(`Failed to update subject with id: ${subject._id}`);
    }
  };

  return (
    <div className="subject-details">
      {isEditing ? (
        <>
          <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
          <textarea value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{subject.title}</h4>
          <p>{subject.description}</p>
          <button className="material-symbols-outlined" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <span className="material-symbols-outlined" onClick={handleClick}>
            Delete
          </span>
        </>
      )}
    </div>
  );
};

export default SubjectDetails;
