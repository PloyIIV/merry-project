import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Matching/Matching.css";
import { useAuth } from "../../contexts/authenContext";

const svgSearchLogo = (
  <svg
    width="62"
    height="59"
    viewBox="0 0 62 59"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.0682 40.3261L22.0569 40.3193L22.0142 40.2968C21.1258 39.8135 20.2533 39.3014 19.3981 38.7614C17.3593 37.4786 15.4165 36.0489 13.5852 34.4839C9.44281 30.9111 4.83887 25.5507 4.83887 19.13C4.83907 17.035 5.48871 14.9917 6.69834 13.2812C7.90798 11.5708 9.61811 10.2775 11.5933 9.57924C13.5684 8.88102 15.7115 8.81229 17.7273 9.3825C19.7431 9.95272 21.5326 11.1338 22.8494 12.7632C24.1661 11.1338 25.9556 9.95272 27.9715 9.3825C29.9873 8.81229 32.1304 8.88102 34.1055 9.57924C36.0807 10.2775 37.7908 11.5708 39.0004 13.2812C40.2101 14.9917 40.8597 17.035 40.8599 19.13C40.8599 25.5507 36.2582 30.9111 32.1136 34.4839C29.5118 36.7069 26.6871 38.6549 23.6846 40.2968L23.6419 40.3193L23.6306 40.3261H23.6261C23.3869 40.4528 23.1204 40.5193 22.8497 40.5197C22.579 40.52 22.3123 40.4544 22.0727 40.3284L22.0682 40.3261Z"
      fill="#FF1659"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M39.8885 21.6787C37.0009 21.6787 34.2315 22.8258 32.1896 24.8677C30.1478 26.9095 29.0007 29.6789 29.0007 32.5665C29.0007 35.4542 30.1478 38.2235 32.1896 40.2654C34.2315 42.3072 37.0009 43.4543 39.8885 43.4543C42.7761 43.4543 45.5455 42.3072 47.5873 40.2654C49.6292 38.2235 50.7763 35.4542 50.7763 32.5665C50.7763 29.6789 49.6292 26.9095 47.5873 24.8677C45.5455 22.8258 42.7761 21.6787 39.8885 21.6787ZM26.0313 32.5665C26.0314 30.3507 26.563 28.1672 27.5813 26.1992C28.5997 24.2313 30.0751 22.5362 31.8839 21.2562C33.6926 19.9763 35.7819 19.1487 37.9766 18.843C40.1712 18.5373 42.4072 18.7623 44.4969 19.4992C46.5866 20.2361 48.4691 21.4634 49.9865 23.0781C51.504 24.6928 52.612 26.6479 53.2178 28.7793C53.8236 30.9107 53.9094 33.1564 53.4681 35.3278C53.0267 37.4992 52.0711 39.5331 50.6813 41.259L57.2694 47.8491C57.4153 47.985 57.5323 48.1489 57.6134 48.331C57.6946 48.5132 57.7382 48.7098 57.7417 48.9091C57.7453 49.1085 57.7086 49.3065 57.6339 49.4913C57.5592 49.6762 57.4481 49.8442 57.3071 49.9851C57.1661 50.1261 56.9982 50.2373 56.8133 50.3119C56.6284 50.3866 56.4304 50.4233 56.2311 50.4198C56.0317 50.4163 55.8351 50.3726 55.653 50.2915C55.4709 50.2103 55.307 50.0933 55.171 49.9475L48.5809 43.3593C46.545 44.9992 44.0867 46.0297 41.49 46.3318C38.8933 46.634 36.2641 46.1954 33.906 45.0668C31.548 43.9382 29.5573 42.1655 28.1638 39.9536C26.7704 37.7417 26.0311 35.1808 26.0313 32.5665Z"
      fill="#95002B"
    />
  </svg>
);

const ChatSidebar = () => {
  const { url } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await axios.get(`${url}/user/log`);
    setUsers(response.data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="">
      <div className="hidden lg:flex flex-col items-center text-center border border-pred-600 rounded-lg mx-3 my-5 px-2 py-5 bg-pgray-200">
        {svgSearchLogo}
        <h6 className="font-extrabold text-pred-600 text-lg">
          Discover New Match
        </h6>
        <p className="text-xs text-pgray-700">
          Start find and Merry to get know and connect with new friend!
        </p>
      </div>
      <hr />
      <div className="m-3 select-none">
        <h6 className="font-bold text-xl">Merry Match!</h6>
        <div>
          {!isLoading ? (
            <div className="h-24 flex gap-2 overflow-x-auto items-center">
              {users.map((user, index) => {
                if (user.image) {
                  return (
                      <img
                        key={index}
                        className="w-[80px] h-[80px] object-cover rounded-3xl cursor-pointer hover:ring-2 hover:ring-ppurple-200"
                        src={user.image[0]}
                        alt={user.username}
                        onClick={() => console.log(user)}
                      />
                  );
                }
              })}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </div>
      <div className="m-3">
        <h6 className="font-bold text-xl">Chat with Merry Match</h6>
        {!isLoading ? (
          <div className="ml-2 h-[400px] lg:h-[500px] overflow-y-scroll">
            {users.map((user, index) => {
              if (user.image) { 
                return (
                  <div key={index} className="flex items-center mt-3 hover:bg-pgray-100 border border-transparent hover:border-ppurple-700/50 hover:rounded-xl px-2 py-3">
                    <img
                      className="w-16 h-16 object-cover rounded-full"
                      src={user.image[0]}
                      alt={user.username}
                    />
                    <div className="ml-2">
                      <h6 className="font-semibold first-letter:uppercase">{user.username}</h6>
                      <p className="text-sm text-pgray-700">Content</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
