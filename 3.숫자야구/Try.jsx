import  React, { Component }  from 'react';

const Try = (props) => {
    return (
            <li>
                <div>{props.tryInfo.try}</div>
                <div>{props.tryInfo.result}</div>
            </li>
    )
}

// class Try extends Component {

//     render(){

//         return (
//             <li>
//                 <b>{this.props.value}</b> - {this.props.index}
//                 <div>Contents</div>
//                 <div>Contents</div>
//                 <div>Contents</div>
//                 <div>Contents</div>
//             </li>
//         )
//     }
// }

export default Try; 
