"use client";

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageBox from './components/MessageBox';
import MessageField from './components/MessageField';

const socket = io("http://localhost:3000"); // Add your server URL here

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isSender: boolean }[]>([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (msg: string) => {
      // Add the message to the list as a received message
      setMessages((prevMessages) => [...prevMessages, { text: msg, isSender: false }]);
    });

    // Clean up the event listener on component unmount
    return () => socket.off('message');
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim()) {
      // Emit the message to the server
      socket.emit('message', message);
      // Add the message to the local state as a sender
      setMessages((prevMessages) => [...prevMessages, { text: message, isSender: true }]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 p-4 overflow-auto">
          {messages.map((msg, index) => (
            <MessageBox key={index} text={msg.text} isSender={msg.isSender} />
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
