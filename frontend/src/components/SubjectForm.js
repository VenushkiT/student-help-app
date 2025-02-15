import { useState } from "react";
import { useSubjectContext } from "../hooks/useSubjectContext";

const SubjectForm = () => {
  const { dispatch } = useSubjectContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

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
    } else {
      console.log("Subject created successfully", json);
      setTitle("");
      setDescription("");
      setError(null);
      dispatch({ type: "CREATE_SUBJECT", payload: json });
    }
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h3>Create a new subject</h3>

      <label> Subject Title </label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />

      <label> Subject Description </label>
      <textarea type="text" onChange={(e) => setDescription(e.target.value)} value={description} />

      <button type="submit">Create</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};
export default SubjectForm;
