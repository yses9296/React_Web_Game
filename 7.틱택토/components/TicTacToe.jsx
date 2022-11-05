import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [ ['', '', ''], ['', '', ''], ['', '', ''] ]
}

const SET_WINNER = 'SET_WINNER';

const reducer = (state, action) => {
  switch(action.type){
    case SET_WINNER:
      //state.winner = action.winner (X)
      // 새로운 객체 생성 후 값을 변경하여 넣어주기
      return{
        ...state, 
        winner: action.winner
      }
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([ ['', '', ''], ['', '', ''], ['', '', ''] ]); //3x3

  const onClickTable = useCallback( () => {
    dispatch({type: 'SET_WINNER', winner: 'O'}) //action
  }, [])

  return (
    <div>
      <Table onClick = {onClickTable} tableData={state.tableData}> </Table>
      {state.winner && <p>{state.winner} is Winner!</p> }
    </div>
  )
}


export default TicTacToe;