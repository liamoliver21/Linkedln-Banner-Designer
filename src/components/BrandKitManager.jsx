import React, { useState, useEffect } from 'react';
import { Briefcase, Upload, Save, Trash2, CheckCircle } from 'lucide-react';
import { saveBrandKit, getBrandKit, clearBrandKit } from '../utils/storageService';

const BrandKitManager = ({ onApply }) => {
    const [kit, setKit] = useState({
        brandName: '',
        colors: ['#000000', '#ffffff', '#808080'],
        font: 'Inter',
        logo: null // base64 string
    });
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const saved = getBrandKit();
        if (saved) {
            setKit(saved);
            setIsSaved(true);
        }
    }, []);

    const handleColorChange = (index, value) => {
        const newColors = [...kit.colors];
        newColors[index] = value;
        handleUpdate({ colors: newColors });
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleUpdate({ logo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = (updates) => {
        setKit(prev => ({ ...prev, ...updates }));
        setIsSaved(false);
    };

    const handleSave = () => {
        saveBrandKit(kit);
        setIsSaved(true);
    };

    const handleClear = () => {
        clearBrandKit();
        setKit({
            brandName: '',
            colors: ['#000000', '#ffffff', '#808080'],
            font: 'Inter',
            logo: null
        });
        setIsSaved(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Briefcase className="text-indigo-600" size={20} />
                Brand Kit
            </h3>

            <div className="space-y-4">

                {/* Brand Name */}
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Brand Name</label>
                    <input
                        type="text"
                        value={kit.brandName}
                        onChange={(e) => handleUpdate({ brandName: e.target.value })}
                        placeholder="My Personal Brand"
                        className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Colors */}
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Brand Colors</label>
                    <div className="flex gap-2">
                        {kit.colors.map((color, idx) => (
                            <div key={idx} className="flex flex-col gap-1 w-full">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => handleColorChange(idx, e.target.value)}
                                    className="w-full h-8 rounded cursor-pointer"
                                />
                                <span className="text-[10px] text-slate-400 text-center uppercase">{color}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logo Upload */}
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Logo</label>
                    <div className="flex items-center gap-3">
                        {kit.logo ? (
                            <div className="w-12 h-12 relative group rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                                <img src={kit.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                                <button
                                    onClick={() => handleUpdate({ logo: null })}
                                    className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="w-12 h-12 flex items-center justify-center border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-slate-50 transition-colors">
                                <Upload size={16} className="text-slate-400" />
                                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                            </label>
                        )}
                        <span className="text-xs text-slate-400">
                            {kit.logo ? 'Logo uploaded' : 'Upload PNG/SVG'}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                    <button
                        onClick={handleSave}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all
                            ${isSaved
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-slate-800 text-white hover:bg-slate-900'}`}
                    >
                        {isSaved ? <><CheckCircle size={16} /> Saved</> : <><Save size={16} /> Save Kit</>}
                    </button>

                    <button
                        onClick={() => onApply(kit)}
                        disabled={!kit.brandName && !kit.logo && kit.colors.every(c => c === '#ffffff')} // Basic check
                        className="flex-1 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
                    >
                        Apply to Design
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrandKitManager;
