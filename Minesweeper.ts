/// <reference path="Minefield.ts" />

abstract class Minesweeper {
	protected field: Minefield;
	protected rows = 8;
	protected cols = 8;
	protected cellCount = 64;
	protected bombCount = 10;
	protected observers: MSObserver[];

	constructor() {
		this.field = this.getField();
	}
	
	protected abstract getField();
	
	/**
	 * Gets a cell without a bomb in it. Will not terminate if no such cell exists
	 */
	protected getRandomCellWithoutBomb(cells: Cell[][]): Cell {
		do {
			var cell = this.getRandomCell(cell);
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
	
	public addObserver(observer: MSObserver): void {
		this.observers.push(observer);
	}
}