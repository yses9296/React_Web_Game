const React = require('react');
const { useState, useRef } = React;

const Gugudan = () => {
    const [firstNum, setFirstNum] = useState(Math.ceil(Math.random() * 9) );
    const [secondNum, setSecondNum] = useState(Math.ceil(Math.random() * 9) );
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const handleCalculate = (e) => {
        e.preventDefault();
        if(parseInt(value) === firstNum * secondNum){

            setResult(firstNum + " x " + secondNum + " = "+ value + ' is Correct!');
            setValue('');
            setFirstNum(Math.ceil(Math.random() * 9));
            setSecondNum(Math.ceil(Math.random() * 9));
            inputRef.current.focus();
        }
        else {
            setResult('Wrong');
            setValue('');
            inputRef.current.focus();
        }
    }
    return (
        <>
            <p>{firstNum} X {secondNum} =</p>
            <form onSubmit={handleCalculate}>
                <input ref={inputRef} type="number" value={value} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            <p>{result}</p>
        </>
    )
}

module.exports = Gugudan;