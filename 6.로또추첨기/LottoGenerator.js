import React, { useState, useRef, useEffect } from 'react';
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

const LottoGenerator = () => {
    const [winNums, setWinNums] = useState(getWinNumbers());
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    const onClickRedo = ()=>{
        setWinNums(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }

    const runTimeOuts = () => {
        for(let i = 0; i < winNums.length - 1; i++){
            timeouts.current[i] = setTimeout( () => {
                setWinBalls( (prevBall) => [...prevBall, winNums[i] ] )
            }, (i + 1) * 600);
        }

        timeouts.current[6] = setTimeout( () => {
            setBonus(winNums[6]);
            setRedo(true)
        }, 4200)
    }

    useEffect( () => {

        for(let i = 0; i < winNums.length - 1; i++){
            timeouts.current[i] = setTimeout( () => {
                setWinBalls( (prevBall) => [...prevBall, winNums[i] ] )
            }, (i + 1) * 600);
        }

        timeouts.current[6] = setTimeout( () => {
            setBonus(winNums[6]);
            setRedo(true)
        }, 4200);

        return () => {
            timeouts.current.forEach(v => {
                clearTimeout(v);
            });
        }
        
    }, [timeouts.current]) //빈 배열이면 componentDidMount와 동일

    return (
        <div id='container'> 
            <p>당첨 숫자:</p>
            <div>
                {winBalls.map(v => <Ball key={v} number = {v}/>)}
            </div>

            <p>Bonuse Number:</p>
            {bonus && <Ball number={bonus}/>}

            {redo && <button onClick={onClickRedo}>One more time?</button>}
        </div>
    );
}


export default LottoGenerator