var gElCanvas
var gCtx
let gLastPos
var gCurrShape = 'line'
var shouldDraw = false


const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
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

    // addListeners()
    // resizeCanvas()
    // //* Calc the center of the canvas
    // const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    // //* Create the circle in the center
    // createCircle(center)
    // renderCanvas()
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

function renderCanvas() {
    //* Set the background color to grey
    gCtx.fillStyle = '#ede5ff'
    //* Clear the canvas,  fill it with grey background
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    //* Render the circle over the canvas
    renderCircle()
}

function renderCircle() {
    //* Get the props we need from the circle
    const { pos, color, size } = getCircle()
    //* Draw the circle
    drawArc(pos.x, pos.y, size, color)
}


function onDown(ev) {
    //* Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos:', pos)

    if (!isCircleClicked(pos)) return

    setCircleDrag(true)

    //* Save the pos we start from
    gLastPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getCircle()
    if (!isDrag) return

    const pos = getEvPos(ev)
    //* Calc the delta, the diff we moved
    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y
    moveCircle(dx, dy)
    //* Save the last pos so we will remember where we`ve been and move accordingly
    gLastPos = pos
    //* The canvas (along with the circle) is rendered again after every move
    renderCanvas()
    // renderCircle()
}

function onUp() {
    setCircleDrag(false)
    document.body.style.cursor = 'grab'
}

//* Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //* Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse screen dragging event
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.clientX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.clientY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function drawArc(x, y, size = 60, color = 'blue') {
    gCtx.beginPath()
    gCtx.lineWidth = '6'
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
    gCtx.fillStyle = color
    gCtx.fill()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    const reader = new FileReader()

    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result

        img.onload = () => {
            onImageReady(img)
        }
    }

    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onUploadToFB(url) {
    // console.log('url:', url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a successful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        // console.log('uploadedImgUrl:', uploadedImgUrl)
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
            <a href="${uploadedImgUrl}">Image Url</a>
            <p>Image url: ${uploadedImgUrl}</p>
           
            <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
                Share on Facebook  
            </button>
        `
    }

    uploadImg(canvasData, onSuccess)
}
