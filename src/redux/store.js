import { configureStore } from "@reduxjs/toolkit";

import contactsReducer from "./contactsSlice";
import filterReducer from "./filterSlice";

const store = configureStore({
	reducer: { filter: filterReducer, contacts: contactsReducer },
});

export default store;
