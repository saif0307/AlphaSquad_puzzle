import React, { useState, useEffect } from "react";

import Input from "./Input";
import Grid from "./Grid";
import Modal from "./Modal";

const App = () => {
	const [size, setSize] = useState(0);
	const [modalState, setModalState] = useState(false);

	const modalStateHandler = () => {
		document.querySelector(".modal").classList.remove("flex");
		document.querySelector(".modal").classList.add("hidden");
		setModalState(false);
		setSizeToLocalStorage(0);
		setSize(0);
	};
	const setSizeToLocalStorage = (size) => {
		localStorage.setItem("size", JSON.stringify(size));
	};

	const getSizeFromLocalStorage = () => {
		return JSON.parse(localStorage.getItem("size"));
	};

	useEffect(() => {
		const localSize = getSizeFromLocalStorage();
		if (!localSize) return;
		setSize(localSize);
	});

	const onFormSubmit = (e) => {
		e.preventDefault();
		setSizeToLocalStorage(e.target[0].value);
		setSize(e.target[0].value);
	};

	const getGrid = () => {
		// if (!size) {
		// 	return null;
		// }
		return (
			<Grid
				size={size}
				gameCompleted={() => {
					setModalState(true);
				}}
			/>
		);
	};
	return (
		<div className="w-full p-7">
			<Input onFormSubmit={onFormSubmit} />
			<br />
			<Modal modalState={modalStateHandler} state={modalState} />
			<div>{getGrid()}</div>
		</div>
	);
};

export default App;
