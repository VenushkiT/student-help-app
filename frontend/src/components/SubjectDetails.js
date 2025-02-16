import { useSubjectContext } from "../hooks/useSubjectContext";

const SubjectDetails = ({ subject }) => {
  const { dispatch } = useSubjectContext();

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

  return (
    <div className="subject-details">
      <h4>{subject.title}</h4>
      <p>{subject.description}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default SubjectDetails;
