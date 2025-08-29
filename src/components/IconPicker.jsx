import React from 'react';

// Simple SVG icons as React components
const ICONS = [
  {
    name: 'Star',
    svg: (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    )
  },
  {
    name: 'Heart',
    svg: (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    )
  },
  {
    name: 'Lightning',
    svg: (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v13h3v7l7-12h-4l4-8z"/></svg>
    )
  },
  {
    name: 'Smile',
    svg: (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1"/><circle cx="16" cy="10" r="1"/><path d="M8 16c1.333 1 2.667 1 4 0" stroke="#fff" strokeWidth="1.5" fill="none"/></svg>
    )
  }
];

const IconPicker = ({ selectedIcons, onIconSelect }) => {
  const handleToggle = (iconName) => {
    if (selectedIcons.includes(iconName)) {
      onIconSelect(selectedIcons.filter(i => i !== iconName));
    } else {
      onIconSelect([...selectedIcons, iconName]);
    }
  };
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Icon(s)</label>
      <div className="grid grid-cols-4 gap-2">
        {ICONS.map(icon => (
          <button
            key={icon.name}
            onClick={() => handleToggle(icon.name)}
            className={`text-3xl p-2 rounded-lg hover:bg-gray-200 transition-all duration-200 focus:outline-none ${selectedIcons.includes(icon.name) ? 'ring-2 ring-indigo-500 bg-indigo-100' : ''}`}
            title={icon.name}
          >
            {icon.svg}
          </button>
        ))}
      </div>
    </div>
  );
};

export { ICONS };
export default IconPicker;
