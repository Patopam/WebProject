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
						content: `Based on the emotion "${emotion}", give me a JSON object with:
- an English intro text starting with: "You are feeling [emotion]..."
- a short activity title
- a short activity description (max 20 words)
- an image keyword (e.g., 'sunset walk', 'journaling', etc.)

Respond ONLY with a JSON object like this:
{
  "intro": "...",
  "title": "...",
  "description": "...",
  "imageKeyword": "..."
}`,
					},
				],
				temperature: 0.7,
				max_tokens: 200,
			}),
		});

		const data = await response.json();
		const rawText = data?.choices?.[0]?.message?.content;

		if (!rawText || rawText === 'undefined') {
			throw new Error('Empty or invalid response from OpenAI');
		}

		const recommendation = JSON.parse(rawText);
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
