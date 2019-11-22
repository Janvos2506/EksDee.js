const engine = {};

function createCanvas(width, height) {
    const canvas = document.createElement("CANVAS");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    engine.renderer = {
        canvas,
        ctx
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

    const pixelData = nextFrame.flat();
    for(let i = 0; i < engine.map.pixels.data.length; i++) {
        engine.map.pixels.data[i] = pixelData[i];
    }

    engine.renderer.ctx.putImageData(engine.map.pixels,0,0)
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

function renderLine(x0, y0, x1, y1, frame) {
 
    var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1; 
    var err = (dx>dy ? dx : -dy)/2;
   
    while (true) {
      frame[x0][y0] = 255;
      frame[x0][y0 + 1] = 255;
      frame[x0][y0 + 2] = 255;
      frame[x0][y0 + 3] = 255;
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

function mainUpdateLoop() {
    superUpdate();
    update();
    renderFrame();
    window.requestAnimationFrame(mainUpdateLoop);
}

setTimeout(() => {
    superSetup();
    setup();
    window.requestAnimationFrame(mainUpdateLoop);
}, 1)

