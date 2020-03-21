export const winnerCalc = (board) =>{
    const p1 = rowCrossed(board), p2 = columnCrossed(board), p3 = diagonalCrossed(board);
    if(p1) return p1;
    if(p2) return p2;
    if(p3) return p3;
    return isFull(board) ? '-1':'';
};

// A function that returns true if any of the row
// is crossed with the same player's move
const  rowCrossed = (board) =>
{
    for (let i=0; i<3; i++)
    {
        const sign = board[i][0];
        if (board[i][0] === board[i][1] &&
            board[i][1] === board[i][2] &&
            board[i][0] !== '')
            return sign;
    }
    return '';
};

// A function that returns true if any of the column
// is crossed with the same player's move
const columnCrossed = (board) =>
{
    for (let i=0; i<3; i++)
    {
        const sign = board[0][i];
        if (board[0][i] === board[1][i] &&
            board[1][i] === board[2][i] &&
            board[0][i] !== '')
            return sign;
    }
    return '';
};

// A function that returns true if any of the diagonal
// is crossed with the same player's move
const diagonalCrossed = (board) =>
{
    let sign = board[0][0];

    if (board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[0][0] !== '')
        return sign;

    sign = board[0][2];

    if (board[0][2] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[0][2] !== '')
        return sign;

    return false;
};
const isFull = (board) =>
{
    for(let row of board){
        for (let cell of row){
            if(cell === '') return false;
        }
    }
    return true;
};
