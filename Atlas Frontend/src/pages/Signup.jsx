import React, { useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";
const Signup = () => {
  
    const [SignupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...SignupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = SignupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:3000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SignupInfo),
      });
      const result = await response.json();
      const { message, success, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
            navigate("/login");
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
      flex flex-col justify-center align-middle items-center 
      h-screen w-screen text-4xl 
      "
      >

      <div className='pixelsDiv 
      ml-[-100px]
      text-center gap-10 items-center flex  mt-[-30px] '>
 <img src="\images\Logo.jpg" alt="Logo" 
         className='w-60 m-auto rounded-full ' />
        <div>
             <h1 className='text-9xl font-bold 
        uppercase mt-[-40px]
        'glitch="Atlas" >Atlas</h1>
        <h2 className='pixelsDiv text-sm leading-0'>Detect. Explain. Verify</h2>    
        </div>
       
</div>

        <h1 className="text-5xl font-semibold leading-[3]">Sign Up</h1>
        <form action="" onSubmit={handleSubmit} className="flex flex-col space-y-10">
          <div>
            <label htmlFor="name">Name: </label>
            <input
              onChange={handleInputChange}
              type="text"
              name="name"
              placeholder="name"
              value={SignupInfo.name}
              className="pl-4"
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              onChange={handleInputChange}
              type="email"
              name="email"
              placeholder="email"
              value={SignupInfo.email}
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
              value={SignupInfo.password}
              className="pl-4"
            />
          </div>

          <button type="submit" className="p-4 bg-lime-400 rounded-full m-4">
            Sign up
          </button>
          <p className="text-3xl text-center"> 
            Already have an account? <Link to="/login" className="text-lime-400" glitch="Login" > Login</Link>
          </p>
          
        </form>
        
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
