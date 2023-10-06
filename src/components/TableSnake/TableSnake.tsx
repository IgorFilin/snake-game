import React, { useEffect, useState, useRef } from "react";
import s from "./TableSnake.module.scss";
import { getRandomGrid } from "../utils/getRandomGrid";

const BOARD_SIZE = 10;
const DEFAULT_CELLS_VALUE = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0));
const AVAILABLE_MOVES = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];
const SPEED = 300;

export const TableSnake = () => {
  let tr;
  const [direction, setDirection] = useState(AVAILABLE_MOVES[0]);
  const [snake, setSnake] = useState([[1, 1]]);
  const [food, setFood] = useState(getRandomGrid(BOARD_SIZE, BOARD_SIZE));

  const ref = useRef<any>();

  const handleKeyDown = (direction: string, event: KeyboardEvent) => {
    const index = AVAILABLE_MOVES.indexOf(event.key);

    if (index > -1) {
      setDirection(AVAILABLE_MOVES[index]);
    }
  };

  const stopHandler = () => {
    ref.current.className = s.mainBlock + " " + s.mainBlock_stop;
  };

  useEffect(() => {
    document.addEventListener("keydown", (event) =>
      handleKeyDown(direction, event)
    );
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      const positionChanger = (position: number) => {
        if (position >= BOARD_SIZE) {
          return 9;
        } else if (position < 0) {
          return 9;
        } else return position;
      };
      let move: Array<number> = [];

      const newSnake = [...snake];
      switch (direction) {
        case AVAILABLE_MOVES[0]: {
          move = [1, 0];
          break;
        }
        case AVAILABLE_MOVES[1]: {
          move = [-1, 0];
          break;
        }
        case AVAILABLE_MOVES[2]: {
          move = [0, 1];
          break;
        }
        case AVAILABLE_MOVES[3]: {
          move = [0, -1];
          break;
        }
      }
      const head = [
        positionChanger(newSnake[newSnake.length - 1][0] + move[0]),
        positionChanger(newSnake[newSnake.length - 1][1] + move[1]),
      ];
      let spliceIndex = 1;
      newSnake.push(head);
      if (head[0] === food[0] && head[1] == food[1]) {
        spliceIndex = 0;
        setFood(getRandomGrid(BOARD_SIZE, BOARD_SIZE));
      }
      setSnake(newSnake.splice(spliceIndex));
    }, SPEED);
    return () => {
      clearTimeout(id);
    };
  }, [snake, direction]);

  return (
    <div ref={ref} className={s.mainBlock}>
      <div>
        {DEFAULT_CELLS_VALUE.map((row, indexR) => {
          return (
            <div key={indexR} className={s.row}>
              {row.map((cell: any, indexC: number) => {
                let typeSnake =
                  snake.some((el) => el[0] === indexR && el[1] === indexC) &&
                  s.snake;
                if (typeSnake !== s.snake) {
                  typeSnake =
                    food[0] === indexR && food[1] === indexC && s.food;
                }
                return (
                  <div key={indexC} className={`${s.cell} ${typeSnake}`}></div>
                );
              })}
            </div>
          );
        })}
        <button>Start</button>
        <button onClick={stopHandler}>Stop</button>
      </div>
    </div>
  );
};
