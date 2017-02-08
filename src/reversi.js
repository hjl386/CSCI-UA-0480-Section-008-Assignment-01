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
//Returns an object with the properties row and col representing the row and column numbers that the index maps to from the passed in board (array)
	const size = Math.sqrt(board.length);
	const rowNum = Math.floor(i/size);
	const colNum = i % size;
	const boardRC = {row: rowNum, col: colNum};
	return boardRC;
}

function setBoardCell(board, letter, row, col){
//Returns a single dimensional array, board, with the value at the provided row and col is set to letter 
	//const array = board.slice(0, board.length);
	const array = [...board];
	const index = rowColToIndex(board, row, col);
	array[index] = letter;
	return array;
}

function algebraicToRowCol(algebraicNotation){
	if(algebraicNotation.length !== 2){
		return undefined;
	} else if(isNan(algebraicNotation.charAt(1)){
		return undefined;
	} else if(typeof(c.charAt(0)) !== 'string'){
		return undefined;
	} else {
		
	}
}

module.exports = {
	//The first term can be named anything, the second is the function name
	repeat: repeat,
	generateBoard: generateBoard,
	rowColToIndex: rowColToIndex,
	indexToRowCol: indexToRowCol,
	setBoardCell: setBoardCell,
	algebraicToRowCol: algebraicToRowCol
}


