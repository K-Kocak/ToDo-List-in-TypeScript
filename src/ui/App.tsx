import React from 'react';

import '@css/App.scss';

import TaskForm from '@ui/components/TaskForm';
import TaskList from '@ui/components/TaskList';
import Filter from '@ui/components/Filter';

import { Task, TaskType } from '@backend/task';

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
    this.sortByString = this.sortByString.bind(this);
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
    const temp: Task[] = [];
    const resetActive = this.state.taskList;
    resetActive.map((Task: Task) => {
      if(Task.isActive) {
        Task.isActive = false;
        temp.push(Task);
      } else {
        temp.push(Task);
      }     
    })
    if(index > -1) {
      temp.splice(index, 1);
      this.setState({
        taskList: [...temp]
      });
    }  
  }

  sortDivs(parameterToSort: string | Date | boolean | TaskType) {
    if(parameterToSort === "title") {
      this.sortByString(parameterToSort);
    }
  }

  sortByString(stringToSortBy: string) {

  }

  render() {
    return (
      <div className="Taskapp_container">
        <TaskForm addTask={this.addTask}/>
        <Filter sortParameter={this.sortDivs}/>
        <TaskList taskList={this.state.taskList} editTask={this.editTask} deleteTask={this.deleteTask}/>      
      </div>
    )
  }
}

export default App
