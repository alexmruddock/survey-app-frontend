import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function SurveyResponses() {
  const [responses, setResponses] = useState([]);
  const { surveyId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the stored token
    
    fetch(
      `https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/survey-responses/${surveyId}`, 
      {
        headers: {
        'Authorization': `Bearer ${token}`
      }
  })
      .then((response) => response.json())
      .then((data) => setResponses(data))
      .catch((error) => console.error("Error fetching responses:", error));
  }, [surveyId]);

  return (
    <div>
      <h2>Survey Responses</h2>
      {
        /* Display the responses here, e.g., in a table */
        responses.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">User Email</th>
                <th className="px-4 py-2">Answers</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response) => (
                <tr key={response._id} className="bg-white border-b">
                  <td className="px-4 py-2">{response.userEmail}</td>
                  <td className="px-4 py-2">
                    <ul>
                      {response.answers.map((answer, index) => (
                        <li key={index}>
                          <strong>{answer.question}</strong>: {answer.answer}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No responses yet</p>
        )
      }
    </div>
  );
}

export default SurveyResponses;