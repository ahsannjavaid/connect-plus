"use client";

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageBox from './components/MessageBox';
import MessageField from './components/MessageField';

const socket = io("http://localhost:3000"); // Add your server URL here

function formatTime(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { text: string; isSender: boolean; time?: string }[]
  >([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (msg: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: msg,
          isSender: false,
          time: formatTime(new Date()),
        },
      ]);
    });

    // Clean up the event listener on component unmount
    return () => socket.off('message');
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit('message', message);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: message,
          isSender: true,
          time: formatTime(new Date()),
        },
      ]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 p-4 overflow-auto">
          {messages.map((msg, index) => (
            <MessageBox key={index} text={msg.text} isSender={msg.isSender} time={msg.time} />
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <MessageField message={message} sendMessage={sendMessage} setMessage={setMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
