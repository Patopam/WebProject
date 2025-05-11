// services/aiService.js

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
