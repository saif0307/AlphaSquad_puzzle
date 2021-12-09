import React, { useState, useEffect } from "react";

const Grid = ({ size, gameCompleted }) => {
	const [boxes, setBoxes] = useState([]);
	const [starterBox, setStarterBox] = useState({});
	const [completed, setCompleted] = useState(false);
	let boxes_arr = [];

	// Funtion to Shuffle The items using math.random
	const shuffle = (array) => {
		let new_arr = [];
		while (new_arr.length < array.length) {
			let random_item = array[Math.floor(Math.random() * array.length)];
			if (!new_arr.includes(random_item)) {
				new_arr.push(random_item);
			}
		}
		return new_arr;
	};
	// calls Shuffle the initial value of the boxes which are linear
	useEffect(() => {
		setBoxes([...shuffle(boxes_arr)]);
	}, [size]);

	if (!size) {
		return null;
	}
	for (let i = 1; i <= size * size; i++) {
		boxes_arr.push({ id: i, name: `box ${i}` });
	}
	// return null If the size of the grid is not provided yet
	const createDivs = () => {
		if (!boxes.length) {
			return null;
		}

		// Checks if the puzzle is completed
		const checkCompleted = () => {
			const compLoop = boxes.every((e, index) => {
				return e.id === index + 1;
			});

			if (compLoop) {
				setCompleted(compLoop);
				gameCompleted(completed);
				console.log("welcome to the team");
			}
		};

		// Swap the items in the State
		const swapBoxes = (fromBox, toBox) => {
			let boxes_new = boxes;
			const fromBoxIndex = boxes.findIndex((e) => {
				return e.id === fromBox.id;
			});
			const toBoxIndex = boxes.findIndex((e) => {
				return e.id === toBox.id;
			});

			let swapArrayElements = function (array, indexA, indexB) {
				let temp = array[indexA];
				array[indexA] = array[indexB];
				array[indexB] = temp;
			};
			swapArrayElements(boxes_new, fromBoxIndex, toBoxIndex);
			setBoxes([...boxes_new]);
			// Check boxes
			checkCompleted();
		};
		// const swapBoxes = (start, drop) => {
		// 	console.log(start);
		// 	console.log(drop);
		// };
		// const onDropHandler = () => {}
		// const onDragStartHandler = () => {}
		// const onDragOverHandler = () => {}

		return boxes.map((e) => {
			return (
				<div
					draggable
					onDrop={() => {
						swapBoxes(starterBox, e);
					}}
					onDragStart={() => {
						setStarterBox({ ...e });
					}}
					onDragEnd={(event) => {
						event.target.classList.remove("starter");
						document.querySelectorAll(`.main-grid > div`).forEach((e) => {
							document.body.classList.remove("opacity-50");
							e.classList.remove("bg-red-300");
							e.classList.remove("border-green-400");
							e.classList.add("bg-blue-400");
						});
					}}
					onDragOver={(event) => {
						event.preventDefault();
						event.target.classList.add("starter");
						document.querySelectorAll(`.dropzones`).forEach((e) => {
							e.classList.add("bg-red-300");
							e.classList.add("border-green-400");
							e.classList.remove("bg-blue-400");
						});
						document.body.classList.add("opacity-50");
					}}
					className={`dropzones rounded-lg bg-blue-400  hover:bg-blue-300 border-4 hover:border-red-400 cursor-move shadow-2xl z-40 relative h-32 w-32   flex flex-col justify-evenly text-center mt-50px text-white align-middle`}
					key={e.id}
				>
					<p className="align-middle z-0 relative inline font-semibold text-4xl oldstyle-nums">
						{e.id}
					</p>
				</div>
			);
		});
	};

	return (
		<div
			style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
			className={`main-grid grid rounded-xl  grid-cols-${size} grid-rows-${size} shadow-4xl border-red-400 border-8 justify-items-center gap-6 w-3/4 mx-auto p-6`}
		>
			{createDivs()}
		</div>
	);
};

export default Grid;
