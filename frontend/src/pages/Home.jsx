import React from "react";
import Button from "../components/ui/Button";

const Home = () => {
  return (
    <div className="bg-putility-400 min-h-dvh">
      <div className="w-96 text-center text-white">
        <h1 className="font-black text-6xl">Make the first ‘Merry’</h1>
        <div className="font-semibold text-xl mt-10 mb-14">
            <p>If you feel lonely, let’s start meeting</p>
            <p>new people in your area!</p>
            <p>Dont’t forget to get Merry with us</p>
        </div>
        <button className='bg-pred-500 text-white font-bold rounded-full w-24 h-12'>Start matching!</button>
      </div>
      <div id="why-merry"></div>
      <div id="how-to"></div>
    </div>
  );
};

export default Home;
