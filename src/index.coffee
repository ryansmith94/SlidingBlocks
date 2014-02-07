# Buttons (provides a shortcut and better performance).
shuffleButton = document.getElementById('shuffleButton')
hintButton = document.getElementById('hintButton')

# Get params from URL.
params = (() ->
    paramsArray = window.location.href.split('?')[1]
    paramsObj = {}
    if paramsArray
        paramsArray = paramsArray.split('&')
        for param in paramsArray
            param = param.split('=')
            paramsObj[param[0]] = param[1]
    paramsObj)()

# Determine the starting position of the cells.
cells = (() ->
    if Number(params.cells) and params.cells.split('').sort().join('') is '012345678' then params.cells.split('') else false
    )() or [0..8]

# Game variables.
gapLoc = 8
shuffled = false
images = ['flower', 'lily', 'daffodils', 'dahlias', 'geranium', 'irises', 'poppies']
image = Number(params.image) || 0

# Game functions.
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

start = () ->
    updateCells()
    shuffled = true
    shuffleButton.innerText = 'reshuffle'
    document.getElementById('instructions').innerText = 'Solve the puzzle by pressing on the tiles to recreate the original image'

# Button event handlers.
shuffleButton.onclick = () ->
    shuffle(n) for n in [0..8]
    start()

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

# Determine if the image is incorrect.
if image isnt 0
    updateImage('hint', "images/#{images[image]}.png")
    updateCells()

# Determine if the game has already started.
if cells.join('') isnt '012345678' then start()
