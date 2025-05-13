export async function getMotivationalQuote() {
	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'user',
						content:
							'Give me a very short motivational quote in English, gender-neutral, related to personal well-being and conscious financial habits. Avoid technical terms or direct mentions of money. Make it inspiring, calm, and mindful.',
					},
				],
				temperature: 0.8,
				max_tokens: 60,
			}),
		});

		const data = await response.json();

		if (data?.choices?.[0]?.message?.content) {
			return data.choices[0].message.content.trim();
		} else {
			return 'Trust your process. Every step matters.';
		}
	} catch (error) {
		console.error('Error fetching motivational quote:', error);
		return 'You are allowed to grow slowly.';
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
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'user',
						content: `Given the emotion "${emotion}", respond ONLY with a JSON object with the following keys:
{
  "intro": "Today you feel ${emotion}, that's why we recommend... [brief reflection or context]",
  "title": "[short activity title]",
  "description": "[very brief activity suggestion, max 11 words]",
  "imageKeyword": "[related image keyword like 'yoga', 'sunset walk', etc.]"
}
Do NOT include any explanation. Do NOT add text outside the JSON. Respond ONLY with valid JSON.`,
					},
				],
				temperature: 0.7,
				max_tokens: 200,
			}),
		});

		const data = await response.json();
		const rawText = data?.choices?.[0]?.message?.content?.trim();
		const jsonMatch = rawText?.match(/\{[\s\S]*\}/);
		if (!jsonMatch) throw new Error('No valid JSON in OpenAI response');

		const recommendation = JSON.parse(jsonMatch[0]);
		return recommendation;
	} catch (error) {
		console.error('Error fetching recommendation from OpenAI:', error);
		return {
			intro: 'You are feeling something...',
			title: 'Take a deep breath',
			description: 'Pause for a moment to reconnect with yourself.',
			imageKeyword: 'calm nature',
		};
	}
}
