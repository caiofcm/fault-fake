// import { observer } from 'mobx-react';
import { observable, computed, decorate, autorun } from "mobx"
// import mobx from "mobx"

class ObservableData {
  series = []
  author = {name: 'Caio'}

  constructor() {
    autorun(() => console.log('AutoRun called'))
  }

  // @computed get completedTodosCount() {
  //   return this.todos.filter(
  //     todo => todo.completed === true
  //   ).length;
  // }

  get report() {
    if (this.todos.length === 0)
      return "<none>";
    return `First serie "${this.series[0].tag}". `
  }

  // addTodo(task) {
  //   this.todos.push({
  //     task: task,
  //     completed: false,
  //     assignee: null
  //   })
  // }
}

decorate(ObservableData, {
  series: observable,
  author: observable,
})


const observableDataStore = new ObservableData();
export default observableDataStore
