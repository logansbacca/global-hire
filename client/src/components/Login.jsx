import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onButtonClick = async () => {
    alert(email)
    alert(password)
    try {
      const response = await fetch('http://localhost:3333/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("ok")
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold">Login</div>
      </div>
      <br />
      <div className="flex flex-col items-center">
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          style={styles.input}
        />
      </div>
      <br />
      <div className="flex flex-col items-center">
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          style={styles.input}
        />
      </div>
      <br />
      <div className="flex flex-col items-center">
        <input className="inputButton" type="button" onClick={onButtonClick} value={'Log in'} style={styles.button} />
      </div>
    </div>
  )
}

const styles = {
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
    marginBottom: '10px'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer'
  }
}

export default Login
