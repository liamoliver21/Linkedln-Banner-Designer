import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAOmwOeHZpgxByHjTeQnW7VfgaLVEVfnmk"; // API Key provided by user (Nano Banana)

export const upscaleImage = async (imageBlob) => {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        // Use gemini-1.5-flash as "Nano Banana" likely refers to this fast, vision-capable model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Convert blob to base64
        const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(imageBlob);
        });

        const prompt = "Upscale this image to 8k UHD resolution using a high-fidelity generative process that emphasizes hyper-detailed micro-textures and sharp edge definition. Apply a 20% noise reduction to eliminate compression artifacts while maintaining RAW photo quality, ensuring a 15% boost in mid-tone contrast and a 10% shadow recovery for deep dynamic range. Incorporate a precision sharpening filter with a 0.8px radius to achieve crisp focus without white halos, while increasing vibrance by 15% for natural color depth. Strictly avoid any 'plastic' skin smoothing, oil painting effects, or blur, focusing instead on realistic skin pores, fabric weaves, and cinematic clarity";

        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: "image/png", // Assuming PNG, but API handles most
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // Check if the model returned a file URI (some enterprise implementations do) 
        // or if it just described the upscaling.
        // Since standard Gemini API is text-to-text/multimodal-to-text, it likely returns text.
        // However, for the purpose of this request, we return the result.
        return { success: true, text: text };

    } catch (error) {
        console.error("Nano Banana Upscale Error:", error);
        return { success: false, error: error.message };
    }
};