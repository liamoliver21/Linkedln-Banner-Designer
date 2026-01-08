export const templates = [
    {
        id: 'corporate',
        label: 'Professional Corporate',
        style: 'modern',
        layout: {
            type: 'split',
            splitRatio: 0.4, // 40% text, 60% image
            textPosition: 'left'
        },
        elements: {
            hasOverlay: true,
            hasAccentShapes: true
        }
    },
    {
        id: 'personal-brand',
        label: 'Personal Brand',
        style: 'clean',
        layout: {
            type: 'centered',
            textPosition: 'center',
            imageOpacity: 0.3
        },
        elements: {
            hasOverlay: false,
            hasAccentShapes: false,
            hasProfilePlaceholder: true
        }
    },
    {
        id: 'minimalist',
        label: 'Minimalist Concept',
        style: 'minimal',
        layout: {
            type: 'text-focus', // Typography heavy
            textPosition: 'right'
        },
        elements: {
            hasOverlay: false,
            hasAccentShapes: false
        }
    },
    {
        id: 'showcase',
        label: 'Multi-panel Showcase',
        style: 'grid',
        layout: {
            type: 'grid', // 3 images
            textPosition: 'overlay-bottom'
        },
        elements: {
            hasOverlay: true,
            imageCount: 3
        }
    },
    {
        id: 'bold',
        label: 'Bold Typography',
        style: 'bold',
        layout: {
            type: 'full-width',
            textPosition: 'center-big'
        },
        elements: {
            hasOverlay: true,
            overlayOpacity: 0.7
        }
    }
];
