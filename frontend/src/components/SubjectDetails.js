import { useSubjectContext } from "../hooks/useSubjectContext";

const SubjectDetails = ({ subject }) => {
  const { dispatch } = useSubjectContext();

  const handleClick = async () => {
    const response = await fetch(`/api/subjects/` + subject._id, {
      method: "DELETE"
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_SUBJECT", payload: json });
    }
  };

  return (
    <div className="subject-details">
      <h4>{subject.title}</h4>
      <p>{subject.description}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default SubjectDetails;
