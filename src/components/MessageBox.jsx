import React from 'react'

const MessageBox = ({ message }) => {
    if (!message) return null;
    return (
        <div className="mt-4 text-center text-red-500 font-medium">
            {message}
        </div>
    );
};

export default MessageBox
