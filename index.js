let wall = {};

function setup() {
    createCanvas(500,500)
    wall = createWall({
        startPos: {x: 50, y: 50},
        endPos: {x: 100, y: 125}
    })
    addObject(wall)
}

function update() {
    fillBackground(0,0,0);
    wall.startPos.x += 1;
    wall.endPos.x += 1;
}

