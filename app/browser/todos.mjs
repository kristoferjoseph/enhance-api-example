import enhance from '@enhance/element'
import TodosFormCreate from '../elements/todos/form-create.mjs'
import TodosList from '../elements/todos/list.mjs'
import API from './api.mjs'
const api = API()

enhance('todos-form-create', {
  api,
  init() {
    this.submit = this.submit.bind(this)
    this.addEventListener('submit', this.submit)
    this.form = this.querySelector('form')
  },
  render: TodosFormCreate,
  submit(e) {
    e && e.preventDefault()
    this.api.create(
      JSON.stringify(
        Object.fromEntries(
          new FormData(this.form)
        )
      )
    )
  }
})

enhance('todos-list', {
  api,
  keys: [ 'todos' ],
  render: TodosList
})
