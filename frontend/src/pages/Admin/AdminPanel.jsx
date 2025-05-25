import { useNavigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import { useAuth } from "../../contexts/authenContext";
const icon3 = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.252 1.56803C8.17552 1.5234 8.08855 1.49988 8 1.49988C7.91145 1.49988 7.82448 1.5234 7.748 1.56803L2 4.92136L8 8.42136L14 4.92136L8.252 1.56803ZM14.5 5.78669L8.5 9.28669V15.2867L14.252 11.932C14.3275 11.888 14.3901 11.8249 14.4336 11.7491C14.4771 11.6733 14.5 11.5874 14.5 11.5V5.78669ZM7.5 15.2867V9.28669L1.5 5.78669V11.5C1.49997 11.5874 1.52286 11.6733 1.56637 11.7491C1.60989 11.8249 1.67251 11.888 1.748 11.932L7.5 15.2874V15.2867Z"
      fill="#ffb1c8"
    />
  </svg>
);

const icon4 = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.78806 2.49598C7.32646 1.56238 8.67366 1.56238 9.21206 2.49598L14.2361 11.196C14.7745 12.1296 14.1001 13.296 13.0233 13.296H2.97606C1.89846 13.296 1.22486 12.1296 1.76406 11.196L6.78806 2.49598ZM8.00006 4.49998C8.15919 4.49998 8.3118 4.56319 8.42433 4.67571C8.53685 4.78823 8.60006 4.94085 8.60006 5.09998V7.89998C8.60006 8.05911 8.53685 8.21172 8.42433 8.32424C8.3118 8.43676 8.15919 8.49998 8.00006 8.49998C7.84093 8.49998 7.68832 8.43676 7.5758 8.32424C7.46328 8.21172 7.40006 8.05911 7.40006 7.89998V5.09998C7.40006 4.94085 7.46328 4.78823 7.5758 4.67571C7.68832 4.56319 7.84093 4.49998 8.00006 4.49998ZM8.00006 11.7C8.21223 11.7 8.41572 11.6157 8.56575 11.4657C8.71578 11.3156 8.80006 11.1121 8.80006 10.9C8.80006 10.6878 8.71578 10.4843 8.56575 10.3343C8.41572 10.1843 8.21223 10.1 8.00006 10.1C7.78789 10.1 7.58441 10.1843 7.43438 10.3343C7.28435 10.4843 7.20006 10.6878 7.20006 10.9C7.20006 11.1121 7.28435 11.3156 7.43438 11.4657C7.58441 11.6157 7.78789 11.7 8.00006 11.7Z"
      fill="#ffb1c8"
    />
  </svg>
);
const homeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
      fill="#ffb1c8"
    />
  </svg>
);
const logoutIcon = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.66667 11.1665V11.8332C8.66667 12.3636 8.45595 12.8723 8.08088 13.2474C7.70581 13.6225 7.1971 13.8332 6.66667 13.8332H4C3.46957 13.8332 2.96086 13.6225 2.58579 13.2474C2.21071 12.8723 2 12.3636 2 11.8332V5.1665C2 4.63607 2.21071 4.12736 2.58579 3.75229C2.96086 3.37722 3.46957 3.1665 4 3.1665H6.66667C7.1971 3.1665 7.70581 3.37722 8.08088 3.75229C8.45595 4.12736 8.66667 4.63607 8.66667 5.1665V5.83317M11.3333 11.1665L14 8.49984L11.3333 11.1665ZM14 8.49984L11.3333 5.83317L14 8.49984ZM14 8.49984H4.66667H14Z"
      stroke="#ffb1c8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AdminPanel = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="w-1/12 sm:w-1/3 md:w-1/4 lg:w-1/6 h-full border-r border-pgray-300">
      <div className="w-full h-full">
        <div className="h-1/6 sm:flex flex-col justify-center items-center hidden">
          {<Logo />}
          <h6 className="my-1 text-pgray-600 font-bold">Admin Control Panel</h6>
        </div>

        <div className="h-3/5">
          <div className="h-16 flex items-center cursor-pointer hover:bg-pgray-200 sm:hidden">
            <div className="ml-[12%] mr-[7%]">{homeIcon}</div>
            <p className="font-bold text-pgray-700 hidden sm:block">
              Home
            </p>
          </div>
          <div className="h-16 flex items-center cursor-pointer hover:bg-pgray-200">
            <div className="ml-[12%] mr-[7%]">{icon3}</div>
            <p className="font-bold text-pgray-700 hidden sm:block">
              Merry Package
            </p>
          </div>
          <div
            onClick={() => navigate("/")}
            className="h-16 flex items-center cursor-pointer hover:bg-pgray-200"
          >
            <div className="ml-[12%] mr-[7%]">{icon4}</div>
            <a className="font-bold text-pgray-700 hidden sm:block">
              Complaint
            </a>
          </div>
        </div>
        <div className="border-t">
          <div
            onClick={() => logout()}
            className="h-16 flex items-center cursor-pointer hover:bg-pgray-200"
          >
            <div className="ml-[12%] mr-[7%]">{logoutIcon}</div>
            <p className="font-bold text-pgray-700 hidden sm:block">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
