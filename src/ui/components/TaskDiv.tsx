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
        this.completeTask = this.completeTask.bind(this);
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

    completeTask() {
        const taskToEdit = this.props.task;
        taskToEdit.isCompleted = !taskToEdit.isCompleted;
        this.props.editTask(taskToEdit);      
    }

    //onClick={this.deleteDiv} call this
    //to delete the div (need it somewhere atleast.)
    //onClick={this.deadactivateDiv} call this to
    // return a div to normal AND update the taskList state in
    // App
    //<button onClick={this.deleteDiv}></button>
    //<button onClick={this.activateDiv}></button>
    //<button onClick={this.deactivateDiv}></button>
    render() {  
        
        const divToDisplay = this.state.isActive ?

         <div>Confirm Edit<button onClick={this.deactivateDiv}></button><button onClick={this.deleteDiv}></button></div>
        
         : 
        
         <div id="Taskdiv_container_notactive">
            <div className="Taskdiv_title_and_buttons">
                <div className="Taskdiv_title">
                    <span>{this.props.task.title}</span>
                </div>
                <div className="Taskdiv_buttons">
                    <button onClick={this.completeTask}><i className="fa fa-check"></i></button>
                    <button onClick={this.activateDiv}><i className="fa fa-edit"></i></button>
                    
                    <button onClick={this.deleteDiv}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div>
                <p>{this.props.task.description}</p>
            </div>
            <div>
                <div>
                    <span>{this.props.task.taskType}</span>
                    <span>{this.props.task.isHighPriority ? "High Priority!" : "Low Priority"}</span>
                </div>
                <div>
                    <span>{this.props.task.date?.toString()}</span>
                    <span>{this.props.task.deadline?.toString()}</span>
                </div>
            </div>
         </div>;
        
        return(
            <div id="Taskdiv_container">
                {divToDisplay}            
            </div>
        )
    }
}

export default TaskDiv