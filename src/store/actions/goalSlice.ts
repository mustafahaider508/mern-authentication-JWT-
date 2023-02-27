import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService"



let goals: any = [];
const initialState = {
  gaols: goals,
  isSuccess: false,
  isLoding: false,
  isError: false,
  message: "",
};


export const createGoals = createAsyncThunk(
  "/createGoals",
  async (data: any, thunkAPI:any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return goalService.createGoals(data, token);
    } catch (error: any) {
      console.log("Error is here =>::", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const goalSlice = createSlice({
  name: "goalSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoding = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createGoals.pending, (state) => {})
      .addCase(createGoals.fulfilled, (state, action: any) => {
        console.log(action.payload);
        state.gaols = action.payload;
        if (action.payload !== undefined) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
        }

        state.isError = false;
      })
      .addCase(createGoals.rejected, (state, action: any) => {
        state.gaols = action.payload;
        state.isSuccess = false;
        state.isError = true;
      });
      
  },
});
export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
