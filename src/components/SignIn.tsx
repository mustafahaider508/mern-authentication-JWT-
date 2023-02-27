import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import authService from "../store/actions/authService";
import { RootState, useAppDispatch } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { reset } from "@/store/actions/authSlice";
import { useRouter } from "next/router";

function SignIn() {
	  const { SignIn } = authService;
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, isSuccess, isError } = useSelector(
      (state: RootState) => state.auth
    );
	const [login, setLogin] = useState<any>({
    email: "",
    password: "",
  });

  const handelChange = (e: any) => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

   useEffect(() => {
     if (isSuccess === true) {
       toast.success("user Login Successfully");
       setTimeout(() => {
         router.push("/dashboard");
       }, 4000);
     }
     
  
   }, [isSuccess, isError, user]);

   const addValues = () => {
     if (login.email == "" || login.password == "") {
       toast.error("please fill form");
     } else {
       let data = {
         email: login.email,
         password: login.password,
       };

       dispatch(SignIn(data));
       setLogin({
         email: "",
         password: "",
       });
     }
   };
  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen bg-blue-200 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">
                  Login Form and Set your Goals
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      onChange={handelChange}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      onChange={handelChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      onClick={addValues}
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                    >
                      Submit
                    </button>
                  </div>
                  <p className="text-red-500"> {isError === true && user}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn
