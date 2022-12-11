import { getRandomGrid } from "./getRandomGrid";
import { getCenterOfGrid } from "./getCenterOfGrid";

export const createArrayGrid = (row: number, column: number) => {
  let arr = [];
  const foot = getRandomGrid(row, column);
  const head = getCenterOfGrid(row, column);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      const isFood = foot.row === i && foot.col === j;
      const isHead = head.row === i && head.col === j;
      arr.push({
        row: i,
        column: j,
        isFood,
        isHead,
      });
    }
  }
  return arr;
};
