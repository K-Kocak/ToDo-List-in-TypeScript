import React from 'react';

import '@css/App.scss';

import TaskForm from '@ui/components/TaskForm';
import TaskList from '@ui/components/TaskList';

import { Task } from '@backend/task';

interface IProps {}

class App extends React.Component<IProps, {taskList: Task[]}> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      taskList: [],
    };

    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);    
  }
  
  addTask(taskToAdd: Task): void {
    this.setState({
      taskList: [...this.state.taskList, taskToAdd],
    });
  }

  editTask(taskToEdit: Task) {
    const taskList = this.state.taskList;
    const newTaskList: Task[] = [];
    taskList.map((task: Task) => {
      if(task.id === taskToEdit.id) {
        newTaskList.push(taskToEdit);
      }
      else {
        newTaskList.push(task);
      }
    })
    this.setState({
      taskList: [...newTaskList]
    })
  }
  
  deleteTask(taskToDelete: Task) {
    const index = this.state.taskList.indexOf(taskToDelete);
    console.log(taskToDelete);
    console.log(this.state.taskList);
    console.log(index);
    if(index > -1) {
      const newTaskList = this.state.taskList;
      newTaskList.splice(index, 1);
      console.log(newTaskList);
      this.setState({
        taskList: [...newTaskList]
      });
    }
    
  }

  render() {
    return (
      <div className="Taskapp_container">
        <TaskForm addTask={this.addTask}/>
        <TaskList taskList={this.state.taskList} editTask={this.editTask} deleteTask={this.deleteTask}/>      
      </div>
    )
  }
}

export default App
