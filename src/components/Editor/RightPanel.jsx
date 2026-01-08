import { Trash2, Move, RotateCw, Type, Palette, Layout } from 'lucide-react';

const RightPanel = ({ selectedElement, onUpdateElement, onDeleteElement }) => {
    if (!selectedElement) {
        return (
            <div className="w-72 bg-white border-l border-slate-200 h-full p-8 flex flex-col gap-4 items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-2">
                    <Layout size={32} />
                </div>
                <h3 className="font-bold text-slate-800">No Selection</h3>
                <p className="text-sm text-slate-500">Select an element on the canvas to customize its properties.</p>
            </div>
        );
    }

    return (
        <div className="w-72 bg-white border-l border-slate-200 h-full flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Properties</h3>
                <button
                    onClick={onDeleteElement}
                    className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <div className="p-5 space-y-6">

                {/* Specific - Text */}
                {selectedElement.type === 'text' && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                            <Type size={16} />
                            <span>Text Settings</span>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Content</label>
                            <textarea
                                value={selectedElement.text}
                                onChange={(e) => onUpdateElement({ text: e.target.value })}
                                className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Size (px)</label>
                                <input
                                    type="number"
                                    value={selectedElement.fontSize || 24}
                                    onChange={(e) => onUpdateElement({ fontSize: Number(e.target.value) })}
                                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Weight</label>
                                <select
                                    value={selectedElement.fontWeight || 'normal'}
                                    onChange={(e) => onUpdateElement({ fontWeight: e.target.value })}
                                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                                >
                                    <option value="normal">Normal</option>
                                    <option value="semibold">Semi Bold</option>
                                    <option value="bold">Bold</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={selectedElement.color || '#000000'}
                                    onChange={(e) => onUpdateElement({ color: e.target.value })}
                                    className="w-8 h-8 rounded border border-slate-200 cursor-pointer overflow-hidden p-0"
                                />
                                <span className="text-xs text-slate-500 font-mono">{selectedElement.color || '#000000'}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Specific - Shape */}
                {(selectedElement.type === 'rect' || selectedElement.type === 'circle') && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm">
                            <Palette size={16} />
                            <span>Style</span>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Fill Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={selectedElement.fill || '#64748b'}
                                    onChange={(e) => onUpdateElement({ fill: e.target.value })}
                                    className="w-full h-8 cursor-pointer rounded-lg border border-slate-200"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Width</label>
                                <input
                                    type="number"
                                    value={selectedElement.width || 100}
                                    onChange={(e) => onUpdateElement({ width: Number(e.target.value) })}
                                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Height</label>
                                <input
                                    type="number"
                                    value={selectedElement.height || 100}
                                    onChange={(e) => onUpdateElement({ height: Number(e.target.value) })}
                                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Specific - Line */}
                {selectedElement.type === 'line' && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm">
                            <Palette size={16} />
                            <span>Line Style</span>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Color</label>
                            <input
                                type="color"
                                value={selectedElement.stroke || '#000000'}
                                onChange={(e) => onUpdateElement({ stroke: e.target.value })}
                                className="w-full h-8 cursor-pointer rounded-lg border border-slate-200"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Thickness</label>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={selectedElement.strokeWidth || 4}
                                onChange={(e) => onUpdateElement({ strokeWidth: Number(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                    </div>
                )}


                {/* Common - Transform */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                        <Move size={16} />
                        <span>Transform</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">X Position</label>
                            <input
                                type="number"
                                value={Math.round(selectedElement.x)}
                                onChange={(e) => onUpdateElement({ x: Number(e.target.value) })}
                                className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Y Position</label>
                            <input
                                type="number"
                                value={Math.round(selectedElement.y)}
                                onChange={(e) => onUpdateElement({ y: Number(e.target.value) })}
                                className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1.5">
                            <label className="text-xs font-semibold text-slate-500 block">Rotation</label>
                            <span className="text-xs text-slate-400">{selectedElement.rotation || 0}°</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={selectedElement.rotation || 0}
                            onChange={(e) => onUpdateElement({ rotation: Number(e.target.value) })}
                            className="w-full accent-blue-600"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RightPanel;
