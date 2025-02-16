import { useEffect, useContext } from "react";
import SubjectDetails from "../components/SubjectDetails";
import { useSubjectContext } from "../hooks/useSubjectContext";
import { FormContext } from "../context/FormContext";

//components
import SubjectForm from "../components/SubjectForm";

const Home = () => {
  const { subjects, dispatch } = useSubjectContext();
  const { showForm, setShowForm } = useContext(FormContext);

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

  return (
    <div className="home">
      <div className="subjects">
        {subjects && subjects.map((subject) => <SubjectDetails key={subject._id} subject={subject} />)}
      </div>

      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={handleCloseForm}>Close</button>
            <SubjectForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
