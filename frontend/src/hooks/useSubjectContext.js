import { SubjectsContext } from "../context/SubjectContext";
import { useContext } from "react";

export const useSubjectContext = () => {
  const context = useContext(SubjectsContext);
  if (!context) {
    throw new Error("useSubjectContext must be used within a SubjectsContextProvider");
  }
  return context;
};
// The useSubjectContext hook is a custom hook that allows us to access the
// global subjects data from the SubjectsContextProvider. It is used in
// components to read the global state and dispatch actions to update it.
