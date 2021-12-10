import React, { useState } from "react";

const Input = ({ onFormSubmit }) => {
	const [inputValue, setInputValue] = useState("");
	const onValueChange = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div className="p-3 w-full flex justify-center items-center ">
			<form
				onSubmit={(e) => {
					onFormSubmit(e);
					setInputValue("");
				}}
			>
				<label className="font-bold text-xl mr-2 text-red-400">
					ENTER PUZZLE SIZE :
				</label>
				<input
					placeholder="Enter Puzzle Size"
					className="input-1  border border-red-500 outline-none h-12 w-80 p-4 shadow-xl rounded-lg"
					value={inputValue}
					type="number"
					min={2}
					max={6}
					onChange={onValueChange}
				/>
				<button className="bg-red-400 box-border shadow-xl rounded-lg text-white font-semibold hover:bg-red-300 ml-1.5 w-24 h-12 p-1">
					Create!
				</button>
			</form>
		</div>
	);
};

export default Input;
