const numPlayers = 400
const numMarbles = 71864
// const numPlayers = 10
// const numMarbles = 1618

const list = []

const players = new Array(numPlayers + 1).fill().map(m => 0)
let marble = {
    value: 0
}
marble.next = marble
marble.previous = marble

let player = 1
for(let i = 0; i < numMarbles* 100; i++) {
    if(i % 23 === 0) {
        marble = marble.previous.previous.previous.previous.previous.previous

        players[player] = players[player] + i
        players[player] = players[player] + marble.previous.value

        marble.previous.previous.next = marble
        marble.previous = marble.previous.previous
    } else {
        marble = insertAfter(marble.next, i)
    }

    player = player % numPlayers + 1
}

// console.log(players)
console.log(`Highest player score is ${players.reduce((max, val) => max > val ? max : val, 0)}`)

function insertAfter(marble, value) {
    const newMarble = {
        value,
        next: marble.next,
        previous: marble
    }

    marble.next.previous = newMarble;
    marble.next = newMarble;
    return newMarble;
}