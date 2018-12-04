const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const guards = []
let onDutyGuard = null

const lines = input.split('\n').sort((a, b) => {
    const timestampA = new Date(a.substring(1, a.indexOf('] ')))
    const timestampB = new Date(b.substring(1, b.indexOf('] ')))
    return timestampA - timestampB
})

fs.writeFileSync('sorted.txt', lines.join('\n'))

lines.forEach((line) => {
    const timestamp = line.substring(1, line.indexOf('] '))
    if(line.includes('#')) {
        const guardNo = parseInt(line.substring(line.indexOf('#') + 1, line.indexOf(' begins shift')));
        if(!guards[guardNo]) {
            guards[guardNo] = {
                number: guardNo,
                awakeFor: 0,
                asleepFor: 0,
                fellAsleepAt: null,
                minutesAsleep: new Array(61).fill(0)
            }
        }

        onDutyGuard = guardNo;
    } else if(onDutyGuard) {
        const woke = line.includes('wakes up')
        if(!woke) {
            guards[onDutyGuard].fellAsleepAt = parseInt(timestamp.substring(line.indexOf(':'), line.length))
        }

        if(woke) {
            const wokeAt = parseInt(timestamp.substring(line.indexOf(':'), line.length))
            const sleptFor = wokeAt - guards[onDutyGuard].fellAsleepAt
            guards[onDutyGuard].asleepFor += sleptFor
            for(let i = guards[onDutyGuard].fellAsleepAt; i < wokeAt; i++) {
                guards[onDutyGuard].minutesAsleep[i]++
            }
        }
    }
})

const sleepiestGuard = guards.reduce((sleepiest, guard) => {
    return (guard.asleepFor > sleepiest.asleepFor) ? guard : sleepiest;
})

console.log(`The sleepiest guard was #${sleepiestGuard.number}, who slept for ${sleepiestGuard.asleepFor} minutes.`)

const sleepiestMinute = sleepiestGuard.minutesAsleep.reduce((max, minute, index, array) => {
    return (array[index] > array[max]) ? index : max;
}, 0)

console.log(`Sleepiest minute was minute ${sleepiestMinute}, asleep for ${sleepiestGuard.minutesAsleep[sleepiestMinute]} minutes.`)

const minutes = new Array(61).fill().map(m => ({
    sleepiestGuard: null,
    timesTheySlept: 0
}))
minutes.forEach((minute, minuteIndex) => {
    const sleepiestThisMinute = Object.keys(guards).reduce((max, index) => {
        return (guards[index].minutesAsleep[minuteIndex] > guards[max].minutesAsleep[minuteIndex]) ? index : max;
    })

    minute.sleepiestGuard = parseInt(sleepiestThisMinute)
    minute.timesTheySlept = guards[sleepiestThisMinute].minutesAsleep[minuteIndex]
})

const mostFrequentMinuteAsleep = Object.keys(minutes).reduce((max, index) => {
    return minutes[max].timesTheySlept > minutes[index].timesTheySlept ? max : index
})

console.log(`Guard #${minutes[mostFrequentMinuteAsleep].sleepiestGuard} was asleep ${minutes[mostFrequentMinuteAsleep].timesTheySlept} times at minute ${mostFrequentMinuteAsleep}`)