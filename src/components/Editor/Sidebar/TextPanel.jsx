import React from 'react';
import TextEditor from '../../TextEditor';

const TextPanel = ({ textConfig, setTextConfig, taglines, onAddElement }) => {
    return (
        <div className="p-4 space-y-6">
            <div className="space-y-3">
                <button
                    onClick={() => onAddElement({ type: 'text', text: 'Add a text box', fontSize: 24, fontWeight: 'normal' })}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                >
                    Add a text box
                </button>

                <div className="space-y-2">
                    <button
                        onClick={() => onAddElement({ type: 'text', text: 'Heading', fontSize: 60, fontWeight: 'bold' })}
                        className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                        <h1 className="text-2xl font-bold text-slate-800">Add a heading</h1>
                    </button>
                    <button
                        onClick={() => onAddElement({ type: 'text', text: 'Subheading', fontSize: 36, fontWeight: 'semibold' })}
                        className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                        <h2 className="text-lg font-semibold text-slate-700">Add a subheading</h2>
                    </button>
                    <button
                        onClick={() => onAddElement({ type: 'text', text: 'Body Text', fontSize: 20, fontWeight: 'normal' })}
                        className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                        <p className="text-sm text-slate-600">Add a little bit of body text</p>
                    </button>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
                <h3 className="font-bold text-slate-800 mb-4 text-sm">Text Configuration</h3>
                <TextEditor textConfig={textConfig} onUpdate={setTextConfig} />
            </div>

            <div className="pt-4 border-t border-slate-100">
                <h3 className="font-bold text-slate-800 mb-2 text-sm">AI Suggestions</h3>
                <div className="space-y-2">
                    {taglines.map((tag, idx) => (
                        <button
                            key={idx}
                            onClick={() => setTextConfig(prev => ({ ...prev, tagline: tag }))}
                            className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs transition-all"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TextPanel;
