import React from 'react';

function SurveyDisplay({ survey }) {
  if (!survey || !survey.questions || survey.questions.length === 0) {
    return <p>No survey questions to display.</p>;
  }

  return (
    <div>
      <h2>{survey.title}</h2>
      <p>{survey.description}</p>
      {survey.questions.map((question, index) => renderQuestion(question, index))}
    </div>
  );
}

function renderQuestion(question, index) {
  switch (question.question_type) {
    case 'multiple_choice':
      return (
        <div key={index}>
          <p>{question.question}</p>
          {question.options.map(option => (
            <label key={option}>
              <input type="radio" name={`question-${index}`} value={option} />
              {option}
            </label>
          ))}
        </div>
      );

    case 'rating':
      return (
        <div key={index}>
          <p>{question.question}</p>
          <input type="range" min="1" max={question.scale} />
        </div>
      );

    case 'open_ended':
      return (
        <div key={index}>
          <p>{question.question}</p>
          <textarea name={`question-${index}`} />
        </div>
      );

    default:
      return <p key={index}>Unsupported question type: {question.type}</p>;
  }
}

export default SurveyDisplay;