import React, {useEffect, useState} from 'react';
import s from './TableSnake.module.scss'
import {getRandomGrid} from "../utils/getRandomGrid";
import {CreateArrayGrid} from "../utils/CreateArrayGrid";

export const TableSnake = () => {
const [item,setItem] = useState({
    row:10 as number,
    column:10,
    arrItems:[] as Array<{row:number,column:number}>
})

   useEffect(() => {
           const arrayGrid = CreateArrayGrid(item.row,item.column)
           setItem({...item,arrItems: [...arrayGrid]})
   },[])

    getRandomGrid(item.row,item.column)

    return (
        <div className={s.mainContainer}>
                 <div className={s.tableSnake}>
                     {item.arrItems.map((it)=> <div key={it.row + '' + it.column} className={s.tableItem}></div>)}
                 </div>
        </div>
    );
};

