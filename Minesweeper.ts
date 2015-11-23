import Cell = require('./Cell');
import Minefield = require('./Minefield');

/**
 * An abstract class for one game instance of minesweeper
 */
class Minesweeper {
	protected field: Minefield;
	protected rows: number;
	protected cols: number;
	protected cellCount: number;
	protected bombCount: number;
	protected observers: MSObserver[];

	constructor() {
		this.field = this.getField();
	}
	
	play(): void {
		this.observers.forEach(observer => {
			observer.onGameStart();
			observer.onWaitingInput();
		});
	}
	
	addObserver(observer: MSObserver): void {
		this.observers.push(observer);
	}
	
	getCellAt(row: number, col: number): Cell {
		if (!this.field.isValidCell(row, col)) {
			throw "Invalid row or column value";
		}
		
		return this.field.getCellAt(row, col);
	}
	
	protected getField(): Minefield {
        throw "getField not implemented!";
    }
	
	/**
	 * Gets a cell without a bomb in it. Will not terminate if no such cell exists
	 */
	protected getRandomCellWithoutBomb(cells: Cell[][]): Cell {
		do {
			var cell = this.getRandomCell(cells);
		} while (!cell.bomb);

		return cell;
	}
	
	/**
	 * Will not terminate if no valid cell exists
	 */
	protected getRandomCell(cells: Cell[][]): Cell {
		do {
			// choose between [0, rows) and [0, cols)
			var row = Math.floor(Math.random() * (this.rows));
			var col = Math.floor(Math.random() * (this.cols));
			
			var cell = cells[row][col];
		} while (!cell);
		
		return cell;
	}
}

export = Minesweeper;