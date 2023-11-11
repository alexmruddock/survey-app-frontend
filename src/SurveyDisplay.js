import React from 'react';

function SurveyDisplay({ survey }) {
  if (!survey || survey.questions.length === 0) {
    return <p>No survey questions to display.</p>;
  }

  return (
    <div>
      <h2>{survey.title}</h2>
      <ul>
        {survey.questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
}

export default SurveyDisplay;