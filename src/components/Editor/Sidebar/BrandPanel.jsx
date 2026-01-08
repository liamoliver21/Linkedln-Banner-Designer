import React from 'react';
import BrandKitManager from '../../BrandKitManager';

const BrandPanel = ({ onApplyBrandKit }) => {
    return (
        <div className="p-4 space-y-6">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-800">Brand Kit</h2>
                <p className="text-sm text-slate-500">Manage your brand assets and styles</p>
            </div>
            <BrandKitManager onApply={onApplyBrandKit} />
        </div>
    );
};

export default BrandPanel;
