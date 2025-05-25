import { useEffect } from "react";
import { useAuth } from "../../contexts/authenContext";
import { useState } from "react";
import axios from "axios";
import Logo from "../../components/ui/Logo";
import PopupPreview from "../PopupPreview/PopupPreview";
import ProfileImage from "../Register/ProfileImage";

function Profile() {
  const { url, state } = useAuth();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [clicked, setClicked] = useState(false);
  const [img, setImg] = useState({});

  const fetchUser = async () => {
    setIsLoading(true);
    const response = await axios.get(`${url}/user/${state.id}`);
    setUser(response.data.data);
    setTags(response.data.data.hobbies);
    setImg(Object.entries(response.data.data.image));
    setIsLoading(false);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files.length);
    const newAvatars = { ...img };
    for (let i = 0; i < files.length; i++) {
      if (files) {
        newAvatars[files[i].name] = files[i];
      }
    }
    setImg(newAvatars);
  };

  const removeTag = (index) => {
    const updatedTags = [...tags];
    delete updatedTags[index];
    setTags(updatedTags);
  };

  const addTag = (event) => {
    if (event.key === "Enter" && inputValue) {
      event.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag) && tags.length < 10) {
        // Check if the new tag is not already in the list and the limit is not exceeded
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        setInputValue(""); // Clear the input field
      }
    }
  };

  const handleRemoveImage = (avatarKey) => {
    const newAvatars = { ...img };
    delete newAvatars[avatarKey];
    setImg(newAvatars);
  };

  const handleDragStartImage = (e, avatarKey) => {
    e.dataTransfer.setData("text/plain", avatarKey);
  };

  const updateUser = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("date_of_birth", user.date_of_birth);
    formData.append("location", user.location);
    formData.append("city", user.city);
    formData.append("email", user.email);
    formData.append("sexual_preferences", user.sexual_preferences);
    formData.append("sexual_identities", user.sexual_identities);
    formData.append("racial_preferences", user.racial_preferences);
    formData.append("meeting_interests", user.meeting_interests);
    formData.append("about_me", user.about_me);
    formData.append("tags", tags);
    for (let item in img) {
      if (Array.isArray(img[item])) {
        formData.append("avatar", img[item][1]);
      } else {
        formData.append("avatar", img[item]);
      }
    }
    const result = await axios.put(`${url}/user/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(result);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="body w-full flex justify-center items-center flex-col">
      {clicked ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <PopupPreview
            setClicked={setClicked}
            clicked={clicked}
            userId={user.id}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="w-full md:w-[80%] mt-20">
        {/* profile-header */}
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-end">
          {/* profile-container */}
          <div className="md:mb-0 mb-3">
            <h6 className="text-pbeige-700 font-semibold -mb-2">PROFILE</h6>
            <div className="text-ppurple-500 font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-3">
              <h1>Let's make profile</h1>
              <h1>to let others know you</h1>
            </div>
          </div>
          {/* profile-button-container */}
          <div className="flex flex-col md:flex-row">
            <button
              onClick={() => {
                setClicked(!clicked);
              }}
              className="bg-pred-100 font-semibold text-pred-700 rounded-full h-10 px-3 md:px-5 mb-2 md:mb-0 md:mr-2"
            >
              Preview Profile
            </button>
            <button
              onClick={updateUser}
              className="bg-pred-500 font-semibold text-white rounded-full h-10 px-3 md:px-5"
            >
              Update Profile
            </button>
          </div>
        </div>
        {/* Basic Information */}
        <div className="flex flex-col items-center md:block mt-5 md:mt-10">
          <h2 className="text-xl font-bold text-ppurple-500">
            Basic Information
          </h2>
          <div className="flex flex-col md:flex-row mt-5 gap-5 w-[60%] md:w-full">
            <div className="flex flex-col md:w-[50%]">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={user.name}
                name="name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="py-2 px-3 mt-1 border rounded-lg capitalize text-pgray-700"
              />
            </div>
            <div className="flex flex-col md:w-[50%]">
              <label htmlFor="date_of_birth">Date of birth</label>
              <input
                type="date"
                id="date_of_birth"
                value={user.date_of_birth}
                name="date_of_birth"
                onChange={(e) =>
                  setUser({ ...user, date_of_birth: e.target.value })
                }
                className="py-2 px-3 mt-1 border rounded-lg text-pgray-700"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-5 gap-5 w-[60%] md:w-full">
            <div className="flex flex-col md:w-[50%]">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={user.location}
                name="location"
                onChange={(e) => setUser({ ...user, location: e.target.value })}
                className="py-2 px-3 mt-1 border rounded-lg text-pgray-700"
              />
            </div>
            <div className="flex flex-col md:w-[50%]">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={user.city}
                name="city"
                onChange={(e) => setUser({ ...user, city: e.target.value })}
                className="py-2 px-3 mt-1 border rounded-lg text-pgray-700"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-5 gap-5 w-[60%] md:w-full">
            <div className="flex flex-col md:w-[50%]">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={user.username}
                name="username"
                disabled
                className="py-2 px-3 mt-1 border rounded-lg capitalize text-pgray-700 disabled:bg-white"
              />
            </div>
            <div className="flex flex-col md:w-[50%]">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={user.email}
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="py-2 px-3 mt-1 border rounded-lg text-pgray-700"
              />
            </div>
          </div>
        </div>
        {/* Identities and Interests */}
        <div className="flex flex-col items-center md:block mt-5 md:mt-10">
          <h2 className="text-xl font-bold text-ppurple-500">
            Identities and Interests
          </h2>
          <div className="flex flex-col md:flex-row mt-5 gap-5 w-[60%] md:w-full">
            <div className="flex flex-col md:w-[50%]">
              <label htmlFor="sexual_identities">Sexual Identities</label>
              <select
                type="text"
                id="sexual_identities"
                value={user.sexual_identities}
                name="sexual_identities"
                onChange={(e) =>
                  setUser({ ...user, sexual_identities: e.target.value })
                }
                className="py-2 px-3 mt-1 border rounded-lg capitalize text-pgray-700"
              >
                <option className="hidden" value="">
                  Select...
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col md:w-[50%]">
              <label htmlFor="sexual_preferences">Sexual Preferences</label>
              <select
                id="sexual_preferences"
                value={user.sexual_preferences}
                name="sexual_preferences"
                onChange={(e) =>
                  setUser({ ...user, sexual_preferences: e.target.value })
                }
                className="py-2 px-3 mt-1 border rounded-lg text-pgray-700"
              >
                <option className="hidden" value="">
                  Select...
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-5 gap-5 w-[60%] md:w-full">
            <div className="flex flex-col md:w-[50%]">
              <label htmlFor="racial_preferences">Racial Preferences</label>
              <select
                id="racial_preferences"
                value={user.racial_preferences}
                name="racial_preferences"
                onChange={(e) =>
                  setUser({ ...user, racial_preferences: e.target.value })
                }
                className="py-2 px-3 mt-1 border rounded-lg text-pgray-700"
              >
                <option value="asian">Asian</option>
                <option value="europe">Europe</option>
                <option value="africa">Africa</option>
                <option value="america">America</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col md:w-[50%]">
              <label htmlFor="meeting_interests">Meeting Interests</label>
              <select
                id="meeting_interests"
                value={user.meeting_interests}
                name="meeting_interests"
                onChange={(e) =>
                  setUser({ ...user, meeting_interests: e.target.value })
                }
                className="py-2 px-3 mt-1 border rounded-lg text-pgray-700"
              >
                <option className="hidden"></option>
                <option value="friend">Friend</option>
                <option value="boyfriend">Boyfriend / Girlfriend</option>
                <option value="casual">Casual</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col mt-5 w-[60%] md:w-full">
            <label htmlFor="hobbies">
              Hobbies and Interests (Maximum{" "}
              <strong className="text-ppurple-600">
                {isLoading ? "10" : 10 - tags.length}
              </strong>
              )
            </label>
            <div className="mt-1 border border-pgray-300 rounded-lg flex flex-wrap items-center">
              {tags ? (
                tags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-center items-center m-1 bg-opacity-50 bg-pred-100 py-2 px-3 rounded-xl w-fit h-fit text-pred-700"
                    >
                      {tag}
                      <div
                        onClick={() => removeTag(index)}
                        className="ml-2 font-black text-white cursor-pointer bg-pred-500 rounded-full w-4 h-4 flex justify-center items-center"
                      >
                        ⨯
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>Nothing to show</div>
              )}
              <input
                type="text"
                id="hobbies"
                name="hobbies"
                className="border-none outline-none pr-3"
                onKeyDown={addTag}
                placeholder={`${
                  tags.length < 10 ? "Add hobbies" : "Maximum 10 hobbies"
                }`}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
            </div>
          </div>
          <div className="flex flex-col mt-5 w-[60%] md:w-full">
            <label htmlFor="about_me">
              About Me (
              <strong className="text-ppurple-600">
                {isLoading ? "150" : 150 - user.about_me.length}
              </strong>{" "}
              Maximum characters)
            </label>
            <textarea
              id="about_me"
              name="about_me"
              className="border h-20 border-pgray-300 rounded-lg p-2 mt-1 text-pgray-700"
              value={user.about_me}
              maxLength={150}
              onChange={(e) => setUser({ ...user, about_me: e.target.value })}
            />
          </div>
        </div>
        {/* Profile pictures */}
        <div className="flex flex-col items-center md:block mt-5 md:mt-10">
          <div>
            <h2 className="text-xl font-bold text-ppurple-500">
              Profile pictures
            </h2>
            <p className="text-pgray-600">Upload at least 5 photos</p>
          </div>
          <div className="w-1/2 md:w-full flex flex-wrap justify-center mt-5 gap-10">
            {Object.keys(img).map((i, key) => {
              return (
                // <div>
                <div
                  key={key}
                  draggable="true"
                  onDragStart={(e) => handleDragStartImage(e)}
                  className="relative"
                >
                  <img
                    src={`${
                      Array.isArray(img[i])
                        ? img[i][1]
                        : URL.createObjectURL(img[i])
                    }`}
                    className="w-[200px] h-[200px] object-cover rounded-3xl"
                    alt={`${user.username}-${key}`}
                  />
                  <button
                    onClick={() => handleRemoveImage(i)}
                    className="w-9 h-9 bg-pred-700 bg-opacity-90 -top-2 -right-2 text-white rounded-full absolute"
                  >
                    x
                  </button>
                </div>
                // </div>
              );
            })}
            {[...Array(5 - Object.keys(img).length)].map((i, index) => {
              return (
                <label
                  key={index}
                  className={`bg-pgray-200 w-[200px] h-[200px] rounded-3xl justify-center flex flex-col items-center ${
                    img.length >= 5 ? "hidden" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M12.5 4.5V19.5M20 12H5"
                      stroke="#7D2262"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-ppurple-600 text-lg">Upload</p>
                  <input
                    type="file"
                    id={`avatars${index}`}
                    name={`avatars${index}`}
                    onChange={handleFileChange}
                    accept="image/*"
                    hidden
                  />
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-screen h-52 bg-pgray-200 mt-10 flex flex-col items-center">
        <div className="flex flex-col justify-center items-center mt-5">
          <Logo />
          <h5 className="-m-1">
            New generation of online dating website for everyone
          </h5>
        </div>
        <hr className="border border-pgray-400 w-80 my-4" />
        <p className="text-sm">
          copyright ©2022 merrymatch.com All rights reserved
        </p>
        <div className="flex gap-3 mt-3 text-white">
          <div className="bg-ppurple-500 rounded-full w-10 h-10 justify-center flex items-center">
            ❤︎
          </div>
          <div className="bg-ppurple-500 rounded-full w-10 h-10 justify-center flex items-center">
            ❀
          </div>
          <div className="bg-ppurple-500 rounded-full w-10 h-10 justify-center flex items-center">
            ⋆
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
