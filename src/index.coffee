cells = [0..8]
gapLoc = 8
shuffled = false

updateImage = (pos) -> document.getElementById("cell#{pos}").src = "images/flower#{cells[pos]}.png"
col = (pos) -> pos % 3
row = (pos) -> (pos - col(pos)) / 3
swap = (j, k) -> [cells[j], cells[k]] = [cells[k], cells[j]]

shuffle = (n) ->
    random = Math.floor(Math.random() * 9)
    swap(n, random)
    if random is gapLoc
        gapLoc = n
    else if n is gapLoc
        gapLoc = random

startGame = () ->
    shuffle(n) for n in [0..8]
    updateImage(c) for c in [0..8]
    shuffled = true
    document.querySelector('.start').innerText = 'restart'

canMoveTile = (cellNum) ->
    rowA = row(cellNum)
    rowB = row(gapLoc)
    colA = col(cellNum)
    colB = col(gapLoc)
    (((rowA - rowB) % 2) and (colA is colB)) or ((colA - colB) % 2) and (rowA is rowB)

moveTile = (cellNum) ->
    if shuffled and canMoveTile(cellNum)
        swap(cellNum, gapLoc)
        updateImage(cellNum)
        updateImage(gapLoc)
        gapLoc = cellNum

document.querySelector('.start').onclick = startGame
document.querySelector('.grid').onclick = (e) -> moveTile(Number(e.target.id.slice(4)))
