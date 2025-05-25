import React, { useState } from "react";
import { useRegister } from "../../contexts/registerContext";
// input[type="date"]::-webkit-calendar-picker-indicator {
//     background-color: yellow;
// }
import ProfileImage from "./ProfileImage";

export const StepOne = () => {
  const { data, setData } = useRegister();
  
  const onChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div>
      <h1 className="mb-3 text-xl text-ppurple-500 font-bold">
        Basic Information
      </h1>
      <div className="bg-purple-300/0 grid grid-cols-2">
        <div className="mr-5 mb-5">
          <p>Name</p>
          <input
            className="border w-full rounded-xl py-2 px-3"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            id="name"
            placeholder="John Snow"
          />
        </div>
        <div className="ml-5 mb-5">
          <p>Date of birth</p>
          <input
            className="border w-full rounded-xl py-2 px-3"
            onChange={onChangeHandler}
            value={data.date_of_birth}
            type="date"
            name="date_of_birth"
            id="date_of_birth"
          />
        </div>
        <div className="mr-5 mb-5">
          <p>Location</p>
          <input
            className="border w-full rounded-xl py-2 px-3"
            onChange={onChangeHandler}
            value={data.location}
            type="text"
            name="location"
            id="location"
            placeholder="Thailand"
          />
        </div>
        <div className="ml-5 mb-5">
          <p>City</p>
          <input
            className="border w-full rounded-xl py-2 px-3"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            name="city"
            id="city"
            placeholder="Bangkok"
          />
        </div>
        <div className="mr-5 mb-5">
          <p>Username</p>
          <input
            className="border w-full rounded-xl py-2 px-3"
            onChange={onChangeHandler}
            value={data.username}
            type="text"
            name="username"
            id="username"
            placeholder="At least 6 character"
          />
        </div>
        <div className="ml-5 mb-5">
          <p>Email</p>
          <input
            className="border w-full rounded-xl py-2 px-3"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            name="email"
            id="email"
            placeholder="name@website.com"
          />
        </div>
        <div className="mr-5 mb-5">
          <p>Password</p>
          <input
            className="border w-full rounded-xl py-2 px-3"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            name="password"
            id="password"
            placeholder="At least 8 charactors"
          />
        </div>
        <div className="ml-5 mb-5">
          <p>Confirm password</p>
          <input
            className="border w-full rounded-xl py-2 px-3"
            onChange={onChangeHandler}
            value={data.confirmPassword}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="At least 8 charactors"
          />
        </div>
      </div>
    </div>
  );
};

export const StepTwo = () => {
  const { data, setData, tags, setTags } = useRegister();
  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setData((data) => ({ ...data, [name]: value }));
  };
  const addTag = (event) => {
    if (event.key === "Enter") {
      const newString = event.target.value;
      let newArray = tags;
      let haveTag = tags.indexOf(newString);
      if (newString && tags.length < 10 && haveTag === -1) {
        newArray.push(newString.trim());
      }
      setTags(newArray);
      setInputValue("");
    }
  };
  const removeTag = (targetTag) => {
    const newArray = tags.filter((tag) => tag !== targetTag);
    setTags(newArray);
  };

  const sexOptions = (
    <>
      <option className="hidden" value="">
        Select...
      </option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </>
  );

  return (
    <div>
      <h1 className="mb-3 text-xl text-ppurple-500 font-bold">
        Identities and Interests
      </h1>
      <div className="bg-purple-300/0 grid grid-cols-2">
        <div className="mr-5 mb-5">
          <p>Sexual Identities</p>
          <select
            className={`w-full border rounded-xl p-2`}
            value={data.sexual_identities}
            onChange={onChangeHandler}
            name="sexual_identities"
            id="sexual_identities"
          >
            {sexOptions}
          </select>
        </div>
        <div className="ml-5 mb-5">
          <p>Sexual Preferences</p>

          <select
            className={`w-full border rounded-xl p-2`}
            value={data.sexual_preferences}
            onChange={onChangeHandler}
            name="sexual_preferences"
            id="sexual_preferences"
          >
            {sexOptions}
          </select>
        </div>
        <div className="mr-5 mb-5">
          <p>Racial Preferences</p>

          <select
            required
            className={`w-full border rounded-xl p-2`}
            value={data.racial_preferences}
            onChange={onChangeHandler}
            name="racial_preferences"
            id="racial_preferences"
          >
            <option value="asian">Asian</option>
            <option value="europe">Europe</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="ml-5 mb-5">
          <p>Meeting Interests</p>

          <select
            className={`w-full border rounded-xl p-2`}
            value={data.meeting_interests}
            onChange={onChangeHandler}
            name="meeting_interests"
            id="meeting_interests"
          >
            <option value="friend">Friend</option>
            <option value="boyfriend">Boyfriend / Girlfriend</option>
            <option value="casual">Casual</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="">
        <p>Hobbies / Interests (Maximum 10)</p>
        <div className="flex items-center flex-wrap border p-2 rounded-xl gap-2">
          {tags.map((tag, index) => {
            return (
              <div
                key={index}
                className="flex items-center rounded-xl h-8 px-3 bg-ppurple-100 text-ppurple-600 font-semibold"
              >
                {tag}
                <div
                  onClick={() => removeTag(tag)}
                  className="ml-2 cursor-pointer"
                >
                  ✖
                </div>
              </div>
            );
          })}
          <input
            className="flex-1 border-none outline-none p-1"
            onKeyUp={addTag}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            type="text"
            name="tags"
            id="tags"
            placeholder="Series"
          />
        </div>
      </div>
    </div>
  );
};

export const StepThree = () => {
  const { avatars, setAvatars } = useRegister();
  const maxUploads = 5;

  const updateAvatars = (newAvatars) => {
    setAvatars(newAvatars);
  };

  const countImage = () => {
    return maxUploads - Object.keys(avatars).length;
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files, "ไฟล์ที่เลือก");
    console.log(avatars, "ไฟล์ที่มีอยู่");
    const newAvatars = { ...avatars };

    for (let i = 0; i < files.length; i++) {
      if (Object.keys(newAvatars).length < maxUploads) {
        newAvatars[files[i].name] = files[i];
      }
    }
    setAvatars(newAvatars);
  };

  const handleRemoveImage = (avatarKey) => {
    const newAvatars = { ...avatars };
    delete newAvatars[avatarKey];
    updateAvatars(newAvatars);
  };

  const handleDragStartImage = (e, avatarKey) => {
    e.dataTransfer.setData("text/plain", avatarKey);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedAvatarKey = e.dataTransfer.getData("text/plain");
    const targetAvatarKey = e.target.getAttribute("data-key");
    const newAvatars = { ...avatars };
    const droppedFile = newAvatars[droppedAvatarKey];
    newAvatars[droppedAvatarKey] = avatars[targetAvatarKey];
    newAvatars[targetAvatarKey] = droppedFile;
    updateAvatars(newAvatars);
  };

  return (
    <div>
      <h1 className="text-xl text-ppurple-500 font-bold">Profile Pictures</h1>
      <h6 className="text-pgray-600">Upload at least {countImage()} photos</h6>

      <div className="w-full max-w-screen-2xl h-full flex flex-wrap justify-center p-5">
        {Object.keys(avatars).map((avatarKey, index) => {
          return (
            <div key={index}>
              <ProfileImage
                file={avatars[avatarKey]}
                onDragStartImage={() => handleDragStartImage(e, avatarKey)}
                onRemoveImage={() => handleRemoveImage(avatarKey)}
              />
            </div>
          );
        })}
        {[...Array(maxUploads - Object.keys(avatars).length)].map(
          (i, index) => {
            return (
              <label
                key={index}
                className={`mr-[24px] bg-pgray-200 w-[200px] h-[200px] rounded-3xl justify-center flex flex-col items-center ${
                  Object.keys(avatars).length >= maxUploads ? "hidden" : ""
                }`}
              >
                <div className="text-ppurple-600 text-lg">
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
                </div>
                <div className="text-ppurple-600 text-lg">Upload</div>
                <input
                  type="file"
                  id={`avatar${index}`}
                  name={`avatar${index}`}
                  onChange={handleFileChange}
                  accept="image/*"
                  hidden
                />
              </label>
            );
          }
        )}
      </div>
    </div>
  );
};

// {Object.keys(avatars).map((avatarKey, index) => {
//   <div
//     key={index}
//     className="relative"
//     draggable="true"
//     onDragStart={(e) => handleDragStartImage(e, avatarKey)}
//     onDrop={handleDrop}
//     onDragOver={(e) => e.preventDefault()}
//     data-key={avatarKey}
//   >
//     <ProfileImage
//       file={avatars[avatarKey]}
//       onDragStartImage={handleDragStartImage}
//       onRemoveImage={handleRemoveImage(avatarKey)}
//     />
//   </div>;
// })}
// {/*  */}

// {[...Array(maxUploads - Object.keys(avatars).length)].map(
//   (_, index) => (
//     <label
//       key={index}
//       className={`button-avatar mr-[24px] bg-pgray-200 w-[167px] h-[167px] rounded-[12px] flex flex-col justify-center items-center relative ${
//         Object.keys(avatars).length >= maxUploads ? "hidden" : ""
//       }`}
//     >
//       <div className="text-ppurple-600 text-lg">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="25"
//           height="24"
//           viewBox="0 0 25 24"
//           fill="none"
//         >
//           <path
//             d="M12.5 4.5V19.5M20 12H5"
//             stroke="#7D2262"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </div>
//       <div className="text-ppurple-600 text-lg">Upload</div>

//       <input
//         id={`avatar${index}`}
//         name={`avatar${index}`}
//         type="file"
//         onChange={handleFileChange}
//         hidden
//       />
//     </label>
//   )
// )}
