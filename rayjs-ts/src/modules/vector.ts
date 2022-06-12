export default class Vector {
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    dotProduct(vector: Vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z
    }

    get magnitude() {
        return Math.sqrt(this.dotProduct(this))
    }

    get normalize() {
        return this.divide(this.magnitude)
    }

    add(vector: Vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z)
    }

    subtract(vector: Vector) {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z)
    }

    multiply(value: number) {
        return new Vector(this.x * value, this.y * value, this.z * value)
    }

    divide(value: number) {
        return new Vector(this.x / value, this.y / value, this.z / value)
    }
}
