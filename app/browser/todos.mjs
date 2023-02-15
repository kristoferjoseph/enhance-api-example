import enhance from '@enhance/element'
import TodosFormCreate from '../elements/todos/form-create.mjs'
import TodosList from '../elements/todos/list.mjs'
import TodosItem from '../elements/todos/item.mjs'
import API from './api.mjs'
const api = API()

enhance('todos-form-create', {
  api,
  keys: [ 'problems' ],
  init() {
    this.submit = this.submit.bind(this)
    this.addEventListener('submit', this.submit)
    this.form = this.querySelector('form')
  },
  render: TodosFormCreate,
  submit(e) {
    e.preventDefault()
    this.api.create(this.form)
  }
})

enhance('todos-list', {
  api,
  keys: [ 'todos' ],
  render: TodosList
})

enhance('todos-item', {
  api,
  keys: [ 'todos' ],
  init() {
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    const key = this.getAttribute('key')
    this.updateForm = this.querySelector(`form[action='/todos/${key}']`)
    this.deleteForm = this.querySelector(`form[action='/todos/${key}/delete']`)
    this.updateForm.addEventListener('submit', this.update)
    this.deleteForm.addEventListener('submit', this.delete)
    this.checkboxInput = this.querySelector('input[type="checkbox"]')
    this.checkboxInput.addEventListener('click', this.update)
    this.textInput = this.querySelector('input[type="text"]')
    this.textInput.addEventListener('input', debounce(this.update))
  },
  update(e) {
    e.preventDefault()
    this.api.update(this.updateForm)
  },
  delete(e) {
    e.preventDefault()
    this.api.destroy(this.deleteForm)
  },
  render: TodosItem
})

function debounce(fn, delay=1500) {
  let timeout
  return (...args) => {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(()=> fn.apply(this, args), delay)
  }
}
