import { createContext, useReducer } from "react";

export const SubjectsContext = createContext();

export const subjectReducer = (state, action) => {
  switch (action.type) {
    case "SET_SUBJECTS":
      return { subjects: action.payload };
    case "CREATE_SUBJECT":
      return { subjects: [action.payload, ...state.subjects] };
    default:
      return state;
  }
};

export const SubjectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subjectReducer, { subjects: null });
  return <SubjectsContext.Provider value={{ ...state, dispatch }}>{children}</SubjectsContext.Provider>;
};

// The Context (Global Store)
// Stores the subjects data.
// The Reducer (State Manager)
// Decides how the subjects list is updated (add, remove, get).
// The Provider (Data Distributor)
// Makes this global data available to all components.
