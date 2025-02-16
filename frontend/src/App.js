import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages and components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { FormProvider } from "./context/FormContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FormProvider>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </FormProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
