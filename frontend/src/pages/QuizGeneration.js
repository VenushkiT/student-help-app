import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QuizGeneration = () => {
  const { id } = useParams();
  const [subjectTitle, setSubjectTitle] = useState("");

  useEffect(() => {
    const fetchSubject = async () => {
      const response = await fetch(`/api/subjects/${id}`);
      const json = await response.json();
      if (response.ok) {
        setSubjectTitle(json.title);
      }
    };

    fetchSubject();
  }, [id]);

  return (
    <div className="quiz-generation-page">
      <h1>Quiz for {subjectTitle}</h1>
      {/* Render quiz details here */}
    </div>
  );
};

export default QuizGeneration;
