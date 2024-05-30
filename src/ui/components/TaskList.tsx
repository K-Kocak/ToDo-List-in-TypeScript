import React from 'react';

import { Task } from '@backend/task';

import { TaskDiv } from '@ui/components/TaskDiv';

interface IProps {
    taskList: Task[];
}

//key={index} title={Task.title} description={Task.description} date={Task.date} deadline={Task.deadline} isHighPriority={Task.isHighPriority} taskType={Task.taskType} isCompleted={Task.isCompleted}

class TaskList extends React.Component<IProps, never> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        
        const taskToDisplay = this.props.taskList;
        
        const temp: React.JSX.Element[] = [];
        taskToDisplay.map((Task: Task, index: number) => {
            temp.push(<TaskDiv key={index} task={Task}/>)
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