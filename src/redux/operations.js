import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

const contactsEndpoint = "contacts";
const userAuthEndpoint = "users";

const fetchContacts = createAsyncThunk(`${contactsEndpoint}/fetchAll`, async (_, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(contactsEndpoint);
		return data;
	} catch (e) {
		return rejectWithValue(e.message);
	}
});

const addContact = createAsyncThunk(`${contactsEndpoint}/addTask`, async ({ name, phone }, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(contactsEndpoint, { name, phone });
		return data;
	} catch (e) {
		return rejectWithValue(e.message);
	}
});

const deleteContact = createAsyncThunk(`${contactsEndpoint}/deleteContact`, async (id, { rejectWithValue }) => {
	try {
		const { data } = await axios.delete(`${contactsEndpoint}/${id}`);
		return data;
	} catch (e) {
		return rejectWithValue(e.message);
	}
});

//!============================================================================

const setAuthJWTHeader = token => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthJWTHeader = () => {
	axios.defaults.headers.common.Authorization = "";
};

const signupUser = createAsyncThunk("auth/register", async (cred, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(`${userAuthEndpoint}/signup`, cred);
		setAuthJWTHeader(data.token);
		return data;
	} catch (e) {
		return rejectWithValue(e.message);
	}
});

const login = createAsyncThunk("auth/login", async (cred, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(`${userAuthEndpoint}/login`, cred);
		setAuthJWTHeader(data.token);
		return data;
	} catch (e) {
		return rejectWithValue(e.message);
	}
});

const logout = createAsyncThunk("auth/login", async (_, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(`${userAuthEndpoint}/logout`);
		clearAuthJWTHeader(data.token);
		return data;
	} catch (e) {
		return rejectWithValue(e.message);
	}
});

export { fetchContacts, addContact, deleteContact, signupUser, login, logout };
