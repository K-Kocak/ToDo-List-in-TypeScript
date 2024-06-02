import React, { BaseSyntheticEvent } from 'react';

import '@css/Filter.scss';

import { TaskType } from '@backend/task'

interface IProps {
    sortParameter: any;
}

class Filter extends React.Component<IProps, never>{
    constructor(props: IProps){
        super(props);

        this.sortDivString = this.sortDivString.bind(this);
    }

    sortDivString(event: BaseSyntheticEvent) {
        console.log(event.target.value);
        this.props.sortParameter(event.target.value);
    }

    render() {
        return (
            <div className="Filter_container">
                <button onClick={this.sortDivString} value="title"></button>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
            </div>
        )
    }
}

export default Filter;