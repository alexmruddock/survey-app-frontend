import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    // Initialize state variables
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Used to redirect the user

    const handleLogin = async () => {
        const response = await fetch('https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store the token in localStorage
            localStorage.setItem('userEmail', email); // Store the user's email in localStorage
            navigate('/'); 
        } else {
            console.error('Login failed:', data.message);
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        
        // Send form data to the API for registration
        const response = await fetch('https://bookish-pancake-q7w7vvr66ggfxp5j-3000.app.github.dev/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            await handleLogin(); // If registration is successful, log in to the app automatically
            console.log('Registration successful');
        } else {
            const message = await response.text();
            console.error('Registration failed:', message);
        }
    };

    // JSX returned by the component
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;