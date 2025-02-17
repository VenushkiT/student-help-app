import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudyMaterials from "../components/StudyMaterials";

const SubjectPage = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubject = async () => {
      const response = await fetch(`/api/subjects/${id}`);
      const json = await response.json();
      if (response.ok) {
        setSubject(json);
      }
    };
    fetchSubject();
  }, [id]);

  if (!subject) {
    return <div>Loading...</div>;
  }

  const handleGenerateQuiz = () => {
    navigate(`/quizgeneration/${id}`);
  };

  return (
    <div className="subject-page">
      <h1>{subject.title}</h1>
      <p>{subject.description}</p>
      <StudyMaterials subjectId={id} />
      <button onClick={handleGenerateQuiz}>Generate Quiz</button>

      {/* Add more details as needed */}
    </div>
  );
};

export default SubjectPage;
