import { useState } from "react";
import css from "../LoginPage/LoginPage.module.scss";
// import { useSelector } from "react-redux";
import { Notify } from "notiflix";
import { Link } from "react-router-dom";

export default function SignUpPage() {
	const [nickname, setNickname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const contacts = useSelector(({ contacts }) => contacts.items);
	// const dispatch = useDispatch();

	const resetState = () => {
		setEmail("");
		setPassword("");
	};

	const onInputChange = e => {
		const { name, value } = e.currentTarget;

		switch (name) {
			case "nickname":
				setNickname(value);
				break;

			case "email":
				setEmail(value);
				break;

			case "password":
				setPassword(value);
				break;

			default:
				throw new Error("This type is not availeble!");
		}
	};

	const onFormSubmit = e => {
		e.preventDefault();

		// const hasSameContactName = contacts.some(contact => contact.name === name);

		// if (hasSameContactName) {
		// 	return Notify.failure(`${name} is already in contacts!`);
		// }

		// dispatch(
		// 	addContact({
		// 		name,
		// 		phone,
		// 	}),
		// );

		Notify.success("Contact has added!");
		resetState();
		e.currentTarget.blur();
	};

	return (
		<>
			<h1 className={css.title}>Sign up</h1>

			<form className={css.form} onSubmit={onFormSubmit}>
				<label className={css.label}>
					Nickname
					<input
						value={nickname}
						onChange={onInputChange}
						className={css.input}
						type="text"
						name="nickname"
						pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
						autoComplete="off"
						required
					/>
				</label>

				<label className={css.label}>
					Email
					<input
						value={email}
						onChange={onInputChange}
						className={css.input}
						type="email"
						name="email"
						//todo: change all patterns and titles

						// pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
						// title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
						autoComplete="off"
						required
					/>
				</label>

				<label className={css.label}>
					Password
					<input
						value={password}
						onChange={onInputChange}
						className={css.input}
						type="password"
						name="password"
						pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
						autoComplete="off"
						required
					/>
				</label>
				<button className={css.submitButton} type="submit">
					Sign up
				</button>

				<Link className={css.link} to={"/login"}>
					I already have account
				</Link>
			</form>
		</>
	);
}
