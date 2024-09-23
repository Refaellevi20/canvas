var gElCanvas
var gCtx
var gCurrShape = 'line'
var shouldDraw = false
const MAIN_MOUSE_BUTTON = 0

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    //* Add event listeners
    const elShapeSelect = document.getElementById('shapeSelect')
    elShapeSelect.addEventListener('change', (ev) => {
        onSetShape(ev.target.value)
    })

    gElCanvas.addEventListener('mousedown', startDraw)
    gElCanvas.addEventListener('mouseup', endDraw)
    gElCanvas.addEventListener('mousemove', moveDraw)
}

function drawLine(x, y, xEnd = gElCanvas.width / 2, yEnd = gElCanvas.height / 2) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd)
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'limegreen'
    gCtx.stroke()
}

function drawTriangle(x, y) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(x + 80, y + 80)
    gCtx.lineTo(x - 20, y + 100)
    gCtx.closePath()
    gCtx.lineWidth = 2
    gCtx.fillStyle = 'orangered'
    gCtx.strokeStyle = 'blue'
    gCtx.fill()
    gCtx.stroke()
}

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'purple'
    gCtx.fillStyle = 'royalblue'
    gCtx.lineWidth = 3
    gCtx.rect(x, y, 120, 120)
    gCtx.fill()
    gCtx.stroke()
}

function drawArc(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 10
    gCtx.arc(x, y, 50, 0, Math.PI * 2)
    gCtx.fillStyle = 'red'
    gCtx.fill()
    gCtx.strokeStyle = 'green'
    gCtx.stroke()
}

function drawText(text, x, y) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 40
    // gElCanvas.height = elContainer.clientHeight - 40
}

function onSetShape(shape) {
    gCurrShape = shape
}

function onDraw(ev) {
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY

    switch (gCurrShape) {
        case 'line':
            drawLine(offsetX, offsetY)
            break
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break
        case 'rect':
            drawRect(offsetX, offsetY)
            break
        case 'circle':
            drawArc(offsetX, offsetY)
            break
        case 'text':
            drawText('Hello', offsetX, offsetY)
            break
    }
}

function startDraw(ev) {
    if (ev.button === MAIN_MOUSE_BUTTON) {
        shouldDraw = true
        gCtx.beginPath()
        gCtx.moveTo(ev.offsetX, ev.offsetY)
        if (gCurrShape !== 'pencil') {
        onDraw(ev)
        }
    }
}

function endDraw(ev) {
    if (ev.button === MAIN_MOUSE_BUTTON) {
        shouldDraw = false
        gCtx.closePath()
    }
}

function moveDraw(ev) {
    if (shouldDraw && gCurrShape === 'pencil') {
        gCtx.lineTo(ev.offsetX, ev.offsetY)
         gCtx.strokeStyle = 'black'
         gCtx.lineWidth = 2
        gCtx.stroke()
    }
}

function updateBackgroundColor() {
    const bgColor = document.getElementById('bgColor').value
    document.body.style.backgroundColor = bgColor
}

function updateTextColor() {
    const txtColor = document.getElementById('txtColor').value
    document.body.style.color = txtColor
}
