import {makeObservable, observable, computed, action, flow} from 'mobx'
import fetch from 'isomorphic-unfetch'

class Doubler {
  value

  constructor(value) {
    makeObservable(this, {
      value: observable,
      double: computed,
      increment: action,
      fetch: flow,
    })
    this.value = value
  }

  get double() {
    return this.value * 2
  }

  increment() {
    this.value++
  }

  *fetch() {
    console.log('fetch')
    const response = yield fetch('https://reqbin.com/req/5nqtoxbx/get-json-example')
    console.log('response complete')
    try {
      this.value = yield response.json()
      console.log('try this.value =', this.value)
    } catch (error) {
      this.value = 0
      console.log('catch this.value =', this.value)
    }

    console.log('json this.value =', this.value)
  }
}

const state = new Doubler(10)
console.log(state.double)
state.increment()
console.log(state.double)

// MobX
console.log('start')
const stateFetch = state.fetch() // 1. fetch. next() запустится автоматом
console.log('stateFetch =', stateFetch) // 2. stateFetch - generator, который вернёт promise
console.log('end') // 3. end
// 4. response complete. generator продолжил отрабатывать в микротаске
// yield у response.json(), чтобы вывести log
// 5. catch this.value = 0
// 6. json this.value = 0

// Без MobX
// console.log('start')
// const stateFetch = state.fetch()
// console.log('stateFetch =', stateFetch) // stateFetch = Object [Generator] {}
// let result = stateFetch.next() // fetch
// console.log('result =', result) // result = { value: Promise { <pending> }, done: false }
// result.value.then(response => console.log('response =', response)) // response.json()
// console.log('end')
