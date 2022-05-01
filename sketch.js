function preload() {
	print('Preload');
	print('Answers: ' + answers.length);
	print('Allowed: ' + allowed.length);
}

var correct_word;
function setup() {
	createCanvas(windowWidth, windowHeight);
	correct_word = answers[Math.floor(Math.random()*answers.length)];
	print('Word: ' + correct_word);
}

function draw() {
	generateFrame();
	// spoilWord(correct_word);
	if (game_over) {
		if (win == true) {
			noStroke();
			textAlign(CENTER, BOTTOM);
			textSize(20);
			fill(255, 255, 255);
			text('You win! The word was: ' + correct_word.toUpperCase(), 350, 40);
		}
		else {
			noStroke();
			textAlign(CENTER, BOTTOM);
			textSize(20);
			fill(255, 255, 255);
			text('You LOSE! The word was: ' + correct_word.toUpperCase(), 350, 40);
		}
	}
}

var current_row = 0;
var current_letter = 0;
var board = [...Array(6)].map(e => Array(5));
var lettersUsed = new Array(26).fill(0);
var win = false;
var game_over = false;

var square_size = 100;
var left_right_buffer = 70;
var top_buffer = 60;
var mid_buffer = 12;
var half_buffer = 120;

function generateFrame() {
	background(18, 18, 18);
	buildBoard();
	buildAlpha();
	writeText();
}

function spoilWord() {
	noStroke();
	textAlign(LEFT, BOTTOM);
	textSize(20);
	fill(255, 255, 255);
	text(correct_word.toUpperCase(), 70, 40);
}


function buildBoard() {
	for (let row = 0; row < 6; row++) {
		for (let col = 0; col < 5; col++) {
			if (row >= current_row) {
				noFill();
				stroke(color(60, 60, 60));
				strokeWeight(square_size/25);
				rect((left_right_buffer) + ((square_size + mid_buffer) * col),
						top_buffer + ((square_size + mid_buffer) * row),
						square_size, square_size, 20);
			}
			else {

				colorSquare(row, col, correct_word);
			}
		}
	}
}


function writeText() {
	for (let row = 0; row < 6; row++) {
		for (let col = 0; col < 5; col++) {
			if (board[row][col] >= 65 && board[row][col] <= 90) {
				if (row == current_row) {
					typedSquare(row, col);
				}
				noStroke();
				textSize(80);
				fill(255, 255, 255);
				textAlign(CENTER, CENTER);
				text(String.fromCharCode(board[row][col]),
						(left_right_buffer + (square_size/2) + (square_size + mid_buffer) * col),
						top_buffer + (square_size/2) + ((square_size + mid_buffer) * row) + 3);
			}
		}
	}
}


function buildAlpha() {
	// Build Vowels
	let top_scale = 0.66
	for (let i = 0; i < 6; i++) {
		fill(color(100, 100, 100));
		noStroke();
		strokeWeight(top_scale*square_size/25);
		rect((left_right_buffer + (square_size * 5) + (mid_buffer * 4) + half_buffer + (i * ((top_scale * square_size) + (top_scale * mid_buffer)))),
				top_buffer + (square_size / 2),
				top_scale * square_size, top_scale * square_size, 15);
	}
	let bottom_scale = 0.8;
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 5; j++) {
			fill(color(100, 100, 100));
			noStroke();
			strokeWeight(bottom_scale*square_size/25);
			rect(((left_right_buffer) + (square_size * 5) + (mid_buffer * 4) + half_buffer + (((bottom_scale * square_size) + (bottom_scale * mid_buffer)) * j)),
					(top_buffer + (((square_size * bottom_scale) + mid_buffer) * (2 + i))),
					bottom_scale * square_size, bottom_scale * square_size, 15);
		}
	}
	printVowels(top_scale);
	printConsonants(bottom_scale);
}

function printVowels(scale) {
	let vowels = ["a", "e", "i", "o", "u", "y"];
	let i = 0;
	for (let i = 0; i < vowels.length; i++) {
		colorVowel(scale, vowels, i);
		noStroke();
		textSize(scale * 80);
		fill(255, 255, 255);
		textAlign(CENTER, CENTER);
		text(vowels[i].toUpperCase(),
				(left_right_buffer + (scale*square_size/2) + (square_size * 5) + (mid_buffer * 4) + half_buffer + (i * ((scale * square_size) + (scale * mid_buffer)))),
				top_buffer + (scale*square_size) + 19);
	}
}

function colorVowel(scale, vowels, i) {
	let letter_index = vowels[i].toUpperCase().charCodeAt(0) - 65;
	// Green
	if (lettersUsed[letter_index] == 3) {
		noStroke();
		fill(color(80, 140, 80));
		strokeWeight(scale * square_size/25);
		rect((left_right_buffer + (square_size * 5) + (mid_buffer * 4) + half_buffer + (i * ((scale * square_size) + (scale * mid_buffer)))),
				top_buffer + (square_size / 2),
				scale * square_size, scale * square_size, 15);
	}
	// Yellow
	if (lettersUsed[letter_index] == 2) {
		noStroke();
		fill(color(180, 160, 60));
		strokeWeight(scale * square_size/25);
		rect((left_right_buffer + (square_size * 5) + (mid_buffer * 4) + half_buffer + (i * ((scale * square_size) + (scale * mid_buffer)))),
				top_buffer + (square_size / 2),
				scale * square_size, scale * square_size, 15);
	}
	// Gray
	if (lettersUsed[letter_index] == 1) {
		noStroke();
		fill(color(50, 50, 50));
		strokeWeight(scale * square_size/25);
		rect((left_right_buffer + (square_size * 5) + (mid_buffer * 4) + half_buffer + (i * ((scale * square_size) + (scale * mid_buffer)))),
				top_buffer + (square_size / 2),
				scale * square_size, scale * square_size, 15);
	}
}


function printConsonants(scale) {
	let consos = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];
	let consoIdx = 0;
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 5; j++) {
			colorConsonant(scale, consos, consoIdx, i, j);
			noStroke();
			textSize(scale * 80);
			fill(255, 255, 255);
			textAlign(CENTER, CENTER);
			text(consos[consoIdx].toUpperCase(),
					(left_right_buffer) + (square_size * 5) + (mid_buffer * 4) + half_buffer + (((scale * square_size) + (scale * mid_buffer)) * j + ((square_size * scale)/2)),
					top_buffer + (((square_size * scale) + mid_buffer) * (2 + i)) + ((square_size * scale)/2) + 3);
			consoIdx += 1;
		}
	}
}

function colorConsonant(scale, consos, conso_index, i, j) {
	let letter_index = consos[conso_index].toUpperCase().charCodeAt(0) - 65;
	// Green
	if (lettersUsed[letter_index] == 3) {
		noStroke();
		fill(color(80, 140, 80));
		strokeWeight(scale * square_size/25);
		rect(((left_right_buffer) + (square_size * 5) + (mid_buffer * 4) + half_buffer + (((scale * square_size) + (scale * mid_buffer)) * j)),
				(top_buffer + (((square_size * scale) + mid_buffer) * (2 + i))),
				scale * square_size, scale * square_size, 15);
	}
	// Yellow
	if (lettersUsed[letter_index] == 2) {
		noStroke();
		fill(color(180, 160, 60));
		strokeWeight(scale * square_size/25);
		rect(((left_right_buffer) + (square_size * 5) + (mid_buffer * 4) + half_buffer + (((scale * square_size) + (scale * mid_buffer)) * j)),
				(top_buffer + (((square_size * scale) + mid_buffer) * (2 + i))),
				scale * square_size, scale * square_size, 15);
	}
	// Gray
	if (lettersUsed[letter_index] == 1) {
		noStroke();
		fill(color(50, 50, 50));
		strokeWeight(scale * square_size/25);
		rect(((left_right_buffer) + (square_size * 5) + (mid_buffer * 4) + half_buffer + (((scale * square_size) + (scale * mid_buffer)) * j)),
				(top_buffer + (((square_size * scale) + mid_buffer) * (2 + i))),
				scale * square_size, scale * square_size, 15);
	}
}

function typedSquare(row, col) {
	noFill();
	stroke(color(100, 100, 100));
	strokeWeight(square_size/25);
	rect((left_right_buffer) + ((square_size + mid_buffer) * col),
			top_buffer + ((square_size + mid_buffer) * row),
			square_size, square_size, 20);
}

function colorSquare(row, col, correct_word) {
	// Green
	if (String.fromCharCode(board[row][col]).toLowerCase() == correct_word.charAt(col)) {
		stroke(color(80, 140, 80));
		fill(color(80, 140, 80));
		strokeWeight(square_size/25);
		rect((left_right_buffer) + ((square_size + mid_buffer) * col),
				top_buffer + ((square_size + mid_buffer) * row),
				square_size, square_size, 20);
		lettersUsed[board[row][col] - 65] = 3;
	}
	// Yellow
	else if (correct_word.indexOf(String.fromCharCode(board[row][col]).toLowerCase()) > -1) {
		stroke(color(180, 160, 60));
		fill(color(180, 160, 60));
		strokeWeight(square_size/25);
		rect((left_right_buffer) + ((square_size + mid_buffer) * col),
				top_buffer + ((square_size + mid_buffer) * row),
				square_size, square_size, 20);
		lettersUsed[board[row][col] - 65] = 2;
	}
	// Gray
	else {
		stroke(color(50, 50, 50));
		fill(color(50, 50, 50));
		strokeWeight(square_size/25);
		rect((left_right_buffer) + ((square_size + mid_buffer) * col),
				top_buffer + ((square_size + mid_buffer) * row),
				square_size, square_size, 20);
		lettersUsed[board[row][col] - 65] = 1;
	}
}


function keyPressed() {
	if (first = true) {
		print('Current_letter = ' + current_letter);
		first = false;
	}
	if (keyCode == 8) {
		if (current_letter > 0) {
			print('del ' + current_letter + ' -> ' + (current_letter - 1));
			current_letter -= 1;
			board[current_row][current_letter] = 0;
		}
		else {
			print('del '+ current_letter + ' -> ' + current_letter);
		}
	}
	else if (keyCode >= 65 && keyCode <= 90 && current_letter <= 4) {
		print('a-z ' + current_letter + ' -> ' + (current_letter + 1));
		board[current_row][current_letter] = keyCode;
		current_letter += 1;
	}
	else if ((current_letter == 5) && (keyCode == 10 || keyCode == 13)) {
		if (validWord(board, current_row)) {
			current_letter = 0;
			current_row++;
		}
		if (current_row == 6) {
			game_over = true;
		}
	}
	else {

	}
	print('Input: ' + keyCode);

	printBoard(board);
}


function validWord(board, current_row) {
	let word = '';
	for (let col = 0; col < 5; col++) {
		word = word.concat(String.fromCharCode(board[current_row][col]).toLowerCase());
	}
	// print('Validating word: ' + word);
	if (allowed.includes(word)) {
		print('Valid word ' + word);
		if (word == correct_word) {
			game_over = true;
			win = true;
		}
		return true;
	} else {
		print('Invalid word ' + word);
		return false;
	}
}


function printBoard(board) {
	print('Printing board');
	for (let row = 0; row < 6; row++) {
		for (let col = 0; col < 5; col++) {
			if (board[row][col] >= 65 && board[row][col] <= 90 ) {
				print(String.fromCharCode(board[row][col]));
			}
		}
	}
}


function clearWord(word) {
	print('Clearing word');
	for (letter in word) {
		word[letter] = ' ';
	}
}
