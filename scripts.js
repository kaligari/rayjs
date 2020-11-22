const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const getWidth = () => window.innerWidth
const getHeight = () => window.innerHeight

const setCanvasDimensions = () => {
    canvas.width = getWidth()
    canvas.height = getHeight()
}

const init = () => {
    setCanvasDimensions()
    ctx.clearRect(0, 0, getWidth(), getHeight())
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, getWidth(), getHeight())
}

const render = () => {
    window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
    init()
    render()
})

init()
render()
