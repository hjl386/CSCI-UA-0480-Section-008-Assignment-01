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
	} /*else if(!isNaN(s[0])){
		return undefined;
	} else if(isNaN(s[1]) || isNaN(s[2])){
		return undefined;
	} */
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
//Returns a string representation of the board, essentially makes the board
	let bS = "  ";
	const len = board.length;
	const size = Math.sqrt(len);
	let wall = "  ";
	let j = 0;
	let k = size;
	for (let i = 0; i < size; i++){
		bS = bS.concat("   " + (String.fromCodePoint(i+65)));
		//bS = bS.concat((String.fromCodePoint(32, 32, i+65)));
	}	
	bS = bS.concat('\n' + " ");
	for (let i = 0; i < size; i++){
		wall = wall.concat("+---");
	}
	bS = bS.concat(wall + "+" + '\n');
	for(let i = 1; i < size+1; i++){
		bS = bS.concat(" " + i + " ");
		while(j < k){
			bS = bS.concat("| " + board[j] + " ");
			j++;
		}
		j = size * i;
		k = size * (i+1);
		bS = bS.concat("|" + '\n' + " " + wall + "+" + '\n');
	}
	return bS;
}

function isBoardFull(board){
//Checkts to see if the board is full or not
	for(let i = 0; i < board.length; i++){
		if(board[i] === " "){
			return false;
		}
	}
	return true;
}

function flip(board, row, col){
//Flip the contents of the cell to the opposite at the designated row and col, and if there is none then do nothing, returns the new array 
	const i = rowColToIndex(board, row, col);
	if (board[i] === " "){
		return board;	
	} else {
		if(board[i] === "X"){
			board = setBoardCell(board, "O", row, col);
			//return board;
		} else if (board[i] === "O"){
			board = setBoardCell(board, "X", row, col);
			//return board;
		} 	
		return board;
	}
}

function flipCells(board, cellsToFlip){
//Passing in the baord and a 3D array, flip the values insde to the opposite and return a single dimensional array.	
	const arr = cellsToFlip.join().split(",");
//	console.log(arr);
	let i = 0;
//	let b = board;
	while(i < arr.length){
		board = flip(board, Number(arr[i]), Number(arr[i+1]));
		i += 2;	
	}
	return board;
}

function getCellsToFlip(board, lastRow, lastCol){
//Returns the 3D array of the pieces that will get flipped, same line pieces are grouped together
	let finalArr = [];
	const empty = " ";
	const len = board.length;
	const size = Math.sqrt(len);
	const index = rowColToIndex(board, lastRow, lastCol);
	const val = board[index];
	let opp = "";
	if (val === "X"){
		opp = "O";
	} else if (val === "O"){
		opp = "X";
	}
//Checking in the North REDO  Direction 
	let arrN = [];
	let counterN = 0;
	let n = index-size;
	for (let i = 0; i < (lastRow); i++){
		if(counterN === 0){
			//if (lastRow === 0){break;} For loop checks it for me
			//else if(n < 0){break;}
			finalArr.push(2);
			if(board[n] === empty){break;}
			else if(board[n] === val){break;}
			else if(board[n] === opp){ 
				counterN++;
				n-=size;
				finalArr.push(1);
			}				
		}
		else if(counterN > 0){
			if(n < 0){ //Might be redundant due to for loop iteration check
				break;
			} else {
				if(board[n] === empty){break;}
				else if(board[n] === opp){
					counterN++;
					n-=size;
				} else if(board[n] === val){
					for(let j = 1; j < (counterN+1); j++){
						let obj = indexToRowCol(board, index-(j*size));
						arrN.push([obj.row, obj.col]);
						finalArr.push(1);
					}
					i = lastRow; //In order to pervent re addings 
				} 
			}
		}
	}
	//Filling the final array to be returned 
	if(arrN.length > 0){
		finalArr.push(arrN);
	}
/*
//Checking in the North Direction 
	let arrN = [];
	let counterN = 0;
	let n = index-size;
	for (let i = 0; i < (lastRow); i++){
		if(counterN === 0){
			//if (lastRow === 0){break;} For loop checks it for me
			//else if(n < 0){break;}
			finalArr.push(2);
			if(board[n] === empty){break;}
			else if(board[n] === val){break;}
			else if(board[n] === opp){ 
				counterN++;
				n-=size;
				finalArr.push(1);
			}				
		}
		else if(counterN > 0){
			if(n < 0){ //Might be redundant due to for loop iteration check
				break;
			} else {
				if(board[n] === empty){break;}
				else if(board[n] === opp){
					counterN++;
					n-=size;
				} else if(board[n] === val){
					for(let j = 1; j < (counterN+1); j++){
						let obj = indexToRowCol(board, index-(j*size));
						arrN.push([obj.row, obj.col]);
						finalArr.push(1);
					}
					i = lastRow; //In order to pervent re addings 
				} 
			}
		}
	}
	//Filling the final array to be returned 
	if(arrN.length > 0){
		finalArr.push(arrN);
	}
*/
//Checking in the South Direction
	let arrS = [];
	let counterS = 0;
	let s = index+size;
	for (let i = 0; i < ((size-1)-lastRow); i++){
		if(counterS === 0){
			//if (lastRow === (size-1)){break;} For loop checks it for me
			//else if(s > index){break;}
			if(board[s] === empty){break;}
			else if(board[s] === val){break;}
			else if(board[s] === opp){ 
				counterS++;
				s+=size;
			}				
		}
		else if(counterS > 0){
			if(s > index){ //Might be redundant due to for loop iteration check
				break;
			} else {
				if(board[s] === empty){break;}
				else if(board[s] === opp){
					counterS++;
					s+=size;
				} else if(board[s] === val){
					for(let j = 1; j < (counterS+1); j++){
						let obj = indexToRowCol(board, index+(j*size));
						arrS.push([obj.row, obj.col]);
						finalArr.push(1);
					}
					i = (size-1)-lastRow; //In order to pervent re addings 
				} 
			}
		}
	}
	//Filling the final array to be returned 
	if(arrS.length > 0){
		finalArr.push(arrS);
	}
//Checking in the West Direction
	let arrW = [];
	let counterW = 0;
	let w = index-1;
	for (let i = 0; i < lastCol; i++){
		if(counterW === 0){
			//if (lastCol === 0){break;} For loop checks it for me
			//else if((w % size) === 0){break;}
			if(board[w] === empty){break;}
			else if(board[w] === val){break;}
			else if(board[w] === opp){ 
				counterW++;
				w-=1;
			}				
		}
		else if(counterW > 0){
			if((w%size)===0){ //Might be redundant due to for loop iteration check
				break;
			} else {
				if(board[w] === empty){break;}
				else if(board[w] === opp){
					counterW++;
					w-=1;
				} else if(board[w] === val){
					for(let j = 1; j < (counterW+1); j++){
						let obj = indexToRowCol(board, index-j);
						arrW.push([obj.row, obj.col]);
						finalArr.push(1);
					}
					i = lastCol; //In order to pervent re addings 
				} 
			}
		}
	}
	//Filling the final array to be returned 
	if(arrW.length > 0){
		finalArr.push(arrW);
	}	
//Checking in the East Direction
	let arrE = [];
	let counterE = 0;
	let e = index+1;
	for (let i = 0; i < (size-1)-lastCol; i++){
		if(counterE === 0){
			//if ((size-1)-lastCol === 0){break;} For loop checks it for me
			//else if((e+1 % size) === 0){break;}
			if(board[e] === empty){break;}
			else if(board[e] === val){break;}
			else if(board[e] === opp){ 
				counterE++;
				e+=1;
			}				
		}
		else if(counterE > 0){
			if((e+1%size)===0){ //Might be redundant due to for loop iteration check
				break;
			} else {
				if(board[e] === empty){break;}
				else if(board[e] === opp){
					counterE++;
					e+=1;
				} else if(board[e] === val){
					for(let j = 1; j < (counterE+1); j++){
						let obj = indexToRowCol(board, index+j);
						arrE.push([obj.row, obj.col]);
						finalArr.push(1);
					}
					i = size-1-lastCol; //In order to pervent re addings 
				} 
			}
		}
	}
	//Filling the final array to be returned 
	if(arrE.length > 0){
		finalArr.push(arrE);
	}
//Checking in the North West Direction
	let arrNW = [];
	let counterNW = 0;
	let nw = index-(size+1);
	for (let i = 0; i < lastCol; i++){
		if(counterNW === 0){
			//if (lastCol === 0){break;} For loop checks it for me
			//else if((nw < 0){break;}
			if(board[nw] === empty){break;} //Can add i = lastCol to completely end this loop 
			else if(board[nw] === val){break;}
			else if(board[nw] === opp){ 
				counterNW++;
				nw-=size+1;
			}				
		}
		else if(counterNW > 0){
			if(nw < 0){ //Might be redundant due to for loop iteration check
				break;
			} else {
				if(board[nw] === empty){break;}
				else if(board[nw] === opp){
					counterNW++;
					nw-=size+1;
				} else if(board[nw] === val){
					for(let j = 1; j < (counterNW+1); j++){
						let obj = indexToRowCol(board, index-(j*(size+1)));
						arrNW.push([obj.row, obj.col]);
						finalArr.push(1);
					}
					i = lastCol; //In order to pervent re addings 
				} 
			}
		}
	}
	//Filling the final array to be returned 
	if(arrNW.length > 0){
		finalArr.push(arrNW);
	}
//Checking in the North East Direction
	let arrNE = [];
	let counterNE = 0;
	let ne = index-(size-1);
	for (let i = 0; i < size-1-lastCol; i++){
		if(counterNE === 0){
			//if (size-1-lastCol === 0){break;} For loop checks it for me
			//else if(((ne+1)%size) ===  0){break;}
			if(board[ne] === empty){break;} //Can add i = lastCol to completely end this loop 
			else if(board[ne] === val){break;}
			else if(board[ne] === opp){ 
				counterNE++;
				ne-=size-1;
			}				
		}
		else if(counterNE > 0){
			if((ne+1) % size === 0){ //Might be redundant due to for loop iteration check
				break;
			} else {
				if(board[ne] === empty){break;}
				else if(board[ne] === opp){
					counterNE++;
					ne-=size-1;
				} else if(board[ne] === val){
					for(let j = 1; j < (counterNE+1); j++){
						let obj = indexToRowCol(board, index-(j*(size-1)));
						arrNE.push([obj.row, obj.col]);
						finalArr.push(1);
					}
					i = size-1-lastCol; //In order to pervent re addings 
				} 
			}
		}
	}
	//Filling the final array to be returned 
	if(arrNE.length > 0){
		finalArr.push(arrNE);
	}
//Checking in the South East Direction
	let arrSE = [];
	let counterSE = 0;
	let se = index+(size+1);
	for (let i = 0; i < size-1-lastCol; i++){
		if(counterSE === 0){
			//if (size-1-lastCol === 0){break;} For loop checks it for me
			//else if(se > index){break;}
			if(board[se] === empty){break;} //Can add i = lastCol to completely end this loop 
			else if(board[se] === val){break;}
			else if(board[se] === opp){ 
				counterSE++;
				se+=size+1;
			}				
		}
		else if(counterSE > 0){
			if(se > index){ //Might be redundant due to for loop iteration check
				break;
			} else {
				if(board[se] === empty){break;}
				else if(board[se] === opp){
					counterSE++;
					se+=size+1;
				} else if(board[se] === val){
					for(let j = 1; j < (counterSE+1); j++){
						let obj = indexToRowCol(board, index+(j*(size+1)));
						arrSE.push([obj.row, obj.col]);
						finalArr.push(1);
					}
					i = size-1-lastCol; //In order to pervent re addings 
				} 
			}
		}
	}
	//Filling the final array to be returned 
	if(arrSE.length > 0){
		finalArr.push(arrSE);
	}
//Checking in the South West Direction
	let arrSW = [];
	let counterSW = 0;
	let sw = index+(size-1);
	for (let i = 0; i < lastCol; i++){
		if(counterSW === 0){
			//if (lastCol === 0){break;} For loop checks it for me
			//else if((sw % size) === 0){break;}
			if(board[sw] === empty){break;} //Can add i = lastCol to completely end this loop 
			else if(board[sw] === val){break;}
			else if(board[sw] === opp){ 
				counterSW++;
				sw+=size-1;
			}				
		}
		else if(counterSW > 0){
			if((sw % size) === 0){ //Might be redundant due to for loop iteration check
				break;
			} else {
				if(board[sw] === empty){break;}
				else if(board[sw] === opp){
					counterSW++;
					sw+=size-1;
				} else if(board[sw] === val){
					for(let j = 1; j < (counterSW+1); j++){
						let obj = indexToRowCol(board, index+(j*(size-1)));
						arrSW.push([obj.row, obj.col]);
						//finalArr.push(3);
					}
					i = lastCol; //In order to pervent re addings 
				} 
			}
		}
	}
	//Filling the final array to be returned 
	if(arrSW.length > 0){
		finalArr.push(arrSW);
	}
//	finalArr.push(1);
	return finalArr;
}

let board = generateBoard(4, 4);
board = setBoardCell(board, "X", 2, 0);
board = setBoardCell(board, "X", 0, 3);
board = setBoardCell(board, "O", 2, 1);
board = setBoardCell(board, "O", 2, 2);
board = setBoardCell(board, "O", 1, 3);
let s = boardToString(board);
console.log(s);
let a = getCellsToFlip(board, 2, 3);
console.log(a);

function isValidMove(board, letter, row, col){
//Returns true if the intended move is valid and returns false otherwise	
	const index = rowColToIndex(board, row, col);
	const arr = getCellsToFlip(board, row, col);
//	console.log(arr);
//	console.log(arr.length);
	if(index >= board.length){
		return false;
	} else if(board[index] !== " "){
		return false;
	} else if(arr.lenght === 0){
		return false;
	} else {
		return true;
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
	boardToString: boardToString,	
	isBoardFull: isBoardFull,
	flip: flip,
	flipCells: flipCells,
	getCellsToFlip: getCellsToFlip,
	isValidMove: isValidMove
}


