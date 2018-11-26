// import { observer } from 'mobx-react';
import { observable, computed, decorate, autorun } from "mobx"
// import mobx from "mobx"
import { constantFault, processData, computeTableData } from "../utils/utils";
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

  //--------------------
  // Import Data
  //--------------------
  importSeriesFromFile = (e) => {
    const content = e.currentTarget.result
    const dataLoaded = processData(content)
    this.series = dataLoaded
  }

  //--------------------
  // Table
  //--------------------
  get formattedTableData() {
    return this.series.map((v) => computeTableData(v))
  }
  handleDeleteTableClick = (selected) => {
    selected.forEach(el => {
      const idx_rm = this.series.findIndex(v => v.id === el)
      this.series.splice(idx_rm, 1)
    })
    console.log(selected)
    // selected should be a observable
  }

  //--------------------
  // Edit Form
  //--------------------
  handleEditBut = (id, faultConfig, bounds, faultType) => {
    const serie = this.series.filter(v => v.id === id)[0]
    let signal
    switch (faultType) {
      case 'constant':
        signal = constantFault({ serie, faultConfig, bounds })
        break;

      default:
        break;
    }
    const index = this.series.findIndex(v => v.id === id)
    this.series[index].values = signal
    this.series[index].faultAdded = 'Yes'
  }

}

decorate(DataStore, {
  series: observable,
  author: observable,
  handleEditBut: action,
  importDataFromFile: action,
  formattedTableData: computed,
})


const observableDataStore = new DataStore();
export default observableDataStore
