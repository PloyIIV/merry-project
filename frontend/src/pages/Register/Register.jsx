import React, { useState } from "react";
import { StepOne, StepTwo, StepThree } from "./RegisterForm";
import { useRegister } from "../../contexts/registerContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errorText, setErrorText] = useState("")
  const { data } = useRegister();

  const handlePrev = () => {
    if (step > 1) {
      setStep((step) => step - 1);
    }
  };
  const handleNext = () => {
    console.log(data)
    let isValid = true;
    if (data.name.trim() == "") {
      setErrorText("● Please enter your name")
      isValid = false
    }
    if (data.dateOfBirth == "") {
      setErrorText("● Please enter your date of birth")
      isValid = false;
    }
    if (data.location.trim() == "") {
      setErrorText("● Please enter your location")
      isValid = false
    }
    if (data.city.trim() == "") {
      setErrorText("● Please enter your city")
      isValid = false
    }
    if (data.username.trim() == "") {
      setErrorText("● Please enter your username")
      isValid = false
    }
    if (data.email.trim() == "") {
      setErrorText("● Please enter your email")
      isValid = false
    }
    if (data.password.length < 7) {
      setErrorText("● Password must be at least 8 characters")
      isValid = false
    }
    if (data.password !== data.confirmPassword) {
      setErrorText("● Password is not matched!")
      isValid = false
    }
    if (isValid && step < 3) {
      console.log(errorText);
      setErrorText("")
      setStep((step) => step + 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await axios.post("http://localhost:4000/user/register", data)
    console.log(result)
    navigate("/login")
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return null;
    }
  };

  return (
    <div className="relative calHeight">
      <div className=" w-[70%] top-20 relative -translate-x-1/2 left-1/2">
        <div className="flex justify-between items-end">
          <div className="">
            <h6 className="text-pbeige-700 font-semibold">REGISTER</h6>
            <div className="text-ppurple-500 font-extrabold text-5xl mt-3">
              <h1>Join us and start</h1>
              <h1>Matching</h1>
            </div>
          </div>
          <div className="flex">
            <button
              className="border flex px-3 py-2 rounded-2xl items-center hover:bg-ppurple-100"
              onClick={() => setStep(1)}
            >
              <div
                className={`w-14 h-14 text-2xl font-extrabold rounded-3xl grid place-items-center bg-pgray-300 ${
                  step === 1
                    ? "text-pred-600 border-ppurple-500"
                    : "text-pgray-700"
                }`}
              >
                1
              </div>
              {step === 1 ? (
                <div className="text-left ml-2">
                  <p className="text-xs text-pgray-700">Step 1/3</p>
                  <h2 className="text-ppurple-500 font-bold">
                    Basic Information
                  </h2>
                </div>
              ) : (
                <></>
              )}
            </button>
            <button
              className="border flex px-3 py-2 rounded-2xl items-center ml-3 hover:bg-ppurple-100"
              onClick={() => setStep(2)}
            >
              <div
                className={`w-14 h-14 text-2xl font-extrabold rounded-3xl grid place-items-center bg-pgray-300 ${
                  step === 2
                    ? "text-pred-600 border-ppurple-500"
                    : "text-pgray-700"
                }`}
              >
                2
              </div>
              {step === 2 ? (
                <div className="text-left ml-2">
                  <p className="text-xs text-pgray-700">Step 2/3</p>
                  <h2 className="text-ppurple-500 font-bold">
                    Identities and Interests
                  </h2>
                </div>
              ) : (
                <></>
              )}
            </button>

            <button
              className="border flex px-3 py-2 rounded-2xl items-center ml-3 hover:bg-ppurple-100"
              onClick={() => setStep(3)}
            >
              <div
                className={`w-14 h-14 text-2xl font-extrabold rounded-3xl grid place-items-center bg-pgray-300 ${
                  step === 3
                    ? "text-pred-600 border-ppurple-500"
                    : "text-pgray-700"
                }`}
              >
                3
              </div>
              {step === 3 ? (
                <div className="text-left ml-2">
                  <p className="text-xs text-pgray-700">Step 3/3</p>
                  <h2 className="text-ppurple-500 font-bold">Upload Photos</h2>
                </div>
              ) : (
                <></>
              )}
            </button>
          </div>
        </div>
        <div className="mt-14">
          {renderStep()} 
          <div className="text-red-600 font-extrabold">
          {errorText}
          </div>
        </div>
      </div>
      <div className="absolute justify-between px-36 flex items-center bottom-0 h-24 w-full border-t-2">
        <p className="text-pgray-700">{step}/3</p>
        <div>
          <button
            onClick={handlePrev}
            className={`text-pred-500 font-bold ${
              step <= 1 ? "text-pgray-500" : ""
            }`}
          >
            Prev
          </button>
          {step === 3 ? (
            <button
              onClick={handleSubmit}
              className={`text-white font-bold bg-pred-500 px-5 py-3 rounded-full ml-5 `}
            >
              Confirm
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`text-white font-bold bg-pred-500 px-5 py-3 rounded-full ml-5 `}
            >
              Next step
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
