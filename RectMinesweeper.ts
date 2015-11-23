/// <reference path="Minesweeper.ts" />

/**
 * One game run of rectangular minesweeper
 */
class RectMinesweeper extends Minesweeper {
	constructor() {
		super();
	}
	
	protected getField(): Minefield {
		if (this.bombCount > this.cellCount) {
			throw 'Too many bombs to fit in the field!';
		}

		var cells = new Array(this.rows);
		for (var row = 0; row < this.rows; row++) {
			cells[row] = new Array(this.cols);

			for (var col = 0; col < this.cols; col++) {
				cells[row][col] = new Cell(false);
			}
		}

		for (var i = 0; i < this.bombCount; i++) {
			this.getRandomCellWithoutBomb(cells).bomb = true;
		}

		return new Minefield(cells);
	}
}