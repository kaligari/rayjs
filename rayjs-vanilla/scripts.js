import Vector from './modules/vector.js'
import Point from './modules/point.js'
import Sphere from './modules/sphere.js'
import Scene from './modules/scene.js'
import Color from './modules/color.js'
import RendererEngine from './modules/rendererEngine.js'
import Light from './modules/light.js'
import Material from './modules/material.js'

const width = 640
const height = 480

const getWidth = () => window.innerWidth
const getHeight = () => window.innerHeight

const camera = new Vector(0, 0, -1)
const objects = [
    new Sphere(new Point(0, 0, 0), 0.5,
        new Material(
            new Color(255, 0, 0)
        )
    ),
    new Sphere(new Point(.25, 0, -.25), 0.25,
        new Material(
            new Color(0, 0, 255)
        )
    )
]
const lights = [
    new Light(new Point(1.5, -0.5, -2), new Color(255, 255, 255))
]
const scene = new Scene(camera, objects, lights, width, height)
const engine = new RendererEngine(scene)

const render = () => {
    engine.render(scene)
    // window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
    engine.init(width, height)
    render()
})

engine.init(width, height)
render()
