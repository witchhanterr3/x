function createField() {
    var x, y, cell;
    for(y = 0; y < 4; ++y) {
        for(x = 0; x < 4; ++x) {
            cell = createCellNull();
            cell.y = y;
            cell.x = x;
            setCellOffset(cell);
            appendCell(cell);
        }
    }
}
createField();

function createCellNull() {
    var cell = document.createElement("div");
    cell.classList.add("field__cell", "field__cell--null");
    return cell;
}

function setCellOffset(cell) {
    cell.style.left = (15 + (15 + 81.25) * cell.x) + "px";
    cell.style.top = (15 + (15 + 81.25) * cell.y) + "px";
}

function appendCell(cell) {
    var field = document.getElementById("field");
    field.appendChild(cell);
}

function createCellTile() {
    var cell = document.createElement("div");
    cell.classList.add("field__cell", "field__cell--tile");
    return cell;
}

function createTiles() {
    var x, y, cell, n;
    for (y = 0; y < 4; ++y) {
        for (x = 0; x < 4; ++x) {
            n = y * 4 + x + 1;
            if (n < 16) {
                cell = createCellTile();
                cell.y = y;
                cell.x = x;
                cell.innerHTML = n;
                setCellOffset(cell);
                appendCell(cell);
            }
        }
    }
}


var tiles = []

function createTiles() {
    var x, y, cell, n;
    for (y = 0; y < 4; ++y) {
        for (x = 0; x < 4; ++x) {
            n = y * 4 + x + 1;
            if (n < 16) {
                cell = createCellTile();
                cell.y = y;
                cell.x = x;
                cell.innerHTML = n;
                setCellOffset(cell);
                appendCell(cell);
                tiles.push(cell);
            }
        }
    }
}

function animateTiles() {
    var i;
    for (i = 0; i < tiles.length; ++i) {
        tiles[i].addEventListener("click", tileClick)
    }
}



var freeCell = {
  y: 3,
    x: 3
};

function between(a, b, t) {
    return a <= t && t <= b || b <= t && t <= a;
}

function tileClick(event) {
    var bar = event.target,
        i, tile;
    var oldX = bar.x,
        oldY = bar.y;
    if (bar.y == freeCell.y) {
        for (i = 0; i < tiles.length; ++i) {
            tile = tiles[i];
            if (tile.y == bar.y && between(bar.x, freeCell.x, tile.x)) {
                if (bar.x < freeCell.x) tile.x += 1;
                else tile.x -= 1;
                setCellOffset(tile);
            }
        }
        freeCell = {
            y: oldY,
            x: oldX
        };
    } else if (bar.x == freeCell.x) {
        for (i = 0; i < tiles.length; ++i) {
            tile = tiles[i];
            if (tile.x == bar.x && between(bar.y, freeCell.y, tile.y)) {
                if (bar.y < freeCell.y) tile.y += 1;
                else tile.y -= 1;
                setCellOffset(tile);
            }
        }
        freeCell = {
            y: oldY,
            x: oldX
        };
        
       
    }
     if (shuffled) {
            checkVictory();
        }
}





var shuffled = false;

function shuffleTiles() {
    var i, index;
    for (i = 0; i < 1000; ++i) {
        index = Math.floor(Math.random() * tiles.length);
        tiles[index].click();
    }
    shuffled = true;
}

function checkVictory() {
    var i, n;
    for(i = 0; i < tiles.length; ++i) {
        n = tiles[i].y * 4 + tiles[i].x + 1;
        if (tiles[i].innerHTML != n) return;
    } 
    document.getElementById("modal").classList.add("modal--visible");
}

createField();
createTiles();
animateTiles();
shuffleTiles();
checkVictory();
