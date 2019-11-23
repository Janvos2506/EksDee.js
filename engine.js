const engine = {};
const fpsCounter = document.getElementById("fpsCounter");

function createCanvas(width, height) {
    const canvas = document.createElement("CANVAS");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    engine.renderer = {
        canvas,
        ctx,
        frameCount: 0
    }

    engine.map = {
        width,
        height,
        objects: [],
        pixels: ctx.createImageData(width, height)
    }
    fillBackground(0,0,0);
}

function renderFrame() {
    let nextFrame = engine.renderer.pixels;

    nextFrame = renderWalls(nextFrame, engine.map.objects);
    nextFrame = renderBoxes(nextFrame, engine.map.objects);

    const pixelData = flatten(nextFrame);

    for(let i = 0; i < engine.map.pixels.data.length; i +=4) {
        const pixel = pixelData[i/4];
        engine.map.pixels.data[i] = pixel.r;
        engine.map.pixels.data[i+1] = pixel.g;
        engine.map.pixels.data[i+2] = pixel.b;
        engine.map.pixels.data[i+3] = 255;
    }

    engine.renderer.ctx.putImageData(engine.map.pixels,0,0)
}

function flatten(frame) {
    return [].concat(...frame)
}

function renderWalls(frame, objects) {
    const walls = objects.filter(obj => obj.type == WALL);
    if(walls.length > 0)  {
        walls.forEach(wall => {
            renderLine(wall.startPos.x, wall.startPos.y, wall.endPos.x, wall.endPos.y, frame)
        })
    }
    return frame;
}

function renderBoxes(frame, objects) {
    const boxes = objects.filter(obj => obj.type == BOX);
    if(boxes.length > 0)  {
        boxes.forEach(box => {
            renderLine(box.startPos.x, box.startPos.y, box.endPos.x, box.startPos.y, frame)
            renderLine(box.startPos.x, box.startPos.y, box.startPos.x, box.endPos.y, frame)
            renderLine(box.endPos.x, box.startPos.y, box.endPos.x, box.endPos.y, frame) 
            renderLine(box.startPos.x, box.endPos.y, box.endPos.x, box.endPos.y, frame)
        })
    }
    return frame;
}

function renderLine(y0, x0, y1, x1, frame) {
 
    var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1; 
    var err = (dx>dy ? dx : -dy)/2;
   
    while (true) {
      frame[x0][y0] = {r:255, g:255, b:255};
      if (x0 === x1 && y0 === y1) break;
      var e2 = err;
      if (e2 > -dx) { err -= dy; x0 += sx; }
      if (e2 < dy) { err += dx; y0 += sy; }
    }
}

function superSetup() {

}

function superUpdate() {

}

function setup() {
    console.error("Please implement a setup function");
}

function update() {
    console.error("Please implement an update function");
}

function renderLoop() {
    renderFrame();
    engine.renderer.frameCount++;
    window.requestAnimationFrame(renderLoop);
}

setInterval(() => {
    fpsCounter.innerHTML = engine.renderer.frameCount;
    engine.renderer.frameCount = 0;
},1000)

setInterval(() => {
    superUpdate();
    update();
},10)

setTimeout(() => {
    superSetup();
    setup();
    window.requestAnimationFrame(renderLoop);
}, 1)

