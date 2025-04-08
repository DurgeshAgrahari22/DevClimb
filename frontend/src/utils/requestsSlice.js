import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:'requests',
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{
            return action.payload
        },
        removeRequest:(state,action)=>{
            return state.filter((field)=>field._id!==action.payload);
        }
    }
})

export const {addRequests,removeRequest} = requestSlice.actions
export default requestSlice.reducer