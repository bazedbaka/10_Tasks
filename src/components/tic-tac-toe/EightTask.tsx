//Виводити хто скільки виграв разів

import { useEffect, useState } from "react";

const EightTask = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [isWinner, setWinner] = useState<boolean>(false);
  const [winnerIs, setWinnerIs] = useState<null | string>("");
  const [scoreForX, setScoreForX] = useState<number>(0);
  const [scoreForO, setScoreForO] = useState<number>(0);

  const resetGame = () => {
    if (isWinner) {
      const reseted = Array(9).fill(null);
      setSquares(reseted);
      setWinner(false);
      setXIsNext(true);
      console.log("Work Corect!");
    }
    if (winnerIs === null) {
      const reseted = Array(9).fill(null);
      setSquares(reseted);
      setWinner(false);
      setXIsNext(true);
      setWinnerIs("");
    }
  };

  const resetScore = () => {
    setScoreForX(0);
    setScoreForO(0);
  };

  const setSquaresValue = (index: number) => {
    if (squares[index] !== null) return;
    const copyOfSquares = squares.slice();
    copyOfSquares[index] = xIsNext ? "X" : "O";
    setSquares(copyOfSquares);
    setXIsNext(!xIsNext);
  };

  useEffect(() => {
    const winerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    /* for (const combinathions of winerLine) {
      const [a, b, c] = combinathions;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        setWinner(true);
        setWinnerIs(squares[a]);
      }
    } */
    const copyOfSquares = squares;
    const findIndex = copyOfSquares.findIndex(
      (item: string | null) => item === null
    );
    for (const combinathions of winerLine) {
      const [a, b, c] = combinathions;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        if (squares[a] === "X") {
          setWinner(true);
          setWinnerIs(squares[a]);
          setScoreForX(scoreForX + 1);
        }
        if (squares[a] === "O") {
          setWinner(true);
          setWinnerIs(squares[a]);
          setScoreForO(scoreForO + 1);
        }
        return;
      }
    }
    if (findIndex === -1) {
      for (const combinathions of winerLine) {
        const [a, b, c] = combinathions;
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[b] === squares[c]
        ) {
          if (squares[a] === "X") {
            setWinner(true);
            setWinnerIs(squares[a]);
            setScoreForX(scoreForX + 1);
          }
          if (squares[a] === "O") {
            setWinner(true);
            setWinnerIs(squares[a]);
            setScoreForO(scoreForO + 1);
          }
          return;
        } else setWinnerIs(null);
      }
    }
  }, [squares]);
  return (
    <div className="">
      <h1 className="text-center m-7">
        {winnerIs === null
          ? `Нічія`
          : isWinner
            ? `Переміг --- ${winnerIs}`
            : `Наступним ходить ${xIsNext ? "X" : "O"}`}
      </h1>
      <div className="flex gap-12">
        <div className="grid grid-cols-3 gap-0 h-[240px] w-[240px]">
          {squares.map((square, index) => {
            return (
              <div key={index} className="size-20">
                <button
                  disabled={isWinner}
                  className="border-4 border-e-sky-50 size-20 text-xl text-slate-50"
                  onClick={() => setSquaresValue(index)}
                >
                  {square}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 flex-col">
          <div>
            <h2>Рахунок:</h2>
            <ul>
              <li>{`X - ${scoreForX}`}</li>
              <li>{`O - ${scoreForO}`}</li>
            </ul>
          </div>
          <div>
            <button
              className=" border border-y-emerald-900 bg-lime-700"
              onClick={resetScore}
            >
              Скинути Рахунок
            </button>
          </div>
          {isWinner && (
            <div className="">
              <button
                className=" border border-y-emerald-900 bg-lime-700 col-span-2"
                onClick={resetGame}
              >
                Скинути гру!
              </button>
            </div>
          )}
          {winnerIs === null && (
            <div className="">
              <button
                className=" border border-y-emerald-900 bg-lime-700 col-span-2"
                onClick={resetGame}
              >
                Скинути гру!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EightTask;
