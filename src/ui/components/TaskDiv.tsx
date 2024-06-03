import React, { BaseSyntheticEvent } from 'react';

import { Task, TaskType } from '@backend/task';

import '@css/TaskDiv.scss';

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

        this.activateDiv = this.activateDiv.bind(this);
        this.deactivateDiv = this.deactivateDiv.bind(this);
        this.deleteDiv = this.deleteDiv.bind(this);
        this.completeTask = this.completeTask.bind(this);
    }

    activateDiv() {
        const taskToEdit = this.props.task;
        taskToEdit.isActive = true;
        this.props.editTask(taskToEdit);
    }

    deactivateDiv(event: BaseSyntheticEvent) {
        
        const taskToEdit: Task = {
            title: event.target[0].value,
            description: event.target[4].value,
            isHighPriority: event.target[5].checked,
            taskType: event.target[6].value,
            isCompleted: this.props.task.isCompleted,
            date: event.target[7].value,
            deadline: event.target[8].value,
            id: this.props.task.id,
            isActive: false
        }
        this.props.editTask(taskToEdit)
    }

    deleteDiv() {
        this.props.deleteTask(this.props.task);
    }

    completeTask() {
        const taskToEdit = this.props.task;
        taskToEdit.isCompleted = !taskToEdit.isCompleted;
        this.props.editTask(taskToEdit);

    }

   
    render() {  
        
        const TaskOptions: React.JSX.Element[] = [];
        const TaskTypes: TaskType[] = ["Leisure", "Study", "Work", "Exercise"] 
        TaskTypes.map((TaskType: TaskType, index: number) => {
            TaskOptions.push(<option key={index} value={TaskType}>{TaskType}</option>)
        });

        const completion = this.props.task.isCompleted ? {background: "linear-gradient(90deg, #499762, #3C7B50)"} : {};

        const highPriority = (this.props.task.isCompleted === false && this.props.task.isHighPriority === true) ? {background: "linear-gradient(90deg, #A81F2C, #7F1721)"} : null;
  
        const bgColorToDisplay = (highPriority !== null) ? highPriority : completion;

        const divToDisplay = this.props.task.isActive ?

        <div id="Taskdiv_container_active" style={bgColorToDisplay}>
            <form onSubmit={this.deactivateDiv}>
                <div className="Taskdiv_title_and_buttons">
                    <div className="Taskdiv_title">
                        <input type="string" defaultValue={this.props.task.title}></input>
                    </div>
                    <div className="Taskdiv_buttons">
                        <button type="button" className="Taskdiv_button Complete" onClick={this.completeTask}><i className="fa fa-check"></i></button>
                        <button type="submit" className="Taskdiv_button Edit"><i className="fa fa-edit"></i></button>
                        <button className="Taskdiv_button Delete" onClick={this.deleteDiv}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        
                        
                    </div>
                </div>
                <div className="Taskdiv_description">
                    <textarea defaultValue={this.props.task.description}></textarea>
                </div>
                <div className="Taskdiv_types_priority_dates">
                    <div className="Taskdiv_types_priority">
                        <span>High Priority?
                            <input type="checkbox" defaultChecked={this.props.task.isHighPriority}></input>
                        </span>
                    
                        <select name="Task_type" id="Task_type">{TaskOptions}</select>
                        
                    </div>
                    <div className="Taskdiv_dates">
                        <label htmlFor="Start_of_task">Date : <input type="date" id="Start_of_task" defaultValue={this.props.task.date?.toString()}></input></label>
                        <label htmlFor="Deadline_of_task">Deadline : <input type="date" id="Deadline_of_task" defaultValue={this.props.task.deadline?.toString()}></input></label>
                    </div>
                </div>
            </form>
        </div>
        
         : 
        
        <div id="Taskdiv_container_notactive" style={bgColorToDisplay}>
            <div className="Taskdiv_title_and_buttons">
                <div className="Taskdiv_title">
                    <span>{this.props.task.title}</span>
                </div>
                <div className="Taskdiv_buttons">
                    <button className="Taskdiv_button Complete" onClick={this.completeTask}><i className="fa fa-check"></i></button>
                    <button className="Taskdiv_button Edit" onClick={this.activateDiv}><i className="fa fa-edit"></i></button>
                    
                    <button className="Taskdiv_button Delete" onClick={this.deleteDiv}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div className="Taskdiv_description">
                <p>{this.props.task.description}</p>
            </div>
            <div className="Taskdiv_types_priority_dates">
                <div className="Taskdiv_types_priority">
                <span>Priority : {this.props.task.isHighPriority ? "High Priority!" : "Low Priority"}</span>
                    <span>Task Type : {this.props.task.taskType}</span>
                </div>
                <div className="Taskdiv_dates">
                    <span>Date : {this.props.task.date?.toString()}</span>
                    <span>Deadline : {this.props.task.deadline?.toString()}</span>
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