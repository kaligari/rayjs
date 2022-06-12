import './style.css'
import { render, width, height, engine } from './modules/main'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
const imageData = ctx.createImageData(width, height)

canvas.width = width
canvas.height = height

const renderFrame = () => {
    window.requestAnimationFrame(renderFrame)
    render()
    new Uint32Array(imageData.data.buffer).set(new Uint32Array(engine.imageBuffer.buffer))
    ctx.putImageData(imageData, 0, 0);
    ctx.fillStyle = "red";
    ctx.fillText(`${engine.fps} fps`, 10, 20)
}

window.addEventListener('resize', () => renderFrame())

renderFrame()