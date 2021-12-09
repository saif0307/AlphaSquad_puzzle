import React from "react";

const Modal = ({ modalState, state }) => {
	return (
		<div
			className={`modal ${
				state ? "flex" : "hidden"
			} bg-red-400 pt-10 pb-3 z-50  h-52 flex-col justify-between items-center opacity-75 w-1/2 fixed top-1/4 left-1/4 border border-blue-600`}
		>
			<p className="text-6xl text-blue-600 font-bold">Welcome to the Team!</p>
			<button
				onClick={modalState}
				className="w-32 h-11 bg-blue-300 text-white hover:bg-blue-400 font-bold text-lg"
			>
				Close
			</button>
		</div>
	);
};

export default Modal;
