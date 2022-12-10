import React from 'react';
import s from './TableSnake.module.scss'

export const TableSnake = () => {

    const arr = Array(100).fill(null,0,100)

    return (
        <div className={s.mainContainer}>
                 <div className={s.tableSnake}>
                     {arr.map(()=> <div className={s.tableItem}></div>)}
                 </div>
        </div>
    );
};

