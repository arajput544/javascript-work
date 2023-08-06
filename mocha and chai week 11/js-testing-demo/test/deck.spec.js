/* eslint-disable no-undef */
const deck = require('../deck');

const expect = require('chai').expect;

describe('deck.js Test Cases', function () {
    let cards;

    describe('buildDeck(Array<String>, Array<String>)', function () {
        it('should build a deck of cards given suits and values', function () {
            const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
            const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

            cards = deck.buildDeck(suits, values);

            expect(cards).to.be.an('object');
            expect(cards).to.have.property('deck');
            expect(cards).to.have.property('remaining');

            expect(cards.deck).to.be.instanceOf(Array);
            expect(cards.remaining).to.be.a('number');

            expect(cards.remaining).to.equal(suits.length * values.length);

            const position = 0;
            expect(cards.deck[position]).to.deep.equal({
                suit: suits[position],
                value: values[position]
            });
        });
    });

    describe('shuffleDeck(Array<Object>)', function () {
        it('should shuffle a deck of cards into a random order', function () {
            const shuffled = deck.shuffleDeck(cards.deck);

            expect(shuffled).to.be.an('object');
            expect(shuffled).to.have.property('deck');
            expect(shuffled).to.have.property('remaining');

            expect(shuffled.deck).to.be.instanceOf(Array);
            expect(shuffled.remaining).to.be.a('number');

            expect(shuffled.deck.length).to.equal(cards.deck.length);

            const isEqual = () => {
                for (let i = 0; i < cards.deck.length; i++) {
                    if (shuffled.deck[i] !== cards.deck[i]) {
                        return false;
                    }
                }

                return true;
            };

            expect(isEqual()).to.be.false;
        });
    });

    describe('drawCard(Array<Object>, Number)', function () {
        it('should drawn the given number of cards from a deck', function () {
            const n = 2;
            const drawn = deck.drawCard(cards.deck, n);

            expect(drawn).to.be.an('object');
            expect(drawn).to.have.property('deck');
            expect(drawn).to.have.property('remaining');
            expect(drawn).to.have.property('cards');

            expect(drawn.deck).to.be.instanceOf(Array);
            expect(drawn.remaining).to.be.a('number');
            expect(drawn.cards).to.be.instanceOf(Array);

            expect(drawn.deck.length).to.equal(cards.deck.length - n);
            expect(drawn.remaining).to.equal(drawn.deck.length);

            drawn.cards.forEach((card, index) => {
                expect(card).to.deep.equal({
                    suit: cards.deck[index].suit,
                    value: cards.deck[index].value
                });
            });
        });
    });
});
