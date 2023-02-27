import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";


const createGoals =async (data:any,token:any) => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await api.post("/api/create-goal",data,config)
    return res.data
    
}



const goalService = {
  createGoals,
};
export default goalService;
