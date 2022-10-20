const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('사자')
    const [value, setValue] = useState('')
    const [result, setResult] = useState('')
    const inputRef = useRef(null);

    const onChange = (e) => {
        setValue(e.target.value);
    }
    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word[word.length -1] === value[0]){
                setResult('Pass');
                setWord(value);
                setValue('');
                inputRef.current.focus();
        }
        else {
            setResult('Failed, Try again');
            setValue('');
            inputRef.current.focus();
        }
    }


    return (
        <div>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input type="text" placeholder='Enter the word' ref={inputRef} onChange={onChange} value={value} />
                <button>Submit</button>
            </form>
            <div>{result}</div>
        </div>
    )
    
}

module.exports = WordRelay;