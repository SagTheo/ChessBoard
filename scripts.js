const rows = document.getElementsByClassName('row')
const squares = document.getElementsByClassName('square')
let rowBool = true
const nbOrLetter = document.getElementsByClassName('nbOrLetter')
const moves = document.querySelector('.moves')
const piece = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='orange' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>"
const initialSquares = document.getElementsByClassName('initialSquare')
const boardColour = document.querySelector('#boardColour')
const availableColours = []
let initialColour = 'green'
let counterForBg = 0
let counterForPiece = 0
let colouredSquares = []
let squaresClickedWithPiece = []
let squaresClickedID = []

// to get all the available colours for the board
for (let i = 0; i < boardColour.length; i++) {
    availableColours.push(boardColour[i].value)
}

const formatColour = colour => {
    return colour[0].toUpperCase() + colour.substring(1)
}

// to colour board
const colourBoard = (colour) => {
    for (let i = 1; i <= rows.length; i++) {
        rowBool = i % 2 !== 0 ? true : false
        for (let j = 1; j <= rows[i - 1].children.length; j++) {
            availableColours.forEach(el => {
                if (rows[i - 1].children[j - 1].classList.contains(el)) {
                    rows[i - 1].children[j - 1].classList.remove(el)
                }
            })

            if (rowBool) {
                if (j % 2 !== 0) {
                    rows[i - 1].children[j - 1].classList.add('beige')
                } else {
                    rows[i - 1].children[j - 1].classList.add(colour)
                }
            } else {
                if (j % 2 !== 0) {
                    rows[i - 1].children[j - 1].classList.add(colour)
                } else {
                    rows[i - 1].children[j - 1].classList.add('beige')
                }
            }
        }
    }
}

// to colour letters and numbers
const colourLetterOrNb = colour => {
    for (let i = 0; i < nbOrLetter.length; i++) {
        let squareColour = null

        if (nbOrLetter[i].parentNode.classList.contains('beige')) {
            nbOrLetter[i].classList.remove(`nbOrLetter${formatColour(initialColour)}`)
            squareColour = 'beige'
        } else {
            squareColour = colour
        }

        if (squareColour === 'beige') {
            nbOrLetter[i].classList.add(`nbOrLetter${formatColour(colour)}`)
        } else {
            nbOrLetter[i].classList.add('nbOrLetterBeige')
        }
    }
}

const addPiece = (square, piece) => {
    const div = document.createElement('div')

    div.innerHTML = piece

    square.append(div)
}


colourBoard(initialColour)
colourLetterOrNb(initialColour)

for (let i = 0; i < initialSquares.length; i++) {
    addPiece(initialSquares[i], piece)  
}


// to change chess board colour
boardColour.addEventListener('change', () => {
    currentColour = boardColour.value
    
    colourBoard(currentColour)
    colourLetterOrNb(currentColour)

    initialColour = currentColour
})

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        // to identify which square was clicked
        const row = squares[i].parentNode.classList[1]
        const column = squares[i].classList[1]
        const clickedSquare = `${column}${row}`
        const span = document.createElement('span')
        
        span.textContent = clickedSquare
        moves.append(span)

        // to move a piece
        if (squares[i].innerHTML.includes('svg')) {
            if (!colouredSquares.includes(squares[i])) {
                if (!squaresClickedID.includes(clickedSquare)) {
                    squaresClickedID.push(clickedSquare)
                    squaresClickedWithPiece.push(squares[i])
                    
                    squares[i].classList.add('clicked')
                    colouredSquares.push(squares[i])

                    counterForPiece++
                    counterForBg++
                }
            }
        }

        if (!squares[i].innerHTML.includes('svg') && counterForPiece === 1) {
            const pieceToRemove = squaresClickedWithPiece[0].children[squaresClickedWithPiece[0].children.length - 1]

            pieceToRemove.remove()
            addPiece(squares[i], piece)
            
            squaresClickedWithPiece = []
            squaresClickedID = []

            if (counterForBg === 3) {
                const temp = colouredSquares.splice(0, 2)
                
                temp.forEach(square => {
                    square.classList.remove('clicked')
                })

                colouredSquares.push(squares[i])
                squares[i].classList.add('clicked')
                counterForBg = 2
            } else {
                squares[i].classList.add('clicked')
                colouredSquares.push(squares[i])
                counterForBg++    
            }

            counterForPiece = 0
        }
    })
}
