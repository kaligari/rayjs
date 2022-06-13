export default class Vector {
    x: f64
    y: f64
    z: f64

    constructor(x: f64, y: f64, z: f64) {
        this.x = x
        this.y = y
        this.z = z
    }

    dotProduct(vector: Vector): f64 {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z
    }

    get magnitude(): f64 {
        return Math.sqrt(this.dotProduct(this))
    }

    get normalize(): Vector {
        return this.divide(this.magnitude)
    }

    add(vector: Vector): Vector {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z)
    }

    subtract(vector: Vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z)
    }

    multiply(value: f64): Vector {
        return new Vector(this.x * value, this.y * value, this.z * value)
    }

    divide(value: f64): Vector {
        return new Vector(this.x / value, this.y / value, this.z / value)
    }
}
