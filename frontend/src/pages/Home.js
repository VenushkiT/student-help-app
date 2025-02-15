import { useEffect, useState } from "react";
import SubjectDetails from "../components/SubjectDetails";

//components

const Home = () => {
  const [subjects, setSubjects] = useState(null);
  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch("/api/subjects");
      const data = await response.json();
      if (response.ok) {
        setSubjects(data);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="home">
      <div className="subjects">
        {subjects && subjects.map((subject) => <SubjectDetails key={subject._id} subject={subject} />)}
      </div>
    </div>
  );
};
export default Home;
