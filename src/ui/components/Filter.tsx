import React, { BaseSyntheticEvent } from 'react';

import '@css/Filter.scss';

interface IProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sortParameter: any;
}

class Filter extends React.Component<IProps, never>{
    constructor(props: IProps){
        super(props);

        this.sortDivString = this.sortDivString.bind(this);
    }

    sortDivString(event: BaseSyntheticEvent) {
        this.props.sortParameter(event.target.value);
    }

    render() {

        const taskTypeArray: string[] = ["Leisure","Study","Work","Exercise"];
        const taskTypeButtons: React.JSX.Element[] = [];

        taskTypeArray.map((type: string, index: number) => {
            taskTypeButtons.push(<button className="Tasktype_filter" key={index} onClick={this.sortDivString} value={type}>{type}</button>)
        })

        return (
            <div className="Filter_container">
                <span>Filters: </span> 
                <button className="Title_filter"onClick={this.sortDivString} value="title">Title</button>
                <button className="Date_filter" onClick={this.sortDivString} value="date">Date</button>
                <button className="Date_filter" onClick={this.sortDivString} value="deadline">Deadline</button>
                <button className="Priority_filter" onClick={this.sortDivString} value="isHighPriority">High Priority</button>
                {taskTypeButtons}
                <button className="Incomplete_filter" onClick={this.sortDivString} value="isCompleted">Incomplete</button>
            </div>
        )
    }
}

export default Filter;