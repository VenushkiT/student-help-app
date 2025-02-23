import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages and components
import Home from "./pages/Home";
import SubjectPage from "./pages/Subject";
import Navbar from "./components/Navbar";
import { FormProvider } from "./context/FormContext";
import QuizGeneration from "./pages/QuizGeneration";
import AskPage from "./pages/AskPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FormProvider>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/subjects/:id" element={<SubjectPage />} />
              <Route path="/quizgeneration/:id" element={<QuizGeneration />} />
              <Route path="/ask" element={<AskPage />} />
            </Routes>
          </div>
        </FormProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
