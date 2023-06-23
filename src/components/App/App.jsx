import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchContacts } from "redux/operations";
import { getError, getIsLoading, getContacts } from "redux/selectors";

import { Jelly } from "@uiball/loaders";

import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";

import css from "./App.module.scss";

export function App() {
	const disp = useDispatch();

	const contacts = useSelector(getContacts);
	const isLoading = useSelector(getIsLoading);
	const error = useSelector(getError);

	useEffect(() => {
		disp(fetchContacts());
	}, [disp]);

	return (
		<>
			<h1 className={css.title}>Phone Book</h1>
			<ContactForm />

			{!error && (
				<>
					{isLoading === true ? (
						<div className={css.backdrop} aria-live="polite" aria-busy={isLoading}>
							<Jelly color="rgb(24, 166, 166)" size={200} speed={0.6} />
						</div>
					) : (
						contacts.length > 0 && (
							<>
								<h2 className={css.subtitle}>Contacts</h2>
								<Filter />
								<ContactList />
							</>
						)
					)}
				</>
			)}
		</>
	);
}
