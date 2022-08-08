import {action, autorun, computed, observable} from 'mobx'

const state = observable({value: 0})
const increment = action(state => state.value++)
const getText = computed(() => {
  console.log(`Total value = ${state.value}`)
  return state.value
})

autorun(() => console.log('autorun state.value changed on', state.value))

increment(state)
getText.get()
increment(state)
const value = getText.get()
console.log('value =', value)
