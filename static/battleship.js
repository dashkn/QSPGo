function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));

}


function genGame(enm, ply) {
    let enmPos = []
    while (enmPos.length != 3) {
        let pos = getRandomInt(5)
        if (enmPos.includes(pos)) {
            continue
        }
        enmPos.push(pos)
    }

    let plyPos = []
    while (plyPos.length != 3) {
        let pos = getRandomInt(5)
        if (plyPos.includes(pos)) {
            continue
        }
        plyPos.push(pos)
    }

    let ship = ['DD', 'CV', 'BB']

    for (i = 0; i < 3; i++) {
        enm.set(enmPos[i].toString(), ship[i])
        ply.set(plyPos[i].toString(), ship[i])
    }

    let state = [0, 0, 0, 0, 0, 0, 0, 0]
    enm.set('state', state)
    ply.set('state', state)

    enm.set('BB', [1, 0])
    enm.set('CV', [1, 0])
    enm.set('DD', [1, 0])
    ply.set('BB', [1, 0])
    ply.set('CV', [1, 0])
    ply.set('DD', [1, 0])
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function bomb(pos, posMap) {
    if (posMap.has(pos) == false) {
        return 'MISS'
    } 
    return posMap.get(pos)
}

function ApplyBomb(qb, bullet) {
    let ret = Rotate(bullet, qb)
    return ret
}

function Turn(target, board) {
    let pos = 4
    for (i = 0; i < target.length; i++) {
        if (target[i].checked == true) {
            pos = i
        }
    }
    pos = pos.toString()

    let ship = bomb(pos, board)
    let bullet = 0
    if (ship == 'MISS') {
        console.log(ship)
        return
    }

    switch (ship) {
        case 'DD':
            bullet = Math.PI / 2
            break
        case 'CV':
            bullet = Math.PI / 2
            break
        case 'BB':
            bullet = Math.PI / 2
            break
        default:
    }
    enmQb = board.get(ship)
    if (enmQb[1] == 1) {
        console.log('DESTROYED')
        return
    }
    enmQb = Rotate(bullet, enmQb)
    board.set(ship, enmQb)

    let shipState = [
        board.get('DD'),
        board.get('CV'),
        board.get('BB')
    ]
    let state = Tensor(shipState[1], shipState[0])
    state = Tensor(state, shipState[2])
    ResetAppState()

    return state
    
}

function mapColor(cln, i) {

}