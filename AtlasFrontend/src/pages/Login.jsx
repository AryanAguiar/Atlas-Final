import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";
import {Button} from 'pixel-retroui'

const Login = () => {
    const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...LoginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;
    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginInfo),
      });
      const result = await response.json();
      const { message, success, error, jwtToken, name } = result;
      if (success) {
        handleSuccess(message);

        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("email", email);

        setTimeout(() => {
            navigate("/history");
        }, 1000);
      } else if (error) {
       const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }


    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <div
        className=" 
      flex flex-col justify-center items-center 
      h-screen w-screen text-4xl
      "
      >
<div className='pixelsDiv text-center flex flex-col mt-[-50px] mb-5'>
 <img src="\images\Logo.jpg" alt="Logo" 
         className='w-60 m-auto rounded-full ' />
        <div>
             <h1 className='text-9xl font-bold uppercase' style={{fontSize: "100px"}} glitch="Atlas"
        >Atlas</h1>
        <h2 className='pixelsDiv text-sm leading-0'>Detect. Explain. Verify</h2>    
        </div>
       
</div>
        
        <h1 className="text-5xl font-semibold leading-[3]">Login</h1>
        <form action="" onSubmit={handleSubmit} className="flex flex-col space-y-10 text-center">
          <div>
            <label htmlFor="email">Email: </label>
            <input
              onChange={handleInputChange}
              type="email"
              name="email"
              placeholder="email"
              autoFocus
              value={LoginInfo.email}
              className="pl-4"
            />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              placeholder="password"
              value={LoginInfo.password}
              className="pl-4"
            />
          </div>

            {/*
          <Button
      bg="#5dd20f"
  textColor="#ffffff"
  borderColor="#493c3c"
  shadow="#4f744e"
          type="submit" >
            Login
          </Button>
          */}
            <button type="submit" className="p-4 bg-lime-400 rounded-full m-4">
                <h1>Login</h1>
            </button>
          <p className='text-3xl'>Don't have an account? <Link to="/signup" className='text-lime-400' style={{color: "#5dd20f"}} glitch="Signup" >Signup</Link> </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login