import { observable, computed, decorate, autorun, runInAction, action } from "mobx"


//############################################
//###########################################
//
//
//	GBN STORE
//
//
//###########################################
//###########################################

class GBNStore {
  low_value = -1
  upp_value = 10
  prob_change = 0.95
  min_constant = 5

  handleModifyValue = (e) => {
    let val
    if (e.target.name === 'min_constant') {
      val = parseInt(e.target.value)
    }
    else {
      val = parseFloat(e.target.value)
    }
    this[e.target.name] = val
  }
}
decorate(GBNStore, {
  low_value: observable,
  upp_value: observable,
  prob_change: observable,
  min_constant: observable,
  handleModifyValue: action,
})

// export const GBNStore
export {
  GBNStore
}
