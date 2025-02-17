import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubjectDetails from "../components/SubjectDetails";
import { useSubjectContext } from "../hooks/useSubjectContext";
import { FormContext } from "../context/FormContext";

//components
import SubjectForm from "../components/SubjectForm";

const Home = () => {
  const { subjects, dispatch } = useSubjectContext();
  const { showForm, setShowForm } = useContext(FormContext);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch("/api/subjects");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_SUBJECTS", payload: json });
      }
    };
    fetchSubjects();
  }, [dispatch]);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubjectCreated = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/subjects/${subjectId}`);
  };

  return (
    <div className="home">
      <div className="subjects">
        {subjects &&
          subjects.map((subject) => (
            <div key={subject._id} onClick={() => handleSubjectClick(subject._id)}>
              <SubjectDetails subject={subject} />
            </div>
          ))}
      </div>

      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={handleCloseForm}>Close</button>
            <SubjectForm onSubjectCreated={handleSubjectCreated} />
          </div>
        </div>
      )}

      {showSuccessMessage && <div className="success-message">Subject created successfully!</div>}
    </div>
  );
};

export default Home;
