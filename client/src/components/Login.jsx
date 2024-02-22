import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
   
    try {
      const response = await fetch("http://localhost:3333/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        localStorage.setItem("admin", data.data.admin);
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.data._id);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
          type="password"
        />
      </div>
      <br />
      <div className="flex flex-col items-center">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
          style={styles.button}
        />
        <br></br>
        <p>
          Don't have an Account? <a className="text-cyan-600" href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "300px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Login;
