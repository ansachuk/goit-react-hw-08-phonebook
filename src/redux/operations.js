import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

axios.defaults.baseURL = "https://648ee64775a96b66444471b0.mockapi.io/";

const stateDefaultName = "contacts";

const fetchContacts = createAsyncThunk(`${stateDefaultName}/fetchAll`, async (_, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(stateDefaultName);
		return data;
	} catch (e) {
		return rejectWithValue(e.message);
	}
});

const addContact = createAsyncThunk(`${stateDefaultName}/addTask`, async ({ name, phone }, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(stateDefaultName, { name, phone });
		return data;
	} catch (e) {
		return rejectWithValue(e.message);
	}
});

const deleteContact = createAsyncThunk(`${stateDefaultName}/deleteContact`, async (id, { rejectWithValue }) => {
	try {
		const { data } = await axios.delete(`${stateDefaultName}/${id}`);
		return data;
	} catch (e) {
		return rejectWithValue(e.message);
	}
});

export { fetchContacts, addContact, deleteContact };
