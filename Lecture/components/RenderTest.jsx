import React, { PureComponent } from 'react';

class RenderTest extends PureComponent {
    state = {
        counter: 0,
        string: 'Hello',
        number: 1,
        boolean: true,
        object: {},
        array1: []
    }

    // Component ver
    // shouldComponentUpdate(nextProps, nextState, nextContext){
    //     if(this.state.counter !== nextState.counter){
    //         return true;
    //     }
    //     return false;
    // }
    onClick = () => {
        // Do not assign the array like this...
        // const array2 = this.state.array1;
        // array2.push(2);
        // this.setState({
        //     array1: array2
        // })
        this.setState({
            array1: [...this.state.array1, 2]
        })
    }
    render() {
        console.log(this.state)
        return (
            <div> 
                <button onClick={this.onClick}>Click</button>
            </div>
        );
  }
}

export default RenderTest;