import React from 'react';
import { Type, AlignLeft, AlignCenter, AlignRight, Bold, Italic } from 'lucide-react';

const fonts = [
    'Inter', 'Roboto', 'Playfair Display', 'Montserrat', 'Lato', 'Open Sans'
];

const TextEditor = ({ textConfig, onUpdate }) => {
    const handleChange = (key, value) => {
        onUpdate({ ...textConfig, [key]: value });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Type size={20} className="text-blue-600" />
                Text Customization
            </h3>

            <div className="space-y-6">
                {/* Main Title Edit */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Heading</label>
                    <input
                        type="text"
                        value={textConfig.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter heading..."
                    />
                </div>

                {/* Tagline Edit */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subheading</label>
                    <textarea
                        value={textConfig.tagline}
                        onChange={(e) => handleChange('tagline', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 resize-none"
                        placeholder="Enter tagline..."
                    />
                </div>

                {/* Font Selection */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Font Family</label>
                    <select
                        value={textConfig.font || 'Inter'}
                        onChange={(e) => handleChange('font', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        {fonts.map(font => (
                            <option key={font} value={font}>{font}</option>
                        ))}
                    </select>
                </div>

                {/* Color Pickle Stub */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Text Color</label>
                    <div className="flex gap-2">
                        {['#1a1a1a', '#ffffff', '#2563eb', '#dc2626', '#16a34a'].map(color => (
                            <button
                                key={color}
                                onClick={() => handleChange('color', color)}
                                className={`w-8 h-8 rounded-full border-2 ${textConfig.color === color ? 'border-blue-500 scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TextEditor;
