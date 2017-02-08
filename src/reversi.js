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
	if(rows !== columns){
		return undefined;
	} else {
		const array = repeat(initialCellValue, rows*columns);
		return array;
	}
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
//Returns an object containing the row and col properties, takes in a string representing algebraic Notation and converts it into row and column format
	const len = algebraicNotation.length;
	const s = algebraicNotation.split("");
	if(len !== 2 && len !== 3){
		return undefined;
	} else if(!isNaN(s[0])){
		return undefined;
	} else if(isNaN(s[1]) && isNaN(s[2])){
		return undefined;
	}
	else {
		let col = s[0];
		for(let i = 65; i < 91; i++){
			if (s[0].toUpperCase().charCodeAt(0) === i){
				col = i-65;		
			} 	
		}
		let row = "";
		for(let a = 1; a < len; a++){
			row += s[a];
		}
		const rowPI = parseInt(row) - 1;
		const boardObj = {row: rowPI, col: col};
		return boardObj;
	}
}

function placeLetter(board, letter, algebraicNotation){
//Returns a single dimensional Array representing the board where the cell at row and col is set to the value of letter using the algebraicNotation
	const b = algebraicToRowCol(algebraicNotation);
	const arr = setBoardCell(board, letter, b.row, b.col);
	return arr;
}

function placeLetters(board, letter, ...algebraicNotation){
//Same as placeLetter function except it accepts multiple arguments 
	const b = [...algebraicNotation];
	const arr = board;
	for (let i = 0; i < b.length; i++){
		//b[i] = placeLetter(board, letter, b[i]);
		//arr.push(b[i][i]);
		let temp = [];
		temp = placeLetter(board, letter, b[i]);
		for (let v = 0; v < temp.length; v++){
			if(temp[v] === letter){
				arr[v] = letter;
			}
		}
	}
	return arr;
}

function boardToString(board){
//Returns a string represntation of the board, makes the board
	const len = board.length;
	const wH = Math.sqrt(len);
	const rowA = [];
	const colA = [];
	let stringBoard = " ";
	for (let i = 1; i < wH+1; i++){
		rowA.push(i);
		colA.push(i);		
	}	
	colA.forEach(n => {
		colA[n-1] = String.fromCharCode(colA[n-1]+64);
	});
	for(let a = 0; a < wH; a++){
		//console.log(colA[a] + " ");
		stringBoard = stringBoard.append(colA[a]);		
	}
	const border = Array(wH+1).join("+---");
	console.log(border + "+");
	const wall = Array(wh+1).join("|  ");
	for(let c = 0; c < wH; c++){
		console.log(rowA[c] + wall + "|" + '\n'); 
	}
	console.log(border + "+");
	for(let a = 0; a < wH; a++){
		stringBoard = colA[a] + " ";
	}

}

module.exports = {
	//The first term can be named anything, the second is the function name
	repeat: repeat,
	generateBoard: generateBoard,
	rowColToIndex: rowColToIndex,
	indexToRowCol: indexToRowCol,
	setBoardCell: setBoardCell,
	algebraicToRowCol: algebraicToRowCol,
	placeLetter: placeLetter,
	placeLetters: placeLetters,
	boardToString: boardToString	
}


