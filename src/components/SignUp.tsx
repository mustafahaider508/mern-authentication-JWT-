import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Link from 'next/link';
import authService from "../store/actions/authService"
import { RootState, useAppDispatch } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import { reset } from "@/store/actions/authSlice";
import {useRouter } from "next/router";

const  SignUp = () => {
  const { SignUp } = authService;
  const dispatch = useAppDispatch();
  const router = useRouter();
   const { user, isSuccess ,isError} = useSelector(
     (state: RootState) => state.auth
   );
   const [signup,setSignUp] = useState<any>({
        name:"",
        email:"",
        password:""
    })

    const handelChange = (e:any) => {
        e.preventDefault();
        setSignUp({ ...signup ,[e.target.name]:e.target.value});
 }

 useEffect(() => {
   if (isSuccess === true) {
     toast.success("user added Successfully");
     setTimeout(() => {
          router.push("/login");
     },4000)
   }
   if (isError === true) {
     toast.error(user.message);
   }
     

 }, [isSuccess, isError, user]);


 const addValues = () => {
   if (signup.name == "" || signup.email == "" || signup.password == ""){
     toast.error("please fill form")
   }
   else {
     let data = {
       name: signup.name,
       email: signup.email,
       password: signup.password,
     };

     dispatch(SignUp(data));

     setSignUp({
       name: "",
       email: "",
       password: "",
     });

   }
     


}
  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen bg-orange-200 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">
                  SignUp For Your Account
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email Name"
                      value={signup.name}
                      onChange={handelChange}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      value={signup.email}
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
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      value={signup.password}
                      onChange={handelChange}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      onClick={addValues}
                      className="bg-orange-500 text-white rounded-md px-2 py-1"
                    >
                      Submit
                    </button>
                  </div>
                  <div>
                    <p className="text-center">or</p>
                    <Divider className="bg-grey-300" />
                    <div className="flex gap-3 py-2">
                      <p className="text-[15px] font-[600]  ">
                        Already have an account ?
                      </p>
                      <Link href="/login">
                        <span className="text-[15px]  underline text-blue-600">
                          login
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default  SignUp
