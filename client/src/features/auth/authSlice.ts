import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  csrftoken: string | null;
  accesstoken: string | null;
};

const initialState = {
  csrftoken: null,
  accesstoken: null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCsrf: (
      state,
      { payload: { csrftoken } }: PayloadAction<{ csrftoken: string }>
    ) => {
      state.csrftoken = csrftoken;
    },
    setAuth: (state, { payload: { access } }) => {
      state.accesstoken = access;
    },
    setLogout: (state) => {
      state.accesstoken = "";
    },
  },
});

export const { setCsrf, setAuth, setLogout } = authSlice.actions;
export default authSlice.reducer;
