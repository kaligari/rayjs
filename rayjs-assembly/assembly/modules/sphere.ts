import Material from "./material"
import Ray from "./ray"
import Vector from "./vector"

export default class Sphere {
    center: Vector
    radius: f64
    material: Material
    
    constructor(center: Vector, radius: number, material: Material) {
        this.center = center
        this.radius = radius
        this.material = material
    }

    intersects(ray: Ray): f64 {
        // return distance to intersection
        const sphereToRay: Vector = ray.origin.subtract(this.center)
        const b: f64 = 2 * ray.direction.dotProduct(sphereToRay)
        const c: f64 = sphereToRay.dotProduct(sphereToRay) - this.radius * this.radius
        const discriminant: f64 = b * b - 4 * c
        // BUG: discriminant is always less than 0
        if(discriminant >= 0) {
            const distance: f64 = ((-b - Math.sqrt(discriminant)) / 2) as f64
            return distance > 0 ? distance : -1
        }
        return -1
    }

    normal(surfaceVector: Vector): Vector {
        return surfaceVector.subtract(this.center).normalize
    }

}
