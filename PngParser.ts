import fs = require('fs');
import pngjs = require('pngjs');

class PngParser {
	static parseImage(src: string, callback: (image: number[][]) => void): void {
		var _this = this;
		
		fs.createReadStream(src).pipe(new pngjs.PNG({
			filterType: 4
		})).on('parsed', function() {
			callback(_this.generateImageArray(this));
		});
	}
	
	private static generateImageArray(image): number[][] {
		var imageArray = [];
		
		for (var row = 0; row < image.height; row++) {
			var rowArray = [];
			
			for (var col = 0; col < image.width; col++) {
				rowArray.push(this.getNthPixel(image.data, row * image.width + col));
			}
			imageArray.push(rowArray);
		}
		return imageArray;
	}
	
	private static getNthPixel(data, n): number {
		var a = data[n * 4];
		var r = data[n * 4 + 1];
		var g = data[n * 4 + 2];
		var b = data[n * 4 + 3];
		
		return (a << 24) + (r << 16) + (g << 8) + b;
	}
}

module.exports = PngParser;