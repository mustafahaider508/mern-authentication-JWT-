import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";

const SignUp = createAsyncThunk("/SignUp", async (data: any, thunkAPI) => {
  try {
    const res = await api.post("/user/register", data);
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error: any) {
    console.log("Error is here =>::", error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


const SignIn = createAsyncThunk("/SignIn", async (data: any, thunkAPI) => {
  try {
    const res = await api.post("/user/login", data);
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error: any) {
    console.log("Error is here =>::", error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authService = {
  SignUp,
  SignIn,
};
export default authService;
