import { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ComplaintDetail = () => {
  // const url = "http://localhost:3000/post/complaint";
  const url = "https://merry-project.vercel.app/post/complaint"
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [complaint, setComplaint] = useState();
  const param = useParams();

  const handleResolve = async (stat) => {
    setIsLoading(true);
    const date_resolved = new Date();
    const { data } = await axios.put(`${url}/${param.id}`, {
      status: stat,
      date_resolved,
    });
    setComplaint(data.data[0]);
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/${param.id}`);
      setComplaint(data.data[0]);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="w-screen h-screen flex">
      <AdminPanel />
      {!isLoading ? (
        <div className="w-11/12 sm:w-2/3 md:w-3/4 lg:w-5/6 bg-pgray-100">
          <div className="w-full h-20 flex justify-between sm:flex-row sm:justify-between px-5 pt-1 sm:pt-0 md:px-14 items-center bg-white border-b">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="hover:bg-pgray-300 px-3 py-2 md:mr-4 rounded-full"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7915 7.00501H3.62148L8.50148 2.12501C8.89148 1.73501 8.89148 1.09501 8.50148 0.705006C8.11148 0.315006 7.48148 0.315006 7.09148 0.705006L0.501484 7.29501C0.111484 7.68501 0.111484 8.31501 0.501484 8.70501L7.09148 15.295C7.48148 15.685 8.11148 15.685 8.50148 15.295C8.89148 14.905 8.89148 14.275 8.50148 13.885L3.62148 9.00501H14.7915C15.3415 9.00501 15.7915 8.55501 15.7915 8.00501C15.7915 7.45501 15.3415 7.00501 14.7915 7.00501Z"
                    fill="#9AA1B9"
                  />
                </svg>
              </button>
              <h1
                className={`font-bold ${
                  complaint.status === "pending" ? "hidden md:block" : ""
                }`}
              >
                {complaint.title}
              </h1>
              <div
                className={`px-3 py-1 md:ml-2 text-sm font-bold rounded-xl ${
                  complaint.status === "pending"
                    ? "bg-pyellow-500 text-black"
                    : complaint.status === "resolved"
                    ? "bg-pgreen-100 text-pgreen-500"
                    : complaint.status === "cancel"
                    ? "bg-pgray-200 text-pgray-700"
                    : ""
                }`}
              >
                {complaint.status}
              </div>
            </div>
            <div
              className={`${
                complaint.status === "resolved"
                  ? "hidden"
                  : complaint.status === "cancel"
                  ? "hidden"
                  : "flex"
              }`}
            >
              <button
                onClick={() => handleResolve("cancel")}
                className="font-bold text-pred-500 hover:underline hover:underline-offset-4"
              >
                Cancel Complaint
              </button>
              <button
                onClick={() => handleResolve("resolved")}
                className="text-white bg-pred-500 px-3 py-2 md:px-5 md:py-3 rounded-full ml-5"
              >
                Resolve Complaint
              </button>
            </div>
          </div>
          <div className="pt-3 px-3 md:pt-10 md:px-20 w-full flex justify-center">
            <div className="bg-white w-full px-20 py-14 rounded-3xl shadow-lg">
              <div className="flex items-end mb-5">
                <h1>Complaint by:</h1>
                <p className="ml-2 font-bold text-sm text-pred-500 capitalize">
                  {complaint.username}
                </p>
              </div>
              <hr />
              <div className="mt-7">
                <h2 className="font-semibold text-pgray-700 mb-2">Issue</h2>
                <p>{complaint.title}</p>
              </div>
              <div className="mt-7">
                <h2 className="font-semibold text-pgray-700 mb-2">
                  Description
                </h2>
                <p>{complaint.description}</p>
              </div>
              <div className="mt-7">
                <h2 className="font-semibold text-pgray-700 mb-2">
                  Date Created
                </h2>
                <p>{complaint.created_at}</p>
              </div>
              <div
                className={`${
                  complaint.date_resolved == null ? "hidden" : "mt-7"
                }`}
              >
                <hr />
                <div className="flex my-4">
                  <h2 className="font-semibold text-pgray-700 mr-3">
                    Closed Date
                  </h2>
                  <p>{complaint.date_resolved}</p>
                </div>
                <div className="flex">
                  <h2 className="font-semibold text-pgray-700 mr-2">by:</h2>
                  <p className="capitalize">{complaint.admin_username}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-2/3 md:w-3/4 lg:w-5/6 flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-pred-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintDetail;
