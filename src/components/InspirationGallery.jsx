import React from 'react';
import { Sparkles } from 'lucide-react';

const INSPIRATIONS = [
    {
        id: 'insp_1',
        title: "Modern Tech Lead",
        profession: { label: "Tech Lead", keywords: ["Technology", "Leadership"], defaultTagline: "Building the future.", colorPalette: ["#1e293b", "#3b82f6", "#f8fafc"] },
        bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
        style: 'modern'
    },
    {
        id: 'insp_2',
        title: "Creative Designer",
        profession: { label: "UI/UX Designer", keywords: ["Design", "Creative"], defaultTagline: "Crafting digital experiences.", colorPalette: ["#be185d", "#fb7185", "#fff1f2"] },
        bgImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
        style: 'bold'
    },
    {
        id: 'insp_3',
        title: "Startup Founder",
        profession: { label: "Founder", keywords: ["Startup", "Growth"], defaultTagline: "Scaling ideas to infinity.", colorPalette: ["#0f172a", "#22c55e", "#f0fdf4"] },
        bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
        style: 'minimal'
    }
];

const InspirationGallery = ({ onLoadInspiration }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Sparkles className="text-purple-500" size={20} />
                Inspiration Gallery
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {INSPIRATIONS.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onLoadInspiration(item)}
                        className="group relative h-24 rounded-lg overflow-hidden border border-slate-200 hover:border-purple-500 transition-all text-left"
                    >
                        <img src={item.bgImage} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent p-4 flex flex-col justify-center">
                            <span className="text-white font-bold text-lg">{item.title}</span>
                            <span className="text-slate-300 text-xs">{item.profession.label}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default InspirationGallery;
