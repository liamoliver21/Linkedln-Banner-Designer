// Google Gemini API Integration Service with Rate Limiting

const GEMINI_API_KEY = "AIzaSyD2zYgqY9grTluFeG3G1HVYYdbDPM4uJAg";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const VISION_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent";

/**
 * Rate Limiter to manage Free Tier limits (15 Requests / Minute)
 */
class GeminiRateLimiter {
    constructor() {
        this.queue = [];
        this.processing = false;
        this.lastRequest = 0;
        this.minInterval = 4000; // 4 seconds between requests (safe margin for 15/min)
    }

    async enqueue(apiCall) {
        return new Promise((resolve, reject) => {
            this.queue.push({ apiCall, resolve, reject });
            this.process();
        });
    }

    async process() {
        if (this.processing || this.queue.length === 0) return;

        this.processing = true;
        const timeSinceLastRequest = Date.now() - this.lastRequest;

        if (timeSinceLastRequest < this.minInterval) {
            await new Promise(r => setTimeout(r, this.minInterval - timeSinceLastRequest));
        }

        const { apiCall, resolve, reject } = this.queue.shift();
        this.lastRequest = Date.now();

        try {
            const result = await apiCall();
            resolve(result);
        } catch (error) {
            reject(error);
        }

        this.processing = false;
        this.process(); // Process next item
    }
}

const rateLimiter = new GeminiRateLimiter();

/**
 * Generic Fetch Wrapper for Gemini API
 */
const fetchGemini = async (prompt, model = 'gemini-pro') => {
    const url = `${API_URL}?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        })
    });

    if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

/**
 * 1. Tagline Generation
 */
export const generateTaglinesWithGemini = async (profession, tone = 'professional') => {
    const prompt = `
        Generate 5 professional LinkedIn banner taglines for a ${profession}. 
        Requirements:
        - 5-12 words each
        - Tone: ${tone}
        - Focus on value proposition
        - Industry-relevant keywords
        - Return ONLY a raw JSON array of strings, no markdown formatting.
        Example: ["Tagline 1", "Tagline 2"]
    `;

    return rateLimiter.enqueue(async () => {
        try {
            const data = await fetchGemini(prompt);
            const textResponse = data.candidates[0].content.parts[0].text;
            // Clean up markdown if present
            const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Gemini Tagline Gen Error:", error);
            // Fallback
            return [
                `${profession} Expert`,
                `Professional ${profession} Services`,
                `Driving Results in ${profession}`,
                `Your Trusted ${profession} Partner`,
                `Innovative ${profession} Solutions`
            ];
        }
    });
};

/**
 * 4. Color Recommendations
 */
export const suggestColorsWithGemini = async (profession, mood) => {
    const prompt = `
        Suggest 3 color palettes for a ${profession} LinkedIn banner. 
        Mood: ${mood}. 
        Return ONLY a raw JSON array of objects with 'name', 'colors' (array of 3 hex codes), and 'psychology' (string).
        No markdown.
    `;

    return rateLimiter.enqueue(async () => {
        try {
            const data = await fetchGemini(prompt);
            const textResponse = data.candidates[0].content.parts[0].text;
            const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Gemini Color Gen Error:", error);
            return [];
        }
    });
};

/**
 * Generic Fetch Wrapper for Gemini VISION API
 */
const fetchGeminiVision = async (prompt, base64Image) => {
    const url = `${VISION_API_URL}?key=${GEMINI_API_KEY}`;

    // Remove header if present (data:image/jpeg;base64,)
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [
                    { text: prompt },
                    {
                        inline_data: {
                            mime_type: "image/jpeg",
                            data: cleanBase64
                        }
                    }
                ]
            }]
        })
    });

    if (!response.ok) {
        throw new Error(`Gemini Vision API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

/**
 * 2. Design Analysis (Vision)
 */
export const analyzeDesignWithGemini = async (imageBase64) => {
    const prompt = `
        Analyze this LinkedIn banner design. 
        Rate the following on a scale of 1-10:
        1. Text readability
        2. Professional appearance
        3. Color harmony
        4. Visual hierarchy
        5. Overall impact

        Provide 3 specific, actionable improvements.
        
        Return ONLY valid JSON in this format:
        {
            "scores": {
                "readability": 0,
                "professionalism": 0,
                "color_harmony": 0,
                "hierarchy": 0,
                "impact": 0
            },
            "improvements": ["tip 1", "tip 2", "tip 3"]
        }
    `;

    return rateLimiter.enqueue(async () => {
        try {
            const data = await fetchGeminiVision(prompt, imageBase64);
            const textResponse = data.candidates[0].content.parts[0].text;
            const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Gemini Vision Error:", error);
            // Fallback mock
            return {
                scores: { readability: 8, professionalism: 7, color_harmony: 8, hierarchy: 7, impact: 8 },
                improvements: ["Try increasing the contrast on the subtitle.", "Consider aligning the logo with the title.", "The background is slightly busy, try reducing opacity."]
            };
        }
    });
};

/**
 * 3. Profile Analysis (Bio Parser)
 */
export const analyzeProfileWithGemini = async (bioText) => {
    const prompt = `
        Analyze this LinkedIn profile "About" section:
        "${bioText.substring(0, 1000)}" 

        Extract the following information:
        1. Primary Profession (short, e.g., "Product Manager")
        2. Top 3 Skills (as array)
        3. A suggested 5-8 word Tagline suitable for a banner.
        4. Inferred Tone (Professional, Creative, or Bold).

        Return ONLY valid JSON in this format:
        {
            "profession": "Title",
            "skills": ["Skill1", "Skill2", "Skill3"],
            "tagline": "Your tagline here",
            "tone": "Professional"
        }
    `;

    return rateLimiter.enqueue(async () => {
        try {
            const data = await fetchGemini(prompt);
            const textResponse = data.candidates[0].content.parts[0].text;
            const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Gemini Bio Analysis Error:", error);
            return null;
        }
    });
};

/**
 * 3.2 Industry Tips
 */
export const getIndustryTips = async (profession) => {
    const prompt = `
        Provide 3 short, punchy tips for a LinkedIn Banner for a "${profession}".
        Focus on visual elements, text hierarchy, or mood.
        Example output: ["Use high-contrast fonts", "Include a screenshot of your app", "Keep the background minimal"].
        Return JSON array of strings: ["Tip 1", "Tip 2", "Tip 3"].
    `;

    return rateLimiter.enqueue(async () => {
        try {
            const data = await fetchGemini(prompt);
            const textResponse = data.candidates[0].content.parts[0].text;
            const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Gemini Tips Error:", error);
            return ["Keep it simple and clean.", "Ensure text is readable.", "Use high-quality images."]; // Fallback
        }
    });
};

export default rateLimiter;
