(function() {
  var canMoveTile, cells, col, gapLoc, moveTile, row, shuffle, shuffled, startGame, swap, updateImage;

  cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  gapLoc = 8;

  shuffled = false;

  updateImage = function(pos) {
    return document.getElementById("cell" + pos).src = "flower" + cells[pos] + ".png";
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

  shuffle = function() {
    var n, random, _i, _results;
    _results = [];
    for (n = _i = 0; _i <= 8; n = ++_i) {
      random = Math.floor(Math.random() * 9);
      swap(n, random);
      if (random === gapLoc) {
        _results.push(gapLoc = n);
      } else if (n === gapLoc) {
        _results.push(gapLoc = random);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  startGame = function() {
    var c, _i;
    shuffle();
    for (c = _i = 0; _i <= 8; c = ++_i) {
      updateImage(c);
    }
    return shuffled = true;
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

  document.querySelector('.start').onclick = startGame;

  document.querySelector('.grid').onclick = function(e) {
    return moveTile(Number(e.target.id.slice(4)));
  };

}).call(this);
