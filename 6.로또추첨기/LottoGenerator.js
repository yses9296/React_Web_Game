import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers(){
    const numbers = Array(45).fill().map((v,i) => i +1);
    const shuffle = [];
    while(numbers.length > 0){
        shuffle.push(numbers.splice(Math.floor(Math.random() * numbers.length),1)[0])
    }
    const bonusNumer = shuffle[shuffle.length-1]; 
    const winNumber = shuffle.splice(0, 6).sort((a,b) => a-b);

    return [...winNumber, bonusNumer]
}

class LottoGenerator extends Component {
    state = {
        winNumbers : getWinNumbers(), //[...winNumber, bonusNumer]
        winBalls: [],
        bonus: null,
        redo: false
    }
    timeouts = [];


    componentDidMount(){
        for(let i = 0; i < this.state.winNumbers.length - 1; i++){
            this.timeouts[i] = setTimeout( () => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, this.state.winNumbers[i]]
                    }
                })
            }, (i + 1) * 600);
        }

        this.timeouts[6] = setTimeout( () => {
            this.setState({
                bonus : this.state.winNumbers[6],
                redo: true
            })
        }, 4200)
    }
    componentWillUnmount(){
        this.timeout.forEach(v => {
            clearTimeout(v);
        });
       
    }
    onClickRedo = ()=>{

    }
    render() {
        const{ winBalls, bonus, redo } = this.state;
        return (
            <div id='container'> 
                <p>당첨 숫자:</p>
                <div>
                    {winBalls.map(v => <Ball key={v} number = {v}/>)}
                </div>

                <p>Bonuse Number:</p>
                {bonus && <Ball number={bonus}/>}

                {redo && <button onClick={this.onClickRedo}>One more time?</button>}
            </div>
        );
  }
}

export default LottoGenerator