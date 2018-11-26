import { observable, computed, decorate, autorun } from "mobx"
import { constantFault, processData, computeTableData } from "../utils/utils";
import { action } from "mobx"

class SignalCreationStore {

  fault_type = ''

}

decorate(SignalCreationStore, {
  fault_type: observable,
})

const observableSignalCreationStore = new SignalCreationStore();
export default observableSignalCreationStore
