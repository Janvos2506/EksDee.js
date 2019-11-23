const WALL = 0;
const BOX = 1;



function fillBackground(r, g, b) {
    const map = engine.map;
    const pixelData = [];
    for(let x = 0; x < map.width; x++) {
        pixelData[x] = new Array(map.height);
        for(let y = 0; y < map.height; y++) {
            pixelData[x][y] = {r, g, b};
        }
    }
    engine.renderer.pixels = pixelData;
}


function createWall(options) {
    return {...options, type: WALL};
}

function createBox(options) {
    return {...options, type: BOX};
}

function addObject(obj) {
    engine.map.objects.push(obj);
}