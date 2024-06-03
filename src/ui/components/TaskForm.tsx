import React, { BaseSyntheticEvent } from 'react';
import { v4 as uuid } from 'uuid';

import { Task, TaskType } from '@backend/task';

import '@css/TaskForm.scss';



interface IProps {
    // eslint-disable-next-line @typescript-eslint/ban-types
    addTask: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    convertTaskListToString: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    convertLocalStorageToTaskArray: Function;

}

class TaskForm extends React.Component<IProps, never> {
    constructor(props: IProps) {
        super(props);
        

        this.submitTask = this.submitTask.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.loadTask = this.loadTask.bind(this);
    }

    saveTask() {
        this.props.convertTaskListToString();
    }

    loadTask() {
        this.props.convertLocalStorageToTaskArray();
    }

    submitTask(event: BaseSyntheticEvent) {
        event.preventDefault();
        const taskToAdd: Task = {
            title: event.target[0].value,
            description: event.target[5].value,
            isHighPriority: event.target[3].checked,
            taskType: event.target[4].value,
            isCompleted: false,
            date: event.target[1].value,
            deadline: event.target[2].value,
            id: uuid(),
            isActive: false
        };
        this.props.addTask(taskToAdd);
    }

    render() {

        const TaskOptions: React.JSX.Element[] = [];
        const TaskTypes: TaskType[] = ["Leisure", "Study", "Work", "Exercise"] 
        TaskTypes.map((TaskType: TaskType, index: number) => {
            TaskOptions.push(<option key={index} value={TaskType}>{TaskType}</option>)
        });

        return (
            <div id="Taskform" className="Taskform">
                <div className="Taskform_container">
                    <div className="Taskform_container_title">
                        <h3>Add a new Task</h3>
                    </div>
                    <form onSubmit={this.submitTask}>
                        <div className="Taskform_container_task_title">
                            <label htmlFor="Title_input">Title : </label>
                            <input type="text" id="Title_input" required placeholder='Task Title...' defaultValue="Development_Value"></input>                     
                        </div>
                        <div className="Taskform_container_task_dates">
                            <label htmlFor="Start_of_task">Date : </label><input type="date" id="Start_of_task"></input>
                            <label htmlFor="Deadline_of_task">Deadline : </label><input type="date" id="Deadline_of_task"></input>
                        </div>
                        <div className="Taskform_container_task_priority_and_task_type">
                            <label htmlFor="Ishighpriority">High Priority? </label>
                            <input type="checkbox" id="Ishighpriority"></input>
                            <label htmlFor="Task_type">Task Type: </label>
                            <select name="Task_type" id="Task_type">
                                {TaskOptions}                         
                            </select>
                        </div>
                        <div className="Taskform_container_task_description">
                            <label htmlFor="task_details">Task Details:</label> <br></br>
                            <textarea required id="task_details" name="task_details" placeholder='Details About The Task...' defaultValue="Development_Value"></textarea>
                        </div>
                        <div className="Taskform_container_submit_button">
                            <button className="Taskform_container_submit_button_thing" onClick={this.saveTask}>Save Task List</button>
                            <button className="Taskform_container_submit_button_thing" onClick={this.loadTask}>Load Task List</button>
                            <button className="Taskform_container_submit_button_thing" type="submit" value="submit">Add Task to List</button>
                            
                        </div>
                    </form>
                    
                </div>
            </div>
        )
    }
}

export default TaskForm;