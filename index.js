let wall = {};
let box = {}

function setup() {
    createCanvas(500,500)
    wall = createWall({
        startPos: {x: 250, y: 250},
        endPos: {x: 400, y: 250}
    })

    box = createBox({
        startPos: {x: 0, y: 0},
        endPos: {x: 10, y: 10}
    });
    addObject(wall)
    addObject(box)
}

function update() {
    fillBackground(100,100,100);
    box.endPos.x++;
}

