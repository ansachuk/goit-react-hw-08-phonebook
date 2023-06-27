import { configureStore } from "@reduxjs/toolkit";

import contactsReducer from "./slices/contactsSlice";
import filterReducer from "./slices/filterSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
	reducer: { filter: filterReducer, contacts: contactsReducer, auth: authSlice },
});

export default store;
