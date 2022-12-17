import React, { useEffect, useState } from "react";
import s from "./TableSnake.module.scss";
import { createArrayGrid } from "../utils/createArrayGrid";
import { getRandomGrid } from "../utils/getRandomGrid";

export enum DIRECTION_TYPES {
  RIGHT,
  LEFT,
  TOP,
  BOTTOM,
}

export const TOTAL_COLUMNS = 10;
export const TOTAL_ROWS = 10;

export const MAX_COLUMN_INDEX = TOTAL_COLUMNS - 1;
export const MAX_ROW_INDEX = TOTAL_ROWS - 1;

export const MIN_COLUMN_INDEX = 0;
export const MIN_ROW_INDEX = 0;

export const INITIAL_COLUMN = 5;
export const INITIAL_ROW = 5;

export const TableSnake = () => {
  const [arrItems, setArrItems] = useState(
    createArrayGrid(TOTAL_ROWS, TOTAL_COLUMNS) as Array<{
      row: number;
      column: number;
    }>
  ); // Создаём массив с 100 ячейками

  const [currentDirection, setCurrentDirection] = useState<DIRECTION_TYPES>(
    DIRECTION_TYPES.BOTTOM
  ); // направление движения   RIGHT,LEFT,TOP,BOTTOM

  const [currentHeadCoordinates, setCurrentHeadCoordinates] = useState({
    row: INITIAL_ROW,
    column: INITIAL_COLUMN,
  }); // создаем координаты головы змейки

  const [currentFoodCoordinates, setCurrentFoodCoordinates] = useState(
    getRandomGrid(TOTAL_ROWS, TOTAL_COLUMNS) as { row: number; column: number }
  ); // создаем координаты еды змеи

  const [currentTailCoordinates, setCurrentTailCoordinates] = useState([
    {
      row: currentHeadCoordinates.row,
      column: currentHeadCoordinates.column,
    },{},{},{}
  ] as Array<{ row: number; column: number }>); // создаем координаты хвоста змеи

  const handleCurrentRowChange = (value: number) => {
    setCurrentHeadCoordinates({
      ...currentHeadCoordinates,
      row: value,
    });
  }; // хендлер для смены положения головы змеи по рядам

  const handleCurrentColumnChange = (value: number) => {
    setCurrentHeadCoordinates({
      ...currentHeadCoordinates,
      column: value,
    });
  }; // хендлер для смены положения головы змеи по колонкам

  useEffect(() => {
    const id = setTimeout(() => {
      switch (currentDirection) {
        case DIRECTION_TYPES.LEFT:
          if (currentHeadCoordinates.column !== MIN_COLUMN_INDEX) {
            handleCurrentColumnChange(currentHeadCoordinates.column - 1);
            setCurrentTailCoordinates(
              currentTailCoordinates.map((el, i) => {
                return {
                  ...el,
                  row: currentHeadCoordinates.row,
                  column: currentHeadCoordinates.column + i - 1,
                };
              })
            );
            break;
          }
          break;
        case DIRECTION_TYPES.RIGHT:
          if (currentHeadCoordinates.column !== MAX_COLUMN_INDEX) {
            handleCurrentColumnChange(currentHeadCoordinates.column + 1);
            setCurrentTailCoordinates(
              currentTailCoordinates.map((el, i) => {
                return {
                  ...el,
                  row: currentHeadCoordinates.row,
                  column: currentHeadCoordinates.column - i + 1,
                };
              })
            );
            break;
          }
          break;
        case DIRECTION_TYPES.TOP:
          if (currentHeadCoordinates.row !== MIN_ROW_INDEX) {
            handleCurrentRowChange(currentHeadCoordinates.row - 1);
            setCurrentTailCoordinates(
              currentTailCoordinates.map((el, i,arr) => {
                  return {
                    ...el,
                    row: currentHeadCoordinates.row - 1,
                    column: currentHeadCoordinates.column - 1 - i,
                  }
              })
            );
            break;
          }
          break;
        case DIRECTION_TYPES.BOTTOM:
          if (currentHeadCoordinates.row !== MAX_ROW_INDEX) {
            handleCurrentRowChange(currentHeadCoordinates.row + 1);
            setCurrentTailCoordinates(
              currentTailCoordinates.map((el, i) => {
                return {
                  ...el,
                  row: currentHeadCoordinates.row - i + 1,
                  column: currentHeadCoordinates.column,
                };
              })
            );
            break;
          }
          break;

        default:
          break;
      }
    }, 400);

    return () => {
      clearTimeout(id);
    };
  }, [currentDirection, currentHeadCoordinates]);
  // let a = 1
  useEffect(() => {
    const handleChangeCurrentOnKey = (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 37:
          setCurrentDirection(DIRECTION_TYPES.LEFT);
          break;
        case 38:
          setCurrentDirection(DIRECTION_TYPES.TOP);
          break;
        case 39:
        default:
          setCurrentDirection(DIRECTION_TYPES.RIGHT);
          break;
        case 40:
          setCurrentDirection(DIRECTION_TYPES.BOTTOM);
          break;
      }
    };
    document.addEventListener("keydown", (e) => handleChangeCurrentOnKey(e));

    return () => {
      document.removeEventListener("keydown", (e) =>
        handleChangeCurrentOnKey(e)
      );
    };
  }, []);

  useEffect(() => {
    if (
      currentFoodCoordinates.row === currentHeadCoordinates.row &&
      currentFoodCoordinates.column === currentHeadCoordinates.column
    ) {
      setCurrentFoodCoordinates(getRandomGrid(TOTAL_ROWS, TOTAL_COLUMNS));

      if (currentDirection === DIRECTION_TYPES.BOTTOM) {
        setCurrentTailCoordinates([
          ...currentTailCoordinates,
          {
            row: currentTailCoordinates.slice(-1)[0].row - 1,
            column: currentTailCoordinates.slice(-1)[0].column,
          },
        ]);
      }
      if (currentDirection === DIRECTION_TYPES.TOP) {
        setCurrentTailCoordinates([
          ...currentTailCoordinates,
          {
            row: currentTailCoordinates.slice(-1)[0].row + 1,
            column: currentTailCoordinates.slice(-1)[0].column,
          },
        ]);
      }
      if (currentDirection === DIRECTION_TYPES.LEFT) {
        setCurrentTailCoordinates([
          ...currentTailCoordinates,
          {
            row: currentTailCoordinates.slice(-1)[0].row,
            column: currentTailCoordinates.slice(-1)[0].column + 1,
          },
        ]);
      }
      if (currentDirection === DIRECTION_TYPES.RIGHT) {
        setCurrentTailCoordinates([
          ...currentTailCoordinates,
          {
            row: currentTailCoordinates.slice(-1)[0].row,
            column: currentTailCoordinates.slice(-1)[0].column - 1,
          },
        ]);
      }
    }
  }, [currentFoodCoordinates, currentHeadCoordinates]); // хаваем

  const getClassName = (isFood: boolean, isHead: boolean, isTail: boolean) => {
    if (isFood) return s.tableFoot;
    if (isHead) return s.headSnake;
    if (isTail) return s.headSnake;
    return s.tableItem;
  };

  return (
    <>
      <div className={s.mainContainer}>
        <div className={s.tableSnake}>
          {arrItems.map((it) => {
            const isHead =
              it.column === currentHeadCoordinates.column &&
              it.row === currentHeadCoordinates.row;

            const isFood =
              it.row === currentFoodCoordinates.row &&
              it.column === currentFoodCoordinates.column;

            const isTail: boolean = currentTailCoordinates.reduce(
              (acc, current) => {
                if (it.row === current.row && it.column === current.column) {
                  acc = true;
                  return acc;
                } else return acc;
              },
              false
            );

            return (
              <div
                key={it.row + "-" + it.column}
                className={getClassName(isFood, isHead, isTail)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
