import ColorCell = require('./ColorCell');
import Minefield = require('./Minefield');
import Minesweeper = require('./Minesweeper');

class ImageMinesweeper extends Minesweeper {
    
    private image: number[][];
    
    /**
     * Takes an image represented by a 2D ARGB array
     */
    constructor(image: number[][], bombCount: number) {
        this.image = image;
        this.bombCount = bombCount;
        this.rows = image.length;
        this.cols = image[0].length;
        this.cellCount = this.getCellCount(image);
        
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
                var color = this.image[row][col];
                
                if (color != 0) {
                    cells[row][col] = new ColorCell(color, false);
                }
            }
        }

        for (var i = 0; i < this.bombCount; i++) {
            this.getRandomCellWithoutBomb(cells).bomb = true;
        }

        return new Minefield(cells);
    }
    
    /**
     * Requires that this.rows and this.cols are valid
     */
    private getCellCount(image: number[][]): number {
        var count = 0;
        
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                if (image[row][col] != 0) {
                    count++;
                }
            }
        }
        return count;
    }
}

export = ImageMinesweeper;