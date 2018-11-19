// import { observer } from 'mobx-react';
import { observable, computed, decorate, autorun } from "mobx"
// import mobx from "mobx"

const LEN = 50
const randomArray = (length, max) => [...new Array(length)]
  .map(() => (Math.random() * max));

const dataInitial = [
  { tag: 'tag1', values: randomArray(LEN, 10.0), id: 1, faultAdded: false },
  { tag: 'tag2', values: randomArray(LEN, 3.0), id: 2, faultAdded: false },
  { tag: 'tag3', values: randomArray(LEN, 1.0), id: 3, faultAdded: false },
]

class DataStore {
  series = dataInitial
  author = { name: 'Caio' }

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

decorate(DataStore, {
  series: observable,
  author: observable,
})


const observableDataStore = new DataStore();
export default observableDataStore
