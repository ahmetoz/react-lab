import React from 'react';

export default class Results extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        console.logs(this.props);
        
        return (
            <div>
                Results
            </div>
        )
    }
}