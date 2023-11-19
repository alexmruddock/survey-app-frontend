import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home';
import CreateSurvey from './CreateSurvey';
import SurveyDisplayById from './SurveyDisplayById';
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen flex flex-col items-center pt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateSurvey />} />
          <Route path="/survey/:surveyId" element={<SurveyDisplayById />} />
          {/* ... other routes ... */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
