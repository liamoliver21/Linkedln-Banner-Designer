import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

const ScoreBar = ({ label, score }) => (
    <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">{label}</span>
            <span className="text-slate-800 font-bold">{score}/10</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score * 10}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full ${score >= 8 ? 'bg-green-500' : score >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
            />
        </div>
    </div>
);

const DesignCritique = ({ isOpen, isLoading, feedback, onClose }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 p-6 overflow-y-auto border-l border-slate-200"
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="text-purple-600" size={20} />
                    AI Design Critique
                </h3>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600"
                >
                    ✕
                </button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <p className="text-sm text-slate-500 text-center px-4">
                        Gemini is analyzing your design's composition, readability, and harmony...
                    </p>
                </div>
            ) : feedback ? (
                <div className="space-y-6">
                    {/* Overall Score */}
                    <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
                        <div className="text-3xl font-extrabold text-purple-700">{feedback.scores.impact}</div>
                        <div className="text-xs text-purple-600 font-medium uppercase tracking-wide">Overall Impact</div>
                    </div>

                    {/* Detailed Scores */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-800 border-b pb-2">Detailed Analysis</h4>
                        <ScoreBar label="Readability" score={feedback.scores.readability} />
                        <ScoreBar label="Professionalism" score={feedback.scores.professionalism} />
                        <ScoreBar label="Color Harmony" score={feedback.scores.color_harmony} />
                        <ScoreBar label="Visual Hierarchy" score={feedback.scores.hierarchy} />
                    </div>

                    {/* Improvements */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-800 border-b pb-2 mb-3">Suggested Improvements</h4>
                        <ul className="space-y-3">
                            {feedback.improvements.map((tip, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <AlertCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 text-slate-500 text-sm">
                    No analysis available yet.
                </div>
            )}
        </motion.div>
    );
};

export default DesignCritique;
