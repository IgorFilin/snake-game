export const getRandomGrid = (row:number,column:number) =>  {
    return {
        row: Math.floor((Math.random() * row)),
        col: Math.floor((Math.random() * column))
    }
}