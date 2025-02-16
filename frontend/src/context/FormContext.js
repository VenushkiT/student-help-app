import { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false);

  return <FormContext.Provider value={{ showForm, setShowForm }}>{children}</FormContext.Provider>;
};
