import React from 'react';

interface MessageFieldProps {
  message: string;
  setMessage: (value: string) => void;
  sendMessage: () => void;
}

const MessageField: React.FC<MessageFieldProps> = ({ message, setMessage, sendMessage }) => {
  return (
    <form onSubmit={sendMessage} className="flex items-center">
      <input
        type="text"
        className="flex-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type='submit'
      >
        Send
      </button>
    </form>
  );
};

export default MessageField;
