import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // Prevent default form submission
    event.preventDefault(); 
    
    // Send form data to the API for login
    const response = await fetch('https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); // Get the JSON from the response
    if (response.ok) {
      localStorage.setItem('token', data.token); // Store the token
      localStorage.setItem('userEmail', email); // Store the user email
      navigate('/'); // Navigate to the home page
    } else {
      console.error('Login failed:', data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
