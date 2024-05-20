const searchController = {};

searchController.nodes;
searchController.fh;
searchController.fhf;
searchController.depth;
searchController.time;
searchController.start;
searchController.stop;
searchController.best;
searchController.thinking;
searchController.ply;
searchController.killers = new Array(MaxDepth); //killer[ply][0/1];
searchController.history = new Array(13); //


searchController.clear = function () {
	this.killers = Array.from({ length: MaxDepth }, () => [null, null]);
	this.history = Array.from({ length: 13 }, () => Array(120).fill(0));
	this.ply = 0;
	this.nodes = 0;
	this.fh = 0;
	this.fhf = 0;
	this.start = Date.now();
	this.stop = false;
}

searchController.clear();


function searchPosition() {

	let bestMove = null;
	let bestScore = -Infinite;
	searchController.clear();
	PvTable.clear();

	let line;
	searchController.depth = 6;

	for (let depth = 1; depth <= searchController.depth; ++depth) {
		bestScore = alphaBeta(-Infinite, Infinite, depth);

		if (searchController.stop) break;

		bestMove = PvTable.getMove();
		line = 'D:' + depth + ' Best:' + moveStr(bestMove) + ' Score:' + bestScore +
			' nodes:' + searchController.nodes;

		line += ' ' + PvTable.getBestMoveTillDepth(depth).join(' ');
		if (depth != 1) {
			line += (" Ordering:" + ((searchController.fhf / searchController.fh) * 100).toFixed(2) + "%");
		}
		console.log(line);

	}


	searchController.best = bestMove;
	searchController.thinking = false;
}




let logs = 0;

function alphaBeta(alpha, beta, depth) {
	if (depth <= 0) {
		return quiescence(alpha, beta);
	}

	if ((searchController.nodes % 2048) == 0) {
		checkTimeUp();
	}

	searchController.nodes++;

	if ((isRepetition() || gameBoard.fiftyMove >= 100) && searchController.ply != 0) {
		return 0;
	}

	if (searchController.ply >= MaxDepth) {
		return evalPosition();
	}

	if (gameBoard.checkSq != Squares.noSq) {
		++depth;
	}

	let score = -Infinite;

	const moves = generateMoves();
	let legalMove = 0;
	const prevAlpha = alpha;
	let bestMove = null;

	let pvMove = PvTable.getMove();
	if (pvMove) {
		for (const moveObj of moves) {
			if (moveObj.move == pvMove) {
				moveObj.score = 2000000;
				break;
			}
		}
	}

	for (let i = 0; i < moves.length; ++i) {
		swapWithBest(i, moves);
		if(logs++ < 200){
		}
		const move = moves[i].move;

		if (!doMove(move)) continue;
		legalMove++;
		searchController.ply++;
		score = -alphaBeta(-beta, -alpha, depth - 1);

		undoMove();
		searchController.ply--;

		if (searchController.stop) return 0;
		
		if (score > alpha) {
			if (score >= beta) {
				if (legalMove === 1) searchController.fhf++;
				searchController.fh++;
				if (!(move & CaptureFlag)) {
					searchController.killers[searchController.ply][1] = searchController.killers[searchController.ply][0];
					searchController.killers[searchController.ply][0] = move;
				}
				return beta;
			}
			alpha = score;
			bestMove = move;
			if (!(move & CaptureFlag)) {
				let piece = gameBoard.pieces[moveFrom(move)];
				let toSq = moveTo(move);
				searchController.history[piece][toSq] += depth * depth;
			}
		}

	}

	if (legalMove == 0) {
		if (gameBoard.checkSq != Squares.noSq) {
			return -Mate + searchController.ply;
		} else {
			return 0;
		}
	}

	if (alpha != prevAlpha) {
		PvTable.addMove(bestMove);
	}

	return alpha;
}


function quiescence(alpha, beta) {

	if ((searchController.nodes % 2048) == 0) {
		checkTimeUp();
	}

	searchController.nodes++;

	if ((isRepetition() || gameBoard.fiftyMove >= 100) && searchController.ply != 0) {
		return 0;
	}

	if (searchController.ply >= MaxDepth) {
		return evalPosition();
	}

	let score = evalPosition();

	if (score >= beta) return beta;
	if (score > alpha) alpha = score;


	let legalMove = 0;
	let prevAlpha = alpha;
	let bestMove = null;
	let moves = generateCaptureMoves();

	//prioties the move having high score
	moves.sort((a, b) => (b.score - a.score));

	for (let i = 0; i < moves.length; ++i) {
		swapWithBest(i, moves);
		const move = moves[i].move;

		if (!doMove(move)) continue;
		legalMove++;
		searchController.ply++;

		score = -quiescence(-beta, -alpha);

		undoMove();
		searchController.ply--;

		if (searchController.stop) return 0;

		if (score > alpha) {
			if (score >= beta) {
				if (legalMove == 1) {
					searchController.fhf++;
				}
				searchController.fh++;
				return beta;
			}
			alpha = score;
			bestMove = move;
		}
	}

	if (alpha != prevAlpha) {
		PvTable.addMove(bestMove);
	}

	return alpha;

}

function swapWithBest(i, moves) {
	let bestIndex = i;
	for (let j = i + 1; j < moves.length; ++j) {
		if (moves[j].score > moves[bestIndex].score) {
			bestIndex = j;
		}
	}
	if (bestIndex !== i) {
		[moves[i], moves[bestIndex]] = [moves[bestIndex], moves[i]];
	}
}


function checkTimeUp() {
	if ((Date.now() - searchController.start) > searchController.time) {
		searchController.stop = true;
	}
}

function isRepetition() {
	let hisPly = gameBoard.history.length;
	for (let i = hisPly - gameBoard.fiftyMove; i < hisPly - 1; ++i) {
		if (gameBoard.positionKey == gameBoard.history[i].positionKey) {
			return true;
		}
	}

	return false;
}

