import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authenticatedFetch from "./authenticatedFetch";
import jsPDF from "jspdf";

function SurveyResponses() {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [responses, setResponses] = useState([]);
  const { surveyId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Retrieve the stored token

    
    // Fetch the survey details
    fetch(
      `https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/retrieve-survey/${surveyId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(response => response.json())
      .then(data => {
        setSurveyTitle(data.title); // Set the survey title
      })
      .catch((error) => console.error("Error fetching survey details:", error));
      

    // Fetch the survey responses
    fetch(
      `https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/survey-responses/${surveyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setResponses(data))
      .catch((error) => console.error("Error fetching responses:", error));
  }, [surveyId]);

  const handleAnalyzeResponses = async () => {
    try {
      const response = await authenticatedFetch(
        `https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/analyze-responses/${surveyId}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        const { analysis } = await response.json();

        // Handle the analysis result, possibly download it as a file
        console.log(analysis);

        // Function to download analysis as a PDF
        const downloadAnalysis = (analysisText, surveyTitle) => {
          const doc = new jsPDF();

          // Use splitTextToSize to split the text into an array of strings
  const splitText = doc.splitTextToSize(analysisText, 180); // 180 is the max width in mm

  // Pass the array of strings to the text function
  doc.text(splitText, 10, 10); // This will wrap the text to the next line

          // Save the PDF with a dynamic name based on the survey title
          doc.save(`${surveyTitle}-analysis.pdf`);
        };
        downloadAnalysis(analysis, surveyTitle);
      } else {
        console.error("Failed to analyze responses");
      }
    } catch (error) {
      console.error("Error analyzing responses:", error);
    }
  };

  return (
    <div>
      <h2>Survey Responses</h2>
      <button onClick={handleAnalyzeResponses}>Analyze Responses</button>
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
