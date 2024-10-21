import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  csrftoken: string;
  accesstoken: string;
}

const initialState = {
  csrftoken: "",
  accesstoken: "",
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
