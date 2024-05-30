import React from 'react';

import '@css/App.scss';

import TaskForm from '@ui/components/TaskForm';
import TaskList from '@ui/components/TaskList';

import { Task } from '@backend/task';

interface IProps {
  //taskList: Task[];
  //addTask: Task;
}





class App extends React.Component<IProps, {taskList: Task[]}> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      taskList: [],
    };

    this.addTask = this.addTask.bind(this);
  }
  
  addTask(taskToAdd: Task) {
    this.setState({
      taskList: [...this.state.taskList, taskToAdd],
    });
  }
  

  render() {
    return (
      <>
        <TaskForm addTask={this.addTask}/>
        <TaskList taskList={this.state.taskList}/>      
      </>
    )
  }
}

export default App
