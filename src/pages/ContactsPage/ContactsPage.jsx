import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchContacts, logout } from "redux/operations";
import { selectContactsError, selectContactsIsLoading, selectContacts, selectUser } from "redux/selectors";
import Loader from "components/Loader/Loader";

import ContactForm from "components/ContactForm/ContactForm";
import css from "./ContactsPage.module.scss";

const Filter = lazy(() => import("components/Filter/Filter"));
const ContactList = lazy(() => import("components/ContactList/ContactList"));

export default function ContactsPage() {
	const disp = useDispatch();

	const { name, email } = useSelector(selectUser);
	const contacts = useSelector(selectContacts);
	const isLoading = useSelector(selectContactsIsLoading);
	const error = useSelector(selectContactsError);

	useEffect(() => {
		disp(fetchContacts());
	}, [disp]);

	const handleLogOut = () => disp(logout());

	return (
		<Suspense fallback={<Loader isLoading={isLoading} />}>
			<h1 className={css.title}>Hello, {name}!</h1>
			<p className={css.email}>{email}</p>
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

			<button onClick={handleLogOut} className={css.logOutBtn}>
				Log out
			</button>
		</Suspense>
	);
}
