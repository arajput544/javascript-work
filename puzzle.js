/**
 * generatePuzzle(word)
 * generates a word puzzle
 *
 * @param {string} word - the word to generate the puzzle
 *
 * @return {Object} the puzzle object containing { answer, blanks }
 * where answer is the word casted to lowercase
 * where blanks is an array containing strings
 */
const generatePuzzle = (word) => {
    const puzzle = { answer: word.toLowerCase(), blanks: [] };

    for (let i = 0; i < word.length; i++) {
        puzzle.blanks.push('');
    }

    return puzzle;
};

/**
 * checkLetter(letter, puzzle)
 * checks if the letter is in the puzzle answer
 * if it is then the letter will be added to the array in the correct index location
 *
 * @param {string} letter - a single letter
 * @param {Object} puzzle - the puzzle object containing { answer, blanks }
 *
 * @return {Object} the puzzle object containing { answer, blanks }
 * where answer is the puzzle answer
 * where blanks is an array containing strings
 */
const checkLetter = (letter, puzzle) => {
    const updatedPuzzle = { ...puzzle };

    for (let i = 0; i < puzzle.answer.length; i++) {
        const letterInAnswer = updatedPuzzle.answer[i];

        if (letter.toLowerCase() === letterInAnswer) {
            updatedPuzzle.blanks[i] = letter;
        }
    }

    return updatedPuzzle;
};

/**
 * gameCompleted(puzzle)
 * checks if the game is completed based on the answer and puzzle blanks
 *
 * if the puzzle blanks are not empty string AND
 * if the filled in puzzle blanks match the answer string
 * then the game is consdier completed as true
 *
 * @param {Object} puzzle - the puzzle object containing { answer, blanks }
 *
 * @return {Object} the puzzle object containing { answer, blanks, completed }
 * where answer is the puzzle answer
 * where blanks is an array containing strings
 * where completed is a boolean reflecting if the game is complete
 */

module.exports = {
    generatePuzzle,
    checkLetter
};
