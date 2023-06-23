import { useDispatch, useSelector } from "react-redux";

import { deleteContact } from "redux/operations";
import { getContacts, getFilter } from "redux/selectors";

import { Notify } from "notiflix";

import css from "./ContactList.module.scss";

const ContactList = () => {
	const contacts = useSelector(getContacts);
	const filter = useSelector(getFilter);
	const dispatch = useDispatch();

	const onDeleteContact = id => {
		Notify.failure("Contact deleted!");
		dispatch(deleteContact(id));
	};

	return (
		<ul className={css.list}>
			{contacts?.length ? (
				contacts
					.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
					.map(({ name, phone, id }) => (
						<li key={name} className={css.listItem}>
							{name} : <span className={css.number}>{phone}</span>
							<button
								className={css.deleteButton}
								onClick={() => {
									onDeleteContact(id);
								}}
							>
								Delete
							</button>
						</li>
					))
			) : (
				<p className={css.message}>You have no contacts yet!</p>
			)}
		</ul>
	);
};

export default ContactList;
