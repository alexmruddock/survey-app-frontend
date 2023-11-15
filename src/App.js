import React, { useState } from "react";
import { generateSurvey } from "./generateSurvey";
import { saveSurvey } from "./saveSurvey";
import SurveyForm from "./SurveyForm";
import SurveyDisplay from "./SurveyDisplay";
import "./index.css";

function App() {
  const [survey, setSurvey] = useState(null);

  const handleGenerate = async (surveyData) => {
    console.log("Received survey data: ", surveyData);
    const description = surveyData.description;
    try {
      const generatedSurvey = await generateSurvey(description);
      setSurvey(generatedSurvey);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const savedData = await saveSurvey(survey);
      console.log("Saved Survey:", savedData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col items-center pt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Survey App</h1>
      <SurveyForm onSubmit={handleGenerate} />
      <SurveyDisplay survey={survey} />
      {survey && (
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Survey
        </button>
      )}
    </div>
  );
}

export default App;
