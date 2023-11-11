import React, { useState } from 'react';

function SurveyForm({ onSubmit }) {
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Create Survey</button>
    </form>
  );
}

export default SurveyForm;
