import React from 'react'

const ActionButtons = ({ onGenerate, onDownload }) => (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
            onClick={onGenerate}
            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            ✨ Generate Doodle
        </button>
        <button
            onClick={onDownload}
            className="w-full sm:w-auto bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
            Download Image
        </button>
    </div>
);

export default ActionButtons
