(function() {
  var canMoveTile, cells, col, gapLoc, hintButton, image, images, moveTile, params, row, shuffle, shuffleButton, shuffled, start, swap, updateCell, updateCells, updateImage;

  shuffleButton = document.getElementById('shuffleButton');

  hintButton = document.getElementById('hintButton');

  params = (function() {
    var param, paramsArray, paramsObj, _i, _len;
    paramsArray = window.location.href.split('?')[1];
    paramsObj = {};
    if (paramsArray) {
      paramsArray = paramsArray.split('&');
      for (_i = 0, _len = paramsArray.length; _i < _len; _i++) {
        param = paramsArray[_i];
        param = param.split('=');
        paramsObj[param[0]] = param[1];
      }
    }
    return paramsObj;
  })();

  cells = (function() {
    if (Number(params.cells) && params.cells.split('').sort().join('') === '012345678') {
      return params.cells.split('');
    } else {
      return false;
    }
  })() || [0, 1, 2, 3, 4, 5, 6, 7, 8];

  gapLoc = 8;

  shuffled = false;

  images = ['flower', 'lily', 'daffodils', 'dahlias', 'geranium', 'irises', 'poppies'];

  image = Number(params.image) || 0;

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

  start = function() {
    updateCells();
    shuffled = true;
    shuffleButton.innerText = 'reshuffle';
    return document.getElementById('instructions').innerText = 'Solve the puzzle by pressing on the tiles to recreate the original image';
  };

  shuffleButton.onclick = function() {
    var n, _i;
    for (n = _i = 0; _i <= 8; n = ++_i) {
      shuffle(n);
    }
    return start();
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

  if (cells.join('') !== '012345678') {
    updateImage('hint', "images/" + images[image] + ".png");
    start();
  }

}).call(this);
