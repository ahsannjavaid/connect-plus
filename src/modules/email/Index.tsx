"use client";

import { useState } from 'react';

const EmailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/send_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, text }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Email sent successfully');
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending email');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Send Email</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">To</label>
        <input
          type="email"
          placeholder="Recipient's email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Subject</label>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium">Content</label>
        <textarea
          placeholder="Email content"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 border rounded h-32 resize-none focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>
      <button
        onClick={handleSendEmail}
        disabled={loading}
        className={`w-full py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition ${
          loading ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Sending...' : 'Send Email'}
      </button>
    </div>
  );
};

export default EmailForm;
