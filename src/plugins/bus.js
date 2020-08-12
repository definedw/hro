import Vue from "vue"

const bus = new Vue()
const eventBus = {
  get() {
    return bus
  },
  emit(name, params) {
    bus.$emit(name, params)
  },
  on(name, func) {
    bus.$on(name, func)
  }
}

export default class Bus {
  static install(Vue) {
    Object.defineProperty(Vue.prototype, '$bus', {
      get() {
        return eventBus
      }
    })
  }
}
