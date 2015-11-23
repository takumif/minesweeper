/// <reference path="Cell.ts" />

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
    }
    
    isValidCell(row: number, col: number): boolean {
        if (row < 0 || col < 0 || row >= this.rows || col >= this.cols) {
            return false;
        }
        
        return this.cells[row][col] != null;
    }
    
    step(row: number, col: number): void {
        if (!this.isValidCell(row, col)) {
            throw "Stepped on an invalid cell";
        }
        
        this.recursivelyOpen(this.cells[row][col]);
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