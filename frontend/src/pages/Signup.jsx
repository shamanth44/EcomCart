import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

function Signup() {
  const { register, handleSubmit, isSubmitting, formState: { errors }, setError } = useForm();
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append('image', data.image[0]);

      try {
        const res = await dispatch(registerUser(formData)).unwrap();
        navigate("/signin");
  
      } catch (error) {
        if (error.message) {
          const serverMessage = error.message;
  
          if (serverMessage === "User already existed") {
            setError('email', { type: 'server', message: 'User with this email already exist' });
          } else if (serverMessage === "Password is required") {
            setError('password', { type: 'server', message: 'Password is required' });
          } else if (serverMessage === "Name is required") {
            setError('name', { type: 'server', message: 'Name is required' });
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
          <div className="flex flex-col min-w-72 max-w-72 justify-between gap-6">
            <h2 className="font-bold text-2xl">Create Account</h2>
            <div className="flex flex-col gap-2 mt-4">
              {/* Name Field */}
              <div className="flex flex-col">
                <label htmlFor="name">Name<span>*</span></label>
                <input
                  id="name"
                  {...register('name', { required: "Name is required" })}
                  type="text"
                  placeholder="name"
                  className="border rounded-lg py-2 px-3 focus:border-neutral-900 focus:ring-neutral-900 focus:ring-1 focus:outline-none"
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
              </div>

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

              {/* Profile Picture */}
              <div className="flex flex-col">
                <label htmlFor="image">Profile picture</label>
                <input
                  id="image"
                  {...register("image")}
                  type="file"
                  className="text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-500
                    hover:file:bg-gray-200"
                />
              </div>

              {/* Server Error Message */}
              {serverError && <p className="text-red-600">{serverError}</p>}
            </div>
            {/* Submit Button */}
            <button  disabled={isSubmitting || loading}
              type="submit"
              className={`mt-8 tracking-wider text-center text-sm text-white  p-2 rounded-md w-full bg-purple-600 hover:bg-purple-500`}
            >
              {!loading ? "Sign Up": "Signing up..."}
            </button>

            <Link to={"/signin"} className="text-center text-slate-500 text-[13px]">
              Already have an account? <span className="text-black underline font-bold underline-offset-4 cursor-pointer">Sign in</span>
            </Link>

            <p className="mt-14 text-center text-slate-500 text-xs">
              By creating an account, you agree to our <span className="underline underline-offset-3 cursor-pointer">terms of use.</span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;
