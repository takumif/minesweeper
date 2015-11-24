import Cell = require('./Cell');

class Minefield {
    steppedOnBomb: boolean;
    openCellCount: number;
    private cells: Cell[][];
    private rows: number;
    private cols: number;

    constructor(cells: Cell[][]) {
        if (cells.length == 0 || cells[0].length == 0) {
            throw "Cannot make an empty minefield";
        }

        this.cells = cells;
        this.rows = cells.length;
        this.cols = cells[0].length;

        this.init();
    }

    init(): void {
        this.steppedOnBomb = false;
        this.openCellCount = 0;

        this.cells.forEach(row => {
            row.forEach(cell => {
                if (cell != null) {
                    cell.open = false;
                }
            });
        });

        this.updateCellAdjacency();
    }

    isValidCell(row: number, col: number): boolean {
        if (row < 0 || col < 0 || row >= this.rows || col >= this.cols) {
            return false;
        }

        return this.cells[row][col] != null;
    }

    makeMove(row: number, col: number): void {
        if (!this.isValidCell(row, col)) {
            throw "Stepped on an invalid cell";
        }

        this.recursivelyOpen(this.cells[row][col]);
    }

    getCellAt(row: number, col: number): Cell {
        if (!this.isValidCell(row, col)) {
            throw "Invalid row or column value";
        }

        return this.cells[row][col];
    }
	
    /**
     * Updates the adjCells property for each cell
     */
    protected updateCellAdjacency(): void {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                var cell = this.cells[row][col];
                cell.adjCells = [];
                cell.adjBombCount = 0;

                for (var dr = -1; dr <= 1; dr++) {
                    for (var dc = -1; dc <= 1; dc++) {
                        if (this.isValidCell(row + dr, col + dc)) {
                            var adjCell = this.cells[row + dr][col + dc];
                            cell.adjCells.push(adjCell);
                            
                            if (adjCell.bomb) {
                                cell.adjBombCount++;
                            }
                        }
                    }
                }
            }
        }
    }

    private recursivelyOpen(cell: Cell): void {
        cell.open = true;

        if (cell.bomb) {
            this.steppedOnBomb = true;
        }

        if (cell.adjBombCount == 0) {
            cell.adjCells.forEach(adjCell => {
                if (!adjCell.open) {
                    this.recursivelyOpen(adjCell);
                }
            });
        }
    }
}

export = Minefield;