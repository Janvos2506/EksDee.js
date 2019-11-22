const WALL = 0;

function fillBackground(r, g, b) {
    const map = engine.map;
    const pixelData = [];
    for(let x = 0; x < map.width; x++) {
        pixelData[x] = new Array(map.height * 4);
        for(let y = 0; y < map.height; y++) {
            const pixelIndex = y * 4;
            pixelData[x][pixelIndex] = r;
            pixelData[x][pixelIndex+1] = g;
            pixelData[x][pixelIndex+2] = b;
            pixelData[x][pixelIndex+3] = 255;
        }
    }
    engine.renderer.pixels = pixelData;
}


function createWall(options) {
    return {...options, type: WALL};
}

function addObject(obj) {
    engine.map.objects.push(obj);
}