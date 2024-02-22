import { createSlice } from "@reduxjs/toolkit";


const initialAuthState = { token: null, isAuth: false, email: null, displayName: null}
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        
        isLogin(state, action) {
            state.isAuth = true;
            state.token = action.payload;
        
        },

        getEmailId(state, action) {
            state.email = action.payload;
        },

        logout(state) {
            state.isAuth = false;
            state.token = null;
            
        },

        

        // updateProfile(state, action) {
        //     state.email = action.payload.email;
        //     state.displayName = action.payload.displayName;
        //     console.log("e",state.email, state.displayName);
        // }

        

        
    }
})

export const authActions = authSlice.actions;

export default authSlice;