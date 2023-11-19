import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

function SurveyDisplayById() {
  const [survey, setSurvey] = useState(null);
  const { surveyId } = useParams();

  useEffect(() => {
    fetch(`https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/retrieve-survey/${surveyId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSurvey(data))
      .catch(error => console.error('Error fetching survey:', error));
  }, [surveyId]);

  if (!survey) {
    return <p className="text-gray-600 text-center my-4">Loading survey...</p>;
  }

  // Reuse the render logic from SurveyDisplay
  // You might consider extracting the rendering logic to a shared function or component
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{survey.title}</h2>
      <p className="text-gray-600 mb-4">{survey.description}</p>
      {survey.questions.map((question, index) => renderQuestion(question, index))}
    </div>
  );
}

// Include the renderQuestion function from SurveyDisplay or make it a shared utility
function renderQuestion(question, index) {
    switch (question.question_type) {
      case 'multiple_choice':
        return (
          <div key={index} className="mb-4">
            <p className="font-medium text-gray-700">{question.question}</p>
            <div className="flex flex-col mt-2">
              {question.options.map(option => (
                <label key={option} className="inline-flex items-center mt-1">
                  <input type="radio" name={`question-${index}`} value={option} className="form-radio" />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
  
      case 'rating':
        return (
          <div key={index} className="mb-4">
            <p className="font-medium text-gray-700">{question.question}</p>
            <input type="range" min="1" max={question.scale} className="mt-2 w-full" />
          </div>
        );
  
      case 'open_ended':
      case 'open_text': // Combining as they are similar
        return (
          <div key={index} className="mb-4">
            <p className="font-medium text-gray-700">{question.question}</p>
            <textarea name={`question-${index}`} className="mt-2 w-full p-2 border rounded" rows="3"></textarea>
          </div>
        );
  
      default:
        return <p key={index} className="text-red-500">Unsupported question type: {question.type}</p>;
    }
  }

export default SurveyDisplayById;
