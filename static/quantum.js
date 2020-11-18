function Tensor(left, right) {
    let n = left.length
    let p = right.length
    let ret = []

    for (i = 0; i < n; i++) {
        for (j = 0; j < p; j++) {
            ret.push(left[i] * right[j])
        }
    }
    return ret
}

function Product(gate, qb) {
    let total = 0
    let ret = []
    for (i = 0; i < gate.length; i++) {
        for (j = 0; j < gate[i].length; j++) {
            total += gate[i][j] * qb[j]
        }
        ret.push(total)
        total = 0
    }
    return ret
}

function Rotate(theta, qb) {
    let ry = [
        [Math.cos(theta/2), Math.sin(theta/2)],
        [Math.sin(theta/2), Math.cos(theta/2)],
    ]
    let total = 0
    let ret = []
    for (i = 0; i < ry.length; i++) {
        for (j = 0; j < ry[i].length; j++) {
            total += ry[i][j] * qb[j]
        }
        ret.push(total)
        total = 0
    }
    return ret
}