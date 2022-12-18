export const getRandomGrid = (row: number, column: number) => {
  return [
    Math.floor(Math.random() * row),
    Math.floor(Math.random() * column),
  ];
};
