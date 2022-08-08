import {makeAutoObservable} from 'mobx'

function createDoubler(value) {
  return makeAutoObservable({
    value,
    get double() {
      return this.value * 2
    },
    increment() {
      this.value++
    },
  })
}

const state = createDoubler(5)
console.log(state.double)
state.increment()
console.log(state.double)
