import { useState, useContext } from "react";
import { useSubjectContext } from "../hooks/useSubjectContext";
import { FormContext } from "../context/FormContext";

const SubjectForm = ({ onSubjectCreated }) => {
  const { dispatch } = useSubjectContext();
  const { setShowForm } = useContext(FormContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subject = { title, description };
    const response = await fetch("/api/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(subject)
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      console.log("Subject created successfully", json);
      setTitle("");
      setDescription("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_SUBJECT", payload: json });
      setShowForm(false);
      onSubjectCreated();
    }
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h3>Create a new subject</h3>

      <label> Subject Title </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label> Subject Description </label>
      <textarea
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <button type="submit">Create</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default SubjectForm;
