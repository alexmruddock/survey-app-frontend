import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import CreateSurvey from "./CreateSurvey";
import SurveyDisplayById from "./SurveyDisplayById";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import SurveyResponses from "./SurveyResponses";
import LocalStorageDisplay from "./LocalStorageDisplay"; 
import authenticatedFetch from "./authenticatedFetch"; 
import "./index.css";

function App() {
  const [userRole, setUserRole] = useState(null); // Initialize user role to null

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      console.log("Token: ", token);
  
      if (token) {
        try {
          // Use authenticatedFetch instead of fetch
          const response = await authenticatedFetch(
            "https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/fetch-user"
          );
  
          console.log("Fetch user response: ", response);
  
          const userData = await response.json(); // Get the JSON from the response
          console.log("User data: ", userData);
  
          if (response.ok) {
            setUserRole(userData.role);
          } else {
            console.error("Failed to fetch user");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
  
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen flex flex-col items-center pt-8">
        <LocalStorageDisplay />

        <Routes>
          <Route path="/" element={<Home userRole={userRole} />} />
          <Route path="/create" element={<CreateSurvey />} />
          <Route path="/survey/:surveyId" element={<SurveyDisplayById />} />
          <Route path="/login" element={<LoginForm setUserRole={setUserRole} />} />
          <Route path="/register" element={<RegistrationForm setUserRole={setUserRole} />} />
          <Route
            path="/survey-responses/:surveyId"
            element={<SurveyResponses />}
          />
          {/* ... other routes ... */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;