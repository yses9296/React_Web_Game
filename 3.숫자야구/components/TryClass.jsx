import  React, { Component, PureComponent }  from 'react';

class Try extends PureComponent {
    // constructor(props){
    //     super(props);
    //     //다른 동작, 정밀한 동작, 기본 객체로를 동작 못할 때 constructor 사용

    //     this.state = {
    //         result: this.props.tryInfo.result,
    //         try: this.props.tryInfo.try,
    //     }
    // }

    render(){

        return (
            <li>
                <div>{this.props.tryInfo.try}</div>
                <div>{this.props.tryInfo.result}</div>
            </li>
        )
    }
}

export default Try; 
