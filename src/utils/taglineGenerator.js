// This service would integration with Claude API in a production environment
import { generateTaglinesWithGemini } from './geminiService';

export const generateTaglines = async (profession, keywords) => {
    // Determine tone based on keywords context or default
    let tone = 'professional';
    if (keywords.some(k => ['creative', 'art', 'design'].includes(k.toLowerCase()))) tone = 'creative';
    if (keywords.some(k => ['leader', 'manager', 'director'].includes(k.toLowerCase()))) tone = 'bold';

    try {
        console.log(`Generating taglines for ${profession} with tone: ${tone}`);
        const taglines = await generateTaglinesWithGemini(profession, tone);

        // Ensure we always have at least a few
        if (!taglines || taglines.length === 0) throw new Error("Empty response");

        return taglines.slice(0, 5);
    } catch (error) {
        console.warn("Falling back to local tagline generation due to API error", error);
        // Fallback Logic (Mock)
        return [
            `${profession} | Strategic Solutions`,
            `Expert ${profession} for Your Business`,
            `Driving Innovation as a ${profession}`,
            `Your Partner in ${profession} Excellence`,
            `Creative ${profession} & Consultant`
        ];
    }
    // Return realistic structure expected from API

};
