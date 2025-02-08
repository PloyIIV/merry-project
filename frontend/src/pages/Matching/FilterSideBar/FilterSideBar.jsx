import React from "react";

const FilterSideBar = () => {
  return (
    <div className="xl:w-full xl:h-full flex flex-col items-center justify-between">
      <div className="flex flex-col items-start justify-center pt-5">
        <h6 className="font-bold text-md mb-3">Search by Keywords</h6>
        <div>
          <input
            type="text"
            className="bg-ppurple-100 py-1 rounded-md outline-none text-center"
          />
        </div>
        <br />
        <h6 className="font-bold text-md mb-3">Gender you interest</h6>
        <div className="md:ml-2 lg:ml-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="default"
              name="default"
              className="appearance-none w-5 h-5 border border-pgray-400 rounded-md bg-white mr-2 relative peer shrink-0 checked:bg-ppurple-500"
            />
            <label htmlFor="default">Default</label>
            <svg
              className="
                absolute 
                w-3 h-3 ml-1
                hidden peer-checked:block
                pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="female"
              name="female"
              className="appearance-none w-5 h-5 border border-pgray-400 rounded-md bg-white mr-2 relative peer shrink-0 checked:bg-ppurple-500"
            />
            <label htmlFor="female">Female</label>
            <svg
              className="
                absolute 
                w-3 h-3 ml-1
                hidden peer-checked:block
                pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="male"
              name="male"
              className="appearance-none w-5 h-5 border border-pgray-400 rounded-md bg-white mr-2 relative peer shrink-0 checked:bg-ppurple-500"
            />
            <label htmlFor="male">Male</label>
            <svg
              className="
                absolute 
                w-3 h-3 ml-1
                hidden peer-checked:block
                pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full px-3">
        <hr className="border-2 border-pgray-200 rounded-md w-full" />
        <div className="flex justify-around w-full">
          <button
            onClick={() => console.log("clear")}
            className="text-pred-500 font-bold px-2"
          >
            Clear
          </button>
          <button className="bg-pred-500 text-white font-bold rounded-full px-5 h-12 my-8">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
