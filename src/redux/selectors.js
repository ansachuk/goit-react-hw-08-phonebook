import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = ({ contacts }) => contacts.items;
export const selectContactsIsLoading = ({ contacts }) => contacts.isLoading;
export const selectContactsError = ({ contacts }) => contacts.error;

export const selectFilter = ({ filter }) => filter;

export const selectFilteredContacts = createSelector([selectContacts, selectFilter], (contacts, filter) => {
	const filteredContacts = contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));
	return filteredContacts;
});

export const selectIsLoggedIn = ({ auth }) => auth.isLoggedIn;
export const selectUser = ({ auth }) => auth.user;
export const selectToken = ({ auth }) => auth.token;
export const selectAuthIsLoading = ({ auth }) => auth.isLoading;
export const selectAuthError = ({ auth }) => auth.error;
