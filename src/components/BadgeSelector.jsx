import React from 'react';
import { Award, BadgeCheck, Star, Zap, ThumbsUp, Heart, Globe, Briefcase } from 'lucide-react';

const BADGES = [
    { id: 'verified', icon: BadgeCheck, label: 'Verified' },
    { id: 'award', icon: Award, label: 'Award' },
    { id: 'star', icon: Star, label: 'Top Rated' },
    { id: 'zap', icon: Zap, label: 'Fast' },
    { id: 'thumbsup', icon: ThumbsUp, label: 'Recommended' },
    { id: 'heart', icon: Heart, label: 'Loved' },
    { id: 'global', icon: Globe, label: 'Global' },
    { id: 'pro', icon: Briefcase, label: 'Pro' },
];

const BadgeSelector = ({ onAddBadge }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Award className="text-yellow-500" size={20} />
                Achievements
            </h3>
            <div className="grid grid-cols-4 gap-2">
                {BADGES.map((badge) => (
                    <button
                        key={badge.id}
                        onClick={() => onAddBadge(badge.id)} // Pass ID, we'll map back to icon in canvas or app
                        className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 hover:border-blue-500 hover:bg-slate-50 transition-all gap-1 group"
                    >
                        <badge.icon size={24} className="text-slate-400 group-hover:text-blue-600" />
                        <span className="text-[10px] text-slate-500 font-medium">{badge.label}</span>
                    </button>
                ))}
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">Click to add. Drag on preview to move.</p>
        </div>
    );
};

export default BadgeSelector;
