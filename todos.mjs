import enhance from '@enhance/element'
import API from './api.mjs'
const api = API()

enhance('todos-form-create', {
  api,
  keys: [ 'todos' ],
  init(el) {
    console.log('el: ', el)
  }
})
