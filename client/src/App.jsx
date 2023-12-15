import "./input.css";
import { React, useState,useEffect } from "react";
import Employee from "./components/Employee";
import NavBar from "./components/NavBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { faker } from '@faker-js/faker';


function App() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/workers/find'); 
        if (response.ok) {
          const data = await response.json();
          setEmployees(data); // Update state with fetched data
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        // Handle fetch errors here
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once (on mount)



  return (
    <div className="App">
      <div className="flex flex-wrap justify-center">
      <NavBar/>
        {employees.map((employee) => (
          <Employee
            name={employee.firstName}
            surname={employee.lastName}
            email={employee.email}
            profession={employee.profession}
            img={ employee.icon ? employee.icon : faker.image.avatar()}
            key= {employee._id}
            id= {employee._id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
