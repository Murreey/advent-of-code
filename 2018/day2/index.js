const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8')

let numDoubles = 0
let numTriples = 0

input.split('\n').forEach((id) => {
    const letters = {}
    id.split('').forEach((letter) => {
        letters[letter] = letters[letter] ? letters[letter] + 1 : 1;
    })

    let hasDouble = false
    let hasTriple = false

    Object.keys(letters).forEach(index => {
        const value = letters[index]
        value == 2 ? hasDouble = true : ""
        value == 3 ? hasTriple = true : ""
    })

    hasDouble ? numDoubles++ : ""
    hasTriple ? numTriples++ : ""
})

console.log(`Checksum = ${numDoubles * numTriples}`)

const correctIds = []

input.split('\n').forEach((id) => {
    input.split('\n').forEach((id2) => {
        let diffCount = 0
        for(let i = 0; i < id.length; i++) {
            if(id[i] != id2[i]) {
                diffCount++
            }
        }

        if(diffCount == 1) {
            correctIds.push(id)
        }
    })
})

let common = correctIds[0].split('').filter((letter) => correctIds[1].includes(letter))
console.log(`Common letters: ${common.join('')}`)