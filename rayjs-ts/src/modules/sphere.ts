import Material from "./material"
import Ray from "./ray"
import Vector from "./vector"

export default class Sphere {
    center: Vector
    radius: number
    material: Material
    
    constructor(center: Vector, radius: number, material: Material) {
        this.center = center
        this.radius = radius
        this.material = material
    }

    intersects(ray: Ray) {
        // return distance to intersection
        const sphereToRay = ray.origin.subtract(this.center)
        const b = 2 * ray.direction.dotProduct(sphereToRay)
        const c = sphereToRay.dotProduct(sphereToRay) - this.radius * this.radius
        const discriminant = b * b - 4 * c
        if(discriminant >= 0) {
            const distance = (-b - Math.sqrt(discriminant)) / 2
            return distance > 0 ? distance : null
        }
        return null
    }

    normal(surfacePoint: Vector) {
        return surfacePoint.subtract(this.center).normalize
    }

}
