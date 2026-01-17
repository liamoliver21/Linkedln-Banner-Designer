import React, { useEffect, useRef, useState } from 'react';
import { User, Mail, Globe, MapPin, BadgeCheck, Award, Star, Zap, ThumbsUp, Heart, Briefcase } from 'lucide-react';

// Icon Map for Badges
const ICON_MAP = {
    'verified': BadgeCheck,
    'award': Award,
    'star': Star,
    'zap': Zap,
    'thumbsup': ThumbsUp,
    'heart': Heart,
    'global': Globe,
    'pro': Briefcase
};

const BannerCanvas = ({
    profession,
    template,
    customText,
    imageUrl,
    overlayOpacity = 0.5,
    customPalette,
    customLogo,
    badges = [], // Array of { id, type, x, y, scale }
    onUpdateBadgePosition, // Callback to update parent state
    faceConfig, // { image, x, y, scale, flip }
    onUpdateFaceConfig,
    // New Props
    elements = [],
    selectedElementIds = [], // Array of selected element IDs (multi-select)
    onSelectElement, // (id, shiftKey) => void
    onUpdateElement,
    // Grid Props
    showGrid = false,
    snapToGrid = false
}) => {
    const canvasRef = useRef(null);
    const GRID_SIZE = 40; // Size of grid squares

    // Drag State
    const [draggingItem, setDraggingItem] = useState(null); // { type: 'badge' | 'face' | 'element', id: string | null }
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [faceRect, setFaceRect] = useState(null); // { x, y, w, h }

    // Constants
    const WIDTH = 1584;
    const HEIGHT = 396;

    // Use custom palette if available, otherwise fall back to profession defaults
    const colors = customPalette || (profession ? profession.colorPalette : ['#4f46e5', '#3b82f6', '#f0f0f0']);

    // Image Loading State
    const [loadedImage, setLoadedImage] = useState(null);

    // Load Image Effect (Runs only when URL changes)
    useEffect(() => {
        if (!imageUrl) {
            setLoadedImage(null);
            return;
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;
        img.onload = () => {
            setLoadedImage(img);
        };
        img.onerror = () => {
            setLoadedImage(null);
        };
    }, [imageUrl]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        const drawContent = () => {
            // 1. Draw Background
            if (loadedImage) {
                // Draw pre-loaded image
                const img = loadedImage;
                const scale = Math.max(WIDTH / img.width, HEIGHT / img.height);
                const x = (WIDTH / 2) - (img.width / 2) * scale;
                const y = (HEIGHT / 2) - (img.height / 2) * scale;
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

                // Overlay & Content
                applyOverlay();
                drawTemplateData();
                drawLogoAndText();
                drawFace();
                drawBadges();
                drawElements();

                // Draw Grid LAST to ensure visibility over templates/backgrounds
                if (showGrid) drawGrid();
            } else {
                fillBackground();
                drawTemplateData();
                drawLogoAndText();
                drawFace();
                drawBadges();
                drawElements();

                // Draw Grid LAST to ensure visibility over templates/backgrounds
                if (showGrid) drawGrid();
            }
        };

        const fillBackground = () => {
            ctx.fillStyle = colors[2] || '#f0f0f0';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
        };

        const applyOverlay = () => {
            ctx.fillStyle = `rgba(0, 0, 0, ${overlayOpacity})`;
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
        };

        const drawTemplateData = () => {
            if (profession?.id === 'blank') return;
            if (template && profession) {
                drawTemplate(ctx, template, colors);
            }
        };

        const drawTextData = () => {
            if (profession?.id === 'blank') return;
            drawText(ctx, profession, customText, template);
        };

        const drawLogoAndText = () => {
            // ... existing logo logic ...
            if (customLogo) {
                const logo = new Image();
                logo.src = customLogo;
                logo.onload = () => {
                    // Position logo top right
                    const logoSize = 64;
                    const padding = 32;
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(WIDTH - padding - logoSize / 2, padding + logoSize / 2, logoSize / 2, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(logo, WIDTH - padding - logoSize, padding, logoSize, logoSize);
                    ctx.restore();
                    drawTextData();
                };
                logo.onerror = () => {
                    drawTextData();
                }
            } else {
                drawTextData();
            }
        };

        const drawFace = () => {
            if (faceConfig && faceConfig.image) {
                const img = new Image();
                img.src = faceConfig.image;
                img.onload = () => {
                    ctx.save();

                    // Apply Cinematic Filters (simulated 8k enhance)
                    if (faceConfig.filters) {
                        const { contrast = 1, saturation = 1, brightness = 1 } = faceConfig.filters;
                        ctx.filter = `contrast(${contrast}) saturate(${saturation}) brightness(${brightness})`;
                    }

                    // Transform
                    const w = img.width * (faceConfig.scale || 1);
                    const h = img.height * (faceConfig.scale || 1);
                    const x = faceConfig.x || 1000;
                    const y = faceConfig.y || 100;

                    // Update rect for hit testing (deferred to avoid loop, using callback ref pattern or just mutable ref if strict mode triggers loops)
                    // For now, setting state in render loop is bad. 
                    // Better to calculate on drag start, OR use a ref for the rect.
                    // But we can't easily get dimensions outside onload.
                    // Let's store in a ref that persists across renders but doesn't trigger them.
                    faceRectRef.current = { x, y, w, h };

                    ctx.translate(x + w / 2, y + h / 2); // Move to center of image
                    ctx.scale(faceConfig.flip || 1, 1); // Apply Flip
                    ctx.drawImage(img, -w / 2, -h / 2, w, h); // Draw centered

                    ctx.restore();
                };
            } else {
                faceRectRef.current = null;
            }
        };

        const drawBadges = () => {
            // ... existing
            badges.forEach(badge => {
                const Icon = ICON_MAP[badge.type];
                ctx.save();
                ctx.translate(badge.x, badge.y);
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = 'rgba(0,0,0,0.2)';
                ctx.shadowBlur = 5;
                ctx.beginPath();
                ctx.arc(0, 0, 24, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = colors[0] || '#000';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = 'bold 20px Inter, sans-serif';
                let char = '?';
                if (badge.type === 'verified') char = '✓';
                if (badge.type === 'award') char = '🏆';
                if (badge.type === 'star') char = '★';
                if (badge.type === 'zap') char = '⚡';
                if (badge.type === 'thumbsup') char = '👍';
                if (badge.type === 'heart') char = '❤';
                if (badge.type === 'global') char = '🌎';
                if (badge.type === 'pro') char = '💼';
                ctx.fillText(char, 0, 2);
                ctx.restore();
            });
        };

        // NEW: Draw Generic Elements
        const drawElements = () => {
            elements.forEach(el => {
                ctx.save();

                if (el.type === 'text') {
                    // Text: Rotate around CENTER
                    const fontSize = el.fontSize || 24;
                    ctx.font = `${el.fontWeight || 'normal'} ${fontSize}px "${el.fontFamily || 'Inter'}", sans-serif`;
                    const metrics = ctx.measureText(el.text);
                    const width = metrics.width;
                    const height = fontSize; // Approx

                    const cx = el.x + width / 2;
                    const cy = el.y + height / 2;

                    ctx.translate(cx, cy);
                    ctx.rotate((el.rotation || 0) * Math.PI / 180);
                    ctx.scale(el.scale || 1, el.scale || 1);

                    // Selection border style
                    if (el.selected || selectedElementIds.includes(el.id)) {
                        ctx.strokeStyle = '#2563eb';
                        ctx.lineWidth = 2;
                    }

                    ctx.fillStyle = el.color || '#000000';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(el.text, 0, 0);

                    // Selection Box for Text
                    if (selectedElementIds.includes(el.id)) {
                        const metrics = ctx.measureText(el.text);
                        ctx.strokeRect(-5, -5, metrics.width + 10, (el.fontSize || 24) + 10);
                    }
                } else if ((el.type === 'polygon' || el.type === 'line') && el.points && el.points.length > 0) {
                    // Polygon OR Line (Vertex-Based): Rotate around CENTROID
                    // 1. Calculate Centroid
                    let sumX = 0;
                    let sumY = 0;
                    el.points.forEach(p => {
                        sumX += p.x;
                        sumY += p.y;
                    });
                    const cx = sumX / el.points.length;
                    const cy = sumY / el.points.length;

                    // 2. Translate to Absolute Centroid
                    ctx.translate(el.x + cx, el.y + cy);
                    ctx.rotate((el.rotation || 0) * Math.PI / 180);
                    ctx.scale(el.scale || 1, el.scale || 1);

                    // Selection border style
                    if (el.selected || selectedElementIds.includes(el.id)) {
                        ctx.strokeStyle = '#2563eb';
                        ctx.lineWidth = 2;
                    }

                    // 3. Draw Points relative to Centroid
                    if (el.type === 'polygon') {
                        ctx.fillStyle = el.fill || '#e2e8f0';
                        ctx.beginPath();
                        ctx.moveTo(el.points[0].x - cx, el.points[0].y - cy);
                        for (let i = 1; i < el.points.length; i++) {
                            ctx.lineTo(el.points[i].x - cx, el.points[i].y - cy);
                        }
                        ctx.closePath();
                        ctx.fill();
                    } else {
                        // Line
                        ctx.beginPath();
                        const pts = el.points.map(p => ({ x: p.x - cx, y: p.y - cy }));

                        if (pts.length > 0) {
                            ctx.moveTo(pts[0].x, pts[0].y);

                            if (el.lineType === 'spline') {
                                // Spline (Quadratic Clean Smoothing)
                                for (let i = 0; i < pts.length - 1; i++) {
                                    const p0 = pts[i];
                                    const p1 = pts[i + 1];

                                    if (i === 0) {
                                        ctx.moveTo(p0.x, p0.y);
                                    }

                                    // Midpoint for quadratic control
                                    const midX = (p0.x + p1.x) / 2;
                                    const midY = (p0.y + p1.y) / 2;

                                    // For a true spline through points, we need bezier. 
                                    // Simple approach: Curve to midpoint. 
                                    // Better approach for "smooth path" through points:
                                    // Use p0 as start, p1 as end? No, that's straight.
                                    // We need control points.

                                    // Simplest Smooth Path:
                                    // Draw curve from previous-mid to current-mid?
                                    // Let's use a simple quadratic curve strategy for "smoothness".
                                    // Actually, let's just use the standard "draw curve through points" approach.
                                    if (i < pts.length - 1) {
                                        var cpX = (p0.x + p1.x) / 2;
                                        var cpY = (p0.y + p1.y) / 2;
                                        if (i === 0) ctx.lineTo(cpX, cpY);
                                        else ctx.quadraticCurveTo(p0.x, p0.y, cpX, cpY);
                                    }
                                }
                                // Connect last segment
                                if (pts.length > 1) {
                                    const last = pts[pts.length - 1];
                                    const prev = pts[pts.length - 2];
                                    // Just line to last for now to ensure connection
                                    ctx.lineTo(last.x, last.y);
                                }

                            } else if (el.lineType === 'ortho') {
                                // Ortho (Step Connector)
                                for (let i = 0; i < pts.length - 1; i++) {
                                    const p0 = pts[i];
                                    const p1 = pts[i + 1];

                                    // Mid X break
                                    const midX = (p0.x + p1.x) / 2;

                                    ctx.lineTo(midX, p0.y);
                                    ctx.lineTo(midX, p1.y);
                                    ctx.lineTo(p1.x, p1.y);
                                }
                            } else {
                                // Straight
                                for (let i = 1; i < pts.length; i++) {
                                    ctx.lineTo(pts[i].x, pts[i].y);
                                }
                            }
                        }

                        ctx.strokeStyle = el.stroke || '#000';
                        ctx.lineWidth = el.strokeWidth || 4;
                        ctx.stroke();
                    }

                    if (el.stroke && el.type === 'polygon') {
                        ctx.strokeStyle = el.stroke;
                        ctx.lineWidth = el.strokeWidth || 2;
                        ctx.stroke();
                    }

                    if (el.selected || selectedElementIds.includes(el.id)) {
                        ctx.strokeStyle = '#2563eb';
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        // Draw vertex handles
                        ctx.fillStyle = '#2563eb';
                        el.points.forEach(p => {
                            ctx.beginPath();
                            // Handle coords relative to centroid
                            ctx.arc(p.x - cx, p.y - cy, 6, 0, Math.PI * 2);
                            ctx.fill();
                        });
                    }
                } else {
                    // Rect, Circle, Line: Rotate around CENTER (Unified)
                    let cx = 0;
                    let cy = 0;
                    const w = el.width || 100;
                    const h = el.height || 100;

                    if (el.type === 'rect') {
                        cx = w / 2;
                        cy = h / 2;
                    } else if (el.type === 'circle') {
                        const radius = el.width ? el.width / 2 : 50;
                        cx = radius;
                        cy = radius;
                    } else if (el.type === 'line') {
                        cx = w / 2;
                        cy = 0;
                    }

                    // Translate to Absolute Center
                    ctx.translate(el.x + cx, el.y + cy);
                    ctx.rotate((el.rotation || 0) * Math.PI / 180);
                    ctx.scale(el.scale || 1, el.scale || 1);

                    if (el.selected || selectedElementIds.includes(el.id)) {
                        ctx.strokeStyle = '#2563eb';
                        ctx.lineWidth = 2;
                    }

                    if (el.type === 'rect') {
                        ctx.fillStyle = el.fill || '#e2e8f0';
                        // Draw centered
                        ctx.fillRect(-cx, -cy, w, h);

                        if (el.stroke) {
                            ctx.strokeStyle = el.stroke;
                            ctx.lineWidth = el.strokeWidth || 2;
                            ctx.strokeRect(-cx, -cy, w, h);
                        }

                        if (selectedElementIds.includes(el.id)) ctx.strokeRect(-cx - 2, -cy - 2, w + 4, h + 4);
                    } else if (el.type === 'circle') {
                        const radius = el.width ? el.width / 2 : 50;
                        ctx.fillStyle = el.fill || '#e2e8f0';
                        ctx.beginPath();
                        // Draw centered at 0,0
                        ctx.arc(0, 0, radius, 0, Math.PI * 2);
                        ctx.fill();

                        if (el.stroke) {
                            ctx.strokeStyle = el.stroke;
                            ctx.lineWidth = el.strokeWidth || 2;
                            ctx.stroke();
                        }

                        if (selectedElementIds.includes(el.id)) {
                            ctx.strokeStyle = '#2563eb';
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    } else if (el.type === 'line') {
                        ctx.strokeStyle = el.stroke || '#000';
                        ctx.lineWidth = el.strokeWidth || 4;
                        ctx.beginPath();
                        // Draw centered line
                        ctx.moveTo(-cx, 0);
                        ctx.lineTo(cx, 0);
                        ctx.stroke();

                        if (selectedElementIds.includes(el.id)) ctx.strokeRect(-cx - 5, -5, w + 10, 10);
                    }
                }

                ctx.restore();
            });
        };

        const drawGrid = () => {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'; // Increased visibility
            ctx.lineWidth = 1;
            ctx.beginPath();

            // Vertical lines
            for (let x = 0; x <= WIDTH; x += GRID_SIZE) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, HEIGHT);
            }

            // Horizontal lines
            for (let y = 0; y <= HEIGHT; y += GRID_SIZE) {
                ctx.moveTo(0, y);
                ctx.lineTo(WIDTH, y);
            }

            ctx.stroke();
        };

        drawContent();

    }, [profession, template, customText, loadedImage, overlayOpacity, customPalette, customLogo, badges, faceConfig, elements, selectedElementIds, showGrid]); // Added showGrid dependency

    // Use ref for rect to avoid re-render loops
    const faceRectRef = useRef(null);

    // Mouse Event Handlers for Dragging
    const getMousePos = (evt) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        };
    };

    const handleMouseDown = (e) => {
        const pos = getMousePos(e);
        let clickedAny = false;

        // 0. Check New Elements (Topmost)
        // Reverse iterate to click top items first
        for (let i = elements.length - 1; i >= 0; i--) {
            const el = elements[i];
            // Simple hit detection (bounding boxes)
            let hit = false;
            if (el.type === 'text') {
                // Approx text hit
                if (pos.x >= el.x && pos.x <= el.x + 200 && pos.y >= el.y && pos.y <= el.y + 50) hit = true;
            } else if (el.type === 'rect') {
                if (pos.x >= el.x && pos.x <= el.x + (el.width || 100) && pos.y >= el.y && pos.y <= el.y + (el.height || 100)) hit = true;
            } else {
                if (pos.x >= el.x && pos.x <= el.x + 100 && pos.y >= el.y && pos.y <= el.y + 100) hit = true;
            }

            // Polygon & Vertex-Line Hit Test (Vertex & Body)
            if ((el.type === 'polygon' || el.type === 'line') && el.points && (el.selected || selectedElementIds.includes(el.id))) {
                // 1. Check Vertex Click
                for (let j = 0; j < el.points.length; j++) {
                    const p = el.points[j];
                    const dist = Math.sqrt(Math.pow(pos.x - (el.x + p.x), 2) + Math.pow(pos.y - (el.y + p.y), 2));
                    if (dist < 10) { // Hit radius for vertex
                        setDraggingItem({ type: 'vertex', id: el.id, pointIndex: j });
                        setDragOffset({ x: 0, y: 0 }); // offset not needed for vertex direct set
                        if (onSelectElement) onSelectElement(el.id, e.shiftKey);
                        clickedAny = true;
                        return;
                    }
                }
            }

            if (el.type === 'polygon' || (el.type === 'line' && el.points)) {
                // Ray casting for polygon body hit test or Line distance check
                // Simplified: Bounding box for now
                const minX = Math.min(...el.points.map(p => p.x)) + el.x;
                const maxX = Math.max(...el.points.map(p => p.x)) + el.x;
                const minY = Math.min(...el.points.map(p => p.y)) + el.y;
                const maxY = Math.max(...el.points.map(p => p.y)) + el.y;

                if (pos.x >= minX - 10 && pos.x <= maxX + 10 && pos.y >= minY - 10 && pos.y <= maxY + 10) {
                    // Expanded bounds for lines
                    hit = true;
                } else {
                    hit = false;
                }
            }

            if (hit) {
                setDraggingItem({ type: 'element', id: el.id });
                setDragOffset({ x: pos.x - el.x, y: pos.y - el.y });
                if (onSelectElement) onSelectElement(el.id, e.shiftKey);
                clickedAny = true;
                return;
            }
        }

        if (clickedAny) return;

        // If we didn't click an element, check other items BEFORE deselecting
        let clickedOther = false;


        // 1. Check Badges collision (reverse order)
        for (let i = badges.length - 1; i >= 0; i--) {
            const b = badges[i];
            const dist = Math.sqrt(Math.pow(pos.x - b.x, 2) + Math.pow(pos.y - b.y, 2));
            if (dist < 30) {
                setDraggingItem({ type: 'badge', id: b.id });
                setDragOffset({ x: pos.x - b.x, y: pos.y - b.y });
                clickedOther = true;
                return;
            }
        }

        if (faceRectRef.current) {
            const { x, y, w, h } = faceRectRef.current;
            if (pos.x >= x && pos.x <= x + w && pos.y >= y && pos.y <= y + h) {
                setDraggingItem({ type: 'face' });
                setDragOffset({ x: pos.x - x, y: pos.y - y });
                clickedOther = true;
                return;
            }
        }

        // Only deselect if we haven't clicked *any* interactive item
        if (!clickedAny && !clickedOther && onSelectElement) {
            onSelectElement(null);
        }
    };

    const handleMouseMove = (e) => {
        const pos = getMousePos(e);

        // Cursor logic
        let hover = false;
        // Check face hover
        if (faceRectRef.current) {
            const { x, y, w, h } = faceRectRef.current;
            if (pos.x >= x && pos.x <= x + w && pos.y >= y && pos.y <= y + h) hover = true;
        }
        // Check badge hover
        for (let b of badges) {
            const dist = Math.sqrt(Math.pow(pos.x - b.x, 2) + Math.pow(pos.y - b.y, 2));
            if (dist < 30) hover = true;
        }
        // Check element hover
        for (let el of elements) {
            if (pos.x >= el.x && pos.x <= el.x + 100 && pos.y >= el.y && pos.y <= el.y + 50) hover = true;
        }


        if (canvasRef.current) {
            canvasRef.current.style.cursor = draggingItem ? 'grabbing' : (hover ? 'move' : 'default');
        }


        if (!draggingItem) return;

        // Snapping Logic
        let targetX = pos.x - dragOffset.x;
        let targetY = pos.y - dragOffset.y;

        if (snapToGrid) {
            targetX = Math.round(targetX / GRID_SIZE) * GRID_SIZE;
            targetY = Math.round(targetY / GRID_SIZE) * GRID_SIZE;
        }

        if (draggingItem.type === 'badge' && onUpdateBadgePosition) {
            onUpdateBadgePosition(draggingItem.id, targetX, targetY);
        } else if (draggingItem.type === 'face' && onUpdateFaceConfig) {
            onUpdateFaceConfig({ ...faceConfig, x: targetX, y: targetY });
        } else if (draggingItem.type === 'element' && onUpdateElement) {
            onUpdateElement(draggingItem.id, { x: targetX, y: targetY });
        } else if (draggingItem.type === 'vertex' && onUpdateElement) {
            // Find element
            const el = elements.find(e => e.id === draggingItem.id);
            if (el) {
                // Update specific point
                // Local coordinate = (MousePos - ElementPos) - Rotation... NO rotation support for vertex editing yet simplicity
                // We need to update the point in the existing array
                const newPoints = [...el.points];
                const pIndex = draggingItem.pointIndex;
                // Calculate local relative to shape origin
                const rawX = pos.x;
                const rawY = pos.y;

                let finalX = rawX;
                let finalY = rawY;

                if (snapToGrid) {
                    finalX = Math.round(rawX / GRID_SIZE) * GRID_SIZE;
                    finalY = Math.round(rawY / GRID_SIZE) * GRID_SIZE;
                }

                // Clamp to canvas
                const clampedX = Math.max(0, Math.min(finalX, WIDTH));
                const clampedY = Math.max(0, Math.min(finalY, HEIGHT));

                newPoints[pIndex] = {
                    x: clampedX - el.x, // Vertex is relative to shape origin (el.x, el.y)
                    y: clampedY - el.y
                };
                onUpdateElement(draggingItem.id, { points: newPoints });
            }
        }
    };

    const handleMouseUp = () => {
        setDraggingItem(null);
    };

    // Global Drag Event Listeners
    useEffect(() => {
        if (draggingItem) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingItem, faceConfig, elements, badges, dragOffset]);

    // Helper functions (pure or with args)
    const drawTemplate = (ctx, template, palette) => {
        // Based on src/data/templates.js
        /* 
           styles: 'modern', 'clean', 'minimal', 'grid', 'bold'
        */
        if (template.style === 'modern') {
            ctx.fillStyle = palette[0];
            ctx.globalAlpha = 0.9;
            ctx.beginPath();
            ctx.moveTo(WIDTH * 0.4, 0);
            ctx.lineTo(WIDTH * 0.5, HEIGHT);
            ctx.lineTo(0, HEIGHT);
            ctx.lineTo(0, 0);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        } else if (template.style === 'bold') {
            ctx.fillStyle = palette[0];
            ctx.fillRect(0, HEIGHT * 0.75, WIDTH, HEIGHT * 0.25);
        } else if (template.style === 'clean') {
            // Personal Brand: Soft side gradient
            const gradient = ctx.createLinearGradient(0, 0, WIDTH * 0.5, 0);
            gradient.addColorStop(0, palette[0]); // Primary
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.globalAlpha = 0.8;
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            ctx.globalAlpha = 1.0;
        } else if (template.style === 'minimal') {
            // Minimalist: Clean, just a subtle accent
            ctx.fillStyle = palette[0];
            ctx.fillRect(WIDTH - 20, 0, 20, HEIGHT); // Right border
        } else if (template.style === 'grid') {
            // Grid: Panels simulation
            ctx.fillStyle = palette[1];
            ctx.globalAlpha = 0.2;
            ctx.fillRect(WIDTH / 3, 0, 2, HEIGHT);
            ctx.fillRect(2 * WIDTH / 3, 0, 2, HEIGHT);
            ctx.globalAlpha = 1.0;

            // Bottom bar
            ctx.fillStyle = palette[0];
            ctx.globalAlpha = 0.9;
            ctx.fillRect(0, HEIGHT - 80, WIDTH, 80);
            ctx.globalAlpha = 1.0;
        }
    };

    const drawText = (ctx, profession, customText, template) => {
        const layout = template?.layout || { textPosition: 'left' };

        let x = 50;
        let align = 'left';
        let yoffset = 0;

        if (layout.textPosition === 'center' || layout.textPosition === 'center-big') {
            x = WIDTH / 2;
            align = 'center';
            // If centered, maybe move up a bit if clean style
            if (template.style === 'clean') yoffset = -20;
        } else if (layout.textPosition === 'right') {
            x = WIDTH - 50;
            align = 'right';
        } else if (layout.textPosition === 'overlay-bottom') {
            x = WIDTH / 2;
            align = 'center';
            yoffset = HEIGHT / 2 - 40; // Push down
        }

        ctx.textAlign = align;
        ctx.textBaseline = 'middle';

        // Title
        ctx.fillStyle = customText?.color || '#ffffff';
        // Bold style has bigger font
        const fontSize = template.style === 'bold' ? 100 : 64;
        ctx.font = `bold ${fontSize}px "${customText?.font || 'Inter'}", sans-serif`;

        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 4;

        const titleText = customText?.title || profession?.label || 'Your Profession';
        ctx.fillText(titleText, x, 140 + yoffset);

        ctx.shadowBlur = 0;

        // Tagline
        ctx.fillStyle = '#f0f0f0';
        ctx.font = `32px "${customText?.font || 'Inter'}", sans-serif`;
        const taglineText = customText?.tagline || profession?.defaultTagline || 'Your Tagline Here';
        ctx.fillText(taglineText, x, 210 + yoffset);

        // Simple CTA/Details if not clean/minimal
        if (template.style !== 'minimal') {
            ctx.font = `20px "${customText?.font || 'Inter'}", sans-serif`;
            ctx.fillStyle = '#cbd5e1';
            ctx.fillText("www.linkedin.com/in/yourname", x, 260 + yoffset);
        }
    };

    return (
        <div className="w-full overflow-hidden rounded-lg shadow-lg border border-slate-200 bg-white">
            {/* Canvas scales with width, h-auto maintains aspect ratio */}
            <canvas
                ref={canvasRef}
                id="banner-canvas"
                width={WIDTH}
                height={HEIGHT}
                className="w-full h-auto block"
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};



export default BannerCanvas;
