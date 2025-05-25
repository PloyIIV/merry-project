import React from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import bg1 from "../../public/imgs/bg-1.jpeg";
import bg2 from "../../public/imgs/bg-2.jpeg";
import vector from "../../public/imgs/vector.png";
import logo from "../../public/imgs/logo.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-putility-400 md:w-full">
      <div className="w-full relative flex flex-col justify-center items-center">
        <img className="" src={bg1} alt="people" />
        <div className="w-96 text-center text-white lg:absolute">
          <h1 className="font-black text-6xl">Make the first ‘Merry’</h1>
          <div className="font-semibold text-xl mt-10 mb-14">
            <p>If you feel lonely, let’s start meeting</p>
            <p>new people in your area!</p>
            <p>Dont’t forget to get Merry with us</p>
          </div>
          <button
            onClick={() => navigate("/matching")}
            className="bg-pred-500 text-white font-bold rounded-full w-40 h-12"
          >
            Start matching!
          </button>
        </div>
      </div>

      <div
        id="why-merry"
        className="w-full h-full relative flex justify-center items-center"
      >
        <div className="flex flex-col-reverse lg:flex-row justify-evenly items-center">
          <div className="lg:w-2/4 w-9/12 text-white mt-10 lg:mt-0 ml-0 md:ml-10">
            <h1 className="text-pred-300 font-black text-5xl">
              Why Merry Match?
            </h1>
            <p>
              Merry Match is a new generation of online dating website for
              everyone
            </p>
            <br />
            <p>
              Whether you’re committed to dating, meeting new people, expanding
              your social network, meeting locals while traveling, or even just
              making a small chat with strangers.
            </p>
            <br />
            <p>
              This site allows you to make your own dating profile, discover new
              people, save favorite profiles, and let them know that you’re
              interested
            </p>
          </div>
          <img src={vector} alt="message" className="lg:mt-0 mt-10" />
        </div>
      </div>

      <div id="how-to"></div>
      <div
        id="footer"
        className="bg-white w-full h-52 mt-10 pb-3 flex justify-center items-center flex-col"
      >
        <div className="flex flex-col items-center">
          <img src={logo} alt="merry match logo" />
          <h2 className="text-pgray-700">New generation of online dating website for everyone</h2>
        </div>
        <hr className="border-pgray-300 w-3/4 border m-5" />
        <p className="text-pgray-500 text-xs">copyright ©2022 merrymatch.com All rights reserved</p>
      </div>
    </div>
  );
};

export default Home;
