import { createSlice } from "@reduxjs/toolkit";

import { fetchContacts, addContact, deleteContact } from "./operations";

const initialState = {
	items: [],
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

const contactsSlice = createSlice({
	name: "contacts",
	initialState,

	extraReducers: {
		[fetchContacts.pending]: handleLoading,
		[fetchContacts.fulfilled]: (state, { payload }) => {
			handleFullfilled(state);
			state.items = payload;
		},
		[fetchContacts.rejected]: handleRejected,

		[addContact.pending]: handleLoading,
		[addContact.fulfilled]: (state, { payload }) => {
			handleFullfilled(state);
			state.items.push(payload);
		},
		[addContact.rejected]: handleRejected,

		[deleteContact.pending]: handleLoading,
		[deleteContact.fulfilled]: (state, { payload }) => {
			handleFullfilled(state);
			state.items = state.items.filter(({ id }) => id !== payload.id);
		},
		[deleteContact.rejected]: handleRejected,
	},
});

export default contactsSlice.reducer;
