export default class Vector {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    dotProduct(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z
    }

    get magnitude() {
        return Math.sqrt(this.dotProduct(this))
    }

    get normalize() {
        return this.divide(this.magnitude)
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z)
    }

    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z)
    }

    multiply(value) {
        return new Vector(this.x * value, this.y * value, this.z * value)
    }

    divide(value) {
        return new Vector(this.x / value, this.y / value, this.z / value)
    }
}
