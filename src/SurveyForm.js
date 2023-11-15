import React, { useState } from 'react';
import './index.css';

function SurveyForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
      Title:
    </label>
    <input
      type="text"
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
      Description:
    </label>
    <textarea
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      rows="3"
    ></textarea>
  </div>
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Create Survey
  </button>
</form>
  );
}

export default SurveyForm;