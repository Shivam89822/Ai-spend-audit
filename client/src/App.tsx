import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultsPage";
import {AuditPage} from "./pages/AuditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/audit"
          element={<AuditPage />}
        />
        <Route
          path="/results/:shareId"
          element={<ResultsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;