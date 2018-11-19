import React from 'react'
import { observer, inject } from 'mobx-react'


function Row(props) {
  return (
    <div>
      {props.data}

      <h6>I can use props.store ? {props.store.employeesList[1].salary}</h6>
    </div>
  )
}

// const RowObs = inject(["store"])(
//   observer(Row)
// )

export default inject(["store"])(observer(Row))
