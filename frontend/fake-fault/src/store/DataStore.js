// import { observer } from 'mobx-react';
import { observable, computed, decorate, autorun } from "mobx"
// import mobx from "mobx"
import { constantFault } from "../utils/utils";
import { action } from "mobx"

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


  handleEditBut (id, faultConfig, bounds, faultType) {
    const serie = this.series.filter(v => v.id === id)[0]
    let signal
    switch (faultType) {
      case 'constant':
        signal = constantFault({ serie, faultConfig, bounds })
        break;

      default:
        break;
    }

    // let data = [...this.state.data]
    const index = this.series.findIndex(v => v.id === id)
    // let serieMod = { ...data[index] }
    // serieMod.values = signal
    // serieMod.faultAdded = true
    // data[index] = serieMod
    // this.setState({ data })
    this.series[index].values = signal
  }

  importDataFromFile () {

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
  handleEditBut: action,
})


const observableDataStore = new DataStore();
export default observableDataStore
