import { configureStore } from "@reduxjs/toolkit";
import { Academia } from "../types/academia";
import authReducer from "./slices/authSlice"
import academiaReducer from "./slices/academiaSlice"


export const store = configureStore({
    reducer:{
        auth: authReducer,
        academia : academiaReducer
        
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;