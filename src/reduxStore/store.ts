import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    count: counterSlice,
    authStore: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
