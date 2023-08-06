const expect = require('chai').expect;

const puzzle = require('../puzzle');


describe('puzzle.js Test Cases', function () {
    let p;
     describe('generatePuzzle(String)', function(){
        it('generate a puzzle given words ', function(){
            // let p;
            const word = 'javascript';
            p = puzzle.generatePuzzle(word);

            expect(p).to.be.an('object');
            expect(p).to.have.a.property('answer');
            expect(p).to.have.a.property('blanks');

            expect(p.blanks).to.be.an.instanceOf(Array);
            expect(p.answer).to.be.a('String');

            expect(p.answer).to.be.equal(word);
            const isBlanks = (a) => {
                const ar = [];
                for(let i=0;i<a;i++){
                    ar.push('')
                }
                return ar;
            }
            
            expect(p.blanks).to.have.lengthOf(word.length);
            expect(p.blanks).deep.equal(isBlanks(word.length));

        })
     })
     describe('checkLetter(String,Object)',function(){
        it('checks whether the letter is present in the array and input it at the specific location',function(){
            const wo = "javascript";
            const letter = 'a';

            const pu = puzzle.generatePuzzle(wo);
            const ch = puzzle.checkLetter(letter,pu);

            expect(ch).to.be.an('Object');
            expect(ch).to.have.a.property('answer');
            expect(ch).to.have.a.property('blanks');

            expect(ch.blanks).to.be.an.instanceOf(Array);
            expect(ch.answer).to.be.a('String');

            const checkval = (c,wo) => {
                const arr=[]
                for(let i=0;i<wo.length;i++){
                    if(wo.charAt(i) === c){
                        arr.push(c);
                    }
                    else{
                       arr.push('');
                    }
                }
                return arr;
            }

            expect(ch.answer).to.be.equal(wo);
            expect(ch.blanks).to.have.lengthOf(wo.length);
            expect(ch.blanks).to.deep.equal(checkval('a',wo));

        })

     })
     describe('gameCompleted(Object)',function(){
        it('check whether ',function(){
            const wo = "javascript";
            const pu = puzzle.generatePuzzle(wo);
            const completed = true;
            const gc = puzzle.gameCompleted(pu);

            expect(gc).to.be.an('Object');
            expect(gc).to.have.a.property('answer');
            expect(gc).to.have.a.property('blanks');
            expect(gc).to.have.a.property('completed');

            expect(gc.blanks).to.be.an.instanceOf(Array);
            expect(gc.answer).to.be.a('String');
            expect(gc.completed).to.be.a('Boolean');



            expect(gc.answer).to.be.equal(wo);
            expect(gc.blanks).to.have.lengthOf(wo.length);
            expect(gc.completed).to.be.equal(true);

            expect(gc.blanks).to.deep.equal(['j', 'a', 'v', 'a', 's', 'c', 'r', 'i', 'p', 't']);



        })

     })
})