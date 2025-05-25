import { useState } from "react";
import boy from "../../../public/imgs/boy-complaint-form-page.png";
import axios from "axios";
import Logo from "../../components/ui/Logo";
import { toast, ToastContainer } from "react-toastify";

const Complaint = () => {
  const url = "http://localhost:3000/post"
  const [issue, setIssue] = useState({
    title: "",
    date: "",
    description: "",
  });
  const handleSubmit = async () => {
    const result = await axios.post(
      `${url}/complaint`,
      issue
    );
    toast.success(result.data.message);
    setIssue({
      title: "",
      date: "",
      description: "",
    });
  };
  return (
    <div className="h-screen flex flex-col justify-between items-center md:justify-between">
      <ToastContainer position="bottom-center" theme="colored" />
      <div className="flex justify-center items-center w-full h-full md:w-[80%]">
        <div className="w-full flex flex-col-reverse md:flex-row justify-normal md:justify-between items-center">
          <div className="md:w-[60%] w-[90%]">
            <div className="mb-10">
              <h6 className="text-pbeige-700 font-semibold">COMPLAINT</h6>
              <div className="text-ppurple-500 font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-3">
                <h1>If you have any trouble</h1>
                <h1>Don't be afraid to tell us!</h1>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="title">Issue</label>
              <input
                type="text"
                name="title"
                id="title"
                value={issue.title}
                onChange={(event) =>
                  setIssue({ ...issue, title: event.target.value })
                }
                placeholder="Enter your issue here"
                className="p-2 mt-1 mb-5 rounded-lg border border-pgray-400 outline-none focus:ring-2 focus:ring-ppurple-200 placeholder:text-sm"
              />
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                name="description"
                id="description"
                value={issue.description}
                onChange={(event) =>
                  setIssue({ ...issue, description: event.target.value })
                }
                placeholder="Description..."
                rows={6}
                className="p-2 mt-1 mb-5 rounded-lg border border-pgray-400 outline-none focus:ring-2 focus:ring-ppurple-200"
              ></textarea>
              <label htmlFor="date">Date Submitted</label>
              <input
                type="date"
                name="date"
                id="date"
                value={issue.date}
                onChange={(event) =>
                  setIssue({ ...issue, date: event.target.value })
                }
                className="p-2 mt-1 mb-5 rounded-lg border border-pgray-400 outline-none focus:ring-2 focus:ring-ppurple-200"
              />
              <div className="flex justify-center items-center">
                <button
                  onClick={handleSubmit}
                  className="bg-pred-500 text-white rounded-full py-2 w-52"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="w-[25%] mt-[50px] md:mt-0">
            <img src={boy} alt="boy" />
          </div>
        </div>
      </div>
      <div className="w-full bg-pgray-200 mt-10 pb-10 flex flex-col items-center">
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
};

export default Complaint;
