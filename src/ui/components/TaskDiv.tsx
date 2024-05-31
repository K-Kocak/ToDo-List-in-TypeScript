import React, { BaseSyntheticEvent } from 'react';

import { Task } from '@backend/task';



interface IProps {
    task: Task;
    // eslint-disable-next-line @typescript-eslint/ban-types
    deleteTask: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    editTask: Function;
}

class TaskDiv extends React.Component<IProps, {isActive: boolean}> {
    constructor(props: IProps){
        super(props);

        this.state = {
            isActive: false,
        }

        this.activateDiv = this.activateDiv.bind(this);
        this.deactivateDiv = this.deactivateDiv.bind(this);
        this.deleteDiv = this.deleteDiv.bind(this);
    }

    activateDiv() {
        this.setState({
            isActive: true
        });
    }

    deactivateDiv(event: BaseSyntheticEvent) {
        this.setState({
            isActive: false
        });
        const taskToEdit: Task = {
            title: event.target[0].value,
            description: event.target[5].value,
            isHighPriority: event.target[3].checked,
            taskType: event.target[4].value,
            isCompleted: false,
            date: event.target[1].value,
            deadline: event.target[2].value,
            id: this.props.task.id,
        }
        this.props.editTask(taskToEdit)
    }

    deleteDiv() {
        this.setState({
            isActive: false
        })
        this.props.deleteTask(this.props.task);
    }
    //onClick={this.deleteDiv} call this
    //to delete the div (need it somewhere atleast.)
    //onClick={this.deadactivateDiv} call this to
    // return a div to normal AND update the taskList state in
    // App
    render() {  
        
        const divToDisplay = this.state.isActive ?

         <div>Confirm Edit<button onClick={this.deactivateDiv}></button><button onClick={this.deleteDiv}></button></div>
        
         : 
        
         <div><button onClick={this.deleteDiv}></button>Edit<button onClick={this.activateDiv}></button>{this.props.task.id}</div>;
        
        return(
            <div>
                {divToDisplay}            
            </div>
        )
    }
}

export default TaskDiv