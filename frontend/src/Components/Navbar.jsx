// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';




// function Navbar() {
//   const { isAuthenticated } =  useSelector((state) => state.auth)
//   return (
//     <div className="flex border-b py-3 px-20 justify-between items-center">
//       <Link to={"/"} className="text-xl font-semibold text-purple-600">VealthX</Link>
//       {!isAuthenticated ? 
//       <Link to={"/signup"} className="bg-purple-600 px-4 py-1 rounded-md text-white">Sign Up</Link>
//      : <Link to={"/signup"} className="bg-purple-600 px-4 py-1 rounded-md text-white">Log out</Link>}
//     </div>
//   );
// }

// export default Navbar;




import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../features/user/userSlice";

function Navbar() {
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } =  useSelector((state) => state.auth)


  const handleClick = () => {
    setPopup(!popup);
  };

  const handlePopUpClick = () => {
    setPopup(false)
  }
  

  const handleSubmit = async () => {
      const res = await dispatch(logOutUser()).unwrap();
      setPopup(false)
      navigate("/");
  };

  return (
    <div
      className={`sticky shadow top-0 z-10 flex justify-between items-center h-14 px-20`}
    >
      <div className="list-none flex gap-10 items-center">
        <Link
          to={"/"}
          className="cursor-pointer font-bold md:text-2xl text-purple-600 tracking-[2px]"
        >
          VealthX
        </Link>
      </div>
      <div className="flex gap-3 md:gap-4 items-center">
        {
          (isAuthenticated ? (
            <div className="relative cursor-pointer" onClick={handleClick}>
              <img
                src={user?.user?.image}
                alt="user"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-all duration-200 rounded-full"></div>
            </div>
          ) : (
            <Link
              to={"/signin"}
              className={"bg-purple-600 px-4 py-1 rounded-md text-white"}
            >
              Sign In
            </Link>
          ))}
      </div>

      {popup && (
        <div className="h-44 w-36  md:w-56 top-16 bg-white absolute -right-12 md:-right-5 border rounded-md mr-20 shadow-lg">
          <div className="list-none flex flex-col p-6 gap-4 text-gray-500 text-sm">
            <button className="cursor-pointer self-start hover:text-purple-600"  onClick={handleSubmit}>Sign out</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
