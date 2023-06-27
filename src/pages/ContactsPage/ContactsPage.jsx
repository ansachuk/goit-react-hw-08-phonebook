import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchContacts, logout } from "redux/operations";
import { selectContactsError, selectContactsIsLoading, selectContacts } from "redux/selectors";
import Loader from "components/Loader/Loader";

import ContactForm from "components/ContactForm/ContactForm";
import css from "./ContactsPage.module.scss";

const Filter = lazy(() => import("components/Filter/Filter"));
const ContactList = lazy(() => import("components/ContactList/ContactList"));

export default function ContactsPage() {
	const disp = useDispatch();

	const contacts = useSelector(selectContacts);
	const isLoading = useSelector(selectContactsIsLoading);
	const error = useSelector(selectContactsError);

	useEffect(() => {
		disp(fetchContacts());
	}, [disp]);

	return (
		<Suspense fallback={<Loader isLoading={isLoading} />}>
			<h1 className={css.title}>Phone Book</h1>
			<ContactForm />

			{!error && (
				<>
					{isLoading === true ? (
						<Loader isLoading={isLoading} />
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

			<button onClick={disp(logout())} className={css.logOutBtn}>
				Log out
			</button>
		</Suspense>
	);
}
