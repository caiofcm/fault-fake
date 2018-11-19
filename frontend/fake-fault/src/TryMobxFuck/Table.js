import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Row from "./Row"
import { appStore } from './Store'

// const Table = observer(
class Table extends Component {

  handleClick = (e) => {
    console.log(this.props);

    this.props.store.employeesList[0].name = e.target.value
  }

  render() {
    const store = this.props.store

    return (
      // <tbody>
      //   {/* {store.employeesList.map((e, i) =>
      //     <Row
      //       key={i}
      //       data={e}
      //     />
      //   )} */}
      // </tbody>
      <div>
        <input onChange={this.handleClick} />
        <h3>parent: {store.employeesList[0].name}</h3>

        <Row data={store.employeesList[0].salary}></Row>
      </div>

    )
  }
}
// )

export default inject(["store"])(observer(Table))
