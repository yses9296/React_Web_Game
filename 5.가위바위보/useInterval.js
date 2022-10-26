import { useRef, useEffect } from 'react';
//useInterval( () => {
//    console.log('Hello')
//}, 1000) //1000 >> null이 되는 순간 clearInterval >> isRunning ? 1000 : null

function useInterval(callback, delay){
    const savedCallback = useRef(); //받은 callback 함수를 savedCallback에 저장.

    useEffect( () => {
        savedCallback.current = callback;
    })


    useEffect( () => {
        function tick(){
            savedCallback.current();
        } 
        //savedCallback 함수를 tick으로 다시 감싼 이유: 
        // 받은 callback 함수를 그대로 useEffect에서 사용하면, 미세한 시간차이 발생.

        if (delay != null){ //isRunning이 true라면,
            let id = setInterval(tick, delay);
            return () => clearInterval(id)
        }
    }, [delay]); //callback이 바뀌어도 새호 setInterval이 안 되지만, 최신 callback을 참조가능.

    return savedCallback.current;

}

export default useInterval;