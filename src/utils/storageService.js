const BRAND_KIT_KEY = 'linkedin_banner_brand_kit';

export const saveBrandKit = (brandKit) => {
    try {
        localStorage.setItem(BRAND_KIT_KEY, JSON.stringify(brandKit));
    } catch (error) {
        console.error("Failed to save brand kit:", error);
    }
};

export const getBrandKit = () => {
    try {
        const data = localStorage.getItem(BRAND_KIT_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Failed to load brand kit:", error);
        return null;
    }
};

export const clearBrandKit = () => {
    localStorage.removeItem(BRAND_KIT_KEY);
};
