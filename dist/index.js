(function() {
  var canMoveTile, cells, col, gapLoc, hintButton, image, images, moveTile, row, shuffle, shuffled, startButton, swap, updateCell, updateCells, updateImage;

  cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  shuffleButton = document.getElementById('shuffleButton');

  gapLoc = 8;

  shuffled = false;

  images = ['flower', 'lily', 'daffodils', 'dahlias', 'geranium', 'irises', 'poppies'];

  image = 0;


  hintButton = document.getElementById('hintButton');

  updateImage = function(id, src) {
    return document.getElementById(id).src = src;
  };

  updateCell = function(pos) {
    return updateImage("cell" + pos, "images/" + images[image] + cells[pos] + ".png");
  };

  updateCells = function() {
    var c, _i, _results;
    _results = [];
    for (c = _i = 0; _i <= 8; c = ++_i) {
      _results.push(updateCell(c));
    }
    return _results;
  };

  col = function(pos) {
    return pos % 3;
  };

  row = function(pos) {
    return (pos - col(pos)) / 3;
  };

  swap = function(j, k) {
    var _ref;
    return _ref = [cells[k], cells[j]], cells[j] = _ref[0], cells[k] = _ref[1], _ref;
  };

  shuffle = function(n) {
    var random;
    random = Math.floor(Math.random() * 9);
    swap(n, random);
    if (random === gapLoc) {
      return gapLoc = n;
    } else if (n === gapLoc) {
      return gapLoc = random;
    }
  };

  canMoveTile = function(cellNum) {
    var colA, colB, rowA, rowB;
    rowA = row(cellNum);
    rowB = row(gapLoc);
    colA = col(cellNum);
    colB = col(gapLoc);
    return (((rowA - rowB) % 2) && (colA === colB)) || ((colA - colB) % 2) && (rowA === rowB);
  };

  moveTile = function(cellNum) {
    if (shuffled && canMoveTile(cellNum)) {
      swap(cellNum, gapLoc);
      updateImage(cellNum);
      updateImage(gapLoc);
      return gapLoc = cellNum;
    }
  };

  startButton.onclick = function() {
    var n, _i;
    for (n = _i = 0; _i <= 8; n = ++_i) {
      shuffle(n);
    }
    updateCells();
    shuffled = true;
    return startButton.innerText = 'reshuffle';
  };

  hintButton.onclick = function() {
    var style;
    style = document.getElementById('hint').style;
    if (style.display) {
      style.display = '';
      return hintButton.innerText = 'show hint';
    } else {
      style.display = 'inline-block';
      return hintButton.innerText = 'hide hint';
    }
  };

  document.getElementById('changeButton').onclick = function() {
    image = (image + 1) % images.length;
    updateImage('hint', "images/" + images[image] + ".png");
    return updateCells();
  };

  document.getElementById('grid').onclick = function(e) {
    return moveTile(Number(e.target.id.slice(4)));
  };

}).call(this);
