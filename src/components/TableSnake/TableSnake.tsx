import React, { useEffect, useState } from "react";
import s from "./TableSnake.module.scss";
import { createArrayGrid } from "../utils/createArrayGrid";

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
      isFood: boolean;
      isHead: boolean;
    }>
  );
  const [currentHeadCoordinates, setCurrentHeadCoordinates] = useState({
    row: INITIAL_ROW,
    column: INITIAL_COLUMN,
  });

  const handleCurrentRowChange = (value: number) => {
    setCurrentHeadCoordinates({
      ...currentHeadCoordinates,
      row: value,
    });
  };

  const handleCurrentColumnChange = (value: number) => {
    setCurrentHeadCoordinates({
      ...currentHeadCoordinates,
      column: value,
    });
  };

  const handeCurrentHeadCoordinatesChange = (row: number, column: number) => {
    setCurrentHeadCoordinates({
      row,
      column,
    });
  };
  // snake:{
  //     head:{} as {row:number,col:number}
  // }

  const [currentDirection, setCurrentDirection] = useState<DIRECTION_TYPES>(
    DIRECTION_TYPES.BOTTOM
  );

  useEffect(() => {
    const id = setInterval(() => {
      switch (currentDirection) {
        case DIRECTION_TYPES.LEFT:
          if (currentHeadCoordinates.column !== MIN_COLUMN_INDEX) {
            handleCurrentColumnChange(currentHeadCoordinates.column - 1);
            break;
          }
          break;
        case DIRECTION_TYPES.RIGHT:
          if (currentHeadCoordinates.column !== MAX_COLUMN_INDEX) {
            handleCurrentColumnChange(currentHeadCoordinates.column + 1);
            break;
          }
          break;
        case DIRECTION_TYPES.TOP:
          if (currentHeadCoordinates.row !== MIN_ROW_INDEX) {
            handleCurrentRowChange(currentHeadCoordinates.row - 1);
            break;
          }
          break;
        case DIRECTION_TYPES.BOTTOM:
          if (currentHeadCoordinates.row !== MAX_ROW_INDEX) {
            handleCurrentRowChange(currentHeadCoordinates.row + 1);
            break;
          }
          break;

        default:
          break;
      }
    }, 500);

    return () => {
      clearInterval(id);
    };
  }, [currentDirection, currentHeadCoordinates]);
  const getClassName = (isFood: boolean, isHead: boolean) => {
    if (isFood) return s.tableFoot;
    if (isHead) return s.headSnake;
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
            return (
              <div
                key={it.row + "-" + it.column}
                className={getClassName(it.isFood, isHead)}
              />
            );
          })}
        </div>
      </div>

      <div>
        {(
          Object.keys(DIRECTION_TYPES) as Array<keyof typeof DIRECTION_TYPES>
        ).map((key) => {
          return (
            <button onClick={() => setCurrentDirection(DIRECTION_TYPES[key])}>
              {key}
            </button>
          );
        })}
      </div>
    </>
  );
};
