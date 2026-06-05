export async function getMotivationalQuote() {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "user",
      content: "Give me a unique motivational quote in English. Do not repeat common quotes.",
    },
  ],
  temperature: 1.2,
  max_tokens: 30,
})
      }
    );

    const data = await response.json();

    // 👇 Agrega esto
    console.log("STATUS:", response.status);
    console.log("DATA:", data);
console.log(data.choices[0].message.content);
    return data?.choices?.[0]?.message?.content?.trim();
  } catch (error) {
    console.error(error);
    return "Fallback quote";
  }
}
export async function getRecommendationFromEmotion(emotion) {
	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
			},
			body: JSON.stringify({
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'user',
						content: `Given the emotion "${emotion}", return ONLY a valid JSON object with this exact structure:

{
  "intro": "Brief reflection about the emotion",
  "title": "Short activity title",
  "description": "Very brief activity suggestion, max 11 words",
 "imageKeyword": "ONE simple keyword only"

Examples:
- yoga
- meditation
- nature
- walking
- sunset
- forest
- beach
- breathing
}

Rules:
- Return ONLY JSON.
- No markdown.
- No explanation.
- No extra text before or after the JSON.
- The activity should help someone feeling ${emotion}.`,
					},
				],
				temperature: 1,
				max_tokens: 200,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			console.error(data);
			throw new Error(`OpenAI Error: ${response.status}`);
		}

		const rawText = data?.choices?.[0]?.message?.content?.trim();

		if (!rawText) {
			throw new Error('Empty response from OpenAI');
		}

		const jsonMatch = rawText.match(/\{[\s\S]*\}/);

		if (!jsonMatch) {
			throw new Error('No valid JSON found');
		}

		return JSON.parse(jsonMatch[0]);
	} catch (error) {
		console.error('Error fetching recommendation from OpenAI:', error);

		return {
			intro: 'The AI is currently resting...',
			title: 'Take a deep breath',
			description: 'Please try again later when you are ready.',
			imageKeyword: 'calm nature',
		};
	}
}

const PROMPTS = {
  "Breathing exercise":
    "Suggest a breathing exercise in maximum 2 sentences.",

  "Yoga class":
    "Suggest a simple yoga routine in maximum 2 sentences.",

  "Healthy habits":
    "Suggest a healthy habit in maximum 2 sentences.",

  "Money mindset":
    "Suggest a mindful financial habit in maximum 2 sentences.",

  "Self-care tip":
    "Suggest a self-care practice in maximum 2 sentences.",

  "Gratitude practice":
    "Suggest a gratitude exercise in maximum 2 sentences.",
};

export async function getRecommendation(category) {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content:
                PROMPTS[category] ??
                "Suggest a wellbeing tip in maximum 2 sentences.",
            },
          ],
          temperature: 1,
          max_tokens: 80,
        }),
      }
    );

    const data = await response.json();

    return (
      data?.choices?.[0]?.message?.content?.trim() ||
      getFallbackRecommendation(category)
    );
  } catch (error) {
    console.error(
      `Error fetching ${category} recommendation:`,
      error
    );

    return getFallbackRecommendation(category);
  }
}

// Fallback recommendations if the API call fails
function getFallbackRecommendation(category) {
	const fallbacks = {
		'Breathing exercise':
			'Try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.',
		'Yoga class': 'Try a gentle 15-minute morning yoga flow to energize your day.',
		'Healthy habits': 'Add an extra vegetable to each meal today for improved nutrition.',
		'Money mindset': 'Track all your expenses today to become more aware of your spending patterns.',
		'Self-care tip': 'Schedule a 15-minute break today just to sit quietly with your thoughts.',
		'Gratitude practice': "Write down three specific things you're grateful for in this moment.",
	};

	return fallbacks[category] || "Take a moment to check in with yourself and acknowledge how you're feeling right now.";
}
