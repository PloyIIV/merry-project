import { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ComplaintList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [complainList, setComplaintList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("all");
  // const url = "http://localhost:3000/post";
  const url = 'https://merry-project.vercel.app/post'

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year}, ${hour}:${minute}`;
  }

  const handleClick = async (complaint) => {
    try {
      if (complaint.status === "new") {
        await axios.put(`${url}/complaint/${complaint.id}`, {
          status: "pending",
        });
        navigate(`/complaint/${complaint.id}`);
      } else {
        navigate(`/complaint/${complaint.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `${url}/complaint?keyword=${inputValue}&status=${status}`
      );
      setComplaintList(data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [inputValue, status]);

  return (
    <div className="w-screen h-screen flex">
      <AdminPanel />
      <div className="w-11/12 sm:w-2/3 md:w-3/4 lg:w-5/6 bg-pgray-100">
        <div className="w-full h-20 flex flex-col sm:flex-row sm:justify-between px-5 pt-1 sm:pt-0 md:px-14 items-center bg-white border-b">
          <h1>Complaint List</h1>
          <div className="flex">
            <input
              type="text"
              className="w-60 px-2 py-2 mr-2 border rounded-lg"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <select
              name="complain"
              id="complain"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-20 md:w-40 px-2 py-2 border focus:border-ppurple-300 rounded-lg text-sm "
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>
        </div>
        <div className="pt-3 px-3 md:pt-10 md:px-20 w-full flex justify-center">
          <table className="bg-white w-full rounded-3xl shadow-lg">
            <thead>
              <tr className="h-14 border-b text-pgray-700">
                <th className="w-1/12">User</th>
                <th className="w-1/6">Issue</th>
                <th className="w-2/6">Description</th>
                <th className="w-1/6">Date Submitted</th>
                <th className="w-1/6">Status</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                complainList?.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => handleClick(item)}
                      className="text-center h-16 hover:bg-pgray-100 cursor-pointer text-sm"
                    >
                      <td className="w-1/12">{item.user_id}</td>
                      <td className="w-1/6 text-start">{item.title}</td>
                      <td className="w-2/6 text-start">{item.description}</td>
                      <td className="w-1/6">{formatDate(item.created_at)}</td>
                      <td className="w-1/6">
                        <div className="flex justify-center items-center">
                          <p
                            className={`px-4 py-1 rounded-xl ${
                              item.status.toLowerCase() === "new"
                                ? "bg-pbeige-100 text-black"
                                : item.status.toLowerCase() === "pending"
                                ? "bg-pyellow-500 text-black"
                                : item.status.toLowerCase() === "resolved"
                                ? "bg-pgreen-100 text-pgreen-500"
                                : item.status.toLowerCase() === "cancel"
                                ? "bg-pgray-200 text-pgray-700"
                                : ""
                            }`}
                          >
                            {item.status}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplaintList;
