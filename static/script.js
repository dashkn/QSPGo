let mainColor = "#1F2D57"
let secondColor = "#4C88FF"
let thirdColor = "#6FE0E7" 
let landColor = "#75D249"
let waterColor = "#2E3481"

let labSelected = null
let lockedOn = null

let command = document.getElementsByClassName('r2i-command')[0]
command.addEventListener('click', (e) => {
    let target = e.target
    let qt = target.dataset.rad
    if (target.tagName != 'LABEL' || target.control.name == 'proceed') {
        return
    }
    let tileItem = document.querySelector(qt).children
    if (labSelected != null) {
        labSelected.classList.remove('cButSelected')
        labSelected.classList.add('cButDeselected')
        labSelected = null

        lockedOnItem = lockedOn.children
        lockedOnItem[0].style.color = 'var(--gray)'
        lockedOnItem[1].style.visibility = 'hidden'
        lockedOnItem[2].style.visibility = 'hidden'
        lockedOn = null
    }
    labSelected = target
    target.classList.add('cButSelected')
    labSelected.classList.remove('cButDeselected')

    lockedOn = tileItem[0].parentElement
    tileItem[0].style.color = 'snow'
    tileItem[1].style.visibility = 'visible'
    tileItem[2].style.visibility = 'visible'

    let pBut = document.getElementsByClassName('pbutton')[0]
    pBut.classList.remove('pButDisabled')
    pBut.classList.add('pButActivated')
})

let form = document.getElementById('ApplyBomb')
form.addEventListener('submit', (e) => {
    e.preventDefault()
})

let proceedCommand = document.getElementById('proceed')
proceedCommand.addEventListener('click', (e) => {
    let rad = document.getElementsByName('command')
    let enmState = Turn(rad, enmPos)
    let val = 0
    let probBox = []
    let posI = []
    if (enmState != undefined) {
        console.log(enmState)
        enmState.forEach((s) => {
            val = Math.pow(s, 2)
            if (val != 0) {
                probBox.push(val)
                posI.push(enmState.indexOf(s))
            }
        })

        if (posI.length != 0) {
            let lb = null
            let enmLb = document.getElementsByClassName('enm-stv')
            posI.forEach((i) => {
                enmLb[i].style.background = `rgba(123, 236, 255, ${probBox[i]})`
            })
        }

    }
})

function ResetAppState() {

    let defRad = document.getElementsByName('command')
    defRad.forEach((elm) => {
        elm.checked = false
    })

    let defCButton = document.querySelectorAll('.cbutton')
    defCButton.forEach((elm) => {
        elm.classList.add('cButDeselected')
    })

    let pBut = document.getElementsByClassName('pbutton')[0]
    pBut.classList.add('pButDisabled')
}

ResetAppState()

let enmPos = new Map()
let plyPos = new Map()
genGame(enmPos, plyPos)