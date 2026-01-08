import React from 'react';
import { HelpCircle, Monitor, ZoomIn, ZoomOut } from 'lucide-react';

const BottomToolbar = ({ zoom, setZoom }) => {
    return (
        <div className="h-10 bg-white border-t border-slate-200 flex items-center justify-between px-4 z-20">
            <div className="flex items-center gap-4">
                <button className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
                    Notes
                </button>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <span className="text-xs text-slate-400">Page 1 of 1</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-2 py-1 border border-slate-200">
                    <button onClick={() => setZoom(Math.max(10, zoom - 10))} className="p-0.5 text-slate-500 hover:text-slate-800"><ZoomOut size={14} /></button>
                    <span className="text-xs w-12 text-center font-medium">{zoom}%</span>
                    <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="p-0.5 text-slate-500 hover:text-slate-800"><ZoomIn size={14} /></button>
                </div>

                <button className="text-slate-400 hover:text-slate-600" title="Full Screen">
                    <Monitor size={16} />
                </button>
                <button className="text-slate-400 hover:text-slate-600" title="Help">
                    <HelpCircle size={16} />
                </button>
            </div>
        </div>
    );
};

export default BottomToolbar;
