import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyDisplay from './SurveyDisplay';

function App() {
  const [survey, setSurvey] = useState(null);

  const handleSubmit = async (description) => {
    console.log("handleSubmit called with:", description);
    
    // Call the API to create the survey
    const response = await fetch('https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/generate-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    }).catch(error => {
      console.error("Fetch error:", error);
      return;
    });
    
    if (!response) {
      console.error("No response from fetch");
      return;
    }
    
    console.log(response);
    
    if (response && response.ok) {
      try {
        const data = await response.json();
        console.log("Parsed data:", data);

        // Parse the 'survey' field from string to JSON object
        const surveyObject = JSON.parse(data.survey);

        // Update the state with the parsed object
        setSurvey(surveyObject);

      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.error("Response error:", response.status);
    }
  };

  return (
    <div className="App">
      <h1>Survey App</h1>
      <SurveyForm onSubmit={handleSubmit} />
      <SurveyDisplay survey={survey} />
    </div>
  );
}

export default App;