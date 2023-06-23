import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setFilter: (filter, { payload }) => (filter = payload),
	},
});

export default filterSlice.reducer;

export const { setFilter } = filterSlice.actions;
