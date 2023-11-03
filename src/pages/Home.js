import React from 'react'
import map_img from '../assets/map-img.png'
import { Link } from 'react-router-dom'

function Home() {
  return (
   <main className="flex h-screen bg-gradient-to-tr from-[#38383e] to-[#5f5d5d] overflow-hidden">
      <div className="left h-full flex flex-col justify-center items-center  w-[50%] space-y-10 p-11">
        <div className="text-5xl text-center text-white">
          Find Nearby Government Organization
        </div>
        <div className="btn text-center">
          <button className="text-blue-400 font-semibold bg-white p-4 px-8 hover:underline hover:text-blue-600 text-xl rounded-lg">
          <Link to="/login">Get Started &#8594;</Link> 
         
          </button>
        </div>
      </div>

      <div className="right flex flex-col justify-center items-center w-[50%] h-full p-16 pt-0 mt-5">
        <div className="upper_section flex flex-col relative left-20">
          <div className="access text-2xl text-white mt-0">
            Have An Authorized Access?
          </div>
          <div className="relative left-52 text-gray-200 font-semibold hover:cursor-pointer hover:underline">
            
            <Link to="Login">Click Here !</Link>
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
    </main>
  )
}

export default Home
