import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, loginUser } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';


function Signin() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { register, handleSubmit, isSubmitting, formState: { errors }, setError } = useForm();
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


//   const formData = new FormData();
//   formData.append("email", email);
//   formData.append("password", password);

  const onSubmit = async (data) => {
    setLoading(true)
    try {
        const res = await dispatch(loginUser(data)).unwrap();
        if (res) {
          await dispatch(getUser()).unwrap();
          navigate("/");
        }
    } catch (error) {
      if (error.message) {
        const serverMessage = error.message;

        if (serverMessage === "Email is required") {
          setError('email', { type: 'server', message: 'Email is required' });
        } else if (serverMessage === "User doesn't exist") {
          setError('email', { type: 'server', message: "User with this email doesn't exist" });
        } else if (serverMessage === "Wrong password") {
          setError('password', { type: 'server', message: 'Wrong password' });
        } else {
          setServerError(serverMessage);
        }
      } else {
        setServerError("Something went wrong. Please try again.");
      }
      setLoading(false)
    }
  };


  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex mt-10 justify-center items-center gap-10">
        {/* left */}
        <div className="flex flex-col min-w-72 max-w-72 justify-between gap-6">


          <h2 className="font-bold text-2xl">Sign in</h2>



          <div className="flex flex-col gap-2 mt-4">
          {/* Email Field */}
          <div className="flex flex-col">
          <label htmlFor="email">Email<span>*</span></label>
          <input
            id="email"
            {...register('email', { required: "Email is required" })}
            type="text"
            placeholder="email"
            className="border rounded-lg py-2 px-3 focus:border-neutral-900 focus:ring-neutral-900 focus:ring-1 focus:outline-none"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>
          {/* Password Field */}
         <div className="flex flex-col">
         <label htmlFor="password">Password<span>*</span></label>
          <input
            id="password"
            {...register('password', { required: "Password is required" })}
            type="password"
            placeholder="password"
            className="border rounded-lg py-2 px-3 focus:border-neutral-900 focus:ring-neutral-900 focus:ring-1 focus:outline-none"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
         </div>
          {/* Server Error Message */}
          {serverError && <p className="text-red-600">{serverError}</p>}
        </div>
        <button  disabled={isSubmitting || loading}
              type="submit"
              className={`mt-8 tracking-wider text-center text-sm text-white  p-2 rounded-md w-full bg-purple-600 hover:bg-purple-500`}
            >
              {!loading ? "Sign in": "Signing in..."}
            </button>
          <Link to={"/signup"} className="text-center text-slate-500 text-[13px]">Don't have an account? <span className="text-black underline font-bold underline-offset-4 cursor-pointer">Sign up</span></Link>

        </div>
      </div>
    </form>
    </>
  );
}

export default Signin;
