const HISTORY_KEY = 'bannergen_history';

export const saveToHistory = (profession, textConfig, templateId, bgImage) => {
    try {
        const item = {
            id: Date.now(),
            date: new Date().toISOString(),
            profession,
            textConfig,
            templateId,
            bgImage
        };

        const existing = getHistory();
        const updated = [item, ...existing].slice(0, 5); // Keep last 5
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
        console.error("Failed to save history", e);
    }
};

export const getHistory = () => {
    try {
        const data = localStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
};
