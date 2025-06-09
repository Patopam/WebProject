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

		if (response.status === 429) {
			console.warn(' OpenAI Rate limit hit (429)');
			throw new Error('Rate limit exceeded (429)');
		}
		const data = await response.json();
		const rawText = data?.choices?.[0]?.message?.content?.trim();
		const jsonMatch = rawText?.match(/\{[\s\S]*\}/);
		if (!jsonMatch) throw new Error('No valid JSON in OpenAI response');
		const recommendation = JSON.parse(jsonMatch[0]);
		return recommendation;
	} catch (error) {
		console.error('Error fetching recommendation from OpenAI:', error);
		return {
			intro: 'The AI ​​is currently resting...',
			title: 'Take a deep breath',
			description: 'Please try again later when you are ready.',
			imageKeyword: 'calm nature',
		};
	}
}

export async function getRecommendation(category) {
	try {
		const promptMap = {
			'Breathing exercise':
				'Give me a very short breathing exercise technique (max 2 sentences) that can reduce stress and anxiety.',
			'Yoga class':
				'Suggest a simple yoga practice (max 2 sentences) that can be done at home without special equipment.',
			'Healthy habits': 'Provide a very brief health habit tip (max 2 sentences) that improves overall wellbeing.',
			'Money mindset':
				'Share a concise mindful money tip (max 2 sentences) for developing better relationship with finances.',
			'Self-care tip': 'Recommend a brief self-care practice (max 2 sentences) that promotes mental wellbeing.',
			'Gratitude practice': 'Suggest a simple gratitude exercise (max 2 sentences) that can be practiced daily.',
		};

		const prompt = promptMap[category] || 'Give me a brief wellbeing tip (max 2 sentences).';
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
						content: prompt,
					},
				],
				temperature: 0.7,
				max_tokens: 60,
			}),
		});

		const data = await response.json();
		if (data?.choices?.[0]?.message?.content) {
			return data.choices[0].message.content.trim();
		} else {
			return getFallbackRecommendation(category);
		}
	} catch (error) {
		console.error(`Error fetching ${category} recommendation:`, error);
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
