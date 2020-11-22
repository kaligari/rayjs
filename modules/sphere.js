export default class Sphere {
    constructor(center, radius, material) {
        this.center = center
        this.radius = radius
        this.material = material
    }

    intersects(ray) {
        // return distance to intersection
        const sphereToRay = ray.origin - this.center
        const b = 2 * ray.direction.dotProduct(sphereToRay)
        const c = sphereToRay.dotProduct(sphereToRay) - this.radius * this.radius
        const discriminant = b * b-4 * c
        if(discriminant >= 0) {
            const distance = (-b - Math.sqrt(discriminant) / 2)
            return distance > 0 ? distance : null
        } else {
            return null
        }
    }

}
