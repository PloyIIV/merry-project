import axios from "axios";
import React, { useEffect, useState } from "react";
import { merryButton, closeButton } from "../Matching/Matching";
import "../../index.css";
import { useAuth } from "../../contexts/authenContext";

const locationSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6276 22.7196L11.6312 22.7208C11.8676 22.824 11.9996 22.8 11.9996 22.8C11.9996 22.8 12.1316 22.824 12.3692 22.7208L12.3716 22.7196L12.3788 22.716L12.4004 22.7064C12.5143 22.6535 12.6268 22.5975 12.7376 22.5384C12.9608 22.4232 13.2728 22.2504 13.646 22.0188C14.39 21.558 15.38 20.8596 16.3748 19.9008C18.362 17.9856 20.3996 14.9916 20.3996 10.8C20.3996 9.69692 20.1823 8.60462 19.7602 7.58548C19.3381 6.56635 18.7193 5.64034 17.9393 4.86033C17.1593 4.08032 16.2333 3.46158 15.2141 3.03944C14.195 2.6173 13.1027 2.40002 11.9996 2.40002C10.8965 2.40002 9.8042 2.6173 8.78507 3.03944C7.76593 3.46158 6.83992 4.08032 6.05991 4.86033C5.2799 5.64034 4.66116 6.56635 4.23902 7.58548C3.81688 8.60462 3.59961 9.69692 3.59961 10.8C3.59961 14.9904 5.63721 17.9856 7.62561 19.9008C8.45811 20.7004 9.37233 21.4103 10.3532 22.0188C10.7331 22.2547 11.124 22.4726 11.5244 22.6716L11.5988 22.7064L11.6204 22.716L11.6276 22.7196ZM11.9996 13.5C12.7157 13.5 13.4024 13.2156 13.9088 12.7092C14.4151 12.2029 14.6996 11.5161 14.6996 10.8C14.6996 10.0839 14.4151 9.39718 13.9088 8.89084C13.4024 8.38449 12.7157 8.10002 11.9996 8.10002C11.2835 8.10002 10.5968 8.38449 10.0904 8.89084C9.58407 9.39718 9.29961 10.0839 9.29961 10.8C9.29961 11.5161 9.58407 12.2029 10.0904 12.7092C10.5968 13.2156 11.2835 13.5 11.9996 13.5Z"
      fill="#FFB1C8"
    />
  </svg>
);

const PopupPreview = ({ clicked, setClicked, userId }) => {
  const { url } = useAuth();
  const [isLoading, setIsLoading] = useState(null);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    setIsLoading(true);
    const response = await axios.get(`${url}/user/${userId}`);
    setUser(response.data.data);
    setIsLoading(false);
  };
  const handlePrevImage = () => {
    if (count === 0) {
      setCount(user.image.length - 1);
    } else {
      setCount(count - 1);
    }
  };

  const handleNextImage = () => {
    if (count === user.image.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="border bg-white/95 rounded-3xl w-[1000px] h-[600px] flex p-10 shadow-xl shadow-gray-900">
      {!isLoading ? (
        <>
          <div className="w-[400px] h-[400px]">
            {user.image ? (
              <img
                src={user.image[count]}
                className="w-full h-full object-cover rounded-3xl"
                alt="user profile"
              />
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="spinner"></div>
                </div>
            )}
            <div className="flex -mt-10 justify-center">
              <div>{closeButton}</div>
              <div>{merryButton}</div>
            </div>
            {user.image ? (
              <div className="flex justify-between mx-2">
                <div className="font-bold text-pgray-700">
                  {count + 1} / {user.image.length}
                </div>
                <div className="text-pgray-700">
                  <button className="mr-2" onClick={handlePrevImage}>
                    ←
                  </button>
                  <button onClick={handleNextImage}>→</button>
                </div>
              </div>
            ) : (
              <div className="spinner"></div>
            )}
          </div>
          <div onClick={() => setClicked(!clicked)} className="bg-yellow-400/0 w-[500px] ml-10">
            <div className="">
              <div className="flex">
                <h1 className="font-extrabold text-3xl mr-5 first-letter:uppercase">
                  {user.username}
                </h1>
                <h1 className="font-extrabold text-3xl text-pgray-700">
                  {user.age}
                </h1>
              </div>
              <div className="flex">
                {locationSvg}
                <p className="text-pgray-700 ml-2">Bangkok, Thailand</p>
              </div>
            </div>
            <div className="flex my-8">
              <div>
                <p className="mb-5">Sexual Identities</p>
                <p className="mb-5">Sexual Preferences</p>
                <p className="mb-5">Racial Preference</p>
                <p className="">Meeting Interests</p>
              </div>
              <div className="ml-7 font-semibold text-pgray-700">
                <p className="mb-5">Female</p>
                <p className="mb-5">Male</p>
                <p className="mb-5">Indefinite</p>
                <p className="">Long-term commitment</p>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="font-bold text-2xl text-pgray-800 mb-2">
                About me
              </h3>
              <p>I know nothing</p>
            </div>
            <div>
              <h3 className="font-bold text-2xl text-pgray-800 mb-2">
                Hobbies and Interests
              </h3>
              <div className="flex flex-wrap h-28 overflow-y-auto">
                {user.hobbies ? (
                  user.hobbies.map((hobby, index) => {
                    return (
                      <div
                        key={index}
                        className="mr-2 mb-2 border-2 border-pred-200 py-2 px-3 rounded-xl w-fit h-fit text-pred-700"
                      >
                        {hobby}
                      </div>
                    );
                  })
                ) : (
                  <div>Nothing to show</div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
            <div className="spinner"></div>
        </div>
      )}
      <div className="absolute right-10">
        <button onClick={() => setClicked(!clicked)}>✖</button>
      </div>
    </div>
  );
};

export default PopupPreview;
