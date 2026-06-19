import { Academia } from "@/app/types/academia";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState = {
    Academia: "",
    token: ""
}

const academiaSlice = createSlice({
    name: 'academia',
    initialState,
    reducers:{
        login:(state, action: PayloadAction<{usuario: string, token: string}>)=> {
            state.token= action.payload.token;
            state.Academia= action.payload.usuario;
         
        },
        logout:(state)=>{
            state.token ="";
            state.Academia= "";
            

        }
    }
});

export const {login, logout} = academiaSlice.actions;
export default academiaSlice.reducer;