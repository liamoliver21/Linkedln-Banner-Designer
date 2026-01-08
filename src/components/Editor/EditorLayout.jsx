import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import TopToolbar from './TopToolbar';
import RightPanel from './RightPanel';
import BottomToolbar from './BottomToolbar';
import CanvasWorkspace from './CanvasWorkspace';

// Sidebar Panels
import DesignPanel from './Sidebar/DesignPanel';
import ElementsPanel from './Sidebar/ElementsPanel';
import TextPanel from './Sidebar/TextPanel';
import BrandPanel from './Sidebar/BrandPanel';
import UploadsPanel from './Sidebar/UploadsPanel';

import { templates } from '../../data/templates';

const EditorLayout = ({
    selectedProfession,
    activeTemplate,
    setActiveTemplate,
    textConfig,
    setTextConfig,
    bgImage,
    setBgImage,
    overlayOpacity,
    setOverlayOpacity,
    customPalette,
    setCustomPalette,
    customLogo,
    setCustomLogo,
    badges,
    setBadges,
    faceConfig,
    setFaceConfig,
    onBack,
    onDownload,
    handleCritique,
    taglines
}) => {
    const [activeTab, setActiveTab] = useState('design');
    const [fileName, setFileName] = useState('My Untitled Design');
    const [zoom, setZoom] = useState(67);

    // New Generic Elements State (Text, Shapes, etc.)
    const [elements, setElements] = useState([]);
    const [selectedElementId, setSelectedElementId] = useState(null);

    // Helpers
    const handleAddElement = (element) => {
        const newElement = {
            id: Date.now().toString(),
            x: 100,
            y: 100,
            rotation: 0,
            scale: 1,
            zIndex: elements.length + 1,
            ...element
        };
        setElements(prev => [...prev, newElement]);
        setSelectedElementId(newElement.id);
    };

    const handleUpdateElement = (id, updates) => {
        setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
    };

    const handleDeleteElement = (id) => {
        setElements(prev => prev.filter(el => el.id !== id));
        if (selectedElementId === id) setSelectedElementId(null);
    };

    const handleUpdateBadgePos = (id, x, y) => {
        setBadges(prev => prev.map(b => b.id === id ? { ...b, x, y } : b));
    };

    const handleAddBadge = (type) => {
        setBadges(prev => [...prev, {
            id: Date.now(),
            type,
            x: 1400 - (Math.random() * 50),
            y: 50 + (Math.random() * 50)
        }]);
    };

    const handleRegenerateBg = () => {
        // ... existing logic placeholder
    };

    const renderSidebarContent = () => {
        switch (activeTab) {
            case 'design':
                return (
                    <DesignPanel
                        templates={templates}
                        activeTemplate={activeTemplate}
                        setActiveTemplate={setActiveTemplate}
                        selectedProfession={selectedProfession}
                        onApplyPalette={setCustomPalette}
                    />
                );
            case 'elements':
                return (
                    <ElementsPanel
                        onAddBadge={handleAddBadge}
                        onAddElement={handleAddElement}
                    />
                );
            case 'text':
                return (
                    <TextPanel
                        textConfig={textConfig}
                        setTextConfig={setTextConfig}
                        taglines={taglines}
                        onAddElement={handleAddElement}
                    />
                );
            case 'brand':
                return (
                    <BrandPanel
                        onApplyBrandKit={(kit) => {
                            if (kit.colors && kit.colors.length > 0) setCustomPalette(kit.colors);
                            if (kit.logo) setCustomLogo(kit.logo);
                            if (kit.font) setTextConfig(prev => ({ ...prev, font: kit.font }));
                        }}
                    />
                );
            case 'uploads':
                return (
                    <UploadsPanel
                        faceConfig={faceConfig}
                        setFaceConfig={setFaceConfig}
                        bgImage={bgImage}
                        setBgImage={setBgImage}
                        overlayOpacity={overlayOpacity}
                        setOverlayOpacity={setOverlayOpacity}
                        selectedProfession={selectedProfession}
                    />
                );
            default:
                return <div className="p-4">Select a tab</div>;
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-100">
            <TopToolbar
                fileName={fileName}
                onFileNameChange={setFileName}
                onBack={onBack}
                onDownload={onDownload}
            />

            <div className="flex flex-1 overflow-hidden">
                <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab}>
                    {renderSidebarContent()}
                </LeftSidebar>

                <main className="flex-1 flex flex-col relative min-w-0">
                    <CanvasWorkspace
                        zoom={zoom}
                        profession={selectedProfession}
                        template={activeTemplate}
                        customText={textConfig}
                        imageUrl={bgImage}
                        overlayOpacity={overlayOpacity}
                        customPalette={customPalette}
                        customLogo={customLogo}
                        badges={badges}
                        onUpdateBadgePosition={handleUpdateBadgePos}
                        faceConfig={faceConfig}
                        onUpdateFaceConfig={setFaceConfig}

                        // New Props
                        elements={elements}
                        selectedElementId={selectedElementId}
                        onSelectElement={setSelectedElementId}
                        onUpdateElement={handleUpdateElement}
                    />
                    <BottomToolbar zoom={zoom} setZoom={setZoom} />
                </main>

                <RightPanel
                    selectedElement={elements.find(el => el.id === selectedElementId)}
                    onUpdateElement={(updates) => handleUpdateElement(selectedElementId, updates)}
                    onDeleteElement={() => handleDeleteElement(selectedElementId)}
                />
            </div>
        </div>
    );
};

export default EditorLayout;
