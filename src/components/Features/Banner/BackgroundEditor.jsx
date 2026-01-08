import React, { useRef } from 'react';
import { Image as ImageIcon, Upload, RefreshCw, Layers } from 'lucide-react';

const BackgroundEditor = ({

    onImageChange,
    onOpacityChange,
    opacity,
    profession
}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onImageChange(url);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <ImageIcon size={20} className="text-blue-600" />
                Background
            </h3>

            <div className="space-y-6">

                {/* Actions Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-600 gap-2"
                    >
                        <Upload size={20} />
                        <span className="text-xs font-medium">Upload Image</span>
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    <button
                        onClick={() => onImageChange(null)} // Trigger regeneration or clear in real app, here checking logic
                        className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-600 gap-2"
                    >
                        <RefreshCw size={20} />
                        <span className="text-xs font-medium">Regenerate</span>
                    </button>
                </div>

                {/* Curated Backgrounds */}
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
                        Curated Backgrounds
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {getFilteredPresets(profession).map((bg, idx) => (
                            <button
                                key={idx}
                                onClick={() => onImageChange(bg.url)}
                                className="group relative aspect-square rounded-lg overflow-hidden border border-slate-200 hover:border-blue-500 transition-all"
                                title={bg.label}
                            >
                                <img
                                    src={bg.thumb}
                                    alt={bg.label}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Opacity Control */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Layers size={16} />
                            Overlay Opacity
                        </label>
                        <span className="text-xs text-slate-500">{Math.round(opacity * 100)}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={opacity}
                        onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

            </div>
        </div>
    );
};

// Expanded Presets with categories
const ALL_PRESETS = [
    // General / Corp
    { tags: ['general', 'corporate', 'business'], label: 'Modern Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=300&auto=format&fit=crop' },
    { tags: ['general', 'clean'], label: 'Clean Desk', url: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?q=80&w=2054&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?q=80&w=300&auto=format&fit=crop' },

    // Tech / Dev
    { tags: ['tech', 'developer', 'software', 'coding'], label: 'Coding Setup', url: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=300&auto=format&fit=crop' },
    { tags: ['tech', 'cyber', 'data'], label: 'Digital Network', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300&auto=format&fit=crop' },

    // Creative / Design
    { tags: ['creative', 'design', 'art'], label: 'Abstract Blue', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300&auto=format&fit=crop' },
    { tags: ['creative', 'design', 'minimal'], label: 'Minimal texture', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=300&auto=format&fit=crop' },
    { tags: ['creative', 'gradient'], label: 'Gradient Mesh', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=300&auto=format&fit=crop' },

    // Finance / Legal
    { tags: ['finance', 'legal', 'business'], label: 'City Skyline', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=300&auto=format&fit=crop' },
    { tags: ['finance', 'dark'], label: 'Geometric Dark', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop' },

    // Marketing / writing
    { tags: ['marketing', 'writing', 'coffee'], label: 'Coffee & Notebook', url: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2070&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=300&auto=format&fit=crop' }
];

const getFilteredPresets = (profession) => {
    if (!profession) return ALL_PRESETS.slice(0, 9);

    const keywords = profession.keywords.map(k => k.toLowerCase());
    keywords.push('general'); // Always include general

    // Score presets
    const scored = ALL_PRESETS.map(preset => {
        let score = 0;
        preset.tags.forEach(tag => {
            if (keywords.some(k => k.includes(tag) || tag.includes(k))) score += 2;
        });
        if (preset.tags.includes('general')) score += 1;
        return { ...preset, score };
    });

    // Sort by score and take top 9
    return scored.sort((a, b) => b.score - a.score).slice(0, 9);
}

export default BackgroundEditor;
