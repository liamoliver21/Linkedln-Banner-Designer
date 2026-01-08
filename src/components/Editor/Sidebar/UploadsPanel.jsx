import React from 'react';
import FaceUploader from '../../Features/FaceUpload/FaceUploader';
import BackgroundEditor from '../../Features/Banner/BackgroundEditor';

const UploadsPanel = ({ faceConfig, setFaceConfig, bgImage, setBgImage, overlayOpacity, setOverlayOpacity, selectedProfession }) => {
    return (
        <div className="p-4 space-y-6">
            <div>
                <h3 className="font-bold text-slate-800 mb-3">Your Face Cam</h3>
                <FaceUploader
                    faceConfig={faceConfig}
                    onFaceConfigChange={setFaceConfig}
                />
            </div>

            <div className="border-t border-slate-100 pt-6">
                <h3 className="font-bold text-slate-800 mb-3">Background Image</h3>
                <BackgroundEditor
                    currentImage={bgImage}
                    onImageChange={setBgImage}
                    opacity={overlayOpacity}
                    onOpacityChange={setOverlayOpacity}
                    profession={selectedProfession}
                />
            </div>
        </div>
    );
};

export default UploadsPanel;
