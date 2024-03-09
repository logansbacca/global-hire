import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Employee from "./components/Employee";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Account from "./components/Account";
import Register from "./components/Register";
import About from "./components/About";
import Home from "./components/Home";
import { authContext } from "./context";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { faker } from "@faker-js/faker";

function App() {
  const [employees, setEmployees] = useState([]);
  const value = useContext(authContext);
  const { isAuth } = value;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/workers/find");
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="flex flex-wrap justify-center">
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={isAuth ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={isAuth ? <Navigate to="/" /> : <Register />}
            />

            <Route
              path="/"
              element={
                isAuth ? (
                  <>
                    {" "}
                    <NavBar /> <Home />
                  </>
                ) : (
                  <>
                    <Navigate to="/login" />
                  </>
                )
              }
            />
            <Route
              path="/hire"
              element={
                isAuth ? (
                  <>
                    <NavBar />
                    {employees.map((employee) => (
                      <Employee
                        name={employee.firstName}
                        surname={employee.lastName}
                        email={employee.email}
                        profession={employee.profession}
                        img={
                          employee.icon ? employee.icon : faker.image.avatar()
                        }
                        key={employee._id}
                        id={employee._id}
                      />
                    ))}
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/about"
              element={
                isAuth ? (
                  <>
                    {" "}
                    <NavBar /> <About />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/profile"
              element={isAuth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/account"
              element={isAuth ? <Account /> : <Navigate to="/login" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
