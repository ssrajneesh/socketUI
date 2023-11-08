import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    // Perform the login request to your API with the formData
    const response = await fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log(formData)
    if (response.status === 200) {
      // Handle successful login
      const data = await response.json();
      const { email, token } = data;
      console.log("hel")
      
      // Save the email and token to local storage
      localStorage.setItem('email', email);
      localStorage.setItem('token', token);
      
      // Redirect to the chat page on successful login
      navigate("/");
    } else {
      console.log(response.status,response)
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
