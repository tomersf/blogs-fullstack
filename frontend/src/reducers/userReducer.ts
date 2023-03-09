import { createSlice } from "@reduxjs/toolkit";
import { ActionLogIn } from "../interfaces";

interface InitialState {
  username: string | null;
  asGuest: boolean;
  loggedIn: boolean;
}

const initialState: InitialState = {
  username: null,
  asGuest: true,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      state.username = null;
      state.asGuest = false;
      state.loggedIn = false;
    },
    logIn(state, action: ActionLogIn) {
      state.username = action.payload;
      state.asGuest = false;
      state.loggedIn = true;
    },
    logAsGuest(state) {
      state.asGuest = true;
      state.loggedIn = true;
    },
  },
});

export const { logIn, logOut, logAsGuest } = userSlice.actions;
export default userSlice.reducer;
