import { observable, decorate } from "mobx"

class Store {
  employeesList = [
    {name: "John Doeth", salary: 150},
    {name: "Richard Roe", salary: 225},
  ]
}

decorate(Store, {
  employeesList: observable
})

const appStore = new Store()

export {
  appStore
}
