import Color from "./modules/color"
import Light from "./modules/light"
import Material from "./modules/material"
import Point from "./modules/point"
import RendererEngine from "./modules/rendererEngine"
import Scene from "./modules/scene"
import Sphere from "./modules/sphere"

export const width: u16 = 255
export const height: u16 = 255
export const engine: RendererEngine = new RendererEngine(width, height)
const camera = new Point(0, 0, -1)
const objects = [
    new Sphere(new Point(0, 0, 0), 0.5,
        new Material(
            new Color(255, 0, 0)
        )
    ),
    new Sphere(new Point(0, 0, 0), 0.05,
        new Material(
            new Color(0, 0, 255)
        )
    ),
    new Sphere(new Point(0, 0, 0), 0.05,
        new Material(
            new Color(0, 255, 0)
        )
    )
]
const lights = [
    new Light(new Point(1.5, -0.5, -2), new Color(255, 255, 255))
]
const scene = new Scene(camera, objects, lights)
engine.render(scene)
export const imageBuffer = engine.imageBuffer

export function render(): void {
    engine.render(scene)
}
