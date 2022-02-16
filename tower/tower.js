const height = process.argv[2] || 10;

const bottomLayer = height * 2 - 1;

for(let layer = 1; layer <= height; layer++) {
    
    const stones = layer * 2 - 1;
    const air = (bottomLayer - stones) / 2;
    console.log(' '.repeat(air) + '#'.repeat(stones + 
        ' '.repeat(air)));
}

//console.log('Hello CLI', height);

// Helpfull formula: x * 2 - 1



