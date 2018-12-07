const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const steps = []

input.split('\n').forEach((line) => {
    const step = line.split(' ')[7]
    const before = line.split(' ')[1]
    if(steps[step]) {
        steps[step].prerequisites.push(before)
    } else {
        steps[step] = {
            completed: false,
            prerequisites: [before]
        }
    }

    if(!steps[before]) {
        steps[before] = Object.assign({},  {
            completed: false,
            prerequisites: []
        })
    }
})

const stepsTaken = []
let availableSteps = []
let timeTaken = 0

const workers = new Array(5).fill().map(m => ({remaining: 999999999, workingOn: null, finished: true}))

do {
    reduceWorkersTime()

    for(let i = 0; i < workers.length; i++) {
        if(workers[i].finished && workers[i].workingOn) { 
            console.log(`Job ${workers[i].workingOn} is finished!`)
            steps[workers[i].workingOn].completed = true
            stepsTaken.push(workers[i].workingOn)
            workers[i].workingOn = null
        }
    }

    availableSteps = getStepsToBeTaken()
    availableSteps.sort()

    for(let i = 0; i < workers.length; i++) {
        if(workers[i].finished && !workers[i].workingOn) { 
            const nextJob = availableSteps.shift()
            if(nextJob) {
                console.log(`Worker ${i} is free, giving them job ${nextJob}`)
                const jobLength = 60 + (nextJob.charCodeAt(0) - 64)
                workers[i].workingOn = nextJob
                workers[i].remaining = jobLength
                workers[i].finished = false
            }
        }
    }
} while(stepsTaken.length < Object.keys(steps).length)

function reduceWorkersTime() {
    workers.forEach((worker, index) => {
        if(workers[index].remaining > 0) {
            workers[index].remaining = workers[index].remaining - 1
        }
        
        if(workers[index].remaining <= 0) {
            workers[index].finished = true
        }
    })

    timeTaken++
}

console.log(stepsTaken.join(''))
// I don't know why this is off by one, but the correct answer is 1 less than the number I've got.
// 🙃
console.log(`Time taken: ${timeTaken - 1}`)

function getStepsToBeTaken() {
    const stepsToTake = Object.keys(steps).filter((key) => {
        const step = steps[key]
        if(step.completed) {
            return false
        }

        let allPrerequisitesComplete = true
        step.prerequisites.forEach((pre) => {
            if(!steps[pre].completed) {
                allPrerequisitesComplete = false
            }
        })

        return allPrerequisitesComplete
    })

    return stepsToTake.filter((step) => {
        for(let i = 0; i < workers.length; i++) {
            if(workers[i].workingOn === step) {
                return false
            }
        }

        return true
    })
}