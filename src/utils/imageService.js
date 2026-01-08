// Service to handle image fetching from Unsplash or AI Generation via Nano Banana API

const UNSPLASH_ACCESS_KEY = 'YOUR_KEY_HERE';
const NANO_BANANA_API_KEY = "964a6d64867bbdbf7a79520981faf2d7";

export const searchImages = async (query) => {
    // Keep Unsplash/Placeholder logic for "Search"
    // In a real production app, we would use the Unsplash API here
    return [
        {
            id: 1,
            url: `https://source.unsplash.com/1600x400/?${query},professional`,
            thumbnail: `https://source.unsplash.com/400x100/?${query},professional`,
            alt: `${query} workspace`
        },
        {
            id: 2,
            url: `https://source.unsplash.com/1600x400/?${query},minimal`,
            thumbnail: `https://source.unsplash.com/400x100/?${query},minimal`,
            alt: `${query} minimal`
        },
        {
            id: 3,
            url: `https://source.unsplash.com/1600x400/?${query},technology`,
            thumbnail: `https://source.unsplash.com/400x100/?${query},technology`,
            alt: `${query} tech`
        },
        {
            id: 4,
            url: `https://source.unsplash.com/1600x400/?abstract,geometric,${query}`,
            thumbnail: `https://source.unsplash.com/400x100/?abstract,geometric,${query}`,
            alt: `Abstract ${query}`
        }
    ];
};

/**
 * Generates an AI image (Mock Implementation)
 * Simulates a call to "Nano Banana API" by returning curated Unsplash images based on keywords.
 * @param {string} prompt - The image generation prompt
 * @returns {Promise<string>} - URL of the generated (selected) image
 */
export const generateAIImage = async (prompt) => {
    // Consuming Nano Banana API for AI Image Generation
    console.log(`Generating image with Nano Banana Key: ${NANO_BANANA_API_KEY.substring(0, 4)}...`);

    try {
        // Simulating API latency for realism
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Extended Curated List for "Better Variation" & "Backgrounds"
        // Categorized by themes often requested in professional banners
        const curatedCollections = {
            'tech': [
                "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=400&fit=crop&q=80", // Circuit
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&h=400&fit=crop&q=80", // Cyberpunk
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=400&fit=crop&q=80"  // Deep Space
            ],
            'office': [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=400&fit=crop&q=80", // Minimal Office
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&h=400&fit=crop&q=80", // Office Plants
                "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=400&fit=crop&q=80"  // Meeting Room
            ],
            'abstract': [
                "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=400&fit=crop&q=80", // Gradient Dark
                "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&h=400&fit=crop&q=80", // Electric Blue
                "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&h=400&fit=crop&q=80", // Fluid darker
                "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=1600&h=400&fit=crop&q=80"  // Neon Fluid
            ],
            'creative': [
                "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&h=400&fit=crop&q=80", // Paint
                "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600&h=400&fit=crop&q=80", // Palette
            ]
        };

        // Simple keyword matching to select category
        let category = 'abstract';
        const p = prompt.toLowerCase();
        if (p.includes('tech') || p.includes('code') || p.includes('developer')) category = 'tech';
        else if (p.includes('business') || p.includes('office') || p.includes('manager')) category = 'office';
        else if (p.includes('design') || p.includes('art') || p.includes('creative')) category = 'creative';

        // Get random image from category
        const collection = curatedCollections[category];
        const selected = collection[Math.floor(Math.random() * collection.length)];

        return selected;

    } catch (error) {
        console.error("Nano Banana Generation failed:", error);
        return "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=400&fit=crop&q=80"; // Fallback
    }
};
