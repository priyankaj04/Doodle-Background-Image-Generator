import React, { useState } from 'react'

const EMOJIS = ['😀', '😂', '😍', '🥳', '🚀', '⭐', '❤️', '🔥', '👍', '🍕', '🎉', '💡', '💯', '🤖', '🎨', '✨'];

const EmojiPicker = ({ selectedEmojis, onEmojiSelect }) => {
    const handleToggle = (emoji) => {
        if (selectedEmojis.includes(emoji)) {
            onEmojiSelect(selectedEmojis.filter(e => e !== emoji));
        } else {
            onEmojiSelect([...selectedEmojis, emoji]);
        }
    };
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            {selectedEmojis}
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Emoji(s)</label>
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {EMOJIS.map(emoji => (
                    <button
                        key={emoji}
                        onClick={() => handleToggle(emoji)}
                        className={`text-3xl p-2 rounded-lg hover:bg-gray-200 transition-all duration-200 focus:outline-none ${selectedEmojis.includes(emoji) ? 'ring-2 ring-indigo-500 bg-indigo-100' : ''}`}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmojiPicker

