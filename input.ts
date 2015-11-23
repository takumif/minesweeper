import readline = require('readline');

var rl = readline.createInterface({
    input:  process.stdin,
    output:  process.stdout
});

module.exports = function(question: string, callback: (input: string) => void) {
	rl.question(question, callback);
};