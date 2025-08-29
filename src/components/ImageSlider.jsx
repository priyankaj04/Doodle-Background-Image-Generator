import React from 'react'

const MIN_IMAGES = 3;
const MAX_IMAGES = 10;

const ImageSlider = ({ numImages, onNumImagesChange }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <label htmlFor="numImages" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Emojis: <span className="font-bold text-indigo-600">{numImages}</span>
        </label>
        <input
            id="numImages"
            type="range"
            min={MIN_IMAGES}
            max={MAX_IMAGES}
            value={numImages}
            onChange={(e) => onNumImagesChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
    </div>
);

export default ImageSlider
