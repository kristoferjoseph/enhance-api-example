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
    this.textInput = this.querySelector('input[type="text"]')
  },
  connected() {
    this.textInput.focus()
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
    this.textInput.addEventListener('focusout', this.update)
  },
  update(e) {
    // This is where you want to add debugging and logging
    e.preventDefault()
    // const form = this.updateForm
    // const keyInput = form.querySelector('input[name="key"]')
    // const key = keyInput.getAttribute('value')
    // if(key) // This is a hack to only post if the key exists. Root cause is form is structually incomplete. Missing key input.
    this.api.update(this.updateForm)
  },
  delete(e) {
    e.preventDefault()
    this.api.destroy(this.deleteForm)
  },
  render: TodosItem
})
