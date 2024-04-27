// utils/tagSuggestions.js

export async function fetchTagSuggestions(description) {
  const url = "https://api.aiforthai.in.th/tagsuggestion";
  const apiKey = "FlQmWVQAWMcJGLiCTQ6mDzBvkJkpl4vY";
  const numTags = 5;

  const requestBody = `text=${description}&numtag=${numTags}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Apikey": apiKey
    },
    body: requestBody
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tag suggestions");
  }

  const data = await response.json();
  return data.tags;
}
