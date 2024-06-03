import React from 'react';

import { Task } from '@backend/task';

import TaskDiv from '@ui/components/TaskDiv';

import '@css/TaskList.scss';

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

        this.deleteTask = this.deleteTask.bind(this);    
    }
    deleteTask(taskToDelete: Task) {
        this.props.deleteTask(taskToDelete);
    }
    
    render() {
        const taskToDisplay = this.props.taskList;
        const taskDivList: Task[] = [];

        taskToDisplay.map((Task: Task) => {
            taskDivList.push(Task);
        });
        
     
        const temp: React.JSX.Element[] = [];
        taskDivList.map((Task: Task, index: number) => {
            temp.push(<TaskDiv key={index} task={Task} deleteTask={this.deleteTask} editTask={this.props.editTask}/>)
        });
      

        return(
            <div id="Tasklist_container">
                {temp}
            </div>
        )
    }

}

export default TaskList;