import { useState } from "react";
import css from "../LoginPage/LoginPage.module.scss";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "redux/operations";
import { Notify } from "notiflix";

export default function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onInputChange = e => {
		const { name, value } = e.currentTarget;

		switch (name) {
			case "name":
				setName(value);
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

	const onFormSubmit = async e => {
		e.preventDefault();

		try {
			await dispatch(
				signupUser({
					name,
					email,
					password,
				}),
			).unwrap();

			navigate("/contacts");
		} catch (e) {
			Notify.failure(e.message);
		}
	};

	return (
		<>
			<h1 className={css.title}>Sign up</h1>

			<form className={css.form} onSubmit={onFormSubmit}>
				<label className={css.label}>
					Name
					<input
						value={name}
						onChange={onInputChange}
						className={css.input}
						type="text"
						name="name"
						pattern="[A-Za-zА-Яа-яЁё0-9\s]{2,}"
						title="Requiring at least 2 characters"
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
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						title="Enter valid email"
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
						pattern="(?=.*\d)(?=.*[a-zA-Z]).{7,}"
						title="Requiring at least ! characters with at least one digit and one letter"
						autoComplete="off"
						required
					/>
				</label>
				<button className={css.submitButton} type="submit">
					Sign up
				</button>

				<Link className={css.link} to={"/login"}>
					I already an have account
				</Link>
			</form>
		</>
	);
}
