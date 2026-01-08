import React, { useState } from 'react';
import { Share2, Download, Twitter, Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';
import { downloadBannerAsJPEG } from '../utils/exportService';

const PLATFORMS = [
    { id: 'linkedin', label: 'LinkedIn', w: 1584, h: 396, icon: Linkedin },
    { id: 'twitter', label: 'Twitter', w: 1500, h: 500, icon: Twitter },
    { id: 'facebook', label: 'Facebook', w: 1640, h: 856, icon: Facebook }, // Cover Photo
    { id: 'youtube', label: 'YouTube', w: 2560, h: 1440, icon: Youtube }, // Channel Art
];

const ExportPanel = ({ onDelete }) => {
    const [selectedPlatform, setSelectedPlatform] = useState(PLATFORMS[0]);

    const handleDownload = () => {
        // In a real app we would resize canvas. 
        // For MVP we just download current with a filename hint.
        const filename = `${selectedPlatform.label}_Banner_Export.jpg`;
        downloadBannerAsJPEG('banner-canvas', filename);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mt-4">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Share2 size={16} />
                Export for Platform
            </h3>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {PLATFORMS.map(p => (
                    <button
                        key={p.id}
                        onClick={() => setSelectedPlatform(p)}
                        className={`flex flex-col items-center justify-center p-2 min-w-[70px] rounded-lg border transition-all
                            ${selectedPlatform.id === p.id
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-slate-100 text-slate-500 hover:border-blue-300'}`}
                    >
                        <p.icon size={20} className="mb-1" />
                        <span className="text-[10px] font-medium">{p.label}</span>
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 mb-3 bg-slate-50 p-2 rounded">
                <span>Dimensions:</span>
                <span className="font-mono font-medium text-slate-700">{selectedPlatform.w} x {selectedPlatform.h} px</span>
            </div>

            <button
                onClick={handleDownload}
                className="w-full py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 flex items-center justify-center gap-2"
            >
                <Download size={16} />
                Download {selectedPlatform.label} Banner
            </button>
        </div>
    );
};

export default ExportPanel;
