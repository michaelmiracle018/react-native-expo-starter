import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDataFromStorage } from "~/utils/storageData";
import { ACCOUNT_TYPE, STORAGE_KEY } from "~/api/common/secretKeys";
import { responseToBooleanForObject } from "~/utils/checkValueForStorage";

export const authenticateUser = createAsyncThunk<any>(
  "auth/authenticate",
  async () => {
    try {
      const res = await getDataFromStorage(STORAGE_KEY);
      const requiredKeys = ["refreshToken", "accessToken"];
      const newRes = responseToBooleanForObject(res, requiredKeys);
      return newRes;
    } catch (err) {
      throw false;
    }
  },
);

export const userAccountType = createAsyncThunk(
  "users/accountType",
  async () => {
    try {
      const response = await getDataFromStorage(ACCOUNT_TYPE);
      return response;
    } catch (error) {
      return error;
    }
  },
);
type AccountType = {
  accountType: string;
};

// Define a type for the slice state
interface AuthState {
  value: number;
  isLoadingAuth: boolean;
  isUserAuthenticated: boolean;
  getUserAccountType: null | AccountType;
  isLoadingUserAccount: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  value: 0,
  isLoadingAuth: false,
  isUserAuthenticated: false,
  getUserAccountType: null,
  isLoadingUserAccount: false,
};

export const authSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(authenticateUser.fulfilled, (state, { payload }) => {
        state.isLoadingAuth = false;
        state.isUserAuthenticated = payload;
      })
      .addCase(authenticateUser.rejected, (state) => {
        state.isLoadingAuth = false;
      });
    builder
      .addCase(userAccountType.pending, (state) => {
        state.isLoadingUserAccount = true;
      })
      .addCase(userAccountType.fulfilled, (state, { payload }) => {
        state.isLoadingUserAccount = false;
        state.getUserAccountType = payload;
      })
      .addCase(userAccountType.rejected, (state) => {
        state.isLoadingUserAccount = false;
      });
  },
});

export const { increment, decrement } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default authSlice.reducer;
