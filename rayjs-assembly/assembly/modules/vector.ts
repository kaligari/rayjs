export default class Vector {
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    dotProduct(vector: Vector): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z
    }

    get magnitude(): number {
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

    multiply(value: number): Vector {
        return new Vector(this.x * value, this.y * value, this.z * value)
    }

    divide(value: number): Vector {
        return new Vector(this.x / value, this.y / value, this.z / value)
    }
}
