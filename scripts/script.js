const doc = document

const canvas = doc.querySelector ('#canv')
ctx = canvas.getContext ('2d')

let system = {
    currentTool: null,
    currentColor: '#000',
    brushSize: 5
}

function getCoordinates (evt) {
    doc.querySelector ('#x-coord').innerText = evt.offsetX
    doc.querySelector ('#y-coord').innerText = evt.offsetY
}

function renderSystem (elem, act) {
    system [elem] = act
}

function handleClick (evt) {
    if (evt.target.classList.contains ('btn')) {
        if (evt.target.dataset.name) {
        renderSystem ('currentTool', evt.target.dataset.name)
        }
        else if (evt.target.dataset.make) {
            if (evt.target.dataset.make == "fill") {

                ctx.fillStyle = system.currentColor
                ctx.fillRect (0, 0, 1000, 800)

            } else if (evt.target.dataset.make == "clear") {
                ctx.fillStyle = "#ffffff"
                ctx.fillRect (0, 0, 1000, 800)
            }
        }
    }
}

function handleInput (evt) {
    if (evt.target.id === 'select-size') {
        renderSystem ('brushSize', evt.target.value)
        console.log ('size ' + evt.target.value)
    }
    if (evt.target.id === 'select-color') {
        renderSystem ('currentColor', evt.target.value)
        console.log ('color ' + evt.target.value)
    }
}

function startDraw (evt) {
    if (system.currentTool === 'pencil') {
        pencil (evt)
    } else if (system.currentTool === "brush") {
        brush (evt);
    }
}

function endDraw () {
    canvas.onmousemove = null
}

//add Tool

function pencil () {
    canvas.onmousemove = function (evt) {
        let x = evt.offsetX;
        let y = evt.offsetY;
        ctx.fillStyle = system.currentColor
        ctx.fillRect (x, y, system.brushSize, system.brushSize)
    }
}

function brush () {
    canvas.onmousemove = function (evt) {
        let x = evt.offsetX;
        let y = evt.offsetY;
        console.log(x, y);
        ctx.fillStyle = system.currentColor;
        ctx.beginPath();
        ctx.arc(x, y, system.brushSize, 0, 2*Math.PI);
        ctx.fill();
    }
}

canvas.addEventListener ('mousemove', getCoordinates)
canvas.addEventListener ('mousedown', startDraw)
canvas.addEventListener ('mouseup', endDraw)
doc.addEventListener ('click', handleClick)
doc.addEventListener ('input', handleInput)
