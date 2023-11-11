import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyDisplay from './SurveyDisplay';

function App() {
  const [survey, setSurvey] = useState(null);

  const handleSubmit = async (description) => {
    // Call the API to create the survey
    const response = await fetch('https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/api/generate-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });
    const data = await response.json();
    setSurvey(data.survey);
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