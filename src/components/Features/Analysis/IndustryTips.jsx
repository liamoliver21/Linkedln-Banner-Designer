import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { getIndustryTips } from '../../../utils/geminiService';

const IndustryTips = ({ profession }) => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTips = async () => {
        setLoading(true);
        const data = await getIndustryTips(profession.label);
        setTips(data || []);
        setLoading(false);
    };

    useEffect(() => {
        if (profession) {
            fetchTips();
        }
    }, [profession]);

    if (!profession) return null;

    return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-sm border border-amber-100">
            <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                <Lightbulb className="text-amber-500" size={20} />
                Pro Tips for {profession.label}s
            </h3>

            {loading ? (
                <div className="space-y-2 opacity-50">
                    <div className="h-4 bg-amber-200/50 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-amber-200/50 rounded w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-amber-200/50 rounded w-5/6 animate-pulse"></div>
                </div>
            ) : (
                <ul className="space-y-3">
                    {tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-amber-800 leading-relaxed">
                            <span className="font-bold text-amber-400">•</span>
                            {tip}
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={fetchTips}
                disabled={loading}
                className="mt-4 text-xs font-semibold text-amber-600 flex items-center gap-1 hover:text-amber-800 transition-colors"
            >
                <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                Refresh Tips
            </button>
        </div>
    );
};

export default IndustryTips;
