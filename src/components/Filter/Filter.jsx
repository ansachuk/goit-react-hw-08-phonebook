import { useSelector, useDispatch } from "react-redux";

import { setFilter } from "redux/filterSlice";

import css from "./Filter.module.scss";

function Filter() {
	const filter = useSelector(({ filter }) => filter);
	const dispatch = useDispatch();

	return (
		<div>
			<h2 className={css.subtitle}>Find contact by name</h2>
			<label className={css.label}>
				<input
					value={filter}
					onChange={({ currentTarget }) => dispatch(setFilter(currentTarget.value))}
					className={css.input}
					type="text"
					name="filter"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
				/>
			</label>
		</div>
	);
}

export default Filter;
