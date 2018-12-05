const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

let skipNext = false

function removePairs(polymer) {
    polymer = polymer.split('').reduce((output, letter, index, original) => {
        if(skipNext) {
            skipNext = false
            return output
        }

        if(letter === letter.toLowerCase() && original[index + 1] === letter.toUpperCase()) {
            skipNext = true
        } else if(letter === letter.toUpperCase() && original[index + 1] === letter.toLowerCase()) {
            skipNext = true
        } else {
            output = output + letter
        }
        
        return output
    }, '')

    return polymer
}

function fullyReact(input) {
    let remainingUnits = input

    while(removePairs(remainingUnits) != remainingUnits) {
        remainingUnits = removePairs(remainingUnits)
    }

    return remainingUnits
}

function removeAllUnits(string, letter) {
    return string.replace(new RegExp(letter, "gi"), '')
}

const result = fullyReact(input)
console.log(`Starting length: ${input.length}`)
console.log(`Remaining Units: ${result.length}`)

let shortest = input.length + 1
let removedLetter = ''

'abcdefghijklmnopqrstuvwxyz'.split('').forEach((letter) => {
    const withoutLetter = removeAllUnits(input, letter)
    const reacted = fullyReact(withoutLetter)
    if(reacted.length < shortest) {
        shortest = reacted.length
        removedLetter = letter
    }
})

console.log(`Shortest polymer was ${shortest} after removing ${removedLetter}`)
