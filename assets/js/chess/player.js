async function showWinningAnimation() {
  await loadConfettiPreset(tsParticles);

  await tsParticles.load({
      id: "tsparticles",
      options: {
          preset: "confetti",
      },
  });
}

var historyToPGN = function(history) {
  var pgn = "1."
  for (var i = 0; i < history.length; i++) {
    if (i%2 == 0 && i) {
      pgn = pgn + (Math.floor(i/2)+1) + ".";
    }
    pgn = pgn + history[i] + " ";
  }
  return pgn;
}

var mover = function() {

}

var restart = function() {
  game = new Chess();
  board.position(game.fen());
  document.getElementById("win").style.display = "none";
  document.getElementById("lose").style.display = "none";
  document.getElementById("draw").style.display = "none";
}

var checkGameOver = function() {
  if (game.in_checkmate()) {
    var turn = game.fen().split(' ')[1];
    if (turn == 'b') {
      document.getElementById("win").style.display = "block";
      showWinningAnimation();
      return true;
    }
    else {
      document.getElementById("lose").style.display = "block";
      return true;
    }
  }
  if (game.in_stalemate() || game.in_draw()) {
    document.getElementById("draw").style.display = "block";
    return true;
  }
  return false;
}

var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';


  removeGreySquares();
  // make random legal move for black
  window.setTimeout(function(){
    //makeRandomMove();
    if (checkGameOver()) {
      console.log(game.history());
      console.log(historyToPGN(game.history()));
    }
    //makeIntelligentMove();

    makeBestMove();
    board.position(game.fen());

    if (checkGameOver()) {
      console.log(game.history());
      console.log(historyToPGN(game.history()));
    }
  }, 250);
};


// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
};


var onMouseoverSquare = function(square, piece) {
    var moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

var removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};


var cfg = {
  // orientation: 'black',
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare
};
board = ChessBoard('board', cfg);


var toggle = function() {
  if (greys) {
    cfg = {
      // orientation: 'black',
      draggable: true,
      position: 'start',
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd
    };
    board = ChessBoard('board', cfg);
    board.position(game.fen());
    greys = false;
  }
  else {
    cfg = {
      // orientation: 'black',
      draggable: true,
      position: 'start',
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd,
      onMouseoutSquare: onMouseoutSquare,
      onMouseoverSquare: onMouseoverSquare
    };
    board = ChessBoard('board', cfg);
    board.position(game.fen());
    greys = true;
  }
}
// $(document).ready(function(){
//   console.log("loaded!");
//   while (!game.game_over()) {
//     window.setTimeout(function(){
//       //makeRandomMove();
//       makeIntelligentMove();
//       board.position(game.fen());
//     }, 250);
//   }
// });

var undo = function() {
  if (game.turn() == 'w') {
    game.undo();
    game.undo();
    board.position(game.fen());
  }
  document.getElementById("win").style.display = "none";
  document.getElementById("lose").style.display = "none";
  document.getElementById("draw").style.display = "none";
}

console.log("vars");
// var onChange = function(oldPos, newPos) {
//   console.log("Position changed:");
//   console.log("Old position: " + ChessBoard.objToFen(oldPos));
//   console.log("New position: " + ChessBoard.objToFen(newPos));
//   console.log("--------------------");
//   $.post(
//     "http://sammysignal.pythonanywhere.com/chess/",
//     ChessBoard.objToFen(newPos),
//     function(data,status,xhr){
//       console.log(data);
//     });
// };

// var cfg = {
//   draggable: true,
//   position: 'start',
//   onChange: onChange
// };
// var board = ChessBoard('board', cfg);
