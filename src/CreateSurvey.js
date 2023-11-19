import React, { useState } from "react";
import SurveyForm from "./SurveyForm";
import SurveyDisplay from "./SurveyDisplay";
import { generateSurvey } from "./generateSurvey";
import { saveSurvey } from "./saveSurvey";

function CreateSurvey() {
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
    <div>
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
      {/* Optionally display the survey after creation */}
    </div>
  );
}

export default CreateSurvey;
