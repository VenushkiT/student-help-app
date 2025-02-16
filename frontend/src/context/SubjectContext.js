import { createContext, useReducer } from "react";

export const SubjectsContext = createContext();

export const subjectReducer = (state, action) => {
  switch (action.type) {
    case "SET_SUBJECTS":
      return { subjects: action.payload };
    case "CREATE_SUBJECT":
      return { subjects: [action.payload, ...state.subjects] };
    case "DELETE_SUBJECT":
      const newSubjects = state.subjects.filter((w) => w._id !== action.payload._id);
      return { subjects: newSubjects };

    default:
      return state;
  }
};

export const SubjectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subjectReducer, { subjects: [] });
  return <SubjectsContext.Provider value={{ ...state, dispatch }}>{children}</SubjectsContext.Provider>;
};

// The Context (Global Store)
// Stores the subjects data.
// The Reducer (State Manager)
// Decides how the subjects list is updated (add, remove, get).
// The Provider (Data Distributor)
// Makes this global data available to all components.
