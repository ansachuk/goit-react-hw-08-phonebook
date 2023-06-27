import { useDispatch, useSelector } from "react-redux";

import { deleteContact } from "redux/operations";
import { selectFilteredContacts } from "redux/selectors";

import { Notify } from "notiflix";

import css from "./ContactList.module.scss";

const ContactList = () => {
	const filteredContacts = useSelector(selectFilteredContacts);
	const dispatch = useDispatch();

	const onDeleteContact = id => {
		Notify.failure("Contact deleted!");
		dispatch(deleteContact(id));
	};

	return (
		<ul className={css.list}>
			{filteredContacts?.length ? (
				filteredContacts.map(({ name, number, id }) => (
					<li key={name} className={css.listItem}>
						<div>
							{name} : <span className={css.number}>{number}</span>
						</div>
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
