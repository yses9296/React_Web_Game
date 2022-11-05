import React, { useCallback } from 'react';
import {CLICK_CELL, CHANGE_TURN} from './TicTacToe';

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        //이미 cell에 데이터가 존재한다면.
        if(cellData){
            return;
        }
        dispatch( {type: CLICK_CELL, row: rowIndex, cell: cellIndex});
        // dispatch( {type: CHANGE_TURN})
    }, [cellData]);

    return (
        <td  onClick={onClickTd}> {cellData} </td>
    )

}

export default Td;