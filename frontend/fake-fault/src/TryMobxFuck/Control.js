import React, { Component } from 'react'

class Controls extends Component {
  addEmployee = ()=> {
    const name = prompt("The name:")
    const salary = prompt("The salary:")
    this.props.store.employeesList.push({ name, salary })
    // ERROR !!! this will not update the view
  }

  clearList = ()=> {
    this.props.store.employeesList = []
    // ERROR !!! this will not update the view
  }

  render() {
    return(<div className="controls">
      <button >clear table</button>
      <button >add record</button>
    </div>)
  }
}
