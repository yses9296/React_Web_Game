import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [ 
    ['', '', ''], 
    ['', '', ''], 
    ['', '', ''] 
  ]
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL'; 
export const CHANGE_TURN = 'SET_TURN'; 

const reducer = (state, action) => {
  switch(action.type){
    case SET_WINNER:
      //state.winner = action.winner (X)
      // 새로운 객체 생성 후 값을 변경하여 넣어주기
      return{
        ...state, 
        winner: action.winner
      }
    case CLICK_CELL:{
      const tableData = [...state.tableData]
      tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결 가능
      tableData[action.row][action.cell] = state.turn;
      
      return {
        ...state, 
        tableData
      }
    }
    case CHANGE_TURN: {
      return {
        ...state, 
        turn: state.turn == 'O' ? 'X' : 'O'
      }
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
      <Table onClick = {onClickTable} tableData={state.tableData} dispatch={dispatch}> </Table>
      {state.winner && <p>{state.winner} is Winner!</p> }
    </div>
  )
}


export default TicTacToe;