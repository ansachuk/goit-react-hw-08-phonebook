import { createSlice } from "@reduxjs/toolkit";
import { login, signupUser } from "redux/operations";

const initialState = {
	user: { name: null, email: null },
	token: null,
	isLoggedIn: false,
	isRefreshing: false,
	isLoading: false,
	error: null,
};

const handleLoading = state => {
	state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
	state.isLoading = false;
	state.error = payload;
};

const handleFullfilled = state => {
	state.isLoading = false;
	state.error = null;
};

const handleLogin = (state, { payload: { token, user } }) => {
	handleFullfilled(state);
	state.token = token;
	state.user = user;
	state.isLoggedIn = true;
};

const authSlice = createSlice({
	name: "auth",
	initialState,

	extraReducers: {
		[signupUser.pending]: handleLoading,
		[login.pending]: handleLoading,
		[signupUser.rejected]: handleRejected,
		[login.rejected]: handleRejected,
		[signupUser.fulfilled]: handleLogin,
		[login.fulfilled]: handleLogin,
	},
});

export default authSlice.reducer;
