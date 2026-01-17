import React, { useState } from 'react';
import { User, Sparkles, X } from 'lucide-react';
import { analyzeProfileWithGemini } from '../utils/geminiService';

const ProfileAnalyzer = ({ onAnalysisComplete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [bioText, setBioText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!bioText.trim()) return;
        setIsLoading(true);
        try {
            const result = await analyzeProfileWithGemini(bioText);
            if (result) {
                onAnalysisComplete(result);
                setIsOpen(false);
                setBioText('');
            }
        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium mb-6"
            >
                <Sparkles size={18} />
                Auto-Fill from LinkedIn Bio
            </button>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 mb-6 relative animate-in slide-in-from-top-2">
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
                <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                <User className="text-purple-600" size={20} />
                AI Profile Analyzer
            </h3>
            <p className="text-xs text-slate-500 mb-4">
                Paste your LinkedIn "About" section or Bio. Gemini will extract your profession, skills, and suggest a tagline.
            </p>

            <textarea
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                placeholder="I am a passionate software engineer with 5 years of experience in..."
                className="w-full h-32 p-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none bg-slate-50 mb-4"
            />

            <button
                onClick={handleAnalyze}
                disabled={isLoading || !bioText.trim()}
                className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing Profile...
                    </>
                ) : (
                    <>
                        <Sparkles size={16} />
                        Generate My Banner
                    </>
                )}
            </button>
        </div>
    );
};

export default ProfileAnalyzer;
