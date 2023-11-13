// Function to call the API for saving a survey
export async function saveSurvey(surveyData) {
  const response = await fetch(
    "https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/create-survey",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surveyData),
    }
  );

  if (!response.ok) {
    throw new Error(`Error saving survey: ${response.status}`);
  }

  return response.json();
}
