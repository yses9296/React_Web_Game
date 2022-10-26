import { useRef, useEffect } from 'react';
//useInterval( () => {
//    console.log('Hello')
//}, 1000) //1000 >> null이 되는 순간 clearInterval >> isRunning ? 1000 : null

function useInterval(callback, delay){
    const savedCallback = useRef();

    useEffect( () => {
        savedCallback.current = callback;
    })


    useEffect( () => {
        function tick(){
            savedCallback.current();
        }

        if (delay != null){
            let id = setInterval(tick, delay);
            return () => clearInterval(id)
        }
    }, [delay]);

    return savedCallback.current;

}

export default useInterval;