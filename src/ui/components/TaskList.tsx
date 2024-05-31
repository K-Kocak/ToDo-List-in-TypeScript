import React from 'react';

import { Task } from '@backend/task';

import TaskDiv from '@ui/components/TaskDiv';

interface IProps {
    taskList: Task[];
    // eslint-disable-next-line @typescript-eslint/ban-types
    editTask: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    deleteTask: Function;
}


class TaskList extends React.Component<IProps, never> {
    constructor(props: IProps) {
        super(props);
    }

    

    render() {
        
        const taskToDisplay = this.props.taskList;
        
        const temp: React.JSX.Element[] = [];
        taskToDisplay.map((Task: Task, index: number) => {
            temp.push(<TaskDiv key={index} task={Task} deleteTask={this.props.deleteTask} editTask={this.props.editTask}/>)
        });
        console.log(temp);

        return(
            <div>
                {temp}
            </div>
        )
    }

}

export default TaskList;