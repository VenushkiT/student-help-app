import { useEffect } from "react";
import SubjectDetails from "../components/SubjectDetails";
import { useSubjectContext } from "../hooks/useSubjectContext";

//components
import SubjectForm from "../components/SubjectForm";

const Home = () => {
  const { subjects, dispatch } = useSubjectContext();
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

  return (
    <div className="home">
      <div className="subjects">
        {subjects && subjects.map((subject) => <SubjectDetails key={subject._id} subject={subject} />)}
      </div>
      <SubjectForm />
    </div>
  );
};
export default Home;
