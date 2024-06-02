import { configureStore, createSlice } from "@reduxjs/toolkit";

let loggedIn: boolean

if (sessionStorage.getItem("loggedIn")) {
    loggedIn = true
} else {
    loggedIn = false
}
const initialState = {
    loggedIn: loggedIn,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logIn: (state) => {
                state.loggedIn = true
                sessionStorage.setItem("loggedIn", "true")
                // console.log(state.loggedIn)
        },
        logOut: (state) => {
            state.loggedIn = false
            sessionStorage.clear()
        }

    },
});

const store = configureStore({
    reducer: loginSlice.reducer,
});

export type IRootState = ReturnType<typeof store.getState>

const { logIn, logOut } = loginSlice.actions;


export {
    store,
    logIn,
    logOut
}