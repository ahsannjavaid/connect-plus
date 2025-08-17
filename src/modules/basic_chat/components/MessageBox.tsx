import React from 'react';

interface MessageProps {
  text: string;
  isSender: boolean;
  time?: string; // Add optional time prop
}

const MessageBox: React.FC<MessageProps> = ({ text, isSender, time }) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : ''}`}>
      <div
        className={`mb-2 p-2 px-4 rounded-2xl inline-block ${
          !isSender
            ? 'rounded-tl-none bg-gray-200 text-gray-900 text-start'
            : 'rounded-tr-none bg-blue-500 text-white text-end'
        }`}
      >
        <div>{text}</div>
        {time && (
          <div
            className={`text-xs mt-1 opacity-70 ${
              isSender ? 'text-right' : 'text-left'
            }`}
          >
            {time}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
