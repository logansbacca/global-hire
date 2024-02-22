import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./components/Employee";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Profile from "./components/Profile"
import Register from "./components/Register";
import PrivateRoutes from "./components/PrivateRoute";
import About from "./components/About";
import Home from "./components/Home"
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { faker } from "@faker-js/faker";

function App() {
  const [employees, setEmployees] = useState([]);
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
          <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route
                path="/hire"
                element={
                  <>
                    <NavBar className="w-full" />
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
                }
              />
            <Route path="/" element={ <><NavBar/><Home/></>} />
            <Route path="/about" element={ <><NavBar/><About/></>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
