import React, { useEffect } from 'react';
import { ICONS } from './IconPicker';

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 320;

// Helper to get SVG string for a given icon name
function getIconSVG(name, size = 48) {
    const icon = ICONS.find(i => i.name === name);
    if (!icon) return null;
    // Render the SVG as a string with the correct size
    // This is a simple approach for our static icons
    let svgString = '';
    switch (name) {
        case 'Star':
            svgString = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="%230ea5e9" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
            break;
        case 'Heart':
            svgString = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="%23ef4444" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
            break;
        case 'Lightning':
            svgString = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="%23facc15" xmlns="http://www.w3.org/2000/svg"><path d="M7 2v13h3v7l7-12h-4l4-8z"/></svg>`;
            break;
        case 'Smile':
            svgString = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="%230ea5e9" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1"/><circle cx="16" cy="10" r="1"/><path d="M8 16c1.333 1 2.667 1 4 0" stroke="%23fff" stroke-width="1.5" fill="none"/></svg>`;
            break;
        default:
            return null;
    }
    return svgString;
}


const DoodleCanvas = ({ selectedEmojis = [], selectedIcons = [], selectedFlaticons = [], type = 'emoji', canvasRef }) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const emojiSize = 48;
        const padding = 8;
        let x, y;

        if (type === 'emoji') {
            if (!selectedEmojis.length) {
                ctx.fillStyle = '#9ca3af';
                ctx.font = '20px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Your doodle will appear here', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
                return;
            }
            let emojiIndex = 0;
            y = padding + emojiSize/2;
            while (y + emojiSize/2 <= CANVAS_HEIGHT) {
                x = padding;
                while (x + emojiSize/2 <= CANVAS_WIDTH) {
                    ctx.font = `${emojiSize}px sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(selectedEmojis[emojiIndex % selectedEmojis.length], x + emojiSize/2, y);
                    x += emojiSize + padding;
                    emojiIndex++;
                }
                y += emojiSize + padding;
            }
        } else if (type === 'icon') {
            const allIcons = [
                ...selectedIcons.map(name => ({ type: 'builtin', name })),
                ...selectedFlaticons.map(icon => ({ type: 'freepik', icon }))
            ];
            if (!allIcons.length) {
                ctx.fillStyle = '#9ca3af';
                ctx.font = '20px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Your doodle will appear here', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
                return;
            }
            let iconIndex = 0;
            y = padding;
            while (y + emojiSize <= CANVAS_HEIGHT) {
                x = padding;
                while (x + emojiSize <= CANVAS_WIDTH) {
                    const iconObj = allIcons[iconIndex % allIcons.length];
                    if (iconObj.type === 'builtin') {
                        const svgString = getIconSVG(iconObj.name, emojiSize);
                        if (svgString) {
                            const img = new window.Image();
                            img.onload = () => {
                                ctx.drawImage(img, x, y, emojiSize, emojiSize);
                            };
                            img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString);
                            if (img.complete) {
                                ctx.drawImage(img, x, y, emojiSize, emojiSize);
                            }
                        }
                    } else if (iconObj.type === 'freepik') {
                        const img = new window.Image();
                        img.crossOrigin = 'anonymous';
                        img.onload = () => {
                            ctx.drawImage(img, x, y, emojiSize, emojiSize);
                        };
                        // Use Freepik preview_url or small_thumb_url
                        const url = iconObj.icon.assets?.preview_url || iconObj.icon.assets?.small_thumb_url || '';
                        if (url) {
                            img.src = url;
                            if (img.complete) {
                                ctx.drawImage(img, x, y, emojiSize, emojiSize);
                            }
                        }
                    }
                    x += emojiSize + padding;
                    iconIndex++;
                }
                y += emojiSize + padding;
            }
        }
    }, [selectedEmojis, selectedIcons, selectedFlaticons, type, canvasRef]);

    return (
        <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg"
            style={{ display: 'block', background: '#f3f4f6' }}
        />
    );
};

export default DoodleCanvas;
