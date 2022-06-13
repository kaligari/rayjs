import Color from "./modules/color"
import Light from "./modules/light"
import Material from "./modules/material"
import RendererEngine from "./modules/rendererEngine"
import Scene from "./modules/scene"
import Sphere from "./modules/sphere"
import Vector from "./modules/vector"

export const width: u16 = 255
export const height: u16 = 255
export const engine: RendererEngine = new RendererEngine(width, height)
const camera: Vector = new Vector(0, 0, -1)
const objects: Sphere[] = [
    new Sphere(new Vector(0, 0, 0), 0.5,
        new Material(
            new Color(255, 0, 0)
        )
    ),
    new Sphere(new Vector(0, 0, 0), 0.05,
        new Material(
            new Color(0, 0, 255)
        )
    ),
    new Sphere(new Vector(0, 0, 0), 0.05,
        new Material(
            new Color(0, 255, 0)
        )
    )
]
const lights: Light[] = [
    new Light(new Vector(1.5, -0.5, -2), new Color(255, 255, 255))
]
const scene: Scene = new Scene(camera, objects, lights)
engine.render(scene)
export const imageBuffer: Uint32Array = engine.imageBuffer

export function render(): void {
    engine.render(scene)
}
