let gCircle = {
    pos: { x: 150, y: 150 },
    size: 50,
    color: 'green',
    isDrag: false
}

let gCurrShape = 'line' 
let shouldDraw = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function setCircleDrag(isDrag) {
    gCircle.isDrag = isDrag
}

function getCircle() {
    return gCircle
}

function moveCircle(dx, dy) {
    gCircle.pos.x += dx
    gCircle.pos.y += dy
}

function isCircleClicked(pos) {
    const distance = Math.sqrt((pos.x - gCircle.pos.x) ** 2 + (pos.y - gCircle.pos.y) ** 2)
    return distance <= gCircle.size
}

function setShape(shape) {
    gCurrShape = shape
}

function getShape() {
    return gCurrShape
}
