import React, { useState } from 'react';
import { Palette, RefreshCw, Check } from 'lucide-react';
import { suggestColorsWithGemini } from '../utils/geminiService';

const MOODS = [
    { id: 'trust', label: 'Trust & Stable' },
    { id: 'growth', label: 'Growth & Fresh' },
    { id: 'bold', label: 'Bold & Modern' },
    { id: 'luxury', label: 'Premium & Luxury' },
    { id: 'creative', label: 'Creative & Vibrant' }
];

const PRESETS = [
    { name: 'Midnight Pro', colors: ['#0f172a', '#334155', '#e2e8f0'], type: 'Dark & Clean' },
    { name: 'Corporate Blue', colors: ['#1e3a8a', '#3b82f6', '#dbeafe'], type: 'Trustworthy' },
    { name: 'Tech Gradient', colors: ['#4f46e5', '#818cf8', '#e0e7ff'], type: 'Modern Tech' },
    { name: 'Forest Growth', colors: ['#14532d', '#22c55e', '#dcfce7'], type: 'Nature & Health' },
    { name: 'Sunset Creative', colors: ['#c2410c', '#fb923c', '#ffedd5'], type: 'Warm & Dynamic' },
    { name: 'Minimalist', colors: ['#18181b', '#71717a', '#f4f4f5'], type: 'Monochrome' },
];

const ColorPaletteGen = ({ profession, onApply }) => {
    const [selectedMood, setSelectedMood] = useState(MOODS[0].id);
    const [palettes, setPalettes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'ai'

    const handleGenerate = async () => {
        if (!profession) return;
        setIsLoading(true);
        try {
            const results = await suggestColorsWithGemini(profession.label, selectedMood);
            setPalettes(results);
        } catch (error) {
            console.error("Palette gen error", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Palette className="text-pink-500" size={20} />
                Smart Palette
            </h3>

            <div className="space-y-4">
                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
                    <button
                        onClick={() => setActiveTab('presets')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'presets' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Presets
                    </button>
                    <button
                        onClick={() => setActiveTab('ai')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'ai' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        AI Generator
                    </button>
                </div>

                {activeTab === 'ai' && (
                    <div className="space-y-4">
                        {/* Mood Selector */}
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                                Select Mood
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {MOODS.map(mood => (
                                    <button
                                        key={mood.id}
                                        onClick={() => setSelectedMood(mood.id)}
                                        className={`px-3 py-1.5 text-xs rounded-full border transition-all
                                    ${selectedMood === mood.id
                                                ? 'bg-pink-50 border-pink-200 text-pink-700 font-medium'
                                                : 'border-slate-200 text-slate-600 hover:border-pink-200'}`}
                                    >
                                        {mood.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !profession}
                            className="w-full py-2.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <RefreshCw className="animate-spin" size={16} />
                                    Generating colors...
                                </>
                            ) : (
                                <>
                                    <SparklesIcon />
                                    Generate Palettes
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Results Grid - AI */}
                {activeTab === 'ai' && palettes.length > 0 && (
                    <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-bottom-2">
                        {palettes.map((palette, idx) => (
                            <PaletteItem
                                key={idx}
                                palette={palette}
                                onApply={onApply}
                            />
                        ))}
                    </div>
                )}

                {/* Results Grid - Presets */}
                {activeTab === 'presets' && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                        {PRESETS.map((preset, idx) => (
                            <PaletteItem
                                key={idx}
                                palette={preset}
                                onApply={onApply}
                                isPreset
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const PaletteItem = ({ palette, onApply, isPreset }) => (
    <button
        onClick={() => onApply(palette.colors)}
        className="w-full text-left p-3 rounded-lg border border-slate-100 hover:border-pink-200 hover:shadow-sm transition-all group"
    >
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-700">{palette.name}</span>
            <span className="opacity-0 group-hover:opacity-100 text-pink-500 text-xs font-medium flex items-center gap-1 transition-opacity">
                Apply <Check size={12} />
            </span>
        </div>

        <div className="flex h-8 w-full rounded-md overflow-hidden ring-1 ring-slate-100">
            {palette.colors.map((color, cIdx) => (
                <div
                    key={cIdx}
                    className="h-full flex-1"
                    style={{ backgroundColor: color }}
                    title={color}
                />
            ))}
        </div>
        {palette.psychology && (
            <p className="text-[10px] text-slate-400 mt-2 leading-tight">
                {palette.psychology}
            </p>
        )}
        {isPreset && (
            <p className="text-[10px] text-slate-400 mt-2 leading-tight">
                {palette.type}
            </p>
        )}
    </button>
);

const SparklesIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.4 7.2L20 9L14.4 10.8L12 16L9.6 10.8L4 9L9.6 7.2L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default ColorPaletteGen;
