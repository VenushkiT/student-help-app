import { Link } from "react-router-dom";
import { useContext } from "react";
import { FormContext } from "../context/FormContext";

const Navbar = () => {
  const { setShowForm } = useContext(FormContext);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Student Help</h1>
        </Link>
        <button className="create-subject-button" onClick={handleButtonClick}>
          Create New
        </button>
      </div>
    </header>
  );
};

export default Navbar;
