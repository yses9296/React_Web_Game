import React, { useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
    console.log('td rendered');

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        
        if(cellData){ //이미 cell에 데이터가 존재한다면.
            return;
        }
        dispatch( {type: CLICK_CELL, row: rowIndex, cell: cellIndex});
        // dispatch( {type: CHANGE_TURN})
    }, [cellData]);
        // cellData가 바뀔 때마다 기억을해두었던 함수를 재실행.
        // 왜 useCallback 함수 사용? >> onClick={onClickTd}> {cellData} 
        // 함수를 props로 넣어주었을 때 불필요한 렌더링이 발생
    return (
        <td  onClick={onClickTd}> {cellData} </td>
    )

})

export default Td;