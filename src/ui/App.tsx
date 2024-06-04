import React from 'react';

import '@css/App.scss';

import TaskForm from '@ui/components/TaskForm';
import TaskList from '@ui/components/TaskList';
import Filter from '@ui/components/Filter';

import { Task, TaskType } from '@backend/task';

interface IProps {}

interface IState {
  taskList: Task[];
  previousFilter: string;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      taskList: [],
      previousFilter: ""
    }

    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this); 
    this.sortDivs = this.sortDivs.bind(this);   
    this.sortByString = this.sortByString.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByBoolean = this.sortByBoolean.bind(this);
    this.sortByTaskType = this.sortByTaskType.bind(this);
    this.setNewTaskList = this.setNewTaskList.bind(this);
    this.convertTaskListToString = this.convertTaskListToString.bind(this);
    this.convertLocalStorageToTaskArray = this.convertLocalStorageToTaskArray.bind(this);
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

    });

    this.setState({
      taskList: [...newTaskList]
    });
  }
  
  deleteTask(taskToDelete: Task) {

    const index = this.state.taskList.indexOf(taskToDelete);
    const temp: Task[] = [];
    const resetActive = this.state.taskList;
    
    resetActive.map((Task: Task) => {
      if(Task.isActive) {
        Task.isActive = false;
        temp.push(Task);
      } 
      else {
        temp.push(Task);
      }

    });

    if(index > -1) {
      temp.splice(index, 1);

      this.setState({
        taskList: [...temp]
      });
    }  
  }

  sortDivs(parameterToSort: string | Date | boolean | TaskType) {
    switch(parameterToSort) {
      case "title": {
        this.sortByString();
        break;
      }

      case "date":
      case "deadline": {
        this.sortByDate(parameterToSort);
        break;
      }

      case "isHighPriority": {
        this.sortByBoolean(parameterToSort);
        break;
      }

      case "isCompleted": {
        this.sortByBoolean(parameterToSort);
        break;
      }

      case "Leisure":
      case "Work":
      case "Exercise":
      case "Study": {
        this.sortByTaskType(parameterToSort);
        break;
      }

      default:
        break;
    }
  }

  sortByString() {
    const currentTaskList = this.state.taskList;

    currentTaskList.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    this.setNewTaskList(currentTaskList, "title");
  }

  sortByDate(dateToSortBy: string) {
    const currentTaskList = this.state.taskList;

    if(dateToSortBy === "date") {

      currentTaskList.sort((a, b) => {

        if(a.date !== undefined && b.date !== undefined) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }

        return 0;      
      });

      this.setNewTaskList(currentTaskList, dateToSortBy);

    } 
    else if (dateToSortBy === "deadline") {

      currentTaskList.sort((a, b) => {
        if(a.deadline !== undefined && b.deadline !== undefined) {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }

        return 0;        
      });

      this.setNewTaskList(currentTaskList, dateToSortBy);
    }
  }

  sortByBoolean(booleanToSortBy: string) {
    const currentTaskList = this.state.taskList;

    if(booleanToSortBy === "isHighPriority") {

      currentTaskList.sort((a, b) => {

        if(a.isHighPriority && b.isHighPriority) {
          return 0;
        } 

        else if (!a.isHighPriority && !b.isHighPriority) {
          return 0;
        } 

        else {
          if(a.isHighPriority) {
            return -1;
          }

          else return 1;
        }
      });

      this.setNewTaskList(currentTaskList, booleanToSortBy);
    }
    else if(booleanToSortBy === "isCompleted") {

      currentTaskList.sort((a, b) => {

        if(a.isCompleted && b.isCompleted) {
          return 0;
        } 

        else if (!a.isCompleted && !b.isCompleted) {
          return 0;
        } 

        else {
          if(a.isCompleted) {
            return 1;
          }

          else return -1;
        }
      });

      this.setNewTaskList(currentTaskList, booleanToSortBy);     
    }
  }

  sortByTaskType(taskTypeToSort: string) {
    const currentTaskList = this.state.taskList;

    currentTaskList.sort((a, b) => {

      if(a.taskType === taskTypeToSort && b.taskType !== taskTypeToSort) {
        return -1;
      } 

      else if(a.taskType !== taskTypeToSort && b.taskType === taskTypeToSort) {
        return 1;
      }

      return 0;
    });

    this.setNewTaskList(currentTaskList, taskTypeToSort);
  }

  setNewTaskList(taskList: Task[], filterString: string) {

    if(this.state.previousFilter === filterString) {
      this.setState({
        taskList: [...taskList].reverse(),
        previousFilter: ""
      });
    } 

    else {
      this.setState({
        taskList: [...taskList],
        previousFilter: filterString
      });
    }
  }

  convertTaskListToString() {
    const TaskList = this.state.taskList;
    let dataToSave: string = ""; 

    TaskList.map((Task: Task) => {
      dataToSave += 
      Task.id + "," + 
      Task.description + "," + 
      Task.isCompleted.toString() + "," +
      Task.isHighPriority.toString() + "," +
      Task.taskType + ",";

      if(Task.date) {
        dataToSave += Task.date + ","
      } 

      else {
        dataToSave += "No Date" + ","
      }

      if(Task.deadline) {
        dataToSave += Task.deadline + ",";
      } 

      else {
        dataToSave += "No Deadline" + ",";
      }

      dataToSave += Task.title + ".";
    });

    localStorage.setItem("tasklist", dataToSave);
  }

  convertLocalStorageToTaskArray() {
    const storage = localStorage.getItem("tasklist");
    const TaskListArray = storage?.split(".")

    if(TaskListArray?.length === 1 || TaskListArray === undefined) {
      return;
    }

    TaskListArray.pop();
    const TaskList: Task[] = [];

    TaskListArray.map((StringTask: string) => {   
      const TaskProperties: string[] = StringTask.split(",");

      if(TaskProperties[0].length > 2) {
        let priority: boolean = false;
        let completed: boolean = false;  

        if(TaskProperties[3] === "true") {
          priority = true;
        }

        if(TaskProperties[2] === "true") {
          completed = true;
        }

        let taskType: TaskType = "Leisure";

        switch(TaskProperties[4]) {
          case "Exercise":
            taskType = "Exercise";
            break;

          case "Work":
            taskType = "Work";
            break;

          case "Study":
            taskType = "Study";
            break;

          default:
            taskType = "Leisure";
            break;
        }

        const TaskToAdd: Task = {
          title: TaskProperties[7],
          description: TaskProperties[1],
          date: TaskProperties[5],
          deadline: TaskProperties[6],
          isHighPriority: priority,
          taskType: taskType,
          isCompleted: completed,
          id: TaskProperties[0],
          isActive: false
        }

        TaskList.push(TaskToAdd);
      } 
    });
    
    if(TaskList.length > 1) {
      this.setState({
        taskList: TaskList
      });
    }   
  }

  render() {
    return (
      <div className="Taskapp_container">
        <TaskForm addTask={this.addTask} convertTaskListToString={this.convertTaskListToString} convertLocalStorageToTaskArray={this.convertLocalStorageToTaskArray}/>
        <Filter sortParameter={this.sortDivs}/>
        <TaskList taskList={this.state.taskList} editTask={this.editTask} deleteTask={this.deleteTask}/>      
      </div>
    )
  }
}

export default App