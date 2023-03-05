import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import blogReducer from "../reducers/blogReducer";
import userReducer from "../reducers/userReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkFn = ThunkAction<void, RootState, unknown, AnyAction>;
export default store;
