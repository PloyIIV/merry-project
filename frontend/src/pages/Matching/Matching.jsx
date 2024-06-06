import React, { useEffect, useState } from "react";
import FilterSideBar from "./FilterSideBar/FilterSideBar";
import "./Matching.css";
import ChatSidebar from "../ChatSidebar/ChatSidebar";
import axios from "axios";
// import '../../index.css'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import PopupPreview from "../PopupPreview/PopupPreview";

const showEye = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_60_1806)">
      <rect
        x="10"
        y="10"
        width="32"
        height="32"
        rx="16"
        fill="white"
        fillOpacity="0.2"
        shapeRendering="crispEdges"
      />
      <path
        d="M26 28C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26C28 25.4696 27.7893 24.9609 27.4142 24.5858C27.0391 24.2107 26.5304 24 26 24C25.4696 24 24.9609 24.2107 24.5858 24.5858C24.2107 24.9609 24 25.4696 24 26C24 26.5304 24.2107 27.0391 24.5858 27.4142C24.9609 27.7893 25.4696 28 26 28Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5315 26.472C18.414 26.1667 18.414 25.8286 18.5315 25.5232C19.1133 24.0148 20.1383 22.718 21.4715 21.8035C22.8047 20.889 24.3836 20.3997 26.0003 20.4C29.4059 20.4 32.3147 22.528 33.4691 25.528C33.5867 25.8328 33.5859 26.1712 33.4691 26.4768C32.8873 27.9852 31.8623 29.2821 30.5291 30.1966C29.1959 31.1111 27.617 31.6004 26.0003 31.6C22.5947 31.6 19.6859 29.472 18.5315 26.472ZM29.2003 26C29.2003 26.8487 28.8632 27.6627 28.263 28.2628C27.6629 28.8629 26.849 29.2 26.0003 29.2C25.1516 29.2 24.3377 28.8629 23.7376 28.2628C23.1374 27.6627 22.8003 26.8487 22.8003 26C22.8003 25.1513 23.1374 24.3374 23.7376 23.7373C24.3377 23.1372 25.1516 22.8 26.0003 22.8C26.849 22.8 27.6629 23.1372 28.263 23.7373C28.8632 24.3374 29.2003 25.1513 29.2003 26Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_60_1806"
        x="0"
        y="0"
        width="56"
        height="56"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="2" dy="2" />
        <feGaussianBlur stdDeviation="6" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.249604 0 0 0 0 0.196181 0 0 0 0 0.520833 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_60_1806"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_60_1806"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const closeButton = (
  <svg
    width="70"
    height="70"
    viewBox="0 0 104 104"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_60_1552)">
      <rect x="10" y="10" width="80" height="80" rx="24" fill="white" />
      <g clipPath="url(#clip0_60_1552)">
        <g filter="url(#filter1_d_60_1552)">
          <path
            d="M37.502 62.4999L62.502 37.4999M37.502 37.4999L62.502 62.4999"
            stroke="#646D89"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            shapeRendering="crispEdges"
          />
        </g>
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_60_1552"
        x="0"
        y="0"
        width="104"
        height="104"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="2" dy="2" />
        <feGaussianBlur stdDeviation="6" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.249604 0 0 0 0 0.196181 0 0 0 0 0.520833 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_60_1552"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_60_1552"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_60_1552"
        x="25.002"
        y="24.9999"
        width="54"
        height="54"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="2" dy="2" />
        <feGaussianBlur stdDeviation="6" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.249604 0 0 0 0 0.196181 0 0 0 0 0.520833 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_60_1552"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_60_1552"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_60_1552">
        <rect
          width="50"
          height="50"
          fill="white"
          transform="translate(25 25)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const merryButton = (
  <svg
    width="70"
    height="70"
    viewBox="0 0 104 104"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_60_1555)">
      <rect x="10" y="10" width="80" height="80" rx="24" fill="white" />
      <g filter="url(#filter1_d_60_1555)">
        <path
          d="M49.1325 67.2875L49.12 67.28L49.0725 67.255C48.086 66.7182 47.1171 66.1496 46.1675 65.55C43.9034 64.1254 41.746 62.5379 39.7125 60.8C35.1125 56.8325 30 50.88 30 43.75C30.0002 41.4236 30.7216 39.1546 32.0649 37.2552C33.4081 35.3558 35.3072 33.9196 37.5005 33.1443C39.6938 32.3689 42.0736 32.2926 44.3121 32.9258C46.5506 33.559 48.5378 34.8706 50 36.68C51.4622 34.8706 53.4494 33.559 55.6879 32.9258C57.9264 32.2926 60.3062 32.3689 62.4995 33.1443C64.6928 33.9196 66.5919 35.3558 67.9351 37.2552C69.2784 39.1546 69.9998 41.4236 70 43.75C70 50.88 64.89 56.8325 60.2875 60.8C57.3983 63.2685 54.2617 65.4317 50.9275 67.255L50.88 67.28L50.8675 67.2875H50.8625C50.5969 67.4282 50.3009 67.502 50.0003 67.5024C49.6997 67.5028 49.4035 67.4299 49.1375 67.29L49.1325 67.2875Z"
          fill="#C70039"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_60_1555"
        x="0"
        y="0"
        width="104"
        height="104"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="2" dy="2" />
        <feGaussianBlur stdDeviation="6" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.249604 0 0 0 0 0.196181 0 0 0 0 0.520833 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_60_1555"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_60_1555"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_60_1555"
        x="20"
        y="22.501"
        width="64"
        height="59.0013"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="2" dy="2" />
        <feGaussianBlur stdDeviation="6" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.249604 0 0 0 0 0.196181 0 0 0 0 0.520833 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_60_1555"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_60_1555"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const Matching = () => {
  const url = "https://merry-project.vercel.app";
  const [count, setCount] = useState(0);
  const [users, setUser] = useState({});
  const [loading, setLoading] = useState(null);
  const [clicked, setClicked] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const result = await axios.get(`${url}/user/log`);
    setUser(result.data.data[count]);
    setLoading(false);
    console.log(result.data.data[count]);
  };

  useEffect(() => {
    fetchUsers();
  }, [count]);

  return (
    <div className="flex calHeight">
      {clicked ? (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
          <PopupPreview
            setClicked={setClicked}
            clicked={clicked}
            userId={users.id}
          />
        </div>
      ): <></>}
      <div className="w-[20%]">
        <ChatSidebar />
      </div>
      <div className="w-full bg-pred-800 flex items-center">
        {users ? (
          <div className="select-none w-full relative grid place-items-center">
            <div className="text-white flex items-center absolute bottom-12 z-10 left-[30%]">
              <h3 className="mr-2 font-bold text-xl first-letter:uppercase">
                {users.username}
              </h3>
              <h3 className="font-bold text-xl">{users.age}</h3>
              <div
                onClick={() => {
                  setClicked(!clicked);
                }}
                className="cursor-pointer"
              >
                {showEye}
              </div>
            </div>
            <div className="flex absolute z-10 -bottom-10">
              <div
                onClick={() => {
                  setCount(count + 1);
                }}
                className="cursor-pointer h-fit"
              >
                {closeButton}
              </div>
              <div
                onClick={() => {
                  setCount(count + 1);
                }}
                className="cursor-pointer h-fit"
              >
                {merryButton}
              </div>
            </div>
            <Swiper
              slidesPerView={"auto"}
              centeredSlides={true}
              navigation={true}
              spaceBetween={50}
              modules={[Pagination, Navigation]}
              className="mySwiper w-full"
            >
              {!loading && users.image ? (
                users.image.map((img, index) => {
                  return (
                    <SwiperSlide key={index} className="w-[250px] lg:w-[700px] lg:h-[700px]">
                      <div className="absolute bottom-0 rounded-3xl w-full h-full bg-gradient-to-t from-ppurple-800/100 from-0% to-60% to-transparent"></div>
                      <img className="rounded-3xl" src={img} alt={img} />
                    </SwiperSlide>
                  );
                })
              ) : (
                <div className="w-full h-[700px] items-center flex justify-center relative z-50">
                  <div className="spinner"></div>
                  </div>
              )}
            </Swiper>
          </div>
        ) : (
          <div className="text-white text-center w-full">
            <p>Discover more</p>
          </div>
        )}
      </div>
      <div className="w-[14%]">
        <FilterSideBar />
      </div>
    </div>
  );
};

export default Matching;
