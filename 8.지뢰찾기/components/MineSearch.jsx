import React, { useReducer, createContext, useMemo } from 'react';
import Form from './Form';
import Table from './Table';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, //0 이상이면 다 Opened
}

//createContext
export const TableContext = createContext({
  tableData: [],
  dispatch: () =>{}
});

//useReducer - initialState
const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result:''
}


//plantMine
const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  //테이블 만들기
  const candidate = Array(row*cell).fill().map((arr,i) => {
    return i;
  });
  const shuffle = [];
  while(candidate.length > row*cell - mine){
    const chosen = candidate.splice(Math.floor(Math.random()* candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  //전체 칸 -1로 설정
  const data = [];
  for (let i = 0; i < row; i++){
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++){
      rowData.push(CODE.NORMAL);
    }
  }
  //지뢰 심기
  for (let k = 0; k < shuffle.length; k++){
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data)
  return data;
}


export const START_GAME = 'START_GAME';
const reducer = (state, action) => {
  switch(action.type){
    case START_GAME:
      console.log('case START_GAME')
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine)
      }
    default:
      return state
  }

}



//MineSearch
const MineSearch = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo( () => ({tableData: state.tableData, dispatch }), [state.tableData])

  //dispatch={dispatch}
  return (
    <div id="container">
      <TableContext.Provider value={ value }>
        <Form ></Form>

        <p>{state.timer}</p>

        <Table ></Table>

        <div>{state.result}</div>
      </TableContext.Provider>
    </div>
  );

}



export default MineSearch;