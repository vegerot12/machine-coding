import React, { useState } from "react";
import "./tictacToe.css"; 

function TicTacToe() {
    const board = Array(3).fill(null).map(()=>Array(3).fill(null));

    const [squares, setSquares] = useState<string[][]>(board);
    const [x,setX] = useState<boolean>(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [cnt,setCnt] = useState<{ r:[number, number, number], c:[number, number, number], d1:number, d2:number}>({ r:[0,0,0],c:[0,0,0], d1:0, d2:0});
    const handleClick = (i: number, j: number) => {
        const newSquares = [...squares];
        newSquares[i][j] = x ? "X" : "O";
        setSquares(newSquares); 
        setX(x=> !x);

        let newCnt = {...cnt};
        newCnt.r[i] += x ? 1: -1;
        newCnt.c[j] += x ? 1: -1;
        if(i===j)
        newCnt.d1 += x ? 1: -1;
        if( i+j === 2)
        newCnt.d2 += x ? 1: -1;
        if(newCnt.r[i] === 3 || newCnt.c[j] === 3 || newCnt.d1 === 3 || newCnt.d2 === 3){
            setWinner("X");
        }
        else if(newCnt.r[i] === -3 || newCnt.c[j] === -3 || newCnt.d1 === -3 || newCnt.d2 === -3){
            setWinner("O");
        }
        setCnt(newCnt);



        
        
    }

    const handleRestart = () => {
        setSquares(board);
        setX(true);
        setWinner(null);
        setCnt({ r:[0,0,0],c:[0,0,0], d1:0, d2:0});
    }

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {winner ? <p>Winner: {winner}</p> : <p>Current Player: {x ? "X" : "O"}</p>}
      <div className="board">
        {squares.map((row, i) => 
        <div className="row" key={i}>
          {row.map((sq, j)=> (
            <button className="square" disabled={sq !== null || winner !== null} onClick={()=> handleClick(i, j)} key={`${i}-${j}`}>  
              {sq}
            </button>
            ))}
          </div>
          )}
          <button onClick={handleRestart}>Restart</button>
      </div>

    </div>
  );
}

export default TicTacToe;
