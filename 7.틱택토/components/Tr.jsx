import React, {memo} from 'react';
import Td from './Td'

const Tr = memo(( {rowData, rowIndex, dispatch, cellData} ) => {
    return (

        <tr>

            {Array(rowData.length).fill().map( (td, i) => (
                <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}></Td>
            ))} 

        </tr>// cellData={tableData[i]}>
    )
})
export default Tr;