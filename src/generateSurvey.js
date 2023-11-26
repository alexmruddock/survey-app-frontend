// Function to call the API for generating a survey
export async function generateSurvey(description) {
  const token = localStorage.getItem("accessToken");

  console.log("Description received in generateSurvey:", description);
  
  const response = await fetch(
    "https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/generate-survey",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ description }),
    }
  );

  if (!response.ok) {
    throw new Error(`Error generating survey: ${response.status}`);
  }

  const data = await response.json();
  return JSON.parse(data.survey);
}
