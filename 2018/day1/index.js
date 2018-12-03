const fs = require('fs');
const input = fs.readFileSync('input.txt', "utf8")
let total = 0
let reachedFrequencies = []
const list = input.split('\n')

console.log(`Total of all frequencies: ${processFrequencies(list)}`)
while(reachedFrequencies) {
    processFrequencies(list)
}

function processFrequencies(list) {
    list.forEach((frequency) => {
        total = total + parseInt(frequency)
        if(reachedFrequencies) {
            if(reachedFrequencies.includes(total)) {
                console.log(`Reached duplicate frequency: ${total}`)
                reachedFrequencies = null
            } else {
                reachedFrequencies.push(total)
            }
        }
    })

    return(total)
}