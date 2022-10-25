import React, { Component, useCallback, useRef, useState } from 'react'

const ResponseCheck = () => {
    const [state ,setState] = useState('waiting');
    const [message, setMessage] = useState('Start with a Click');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();


    const onClickScreen = useCallback( (e) => {
        e.preventDefault();
        if(state === 'waiting'){
            setState('ready');
            setMessage('Click when the screen turns blue')

            timeout.current = setTimeout( () => {
                setState('now');
                setMessage('Now Click!');

                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); //2~3초 랜덤

        }
        else if (state === 'ready'){
            clearTimeout(timeout.current) //now 상태가 나오지 않도록 초기화
            setState('waiting');
            setMessage("Don't be hasty");
        }
        else if (state === 'now'){
            endTime.current = new Date();

            setResult((prevResult)=>{
                return [...prevResult, endTime.current - startTime.current]
            })
            setState('waiting');
            setMessage("Start with a Click");
        }
    })

    const onReset = useCallback( () => {
        setResult([])
    })
    const renderAverage = useCallback( () => {
        return result.length === 0 
            ? null 
            : <div>
                <p>Average: {result.reduce((a,c) => a + c ) / result.length }ms</p>
                <button onClick={onReset}>Reset</button>
             </div>
    })


    return(
        <div>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>

            {renderAverage()}

        </div>
    )

}

export default ResponseCheck;