const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const numbers = input.split(' ').map(n => parseInt(n))

const nodes = []

let index = 0
function processNode() {
    let node = {
        children: [],
        metadata: []
    }

    const numChildren = numbers[index++]
    const numMetadata = numbers[index++]

    for(let i = 0; i < numChildren; i++) {
        node.children.push(processNode())
    }

    for(let i = 0; i < numMetadata; i++) {
        node.metadata.push(numbers[index++])
    }

    return node
}

nodes.push(processNode())

function sumMetaData(node) {
    return node.metadata.reduce((sum, val) => sum + val) + node.children.map(child => sumMetaData(child)).reduce((sum, val) => sum + val, 0)
}

function sumValues(node) {
    if(!node) {
        return 0
    }

    if(node.children.length === 0) {
        return node.metadata.reduce((sum, val) => sum + val)
    }

    return node.metadata.map(metadata => sumValues(node.children[metadata - 1])).reduce((sum, val) => sum + val, 0)
}

console.log(`Sum of all metadata = ${sumMetaData(nodes[0])}`)
console.log(`Sum of all values = ${sumValues(nodes[0])}`)
