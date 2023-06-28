import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import contactsReducer from "./slices/contactsSlice";
import filterReducer from "./slices/filterSlice";
import authReducer from "./slices/authSlice";

const persistConfig = {
	key: "token",
	storage,
	whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
	reducer: { filter: filterReducer, contacts: contactsReducer, auth: persistedAuthReducer },

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
export default store;
