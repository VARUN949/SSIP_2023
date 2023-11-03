import React from "react";
import map_img from "../assets/map-img.png";
import { Link } from "react-router-dom";
import { useState } from "react";
// import Form from "./Form/Form.js";
function Login() {
  const [userCredentials, setUserCredentials] = useState({
    unique_id: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      [name]: value,
    }));
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(userCredentials);
   
    // You can access userCredentials.unique_id and userCredentials.password here for further processing.
  };

  return (
    <div className="flex h-screen bg-gradient-to-tr from-[#3f3f56] to-[#6d6b75] overflow-hidden">
      {/*------------------- left side login form --------- */}
      <div className="left h-full flex flex-col justify-center items-center  w-[50%] space-y-10 p-11">
        <h2 className="text-white text-5xl">Authorized Access Login</h2>
        <form
          action="/"
          className="flex flex-col items-start relative right-16"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Unique id "
            name="unique_id"
            value={userCredentials.unique_id}
            onChange={handleInputChange}
            className="p-3 rounded-xl w-96"
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={userCredentials.password}
            onChange={handleInputChange}
            className="p-3 rounded-xl w-96 mt-8"
          />

          <button
          
            className="bg-white text-blue-800 p-3 w-96 text-xl mt-16 font-semibold rounded-md hover:text-blue-950"
            type="submit"
          >
            <Link to= "/Form" >Get System Access</Link> 
          </button>
        </form>
        <div className="mt-4 text-white relative right-[21%]">
            <div className="text-lg ">Forgot your Password ?</div>
            <div className="text-sm hover:text-gray-200 hover:underline hover:cursor-pointer mt-2">
              Click Here to Contact Office
            </div>
          </div>
       
      </div>

      {/* --------------------right side show case code only------------ */}
      <div className="right flex flex-col justify-center items-center w-[50%] h-full p-16 pt-0 mt-5">
        <div className="upper_section flex flex-col relative left-20">
          <div className="access text-2xl text-white mt-0">
            Don't Have An Authorized Access?
          </div>
          <div className="relative left-72 text-gray-200 font-semibold hover:cursor-pointer hover:underline">
            <Link to="/SignUp">Click Here </Link>
          </div>
        </div>

        {/* right side buttons division hospital,office college etc...*/}

        <div
          className="img mt-28 flex flex-col"
          style={{
            height: "550px",
            width: "550px",
            backgroundImage: `url(${map_img})`,
            backgroundRepeat: "repeat",
          }}
        >
          <div className="btn pt-8" id="1">
            <button className="bg-white text-blue-500 p-3 px-5 rounded-full rounded-br-none font-semibold ml-44">
              Government Hospital
            </button>
          </div>
          <div className="btn text-right" id="2">
            <button className="bg-white text-blue-500 p-3 px-5 rounded-full rounded-br-none font-semibold mt-36">
              Government Colleges
            </button>
          </div>
          <div className="btn" id="3">
            <button className="bg-white text-blue-500 p-3 px-5 rounded-full rounded-tr-none font-semibold mt-44 ml-56">
              Income Tax Office
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
