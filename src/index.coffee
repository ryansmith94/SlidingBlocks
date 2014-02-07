cells = [0..8]
shuffleButton = document.getElementById('shuffleButton')
gapLoc = 8
shuffled = false
images = ['flower', 'lily', 'daffodils', 'dahlias', 'geranium', 'irises', 'poppies']
image = 0
hintButton = document.getElementById('hintButton')

updateImage = (id, src) -> document.getElementById(id).src = src
updateCell = (pos) -> updateImage("cell#{pos}", "images/#{images[image]}#{cells[pos]}.png")
updateCells = () -> updateCell(c) for c in [0..8]
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

startButton.onclick = () ->
    shuffle(n) for n in [0..8]
    updateCells()
    shuffled = true
    startButton.innerText = 'reshuffle'

hintButton.onclick = () ->
    style = document.getElementById('hint').style
    if style.display
        style.display = ''
        hintButton.innerText = 'show hint'
    else
        style.display = 'inline-block'
        hintButton.innerText = 'hide hint'

document.getElementById('changeButton').onclick = () ->
    image = (image + 1) % images.length
    updateImage('hint', "images/#{images[image]}.png")
    updateCells()

document.getElementById('grid').onclick = (e) -> moveTile(Number(e.target.id.slice(4)))
