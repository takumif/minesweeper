import input = require('./input');
import Cell = require('./Cell');
import Minefield = require('./Minefield');
import Minesweeper = require('./Minesweeper');
import RectMinesweeper = require('./RectMinesweeper');

/**
 * Allows you to play multiple games of regular Minesweeper in console.
 * Supports one board size up to 36x36
 */
class TextMinesweeper implements MSObserver {
	private indices = '0123456789abcdefghijklmnopqrstuvwxyz';
	private ms: Minesweeper;
	private rows: number;
	private cols: number;
	private bombCount: number;
	
	constructor() {
		this.rows = 8;
		this.cols = 8;
		this.bombCount = 8;
		
		this.ms = new RectMinesweeper(this.rows, this.cols, this.bombCount);
		this.ms.addObserver(this);
		this.ms.play();
	}
	
	onGameStart() {
		this.printBoard();
	}
	
	onWaitingInput() {
		input('Please enter a move (e.g. "1,2" for row 1, col 2): ', (move: string) => {
			console.log('Move is:' + move);
		});
	}
	
	onFieldChanged() {
		
	}
	
	onBombStepped(row: number, col: number) {
		
	}
	
	onVictory() {
		
	}
	
	private printBoard(): void {
		var firstRowStr = '  ' + this.indices.split('').join(' ');
		console.log(firstRowStr);
		console.log(); // a blank row
		
		for (var row = 0; row < this.rows; row++) {
			var rowArr = [this.indices[row]];
			
			for (var col = 0; col < this.cols; col++) {
				var cell = this.ms.getCellAt(row, col);
				rowArr.push(this.getCellSymbol(cell));
			}
			
			console.log(rowArr.join(' '));
		}
	}
	
	private getCellSymbol(cell: Cell): string {
		if (cell.open) {
			if (cell.bomb) {
				return 'X';
			} else if (cell.adjBombCount > 0) {
				return cell.adjBombCount.toString();
			} else {
				return ' ';
			}
		}
		
		return 'O';
	}
}

new TextMinesweeper();