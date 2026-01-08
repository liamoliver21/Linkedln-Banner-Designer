import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ColorPaletteGen from '../../ColorPaletteGen';

const DesignPanel = ({ templates, activeTemplate, setActiveTemplate, selectedProfession, onApplyPalette }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTemplates = templates.filter(t =>
        t.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.style.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div className='space-y-4'>
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">Templates</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">See all</button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {filteredTemplates.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTemplate(t)}
                            className={`group relative aspect-video rounded-lg border overflow-hidden transition-all text-left
                                    ${activeTemplate.id === t.id ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                <span className="text-white text-[10px] font-medium truncate block">{t.label}</span>
                            </div>
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 text-xs">
                                {/* Placeholder for template preview if available */}
                                Preview
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <ColorPaletteGen
                profession={selectedProfession}
                onApply={onApplyPalette}
            />
        </div>
    );
};

export default DesignPanel;
