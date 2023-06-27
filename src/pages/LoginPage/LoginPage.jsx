import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "redux/operations";

import { Notify } from "notiflix";

import css from "./LoginPage.module.scss";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onInputChange = e => {
		const { name, value } = e.currentTarget;

		switch (name) {
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
				login({
					email,
					password,
				}),
			).unwrap();

			navigate("/contacts");
		} catch (e) {
			Notify.failure(e);
		}
	};

	return (
		<>
			<h1 className={css.title}>Login</h1>

			<form className={css.form} onSubmit={onFormSubmit}>
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
						pattern="(?=.*\d)(?=.*[a-zA-Z]).{6,}"
						title="Requiring at least 6 characters with at least one digit and one letter"
						autoComplete="off"
						required
					/>
				</label>
				<button className={css.submitButton} type="submit">
					Login
				</button>

				<Link className={css.link} to={"/register"}>
					Don't have an account yet?
				</Link>
			</form>
		</>
	);
}
