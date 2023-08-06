const buildDeck = (suits, values) => {
    const deck = [];
    suits.forEach((suit) => {
        values.forEach((value) => {
            deck.push({ suit, value });
        });
    });

    return { deck, remaining: deck.length };
};

// use the Fisher-Yates method for shuffling cards
// ref: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const shuffleDeck = (cards) => {
    const deck = [...cards];

    let index = deck.length;
    let randomNumber;
    let swapCard;

    while (0 !== index) {
        // Math.random() return a float of 0 and 1
        // multiply that by the index and take the floor to get an integer
        // ex: 52 * 0.327376603460499 = 17
        randomNumber = Math.floor(Math.random() * index);

        // decrement the index so we go through the array and eventually get to 0
        --index;

        // get the card that will be swapped
        swapCard = deck[index];

        // swap the cards in place in the cards array
        deck[index] = deck[randomNumber];
        deck[randomNumber] = swapCard;
    }

    return { deck, remaining: deck.length };
};

/*
Write a function called drawCards
- This function should accept a deck of cards
- This function should accept the number of cards to be drawn

- This function should return an object with keys: cards, deck and remaining
- cards: an array of cards that were drawn

- deck:  an an array cards which represents the same deck passed in
         but with the drawn cards taken out

- remaining: a number which is the number of cards remaining in the deck
             after the cards were drawn
*/
const drawCard = (cards, number = 1) => {
    const deck = [...cards];
    const drawn = deck.splice(0, number);

    return { cards: drawn, deck, remaining: deck.length };
};

module.exports = {
    buildDeck,
    shuffleDeck,
    drawCard
};
