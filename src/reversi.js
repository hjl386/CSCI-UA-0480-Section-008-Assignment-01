// reversi.js

function repeat(value, n){
//Creates an array of n elements, with each index being the same value i
	const array = [];
	for (let i = 0; i < n; i++){
		array.push(value);
	}
	return array;
}

function generateBoard(rows, columns, initialCellValue=" "){
//Creates an array of size rows * columns with default values of " " 
	const array = [];
	const numEle = rows * columns;
	for (let i = 0; i < numEle; i++){
		array.push(initialCellValue);
	}
	return array;
}

function rowColToIndex(board, rowNumber, columnNumber){
//Returns the index of the passed in array based on the presented row and column number
	const size = Math.sqrt(board.length);
	return (size * rowNumber) + columnNumber;
}

function indexToRowCol(board, i){
	const size = Math.sqrt(board.length);
	const rowNum = Math.floor(i/size);
	const colNum = i % size;
	const boardRC = {row: rowNum, column: colNum};
	return boardRC;
}

module.exports = {
	//The first term can be named anything, the second is the function name
	repeat: repeat,
	generateBoard: generateBoard,
	rowColToIndex: rowColToIndex
}
