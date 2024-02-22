import Navbar from "./NavBar";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";

export default function Account() {
  const id = localStorage.getItem("id");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setName(data.userName);
          setEmail(data.email);
          setPassword(data.password);
        }
      } catch (error) {
        console.error("Error fetching information", error);
      }
    };
    fetchData(); // Call the fetchData function
  }, [id]); // Add id as a dependency

  const editValues = async () => {
    try {
      const response = await fetch(`http://localhost:3333/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          userName: name,
          password: password,
        }),
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Error editing information", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="h-full w-full p-4 md:p-8 lg:p-12">
        <div className="border-b-2 block md:flex">
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
            <div className="flex justify-between">
              <span className="text-xl font-semibold block">
                {name}'s Profile
              </span>
            </div>

            <span className="text-gray-600">
              Here you can edit your personal information!
            </span>
            <div className="w-full p-8 mx-2 flex justify-center">
              <img
                id="showImage"
                className="max-w-xs w-32 items-center border"
                src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                alt=""
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={editValues}
                className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
              >
                Confirm Edit
              </button>
            </div>
          </div>

          <div className="w-full md:w-3/5 p-4 md:p-8 bg-white lg:ml-4 shadow-md">
            <div className="rounded shadow p-4 md:p-6 lg:p-8">
              <div className="pb-6">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Name
                </label>
                <div className="flex">
                  <input
                    id="username"
                    className="border-1 rounded-r px-4 py-2 w-full"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="pb-4">
                <label
                  htmlFor="about"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  className="border-1 rounded-r px-4 py-2 w-full"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="text-gray-600 pt-4 block opacity-70">
                  Personal login information of your account
                </span>
              </div>
              <div className="pb-2">
                <label
                  htmlFor="about"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="border-1 rounded-r px-4 py-2 w-full"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="text-gray-600 pt-4 block opacity-70">
                  Personal login information of your account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
