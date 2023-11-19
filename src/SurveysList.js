// SurveysList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SurveysList() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetch('https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/get-surveys')
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSurveys(data))
      .catch(error => console.error('Error fetching surveys:', error));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Surveys</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map(survey => (
              <tr key={survey._id} className="bg-white border-b">
                <td className="px-4 py-2">{survey.title}</td>
                <td className="px-4 py-2">
                  <Link to={`/survey/${survey._id}`} className="text-blue-500 hover:text-blue-800">View / Complete Survey</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SurveysList;
