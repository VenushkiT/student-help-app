const SubjectDetails = ({ subject }) => {
  return (
    <div className="subject-details">
      <h4>{subject.title}</h4>
      <p>{subject.description}</p>
    </div>
  );
};
export default SubjectDetails;
