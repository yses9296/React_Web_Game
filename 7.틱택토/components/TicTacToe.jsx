import React, { useState, useReducer } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [ ['', '', ''], ['', '', ''], ['', '', ''] ]
}

const reducer = (state, action) => {

}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([ ['', '', ''], ['', '', ''], ['', '', ''] ]); //3x3


  return (
    <div>
      <Table></Table>
      {winner && <p>{winner} is Winner!</p> }
    </div>
  )
}


export default TicTacToe;