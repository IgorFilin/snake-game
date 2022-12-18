import React, {useEffect, useState} from "react";
import s from "./TableSnake.module.scss";
import {createArrayGrid} from "../utils/createArrayGrid";
import {getRandomGrid} from "../utils/getRandomGrid";

export enum DIRECTION_TYPES {
    RIGHT,
    LEFT,
    TOP,
    BOTTOM,
}

const BOARD_SIZE = 10
const DEFAULT_CELLS_VALUE = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0))
const AVAILABLE_MOVES = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft']
const SPEED = 300


export const TableSnake = () => {

    const [direction, setDirection] = useState(AVAILABLE_MOVES[0])
    const [snake, setSnake] = useState([[1,1]])
    console.log(snake)
    const handleKeyDown = (event: KeyboardEvent) => {

        const index = AVAILABLE_MOVES.indexOf(event.key)
        if (index > -1) {
            setDirection(AVAILABLE_MOVES[index])
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(()=>{
      const id = setTimeout(() =>{

      let move:Array<number> = []
          const newSnake = [...snake]

      switch (direction){
          case AVAILABLE_MOVES[0]:{
              move = [1,0]
              break
          }
          case AVAILABLE_MOVES[1]:{
              move = [-1,0]
              break
          }
          case AVAILABLE_MOVES[2]:{
              move = [0,1]
              break
          }
          case AVAILABLE_MOVES[3]:{
              move = [0,-1]
              break
          }
      }
          const head = [
              newSnake[newSnake.length -1][0] + move[0],
              newSnake[newSnake.length -1][1] + move[1]
          ]
          newSnake.push(head)
          setSnake(newSnake.splice(1))

      },SPEED)
        return ()=>{
          clearTimeout(id)
        }
    },[snake,direction])

    return <div>
        {DEFAULT_CELLS_VALUE.map((row, indexR) => {
            return <div key={indexR} className={s.row}>
                {row.map((cell:any, indexC:number) => {
                    let type = snake.some(el => el[0] === indexR && el[1] === indexC)
                    return <div key={indexC} className={type ? s.snake : s.cell}></div>
                })}
            </div>
        })}
    </div>
}