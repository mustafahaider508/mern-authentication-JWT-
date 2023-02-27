import { createSlice } from "@reduxjs/toolkit";
import authService from "../actions/authService"


const { SignUp,SignIn } = authService;
let user: any = {};


if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user")!);  
}
const initialState = {
  user: user ? user : {},
  isSuccess: false,
  isLoding: false,
  isError: false,
  message: "",
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
      reset:(state) => {
          state.isSuccess = false
          state.isLoding = false
          state.isError = false
          state.message = ''

      }
  },
  extraReducers(builder) {
    builder
      .addCase(SignUp.pending, (state) => {})
      .addCase(SignUp.fulfilled, (state, action: any) => {
        console.log(action.payload);
        state.user = action.payload;
        if (action.payload !== undefined) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
        }

        state.isError = false;
      })
      .addCase(SignUp.rejected, (state,action:any) => {
        state.user = action.payload
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(SignIn.pending, (state) => {})
      .addCase(SignIn.fulfilled, (state, action: any) => {
        console.log(action.payload);
        state.user = action.payload;
        if (action.payload !== undefined) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
        }
        state.isError = false;
      })
      .addCase(SignIn.rejected, (state, action:any) => {
        console.log("error", action.payload.message);
        state.user = action.payload.message;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
